import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Эти значения должны быть установлены в переменных окружения
// Для разработки можно использовать временные значения
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Создаём клиент Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'GdeMaks',
    },
  },
})

// Вспомогательные функции для работы с Supabase

/**
 * Получить текущего пользователя
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

/**
 * Получить профиль пользователя
 */
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

/**
 * Загрузить файл в хранилище Supabase
 */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
  options?: { upsert?: boolean }
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: options?.upsert || false,
    })

  if (error) throw error
  return data
}

/**
 * Получить публичный URL файла
 */
export function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return data.publicUrl
}

/**
 * Подписаться на изменения в таблице
 */
export function subscribeToTable<T extends keyof Database['public']['Tables']>(
  table: T,
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*',
  callback: (payload: any) => void
) {
  return supabase
    .channel(`table-${table}-changes`)
    .on(
      'postgres_changes',
      { event, schema: 'public', table: table as string },
      callback
    )
    .subscribe()
}

/**
 * Отписаться от всех каналов
 */
export function unsubscribeAll() {
  return supabase.removeAllChannels()
}

/**
 * Выполнить миграцию данных из localStorage в Supabase
 */
export async function migrateFromLocalStorage() {
  console.log('Начало миграции данных из localStorage в Supabase...')
  
  // Здесь будет логика миграции
  // Пока просто заглушка
  return { success: true, migrated: 0 }
}

// Экспортируем типы для удобства
export type { Database } from './database.types'