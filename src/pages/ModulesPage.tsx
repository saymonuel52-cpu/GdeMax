import ModuleUploader from '@components/modules/ModuleUploader'

export default function ModulesPage() {
  const modules = [
    { id: 1, name: 'Электрика', version: '1.2', author: 'ТехЭнерго', status: 'активен', objects: 5 },
    { id: 2, name: 'Сантехника', version: '2.0', author: 'АкваСтрой', status: 'активен', objects: 3 },
    { id: 3, name: 'Вентиляция', version: '1.0', author: 'КлиматПро', status: 'черновик', objects: 1 },
    { id: 4, name: 'Отделка', version: '3.1', author: 'ИнтерьерГрупп', status: 'активен', objects: 8 },
    { id: 5, name: 'Фасад', version: '1.5', author: 'ФасадСтрой', status: 'неактивен', objects: 2 },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Модули</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden mb-6">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold">Установленные модули</h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                + Установить из магазина
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-900">
                <tr>
                  <th className="text-left p-4">Название</th>
                  <th className="text-left p-4">Версия</th>
                  <th className="text-left p-4">Автор</th>
                  <th className="text-left p-4">Статус</th>
                  <th className="text-left p-4">Объекты</th>
                  <th className="text-left p-4">Действия</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => (
                  <tr key={module.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-medium">{module.name}</td>
                    <td className="p-4">{module.version}</td>
                    <td className="p-4">{module.author}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        module.status === 'активен' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        module.status === 'черновик' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                      }`}>
                        {module.status}
                      </span>
                    </td>
                    <td className="p-4">{module.objects}</td>
                    <td className="p-4">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline mr-3">
                        Настроить
                      </button>
                      <button className="text-red-600 dark:text-red-400 hover:underline">
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Магазин модулей</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Геодезия', desc: 'Разметка и измерения', price: 'Бесплатно' },
                { name: 'Каркасные работы', desc: 'Расчёт материалов', price: '5 000 ₽' },
                { name: 'Кровля', desc: 'Расчёт углов и материалов', price: '3 000 ₽' },
                { name: 'Умный дом', desc: 'Интеграция с IoT', price: '12 000 ₽' },
                { name: 'Энергоаудит', desc: 'Расчёт энергоэффективности', price: '8 000 ₽' },
                { name: 'Ландшафт', desc: 'Планировка участка', price: 'Бесплатно' },
              ].map((item, idx) => (
                <div key={idx} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md">
                  <h3 className="font-bold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{item.price}</span>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                      Установить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Загрузить свой модуль</h2>
            <ModuleUploader />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Поддерживаются файлы .gmod (JSON). Модуль будет проверен на безопасность перед установкой.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Документация</h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                  📘 Как создать свой модуль
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                  🛠️ API для разработчиков
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                  🔒 Безопасность модулей
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                  📦 Публикация в магазине
                </a>
              </li>
            </ul>
            <button className="w-full mt-6 py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              Открыть документацию
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Статистика</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Активных модулей</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Используется на объектах</span>
                  <span className="font-bold">19</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Экономия времени</span>
                  <span className="font-bold">42 ч/мес</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}