export default function ObjectsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Объекты</h1>
      <div className="mb-6">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          + Создать объект
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Объект {i}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">ЖК "Солнечный"</p>
              </div>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-xs">
                Активен
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Бюджет:</span>
                <span className="font-semibold">12.5M ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Срок:</span>
                <span className="font-semibold">30.06.2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Прогресс:</span>
                <span className="font-semibold">65%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t dark:border-gray-700 flex justify-between">
              <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                Подробнее
              </button>
              <button className="text-gray-600 dark:text-gray-400 hover:underline text-sm">
                Редактировать
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}