export default function ActsPage() {
  const acts = [
    { id: 1, number: 'АВР-2024-001', object: 'ЖК "Солнечный"', date: '2024-04-05', amount: 1250000, status: 'подписан' },
    { id: 2, number: 'АВР-2024-002', object: 'Склад №5', date: '2024-04-03', amount: 850000, status: 'ожидает подписи' },
    { id: 3, number: 'АВР-2024-003', object: 'Офисное здание', date: '2024-03-28', amount: 2100000, status: 'оплачен' },
    { id: 4, number: 'АВР-2024-004', object: 'Частный дом', date: '2024-03-25', amount: 540000, status: 'архив' },
    { id: 5, number: 'АВР-2024-005', object: 'Ремонт подъезда', date: '2024-03-20', amount: 320000, status: 'отклонен' },
  ]

  const statusColors: Record<string, string> = {
    'подписан': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'ожидает подписи': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'оплачен': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'архив': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'отклонен': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Акты выполненных работ</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            Экспорт (PDF)
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            + Новый акт
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-900">
                <tr>
                  <th className="text-left p-4">№ акта</th>
                  <th className="text-left p-4">Объект</th>
                  <th className="text-left p-4">Дата</th>
                  <th className="text-left p-4">Сумма</th>
                  <th className="text-left p-4">Статус</th>
                  <th className="text-left p-4">Действия</th>
                </tr>
              </thead>
              <tbody>
                {acts.map((act) => (
                  <tr key={act.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-medium">{act.number}</td>
                    <td className="p-4">{act.object}</td>
                    <td className="p-4">{act.date}</td>
                    <td className="p-4 font-semibold">{act.amount.toLocaleString()} ₽</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${statusColors[act.status]}`}>
                        {act.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline mr-3">
                        Просмотр
                      </button>
                      <button className="text-green-600 dark:text-green-400 hover:underline">
                        Подписать
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Статистика</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Всего актов:</span>
                <span className="text-2xl font-bold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Общая сумма:</span>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {acts.reduce((sum, act) => sum + act.amount, 0).toLocaleString()} ₽
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Ожидают подписи:</span>
                <span className="text-xl font-semibold">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Просрочены:</span>
                <span className="text-xl font-semibold">0</span>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                📊 Сформировать отчет
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Создать акт</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Объект</label>
                <select className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
                  <option>ЖК "Солнечный"</option>
                  <option>Склад №5</option>
                  <option>Офисное здание</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Период</label>
                <input
                  type="date"
                  className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                  defaultValue="2024-04-01"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Тип работ</label>
                <select className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
                  <option>Строительно-монтажные</option>
                  <option>Отделочные</option>
                  <option>Электромонтажные</option>
                  <option>Сантехнические</option>
                </select>
              </div>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                Сформировать акт
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Последние подписи</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="font-bold">ИП</span>
                </div>
                <div>
                  <p className="font-medium">Иванов П.С.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Акт АВР-2024-001</p>
                </div>
                <span className="text-gray-500 text-sm ml-auto">05.04.2024</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="font-bold">СК</span>
                </div>
                <div>
                  <p className="font-medium">Сидоров М.К.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Акт АВР-2024-003</p>
                </div>
                <span className="text-gray-500 text-sm ml-auto">28.03.2024</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}