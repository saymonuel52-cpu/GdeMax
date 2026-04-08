import { useState } from 'react'
import { Building, Home, Briefcase, Plus, Check, X } from 'lucide-react'
import { useModuleStore } from '@stores/useModuleStore'
import { useObjectStore } from '@stores/useObjectStore'
import { useAuthStore } from '@stores/useAuthStore'
import toast from 'react-hot-toast'

const TEMPLATES = [
  { id: 'apartment', name: 'Квартира', icon: Home, description: 'Ремонт квартиры в многоквартирном доме' },
  { id: 'cottage', name: 'Коттедж', icon: Building, description: 'Строительство или ремонт частного дома' },
  { id: 'office', name: 'Офис', icon: Briefcase, description: 'Коммерческий ремонт офисных помещений' },
  { id: 'custom', name: 'Свободный выбор', icon: Plus, description: 'Настройка с нуля' },
]

const MODULE_CATEGORIES = [
  { id: 'rough', name: 'Черновые работы', modules: ['demolition', 'electrical', 'plumbing'] },
  { id: 'finish', name: 'Чистовые работы', modules: ['plaster', 'tiles', 'painting'] },
  { id: 'engineering', name: 'Инженерные системы', modules: ['heating', 'ventilation', 'conditioning'] },
  { id: 'other', name: 'Прочее', modules: ['facade', 'landscape', 'carpentry'] },
]

export default function ObjectConstructor() {
  const { user } = useAuthStore()
  const { modules } = useModuleStore()
  const { addObject } = useObjectStore()

  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [objectName, setObjectName] = useState('')
  const [address, setAddress] = useState('')
  const [clientName, setClientName] = useState('')

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    // Автоматически выбираем модули по шаблону
    let autoModules: string[] = []
    if (templateId === 'apartment') {
      autoModules = ['demolition', 'electrical', 'plumbing', 'plaster']
    } else if (templateId === 'cottage') {
      autoModules = ['demolition', 'electrical', 'plumbing', 'heating', 'facade']
    } else if (templateId === 'office') {
      autoModules = ['demolition', 'electrical', 'plumbing', 'ventilation']
    }
    setSelectedModules(autoModules)
    setStep(2)
  }

  const toggleModule = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const handleCreateObject = () => {
    if (!objectName.trim() || !address.trim() || !clientName.trim()) {
      toast.error('Заполните все обязательные поля')
      return
    }

    const newObject = {
      name: objectName,
      address,
      clientName,
      clientPhone: '',
      startDate: new Date().toISOString().split('T')[0],
      status: 'planning' as const,
      template: selectedTemplate as any,
      modules: selectedModules,
      assignedUsers: user ? [user.id] : [],
    }

    addObject(newObject)
    toast.success(`Объект "${objectName}" создан`)

    // Сброс формы
    setSelectedTemplate(null)
    setSelectedModules([])
    setObjectName('')
    setAddress('')
    setClientName('')
    setStep(1)
  }

  return (
    <div className="card space-y-6">
      <h2 className="text-2xl font-bold">Конструктор объектов</h2>

      {/* Шаги */}
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s
                  ? 'bg-gold-500 text-gray-900'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  step > s ? 'bg-gold-500' : 'bg-gray-700'
                }`}
              />
            )}
          </div>
        ))}
        <div className="text-sm text-gray-400 ml-4">
          {step === 1 && 'Выбор шаблона'}
          {step === 2 && 'Выбор модулей'}
          {step === 3 && 'Детали объекта'}
        </div>
      </div>

      {/* Шаг 1: Шаблоны */}
      {step === 1 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Выберите шаблон объекта</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEMPLATES.map((tpl) => {
              const Icon = tpl.icon
              return (
                <button
                  key={tpl.id}
                  onClick={() => handleTemplateSelect(tpl.id)}
                  className={`card text-left p-4 hover:border-gold-500 transition-colors ${
                    selectedTemplate === tpl.id ? 'border-gold-500' : ''
                  }`}
                >
                  <Icon className="w-8 h-8 mb-2 text-gold-500" />
                  <h4 className="font-bold">{tpl.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{tpl.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Шаг 2: Модули */}
      {step === 2 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Выберите модули для объекта</h3>
            <button
              onClick={() => setStep(1)}
              className="text-sm text-gray-400 hover:text-white"
            >
              ← Назад к шаблонам
            </button>
          </div>
          <div className="space-y-6">
            {MODULE_CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <h4 className="font-medium mb-2">{cat.name}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {modules
                    .filter((m) => cat.modules.includes(m.id))
                    .map((module) => (
                      <div
                        key={module.id}
                        className={`card p-3 cursor-pointer transition-colors ${
                          selectedModules.includes(module.id)
                            ? 'border-gold-500 bg-gold-500/10'
                            : ''
                        }`}
                        onClick={() => toggleModule(module.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{module.icon}</span>
                            <div>
                              <div className="font-medium">{module.name}</div>
                              <div className="text-xs text-gray-400">
                                {module.description}
                              </div>
                            </div>
                          </div>
                          {selectedModules.includes(module.id) ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 border border-gray-600 rounded" />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="btn btn-secondary"
            >
              Назад
            </button>
            <button
              onClick={() => setStep(3)}
              className="btn btn-primary"
              disabled={selectedModules.length === 0}
            >
              Далее: Детали объекта
            </button>
          </div>
        </div>
      )}

      {/* Шаг 3: Детали */}
      {step === 3 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Детали объекта</h3>
            <button
              onClick={() => setStep(2)}
              className="text-sm text-gray-400 hover:text-white"
            >
              ← Назад к модулям
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Название объекта *
              </label>
              <input
                type="text"
                className="input"
                value={objectName}
                onChange={(e) => setObjectName(e.target.value)}
                placeholder="Например: Квартира на Ленина, 15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Адрес *
              </label>
              <input
                type="text"
                className="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Полный адрес объекта"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Заказчик *
              </label>
              <input
                type="text"
                className="input"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="ФИО или название организации"
              />
            </div>
            <div className="card p-4">
              <h4 className="font-medium mb-2">Выбранные модули</h4>
              <div className="flex flex-wrap gap-2">
                {selectedModules.map((id) => {
                  const module = modules.find((m) => m.id === id)
                  return module ? (
                    <div
                      key={id}
                      className="bg-gray-700 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      <span>{module.icon}</span>
                      <span>{module.name}</span>
                      <button
                        onClick={() => toggleModule(id)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : null
                })}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="btn btn-secondary"
            >
              Назад
            </button>
            <button
              onClick={handleCreateObject}
              className="btn btn-primary"
            >
              Создать объект
            </button>
          </div>
        </div>
      )}
    </div>
  )
}