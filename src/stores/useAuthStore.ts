import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserRole } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (role: UserRole) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

const DEMO_USERS: Record<UserRole, User> = {
  admin: {
    id: 'admin-1',
    name: 'Александр Петров',
    email: 'admin@gdemaks.ru',
    role: 'admin',
    avatar: '',
    phone: '+7 (999) 123-45-67',
    objects: ['obj-1', 'obj-2', 'obj-3'],
  },
  foreman: {
    id: 'foreman-1',
    name: 'Иван Сидоров',
    email: 'foreman@gdemaks.ru',
    role: 'foreman',
    avatar: '',
    phone: '+7 (999) 234-56-78',
    objects: ['obj-1', 'obj-2'],
  },
  master: {
    id: 'master-1',
    name: 'Сергей Кузнецов',
    email: 'master@gdemaks.ru',
    role: 'master',
    avatar: '',
    phone: '+7 (999) 345-67-89',
    objects: ['obj-1'],
  },
  client: {
    id: 'client-1',
    name: 'ООО "СтройИнвест"',
    email: 'client@stroinvest.ru',
    role: 'client',
    avatar: '',
    phone: '+7 (999) 456-78-90',
    objects: ['obj-1'],
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (role) => {
        const user = DEMO_USERS[role]
        set({ user, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'auth-storage',
    },
  ),
)