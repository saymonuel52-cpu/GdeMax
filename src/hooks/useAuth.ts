import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User, UserRole } from '../types'
import type { Database } from '@/lib/database.types'

type ProfileRow = Database['public']['Tables']['profiles']['Row']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

interface AuthUser extends User {
  id: string
  email: string
  role: UserRole
  name: string
  avatar?: string
  phone?: string
}

/**
 * Хук для работы с аутентификацией через Supabase
 */
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Инициализация сессии
  useEffect(() => {
    // Проверяем активную сессию
    supabase.auth.getSession().then(({ data: { session }, error: sessionError }) => {
      if (sessionError) {
        setError(sessionError.message)
        setLoading(false)
        return
      }

      if (session?.user) {
        loadUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Подписываемся на изменения аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await loadUserProfile(session.user.id)
        } else {
          setUser(null)
          setLoading(false)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  /**
   * Загружает профиль пользователя из таблицы profiles
   */
  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) {
        // Если профиль не найден, создаём его на основе данных из auth.users
        const { data: authUser } = await supabase.auth.getUser()
        if (authUser.user) {
          await createUserProfile(authUser.user)
          // Повторно загружаем профиль
          const { data: newProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()
          
          if (newProfile) {
            setUser(mapProfileToUser(newProfile))
          }
        }
      } else if (data) {
        setUser(mapProfileToUser(data))
      }
    } catch (err) {
      console.error('Ошибка загрузки профиля:', err)
      setError('Не удалось загрузить профиль пользователя')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Создаёт профиль пользователя в таблице profiles
   */
  const createUserProfile = async (authUser: any) => {
    const profileData: ProfileInsert = {
      id: authUser.id,
      email: authUser.email || '',
      name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Пользователь',
      role: 'client', // Роль по умолчанию
      avatar_url: authUser.user_metadata?.avatar_url || null,
      phone: authUser.user_metadata?.phone || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('profiles')
      // @ts-ignore
      .upsert(profileData)
      .select()
      .single()

    if (error) {
      console.error('Ошибка создания профиля:', error)
      throw error
    }

    return data
  }

  /**
   * Вход через email/пароль
   */
  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return { success: false, error: error.message }
    }

    if (data.user) {
      await loadUserProfile(data.user.id)
    }

    setLoading(false)
    return { success: true, user: data.user }
  }

  /**
   * Вход через демо-режим (без пароля, с выбором роли)
   */
  const signInDemo = async (role: UserRole) => {
    setLoading(true)
    setError(null)

    // В демо-режиме создаём временного пользователя без реальной аутентификации
    // В реальном приложении здесь должна быть реальная аутентификация
    const demoUser: AuthUser = {
      id: `demo-${role}-${Date.now()}`,
      email: `${role}@demo.gdemaks.local`,
      name: `Демо ${role}`,
      role,
      avatar: undefined,
      phone: '+7 (999) 999-99-99',
    }

    // Сохраняем в localStorage для совместимости с текущей системой
    localStorage.setItem('demo_user', JSON.stringify(demoUser))
    
    // Устанавливаем пользователя
    setUser(demoUser)
    setLoading(false)
    
    return { success: true, user: demoUser }
  }

  /**
   * Регистрация нового пользователя
   */
  const signUp = async (email: string, password: string, name: string, role: UserRole = 'client') => {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return { success: false, error: error.message }
    }

    if (data.user) {
      // Профиль будет создан автоматически через триггер в БД или через функцию loadUserProfile
      await loadUserProfile(data.user.id)
    }

    setLoading(false)
    return { success: true, user: data.user }
  }

  /**
   * Выход
   */
  const signOut = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      setError(error.message)
      setLoading(false)
      return { success: false, error: error.message }
    }

    // Очищаем демо-пользователя
    localStorage.removeItem('demo_user')
    setUser(null)
    setLoading(false)
    
    return { success: true }
  }

  /**
   * Обновление профиля пользователя
   */
  const updateProfile = async (updates: Partial<Omit<AuthUser, 'id'>>) => {
    if (!user) {
      throw new Error('Пользователь не авторизован')
    }

    setLoading(true)
    const updateData: ProfileUpdate = {
      name: updates.name,
      avatar_url: updates.avatar || null,
      phone: updates.phone || null,
      role: updates.role,
      updated_at: new Date().toISOString(),
    }

    // Удаляем undefined поля
    Object.keys(updateData).forEach(key => {
      if (updateData[key as keyof ProfileUpdate] === undefined) {
        delete updateData[key as keyof ProfileUpdate]
      }
    })

    const { data, error } = await supabase
      .from('profiles')
      // @ts-ignore
      .update(updateData)
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      setError(error.message)
      setLoading(false)
      return { success: false, error: error.message }
    }

    if (data) {
      setUser(mapProfileToUser(data))
    }

    setLoading(false)
    return { success: true, user: data }
  }

  /**
   * Проверка, авторизован ли пользователь
   */
  const isAuthenticated = !!user

  /**
   * Проверка роли пользователя
   */
  const hasRole = (role: UserRole | UserRole[]) => {
    if (!user) return false
    if (Array.isArray(role)) {
      return role.includes(user.role)
    }
    return user.role === role
  }

  return {
    user,
    loading,
    error,
    signIn,
    signInDemo,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated,
    hasRole,
    refreshUser: () => user && loadUserProfile(user.id),
  }
}

/**
 * Преобразует профиль из БД в объект пользователя
 */
function mapProfileToUser(profile: ProfileRow): AuthUser {
  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    role: profile.role,
    avatar: profile.avatar_url || undefined,
    phone: profile.phone || undefined,
  }
}