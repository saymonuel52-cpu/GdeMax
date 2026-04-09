import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { WarehouseItem, Transaction } from '../types'
import { mockWarehouse } from '@services/mockData'

interface WarehouseState {
  items: WarehouseItem[]
  transactions: Transaction[]
  addItem: (item: Omit<WarehouseItem, 'id'>) => void
  updateItem: (id: string, updates: Partial<WarehouseItem>) => void
  deleteItem: (id: string) => void
  addTransaction: (tx: Omit<Transaction, 'id' | 'total'>) => void
  getItem: (id: string) => WarehouseItem | undefined
  getItemsByLocation: (location: string) => WarehouseItem[]
  getLowStockItems: () => WarehouseItem[]
  canConsume: (itemId: string, quantity: number) => boolean
  consume: (itemId: string, quantity: number, objectId?: string, taskId?: string) => boolean
}

export const useWarehouseStore = create<WarehouseState>()(
  persist(
    (set, get) => ({
      items: mockWarehouse,
      transactions: [
        {
          id: 'tx-1',
          type: 'incoming',
          itemId: 'wh-1',
          quantity: 200,
          unitPrice: 85,
          total: 17000,
          date: '2024-03-01',
          notes: 'Поставка от ЭлектроСнаб',
        },
        {
          id: 'tx-2',
          type: 'outgoing',
          itemId: 'wh-1',
          quantity: 50,
          unitPrice: 85,
          total: 4250,
          date: '2024-03-05',
          objectId: 'obj-1',
          taskId: 'task-2',
          notes: 'Списание на объект',
        },
      ],
      addItem: (itemData) => {
        const newItem: WarehouseItem = {
          ...itemData,
          id: `wh-${Date.now()}`,
        }
        set((state) => ({ items: [...state.items, newItem] }))
      },
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item,
          ),
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      addTransaction: (txData) => {
        const total = txData.quantity * txData.unitPrice
        const newTx: Transaction = {
          ...txData,
          id: `tx-${Date.now()}`,
          total,
        }
        set((state) => ({ transactions: [...state.transactions, newTx] }))

        // Обновляем количество на складе
        if (txData.type === 'incoming') {
          const item = get().items.find((i) => i.id === txData.itemId)
          if (item) {
            set((state) => ({
              items: state.items.map((i) =>
                i.id === txData.itemId
                  ? { ...i, quantity: i.quantity + txData.quantity }
                  : i,
              ),
            }))
          }
        } else if (txData.type === 'outgoing') {
          const item = get().items.find((i) => i.id === txData.itemId)
          if (item && item.quantity >= txData.quantity) {
            set((state) => ({
              items: state.items.map((i) =>
                i.id === txData.itemId
                  ? { ...i, quantity: i.quantity - txData.quantity }
                  : i,
              ),
            }))
          }
        }
      },
      getItem: (id) => get().items.find((item) => item.id === id),
      getItemsByLocation: (location) =>
        get().items.filter((item) => item.location === location),
      getLowStockItems: () =>
        get().items.filter((item) => item.quantity <= item.minQuantity),
      canConsume: (itemId, quantity) => {
        const item = get().items.find((i) => i.id === itemId)
        return item ? item.quantity >= quantity : false
      },
      consume: (itemId, quantity, objectId, taskId) => {
        const item = get().items.find((i) => i.id === itemId)
        if (!item || item.quantity < quantity) return false

        // Добавляем транзакцию
        get().addTransaction({
          type: 'outgoing',
          itemId,
          quantity,
          unitPrice: item.lastPurchasePrice || 0,
          date: new Date().toISOString().split('T')[0],
          objectId,
          taskId,
          notes: 'Списание со склада',
        })

        return true
      },
    }),
    {
      name: 'warehouse-storage',
    },
  ),
)