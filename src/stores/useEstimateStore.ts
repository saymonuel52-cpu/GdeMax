import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EstimateItem, PriceItem } from '@types'
import { mockPriceItems } from '@services/mockData'

interface EstimateState {
  priceItems: PriceItem[]
  estimateItems: EstimateItem[]
  addPriceItem: (item: Omit<PriceItem, 'id'>) => void
  updatePriceItem: (id: string, updates: Partial<PriceItem>) => void
  deletePriceItem: (id: string) => void
  addEstimateItem: (item: Omit<EstimateItem, 'id' | 'total'>) => void
  updateEstimateItem: (id: string, updates: Partial<EstimateItem>) => void
  deleteEstimateItem: (id: string) => void
  getEstimateForObject: (objectId: string) => EstimateItem[]
  getTotalForObject: (objectId: string) => number
  getCategories: () => string[]
}

export const useEstimateStore = create<EstimateState>()(
  persist(
    (set, get) => ({
      priceItems: mockPriceItems,
      estimateItems: [
        {
          id: 'est-1',
          objectId: 'obj-1',
          priceItemId: 'dem-1',
          quantity: 10,
          unitPrice: 800,
          total: 8000,
          notes: 'Демонтаж перегородок в комнатах',
          status: 'planned',
        },
        {
          id: 'est-2',
          objectId: 'obj-1',
          priceItemId: 'elec-1',
          quantity: 50,
          unitPrice: 150,
          total: 7500,
          notes: 'Прокладка кабеля по квартире',
          status: 'ordered',
        },
      ],
      addPriceItem: (itemData) => {
        const newItem: PriceItem = {
          ...itemData,
          id: `price-${Date.now()}`,
        }
        set((state) => ({ priceItems: [...state.priceItems, newItem] }))
      },
      updatePriceItem: (id, updates) =>
        set((state) => ({
          priceItems: state.priceItems.map((item) =>
            item.id === id ? { ...item, ...updates } : item,
          ),
        })),
      deletePriceItem: (id) =>
        set((state) => ({
          priceItems: state.priceItems.filter((item) => item.id !== id),
        })),
      addEstimateItem: (itemData) => {
        const priceItem = get().priceItems.find((p) => p.id === itemData.priceItemId)
        const unitPrice = priceItem?.price || 0
        const total = unitPrice * itemData.quantity
        const newItem: EstimateItem = {
          ...itemData,
          id: `est-${Date.now()}`,
          unitPrice,
          total,
        }
        set((state) => ({ estimateItems: [...state.estimateItems, newItem] }))
      },
      updateEstimateItem: (id, updates) =>
        set((state) => {
          const oldItem = state.estimateItems.find((item) => item.id === id)
          if (!oldItem) return state
          const newQuantity = updates.quantity ?? oldItem.quantity
          const newUnitPrice = updates.unitPrice ?? oldItem.unitPrice
          const newTotal = newQuantity * newUnitPrice
          return {
            estimateItems: state.estimateItems.map((item) =>
              item.id === id
                ? { ...item, ...updates, total: newTotal }
                : item,
            ),
          }
        }),
      deleteEstimateItem: (id) =>
        set((state) => ({
          estimateItems: state.estimateItems.filter((item) => item.id !== id),
        })),
      getEstimateForObject: (objectId) =>
        get().estimateItems.filter((item) => item.objectId === objectId),
      getTotalForObject: (objectId) =>
        get()
          .estimateItems.filter((item) => item.objectId === objectId)
          .reduce((sum, item) => sum + item.total, 0),
      getCategories: () => {
        const categories = new Set<string>()
        get().priceItems.forEach((item) => categories.add(item.category))
        return Array.from(categories)
      },
    }),
    {
      name: 'estimate-storage',
    },
  ),
)