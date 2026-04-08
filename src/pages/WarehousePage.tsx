export default function WarehousePage() {
  const materials = [
    { id: 1, name: 'Цемент М500', unit: 'мешок', quantity: 120, minStock: 50, location: 'Секция А' },
    { id: 2, name: 'Песок строительный', unit: 'т', quantity: 25.5, minStock: 10, location: 'Секция Б' },
    { id: 3, name: 'Кирпич красный', unit: 'шт', quantity: 15000, minStock: 5000, location: 'Секция В' },
    { id: 4, name: 'Арматура 12мм', unit: 'шт', quantity: 800, minStock: 200, location: 'Секция Г' },
    { id: 5, name: 'Гипсокартон', unit: 'лист', quantity: 300, minStock: 100, location: 'Секция Д' },
    { id: 6, name: 'Краска белая', unit: 'банка', quantity: 45, minStock: 20, location: 'Секция А' },
  ]

  const lowStock = materials.filter(m => m.quantity < m.minStock * 1.2)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Склад материалов</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            Инвентаризация
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            + Приход
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
            + Расход
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-900">
                <tr>
                  <th className="text-left p-4">Материал</th>
                  <th className="text-left p-4">Ед.</th>
                  <th className="text-left p-4">Количество</th>
                  <th className="text-left p-4">Мин. запас</th>
                  <th className="text-left p-4">Место</th>
                  <th className="text-left p-4">Статус</th>
                  <th className="text-left p-4">Действия</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => {
                  const isLow = material.quantity < material.minStock
                  const isWarning = material.quantity < material.minStock * 1.2
                  return (
                    <tr key={material.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-4 font-medium">{material.name}</td>
                      <td className="p-4">{material.unit}</td>
                      <td className="p-4">
                        <span className={isLow ? 'font-bold text-red-600 dark:text-red-400' : ''}>
                          {material.quantity.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4">{material.minStock.toLocaleString()}</td>
                      <td className="p-4">{material.location}</td>
                      <td className="p-4">
                        {isLow ? (
                          <span className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full text-xs">
                            Низкий запас
                          </span>
                        ) : isWarning ? (
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full text-xs">
                            Внимание
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-xs">
                            Норма
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline mr-3">
                          Ред.
                        </button>
                        <button className="text-green-600 dark:text-green-400 hover:underline">
                          Заказать
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Критический запас</h2>
            {lowStock.length > 0 ? (
              <ul className="space-y-3">
                {lowStock.map((m) => (
                  <li key={m.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Осталось: {m.quantity} {m.unit}
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm">
                      Заказать
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                Нет материалов с критическим запасом
              </p>
            )}
            <div className="mt-6">
              <button className="w-full py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                📋 Сформировать заказ
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Быстрые операции</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                📦 Принять поставку
              </button>
              <button className="w-full text-left p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                🚚 Отгрузить на объект
              </button>
              <button className="w-full text-left p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                📊 Отчет по движению
              </button>
              <button className="w-full text-left p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                🏷️ Наклеить штрих-коды
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Общая стоимость</h2>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">2.8M ₽</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Оценочная стоимость запасов</p>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span>Строительные материалы</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between mb-1 mt-3">
                <span>Инструменты</span>
                <span>20%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <div className="flex justify-between mb-1 mt-3">
                <span>Крепеж</span>
                <span>15%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}