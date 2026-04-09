export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Таблица пользователей (расширяет auth.users)
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          role: 'admin' | 'foreman' | 'master' | 'client'
          avatar_url: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          role: 'admin' | 'foreman' | 'master' | 'client'
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'admin' | 'foreman' | 'master' | 'client'
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      
      // Строительные объекты
      construction_objects: {
        Row: {
          id: string
          name: string
          address: string
          client_name: string
          client_phone: string | null
          start_date: string
          end_date: string | null
          status: 'planning' | 'active' | 'paused' | 'completed'
          template: 'apartment' | 'cottage' | 'office' | 'custom' | null
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          client_name: string
          client_phone?: string | null
          start_date: string
          end_date?: string | null
          status: 'planning' | 'active' | 'paused' | 'completed'
          template?: 'apartment' | 'cottage' | 'office' | 'custom' | null
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          client_name?: string
          client_phone?: string | null
          start_date?: string
          end_date?: string | null
          status?: 'planning' | 'active' | 'paused' | 'completed'
          template?: 'apartment' | 'cottage' | 'office' | 'custom' | null
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      
      // Модули
      modules: {
        Row: {
          id: string
          name: string
          version: string
          description: string
          category: string
          icon: string
          component_code: string | null
          installed: boolean
          enabled: boolean
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          name: string
          version: string
          description: string
          category: string
          icon: string
          component_code?: string | null
          installed?: boolean
          enabled?: boolean
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          name?: string
          version?: string
          description?: string
          category?: string
          icon?: string
          component_code?: string | null
          installed?: boolean
          enabled?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      
      // Позиции прайса
      price_items: {
        Row: {
          id: string
          name: string
          price: number
          unit: string
          type: 'work' | 'material'
          category: string
          supplier: string | null
          sku: string | null
          module_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          unit: string
          type: 'work' | 'material'
          category: string
          supplier?: string | null
          sku?: string | null
          module_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          unit?: string
          type?: 'work' | 'material'
          category?: string
          supplier?: string | null
          sku?: string | null
          module_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      
      // Задачи модулей
      module_tasks: {
        Row: {
          id: string
          module_id: string
          title: string
          duration: number
          depends_on: string[]
          created_at: string
        }
        Insert: {
          id?: string
          module_id: string
          title: string
          duration: number
          depends_on?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          module_id?: string
          title?: string
          duration?: number
          depends_on?: string[]
          created_at?: string
        }
      }
      
      // Позиции сметы
      estimate_items: {
        Row: {
          id: string
          object_id: string
          price_item_id: string
          quantity: number
          unit_price: number
          total: number
          notes: string | null
          status: 'planned' | 'ordered' | 'delivered' | 'installed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          object_id: string
          price_item_id: string
          quantity: number
          unit_price: number
          total: number
          notes?: string | null
          status?: 'planned' | 'ordered' | 'delivered' | 'installed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          object_id?: string
          price_item_id?: string
          quantity?: number
          unit_price?: number
          total?: number
          notes?: string | null
          status?: 'planned' | 'ordered' | 'delivered' | 'installed'
          created_at?: string
          updated_at?: string
        }
      }
      
      // Задачи (работы)
      tasks: {
        Row: {
          id: string
          object_id: string
          title: string
          description: string | null
          start_date: string
          end_date: string
          status: 'planned' | 'in_progress' | 'completed' | 'overdue'
          assignee_id: string | null
          priority: 'low' | 'medium' | 'high'
          depends_on: string[] | null
          photos: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          object_id: string
          title: string
          description?: string | null
          start_date: string
          end_date: string
          status?: 'planned' | 'in_progress' | 'completed' | 'overdue'
          assignee_id?: string | null
          priority?: 'low' | 'medium' | 'high'
          depends_on?: string[] | null
          photos?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          object_id?: string
          title?: string
          description?: string | null
          start_date?: string
          end_date?: string
          status?: 'planned' | 'in_progress' | 'completed' | 'overdue'
          assignee_id?: string | null
          priority?: 'low' | 'medium' | 'high'
          depends_on?: string[] | null
          photos?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      
      // Чеклист задач
      task_checklist: {
        Row: {
          id: string
          task_id: string
          text: string
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id: string
          text: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          text?: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      
      // Склад
      warehouse_items: {
        Row: {
          id: string
          name: string
          sku: string
          category: string
          unit: string
          quantity: number
          min_quantity: number
          supplier: string | null
          last_purchase_price: number | null
          location: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          sku: string
          category: string
          unit: string
          quantity?: number
          min_quantity?: number
          supplier?: string | null
          last_purchase_price?: number | null
          location: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          sku?: string
          category?: string
          unit?: string
          quantity?: number
          min_quantity?: number
          supplier?: string | null
          last_purchase_price?: number | null
          location?: string
          created_at?: string
          updated_at?: string
        }
      }
      
      // Транзакции склада
      warehouse_transactions: {
        Row: {
          id: string
          type: 'incoming' | 'outgoing'
          item_id: string
          quantity: number
          unit_price: number
          total: number
          date: string
          object_id: string | null
          task_id: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          type: 'incoming' | 'outgoing'
          item_id: string
          quantity: number
          unit_price: number
          total: number
          date?: string
          object_id?: string | null
          task_id?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'incoming' | 'outgoing'
          item_id?: string
          quantity?: number
          unit_price?: number
          total?: number
          date?: string
          object_id?: string | null
          task_id?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      
      // Акты выполненных работ
      acts: {
        Row: {
          id: string
          object_id: string
          number: string
          date: string
          period_start: string
          period_end: string
          total_amount: number
          signature: string | null
          signed_by_client: boolean
          sent_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          object_id: string
          number: string
          date: string
          period_start: string
          period_end: string
          total_amount: number
          signature?: string | null
          signed_by_client?: boolean
          sent_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          object_id?: string
          number?: string
          date?: string
          period_start?: string
          period_end?: string
          total_amount?: number
          signature?: string | null
          signed_by_client?: boolean
          sent_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      
      // Сообщения чата
      chat_messages: {
        Row: {
          id: string
          object_id: string
          user_id: string
          text: string
          attachments: string[] | null
          timestamp: string
          read_by: string[]
          mentions: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          object_id: string
          user_id: string
          text: string
          attachments?: string[] | null
          timestamp?: string
          read_by?: string[]
          mentions?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          object_id?: string
          user_id?: string
          text?: string
          attachments?: string[] | null
          timestamp?: string
          read_by?: string[]
          mentions?: string[] | null
          created_at?: string
        }
      }
      
      // Комментарии
      comments: {
        Row: {
          id: string
          entity_type: 'task' | 'estimate' | 'act'
          entity_id: string
          user_id: string
          text: string
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          entity_type: 'task' | 'estimate' | 'act'
          entity_id: string
          user_id: string
          text: string
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          entity_type?: 'task' | 'estimate' | 'act'
          entity_id?: string
          user_id?: string
          text?: string
          timestamp?: string
          created_at?: string
        }
      }
      
      // Связи многие-ко-многим
      object_modules: {
        Row: {
          object_id: string
          module_id: string
          created_at: string
        }
        Insert: {
          object_id: string
          module_id: string
          created_at?: string
        }
        Update: {
          object_id?: string
          module_id?: string
          created_at?: string
        }
      }
      
      object_users: {
        Row: {
          object_id: string
          user_id: string
          role: 'viewer' | 'editor' | 'manager'
          created_at: string
        }
        Insert: {
          object_id: string
          user_id: string
          role?: 'viewer' | 'editor' | 'manager'
          created_at?: string
        }
        Update: {
          object_id?: string
          user_id?: string
          role?: 'viewer' | 'editor' | 'manager'
          created_at?: string
        }
      }
      
      act_tasks: {
        Row: {
          act_id: string
          task_id: string
          created_at: string
        }
        Insert: {
          act_id: string
          task_id: string
          created_at?: string
        }
        Update: {
          act_id?: string
          task_id?: string
          created_at?: string
        }
      }
    }
    
    Views: {
      [_ in never]: never
    }
    
    Functions: {
      // Функция для генерации номера акта
      generate_act_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      
      // Функция для проверки доступности материала
      can_consume_material: {
        Args: { item_id: string; quantity: number }
        Returns: boolean
      }
      
      // Функция для получения просроченных задач
      get_overdue_tasks: {
        Args: { user_id: string }
        Returns: {
          id: string
          title: string
          object_id: string
          end_date: string
          days_overdue: number
        }[]
      }
    }
    
    Enums: {
      user_role: 'admin' | 'foreman' | 'master' | 'client'
      object_status: 'planning' | 'active' | 'paused' | 'completed'
      task_status: 'planned' | 'in_progress' | 'completed' | 'overdue'
      estimate_status: 'planned' | 'ordered' | 'delivered' | 'installed'
      priority_level: 'low' | 'medium' | 'high'
      transaction_type: 'incoming' | 'outgoing'
    }
  }
}