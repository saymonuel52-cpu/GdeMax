import { ConstructionObject, ModuleDefinition, PriceItem, Task, WarehouseItem } from '../types'

export const mockObjects: ConstructionObject[] = [
  {
    id: 'obj-1',
    name: 'Квартира на Ленина, 15',
    address: 'г. Москва, ул. Ленина, д. 15, кв. 42',
    clientName: 'Иванов Иван',
    clientPhone: '+7 (999) 111-22-33',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    status: 'active',
    template: 'apartment',
    modules: ['demolition', 'electrical', 'plumbing', 'plaster'],
    assignedUsers: ['admin-1', 'foreman-1', 'master-1', 'client-1'],
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-03-10T14:30:00Z',
  },
  {
    id: 'obj-2',
    name: 'Коттедж "У озера"',
    address: 'Московская обл., д. Берёзки, участок 7',
    clientName: 'ООО "СтройИнвест"',
    clientPhone: '+7 (999) 222-33-44',
    startDate: '2024-04-01',
    endDate: '2024-10-31',
    status: 'planning',
    template: 'cottage',
    modules: ['demolition', 'electrical', 'plumbing', 'heating', 'facade'],
    assignedUsers: ['admin-1', 'foreman-1'],
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-03-01T09:00:00Z',
  },
  {
    id: 'obj-3',
    name: 'Офисный центр "Бизнес-Плаза"',
    address: 'г. Москва, пр. Мира, д. 100',
    clientName: 'ЗАО "Деловой мир"',
    clientPhone: '+7 (999) 333-44-55',
    startDate: '2024-05-01',
    endDate: '2024-12-31',
    status: 'planning',
    template: 'office',
    modules: ['demolition', 'electrical', 'plumbing', 'ventilation'],
    assignedUsers: ['admin-1'],
    createdAt: '2024-02-20T11:00:00Z',
    updatedAt: '2024-02-20T11:00:00Z',
  },
]

export const mockModules: ModuleDefinition[] = [
  {
    id: 'demolition',
    name: '🔨 Демонтаж',
    version: '1.0',
    description: 'Демонтаж старых конструкций, стен, перегородок',
    category: 'Черновые работы',
    icon: '🔨',
    priceItems: [
      { id: 'dem-1', name: 'Демонтаж перегородки', price: 800, unit: 'м²', type: 'work', category: 'Демонтаж' },
      { id: 'dem-2', name: 'Вывоз мусора', price: 300, unit: 'м³', type: 'work', category: 'Демонтаж' },
    ],
    tasks: [
      { title: 'Демонтаж стен', duration: 2, dependsOn: [] },
      { title: 'Вывоз мусора', duration: 1, dependsOn: ['Демонтаж стен'] },
    ],
    checklist: ['Проверка отсутствия коммуникаций', 'Фото до/после'],
    installed: true,
    enabled: true,
  },
  {
    id: 'electrical',
    name: '⚡ Электромонтаж (черновой)',
    version: '1.0',
    description: 'Разводка электрики, установка коробок, прокладка кабелей',
    category: 'Черновые работы',
    icon: '⚡',
    priceItems: [
      { id: 'elec-1', name: 'Прокладка кабеля', price: 150, unit: 'м.п.', type: 'work', category: 'Электрика' },
      { id: 'elec-2', name: 'Кабель ВВГнг 3x2.5', price: 85, unit: 'м.п.', type: 'material', category: 'Электрика' },
    ],
    tasks: [
      { title: 'Разметка трасс', duration: 1, dependsOn: [] },
      { title: 'Штробление', duration: 2, dependsOn: ['Разметка трасс'] },
      { title: 'Прокладка кабеля', duration: 3, dependsOn: ['Штробление'] },
    ],
    checklist: ['Проверка изоляции', 'Замер сопротивления'],
    installed: true,
    enabled: true,
  },
  {
    id: 'heated_floors',
    name: '🌡️ Тёплые полы',
    version: '1.0',
    description: 'Монтаж электрического тёплого пола',
    category: 'Инженерные системы',
    icon: '🌡️',
    priceItems: [
      { id: 'hf-1', name: 'Укладка кабеля', price: 500, unit: 'м²', type: 'work', category: 'Тёплый пол' },
      { id: 'hf-2', name: 'Терморегулятор', price: 1500, unit: 'шт', type: 'material', category: 'Тёплый пол' },
    ],
    tasks: [
      { title: 'Укладка кабеля', duration: 1, dependsOn: [] },
      { title: 'Заливка стяжки', duration: 2, dependsOn: ['Укладка кабеля'] },
    ],
    checklist: ['Проверка сопротивления', 'Фото укладки'],
    componentCode: 'function HeatedFloorsTab() { return <div>Специфический интерфейс</div>; }',
    installed: false,
    enabled: false,
  },
]

export const mockPriceItems: PriceItem[] = [
  // Демонтаж
  { id: 'dem-1', name: 'Демонтаж перегородки', price: 800, unit: 'м²', type: 'work', category: 'Демонтаж' },
  { id: 'dem-2', name: 'Вывоз мусора', price: 300, unit: 'м³', type: 'work', category: 'Демонтаж' },
  // Электрика
  { id: 'elec-1', name: 'Прокладка кабеля', price: 150, unit: 'м.п.', type: 'work', category: 'Электрика' },
  { id: 'elec-2', name: 'Кабель ВВГнг 3x2.5', price: 85, unit: 'м.п.', type: 'material', category: 'Электрика', supplier: 'ЭлектроСнаб', sku: 'EL-001' },
  { id: 'elec-3', name: 'Розетка', price: 120, unit: 'шт', type: 'material', category: 'Электрика', supplier: 'ЭлектроСнаб', sku: 'EL-002' },
  // Сантехника
  { id: 'plumb-1', name: 'Прокладка труб ППР', price: 200, unit: 'м.п.', type: 'work', category: 'Сантехника' },
  { id: 'plumb-2', name: 'Труба ППР 20мм', price: 65, unit: 'м.п.', type: 'material', category: 'Сантехника', supplier: 'СантехМаркет', sku: 'ST-001' },
  // Штукатурка
  { id: 'plaster-1', name: 'Штукатурка стен', price: 450, unit: 'м²', type: 'work', category: 'Штукатурка' },
  { id: 'plaster-2', name: 'Гипсовая смесь', price: 320, unit: 'мешок', type: 'material', category: 'Штукатурка', supplier: 'СтройМаг', sku: 'SM-001' },
]

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    objectId: 'obj-1',
    title: 'Демонтаж перегородок',
    description: 'Демонтировать старые перегородки в комнатах',
    startDate: '2024-03-05',
    endDate: '2024-03-06',
    status: 'completed',
    assigneeId: 'master-1',
    priority: 'medium',
    dependsOn: [],
    checklist: [
      { id: 'chk-1', text: 'Отключить электрику', completed: true },
      { id: 'chk-2', text: 'Вынести мебель', completed: true },
    ],
    photos: [],
    comments: [],
  },
  {
    id: 'task-2',
    objectId: 'obj-1',
    title: 'Прокладка электрики',
    description: 'Развести кабели по стенам',
    startDate: '2024-03-07',
    endDate: '2024-03-10',
    status: 'in_progress',
    assigneeId: 'master-1',
    priority: 'high',
    dependsOn: ['task-1'],
    checklist: [
      { id: 'chk-3', text: 'Разметить трассы', completed: true },
      { id: 'chk-4', text: 'Проштробить стены', completed: false },
    ],
    photos: [],
    comments: [],
  },
]

export const mockWarehouse: WarehouseItem[] = [
  { id: 'wh-1', name: 'Кабель ВВГнг 3x2.5', sku: 'EL-001', category: 'Электрика', unit: 'м.п.', quantity: 500, minQuantity: 100, supplier: 'ЭлектроСнаб', lastPurchasePrice: 85, location: 'central' },
  { id: 'wh-2', name: 'Труба ППР 20мм', sku: 'ST-001', category: 'Сантехника', unit: 'м.п.', quantity: 300, minQuantity: 50, supplier: 'СантехМаркет', lastPurchasePrice: 65, location: 'central' },
  { id: 'wh-3', name: 'Гипсовая смесь', sku: 'SM-001', category: 'Штукатурка', unit: 'мешок', quantity: 120, minQuantity: 20, supplier: 'СтройМаг', lastPurchasePrice: 320, location: 'central' },
  { id: 'wh-4', name: 'Розетка', sku: 'EL-002', category: 'Электрика', unit: 'шт', quantity: 200, minQuantity: 30, supplier: 'ЭлектроСнаб', lastPurchasePrice: 120, location: 'obj-1' },
]