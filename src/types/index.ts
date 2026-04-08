export type UserRole = 'admin' | 'foreman' | 'master' | 'client'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  phone?: string
  objects?: string[] // IDs объектов, к которым есть доступ
}

export interface ConstructionObject {
  id: string
  name: string
  address: string
  clientName: string
  clientPhone?: string
  startDate: string
  endDate?: string
  status: 'planning' | 'active' | 'paused' | 'completed'
  template?: 'apartment' | 'cottage' | 'office' | 'custom'
  modules: string[] // IDs модулей
  assignedUsers: string[] // IDs пользователей
  createdAt: string
  updatedAt: string
}

export interface ModuleDefinition {
  id: string
  name: string
  version: string
  description: string
  category: string
  icon: string
  priceItems: PriceItem[]
  tasks: ModuleTask[]
  checklist: string[]
  componentCode?: string
  installed: boolean
  enabled: boolean
}

export interface PriceItem {
  id: string
  name: string
  price: number
  unit: string
  type: 'work' | 'material'
  category: string
  supplier?: string
  sku?: string
}

export interface ModuleTask {
  title: string
  duration: number // дни
  dependsOn: string[] // названия задач
}

export interface EstimateItem {
  id: string
  objectId: string
  priceItemId: string
  quantity: number
  unitPrice: number
  total: number
  notes?: string
  status: 'planned' | 'ordered' | 'delivered' | 'installed'
}

export interface Task {
  id: string
  objectId: string
  title: string
  description?: string
  startDate: string
  endDate: string
  status: 'planned' | 'in_progress' | 'completed' | 'overdue'
  assigneeId?: string
  priority: 'low' | 'medium' | 'high'
  dependsOn?: string[]
  checklist?: TaskChecklistItem[]
  photos?: string[]
  comments?: Comment[]
}

export interface TaskChecklistItem {
  id: string
  text: string
  completed: boolean
}

export interface WarehouseItem {
  id: string
  name: string
  sku: string
  category: string
  unit: string
  quantity: number
  minQuantity: number
  supplier?: string
  lastPurchasePrice?: number
  location: string // central или objectId
}

export interface Transaction {
  id: string
  type: 'incoming' | 'outgoing'
  itemId: string
  quantity: number
  unitPrice: number
  total: number
  date: string
  objectId?: string
  taskId?: string
  notes?: string
}

export interface Act {
  id: string
  objectId: string
  number: string
  date: string
  periodStart: string
  periodEnd: string
  tasks: string[] // IDs задач
  totalAmount: number
  signature?: string // base64 изображения подписи
  signedByClient?: boolean
  sentDate?: string
}

export interface ChatMessage {
  id: string
  objectId: string
  userId: string
  text: string
  attachments?: string[]
  timestamp: string
  readBy: string[]
  mentions?: string[]
}

export interface Comment {
  id: string
  entityType: 'task' | 'estimate' | 'act'
  entityId: string
  userId: string
  text: string
  timestamp: string
}

export interface SyncState {
  lastSynced: string | null
  pendingChanges: number
  online: boolean
}

export interface Theme {
  name: string
  primary: string
  secondary: string
  accent: string
  dark: boolean
}