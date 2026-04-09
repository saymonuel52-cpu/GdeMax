import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Act } from '../types'

interface ActState {
  acts: Act[]
  addAct: (act: Omit<Act, 'id'>) => void
  updateAct: (id: string, updates: Partial<Act>) => void
  deleteAct: (id: string) => void
  getAct: (id: string) => Act | undefined
  getActsForObject: (objectId: string) => Act[]
  signAct: (id: string, signature: string) => void
  generateActNumber: () => string
}

export const useActStore = create<ActState>()(
  persist(
    (set, get) => ({
      acts: [
        {
          id: 'act-1',
          objectId: 'obj-1',
          number: 'АВР-2024-001',
          date: '2024-03-10',
          periodStart: '2024-03-01',
          periodEnd: '2024-03-10',
          tasks: ['task-1'],
          totalAmount: 8000,
          signedByClient: false,
        },
      ],
      addAct: (actData) => {
        const newAct: Act = {
          ...actData,
          id: `act-${Date.now()}`,
        }
        set((state) => ({ acts: [...state.acts, newAct] }))
      },
      updateAct: (id, updates) =>
        set((state) => ({
          acts: state.acts.map((act) =>
            act.id === id ? { ...act, ...updates } : act,
          ),
        })),
      deleteAct: (id) =>
        set((state) => ({
          acts: state.acts.filter((act) => act.id !== id),
        })),
      getAct: (id) => get().acts.find((act) => act.id === id),
      getActsForObject: (objectId) =>
        get().acts.filter((act) => act.objectId === objectId),
      signAct: (id, signature) => {
        set((state) => ({
          acts: state.acts.map((act) =>
            act.id === id
              ? { ...act, signature, signedByClient: true, sentDate: new Date().toISOString().split('T')[0] }
              : act,
          ),
        }))
      },
      generateActNumber: () => {
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')
        const count = get().acts.length + 1
        return `АВР-${year}-${month}${day}-${String(count).padStart(3, '0')}`
      },
    }),
    {
      name: 'act-storage',
    },
  ),
)