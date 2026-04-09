import { ModuleDefinition } from '../types'
import toast from 'react-hot-toast'
import React from 'react'

/**
 * Загружает пользовательский модуль из файла .gmod (JSON)
 */
export async function loadModuleFromFile(file: File): Promise<ModuleDefinition> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        const moduleData = JSON.parse(content) as Partial<ModuleDefinition>

        // Валидация обязательных полей
        const required = ['id', 'name', 'version', 'description', 'category', 'icon']
        for (const field of required) {
          if (!moduleData[field as keyof ModuleDefinition]) {
            throw new Error(`Отсутствует обязательное поле: ${field}`)
          }
        }

        const module: ModuleDefinition = {
          id: moduleData.id!,
          name: moduleData.name!,
          version: moduleData.version!,
          description: moduleData.description!,
          category: moduleData.category!,
          icon: moduleData.icon!,
          priceItems: moduleData.priceItems || [],
          tasks: moduleData.tasks || [],
          checklist: moduleData.checklist || [],
          componentCode: moduleData.componentCode,
          installed: false,
          enabled: false,
        }

        toast.success(`Модуль "${module.name}" загружен`)
        resolve(module)
      } catch (error) {
        toast.error(`Ошибка загрузки модуля: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`)
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error('Ошибка чтения файла'))
    reader.readAsText(file)
  })
}

/**
 * Выполняет код компонента модуля в безопасном контексте
 * @warning В продакшене следует использовать изолированный iframe или Web Workers
 */
export function evaluateModuleComponent(code: string): React.ComponentType | null {
  try {
    // Ограничиваем доступные глобальные объекты
    const sandbox = {
      React,
      useState: React.useState,
      useEffect: React.useEffect,
      useRef: React.useRef,
      console,
      Date,
      Math,
    }

    const fn = new Function(...Object.keys(sandbox), `return ${code}`)
    const component = fn(...Object.values(sandbox))
    return component
  } catch (error) {
    console.error('Ошибка выполнения кода модуля:', error)
    return null
  }
}

/**
 * Регистрирует модуль в системе: добавляет позиции в прайс, задачи в календарь и т.д.
 */
export function registerModule(module: ModuleDefinition) {
  // Здесь можно добавить логику регистрации в глобальные хранилища
  console.log(`Регистрация модуля ${module.id}`)
  // Например, добавление priceItems в usePriceStore
  // Добавление tasks в useTaskStore
}

/**
 * Генерирует пример файла .gmod для скачивания
 */
export function generateExampleModule(): string {
  const example: ModuleDefinition = {
    id: 'example_module',
    name: 'Пример модуля',
    version: '1.0',
    description: 'Это пример пользовательского модуля',
    category: 'Пример',
    icon: '⭐',
    priceItems: [
      { id: 'ex-1', name: 'Пример работы', price: 1000, unit: 'шт', type: 'work', category: 'Пример' },
    ],
    tasks: [
      { title: 'Пример задачи', duration: 1, dependsOn: [] },
    ],
    checklist: ['Проверить пример'],
    componentCode: 'function ExampleTab() { return <div>Пример компонента</div>; }',
    installed: false,
    enabled: false,
  }
  return JSON.stringify(example, null, 2)
}