import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ModuleDefinition } from '@types'
import { mockModules } from '@services/mockData'

interface ModuleState {
  modules: ModuleDefinition[]
  installedModules: ModuleDefinition[]
  availableModules: ModuleDefinition[]
  installModule: (moduleId: string) => void
  uninstallModule: (moduleId: string) => void
  enableModule: (moduleId: string) => void
  disableModule: (moduleId: string) => void
  addCustomModule: (module: ModuleDefinition) => void
  getModule: (id: string) => ModuleDefinition | undefined
}

export const useModuleStore = create<ModuleState>()(
  persist(
    (set, get) => ({
      modules: mockModules,
      installedModules: mockModules.filter((m) => m.installed),
      availableModules: mockModules.filter((m) => !m.installed),
      installModule: (moduleId) => {
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === moduleId ? { ...m, installed: true } : m,
          ),
          installedModules: state.modules.filter((m) => m.id === moduleId || m.installed),
          availableModules: state.modules.filter((m) => m.id !== moduleId && !m.installed),
        }))
      },
      uninstallModule: (moduleId) => {
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === moduleId ? { ...m, installed: false, enabled: false } : m,
          ),
          installedModules: state.installedModules.filter((m) => m.id !== moduleId),
          availableModules: [...state.availableModules, state.modules.find((m) => m.id === moduleId)!].filter(Boolean),
        }))
      },
      enableModule: (moduleId) =>
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === moduleId ? { ...m, enabled: true } : m,
          ),
        })),
      disableModule: (moduleId) =>
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === moduleId ? { ...m, enabled: false } : m,
          ),
        })),
      addCustomModule: (module) => {
        const newModule = { ...module, installed: true, enabled: true }
        set((state) => ({
          modules: [...state.modules, newModule],
          installedModules: [...state.installedModules, newModule],
        }))
      },
      getModule: (id) => get().modules.find((m) => m.id === id),
    }),
    {
      name: 'module-storage',
    },
  ),
)