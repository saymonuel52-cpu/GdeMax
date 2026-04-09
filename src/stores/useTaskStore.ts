import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task, TaskChecklistItem } from '../types'
import { mockTasks } from '@services/mockData'

interface TaskState {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  getTask: (id: string) => Task | undefined
  getTasksForObject: (objectId: string) => Task[]
  getTasksForUser: (userId: string) => Task[]
  getOverdueTasks: () => Task[]
  changeTaskStatus: (id: string, status: Task['status']) => void
  addChecklistItem: (taskId: string, text: string) => void
  toggleChecklistItem: (taskId: string, itemId: string) => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: mockTasks,
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: `task-${Date.now()}`,
        }
        set((state) => ({ tasks: [...state.tasks, newTask] }))
      },
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task,
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      getTask: (id) => get().tasks.find((task) => task.id === id),
      getTasksForObject: (objectId) =>
        get().tasks.filter((task) => task.objectId === objectId),
      getTasksForUser: (userId) =>
        get().tasks.filter((task) => task.assigneeId === userId),
      getOverdueTasks: () => {
        const today = new Date().toISOString().split('T')[0]
        return get().tasks.filter(
          (task) => task.status !== 'completed' && task.endDate < today,
        )
      },
      changeTaskStatus: (id, status) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task,
          ),
        }))
      },
      addChecklistItem: (taskId, text) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  checklist: [
                    ...(task.checklist || []),
                    { id: `chk-${Date.now()}`, text, completed: false },
                  ],
                }
              : task,
          ),
        }))
      },
      toggleChecklistItem: (taskId, itemId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  checklist: (task.checklist || []).map((item: TaskChecklistItem) =>
                    item.id === itemId
                      ? { ...item, completed: !item.completed }
                      : item,
                  ),
                }
              : task,
          ),
        }))
      },
    }),
    {
      name: 'task-storage',
    },
  ),
)