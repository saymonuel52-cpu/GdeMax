import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ConstructionObject } from '../types'
import { mockObjects } from '@services/mockData'

interface ObjectState {
  objects: ConstructionObject[]
  selectedObjectId: string | null
  addObject: (object: Omit<ConstructionObject, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateObject: (id: string, updates: Partial<ConstructionObject>) => void
  deleteObject: (id: string) => void
  selectObject: (id: string | null) => void
  getObject: (id: string) => ConstructionObject | undefined
  getFilteredObjects: (userId: string, userRole: string) => ConstructionObject[]
}

export const useObjectStore = create<ObjectState>()(
  persist(
    (set, get) => ({
      objects: mockObjects,
      selectedObjectId: null,
      addObject: (objectData) => {
        const newObject: ConstructionObject = {
          ...objectData,
          id: `obj-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ objects: [...state.objects, newObject] }))
      },
      updateObject: (id, updates) =>
        set((state) => ({
          objects: state.objects.map((obj) =>
            obj.id === id
              ? { ...obj, ...updates, updatedAt: new Date().toISOString() }
              : obj,
          ),
        })),
      deleteObject: (id) =>
        set((state) => ({
          objects: state.objects.filter((obj) => obj.id !== id),
          selectedObjectId:
            state.selectedObjectId === id ? null : state.selectedObjectId,
        })),
      selectObject: (id) => set({ selectedObjectId: id }),
      getObject: (id) => get().objects.find((obj) => obj.id === id),
      getFilteredObjects: (userId, userRole) => {
        const { objects } = get()
        if (userRole === 'admin') return objects
        if (userRole === 'foreman') {
          return objects.filter((obj) => obj.assignedUsers.includes(userId))
        }
        if (userRole === 'master') {
          return objects.filter((obj) => obj.assignedUsers.includes(userId))
        }
        if (userRole === 'client') {
          return objects.filter((obj) => obj.assignedUsers.includes(userId))
        }
        return []
      },
    }),
    {
      name: 'object-storage',
    },
  ),
)