import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Theme } from '../types'

const THEMES: Theme[] = [
  {
    name: 'gold',
    primary: 'var(--color-gold-500)',
    secondary: '#1a1a2e',
    accent: '#f6d12c',
    dark: true,
  },
  {
    name: 'amethyst',
    primary: 'var(--color-amethyst-500)',
    secondary: '#1a1a2e',
    accent: '#9e66ff',
    dark: true,
  },
  {
    name: 'terracotta',
    primary: 'var(--color-terracotta-500)',
    secondary: '#1a1a2e',
    accent: '#e4683d',
    dark: true,
  },
  {
    name: 'forest',
    primary: 'var(--color-forest-500)',
    secondary: '#1a1a2e',
    accent: '#3d9c3d',
    dark: true,
  },
  {
    name: 'ocean',
    primary: 'var(--color-ocean-500)',
    secondary: '#1a1a2e',
    accent: '#3d9bff',
    dark: true,
  },
]

interface ThemeState {
  currentTheme: Theme
  darkMode: boolean
  setTheme: (themeName: string) => void
  toggleDarkMode: () => void
  applyTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: THEMES[0],
      darkMode: true,
      setTheme: (themeName) => {
        const theme = THEMES.find((t) => t.name === themeName) || THEMES[0]
        set({ currentTheme: theme })
        get().applyTheme(theme)
      },
      toggleDarkMode: () => {
        const newDarkMode = !get().darkMode
        set({ darkMode: newDarkMode })
        document.documentElement.classList.toggle('dark', newDarkMode)
      },
      applyTheme: (theme) => {
        const root = document.documentElement
        root.style.setProperty('--color-primary', theme.primary)
        root.style.setProperty('--color-secondary', theme.secondary)
        root.style.setProperty('--color-accent', theme.accent)
        if (theme.dark !== undefined) {
          root.classList.toggle('dark', theme.dark)
        }
      },
    }),
    {
      name: 'theme-storage',
    },
  ),
)

// Инициализация темы при загрузке
if (typeof window !== 'undefined') {
  const store = useThemeStore.getState()
  store.applyTheme(store.currentTheme)
  document.documentElement.classList.toggle('dark', store.darkMode)
}