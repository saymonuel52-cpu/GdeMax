import { useParams } from 'react-router-dom'

export default function ObjectDetailPage() {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Объект #{id}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Основная информация</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400">Название</label>
                <p className="font-semibold">ЖК "Солнечный"</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400">Адрес</label>
                <p className="font-semibold">ул. Строителей, 15</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400">Заказчик</label>
                <p className="font-semibold">ООО "СтройИнвест"</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400">Прораб</label>
                <p className="font-semibold">Иванов П.С.</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400">Бюджет</label>
                <p className="font-semibold">25 000 000 ₽</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400">Срок сдачи</label>
                <p className="font-semibold">30.06.2024</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Последние события</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Добавлен новый модуль "Электрика"</span>
                <span className="text-gray-500 text-sm ml-auto">2 часа назад</span>
              </li>
              <li className="flex items-center gap-3 p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Смета утверждена</span>
                <span className="text-gray-500 text-sm ml-auto">5 часов назад</span>
              </li>
              <li className="flex items-center gap-3 p-3 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Задача "Фундамент" просрочена</span>
                <span className="text-gray-500 text-sm ml-auto">вчера</span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Прогресс</h2>
            <div className="text-center">
              <div className="inline-block relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="65, 100"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="text-2xl font-bold">65%</span>
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Общий прогресс по объекту</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Быстрые действия</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                📋 Открыть смету
              </button>
              <button className="w-full text-left p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                📅 Календарь задач
              </button>
              <button className="w-full text-left p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                📦 Материалы склада
              </button>
              <button className="w-full text-left p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                🏗️ Добавить модуль
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}