import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChatMessage } from '../types'

interface ChatState {
  messages: ChatMessage[]
  unreadCount: number
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp' | 'readBy'>) => void
  markAsRead: (messageId: string, userId: string) => void
  getMessagesForObject: (objectId: string) => ChatMessage[]
  getUnreadCountForObject: (objectId: string, userId: string) => number
  clearUnread: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [
        {
          id: 'msg-1',
          objectId: 'obj-1',
          userId: 'master-1',
          text: 'Демонтаж завершён, можно приступать к электрике',
          timestamp: '2024-03-06T10:30:00Z',
          readBy: ['master-1', 'foreman-1'],
        },
        {
          id: 'msg-2',
          objectId: 'obj-1',
          userId: 'foreman-1',
          text: 'Хорошо, завтра привезу кабель',
          timestamp: '2024-03-06T11:15:00Z',
          readBy: ['foreman-1', 'master-1'],
        },
      ],
      unreadCount: 1,
      addMessage: (messageData) => {
        const newMessage: ChatMessage = {
          ...messageData,
          id: `msg-${Date.now()}`,
          timestamp: new Date().toISOString(),
          readBy: [messageData.userId],
        }
        set((state) => ({
          messages: [...state.messages, newMessage],
          unreadCount: state.unreadCount + 1,
        }))
      },
      markAsRead: (messageId, userId) => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId && !msg.readBy.includes(userId)
              ? { ...msg, readBy: [...msg.readBy, userId] }
              : msg,
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        }))
      },
      getMessagesForObject: (objectId) =>
        get().messages
          .filter((msg) => msg.objectId === objectId)
          .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
      getUnreadCountForObject: (objectId, userId) =>
        get().messages.filter(
          (msg) =>
            msg.objectId === objectId &&
            !msg.readBy.includes(userId),
        ).length,
      clearUnread: () => set({ unreadCount: 0 }),
    }),
    {
      name: 'chat-storage',
    },
  ),
)