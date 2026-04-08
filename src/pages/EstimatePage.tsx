export default function EstimatePage() {
  const items = [
    { id: 1, name: 'Фундаментные работы', unit: 'м³', quantity: 120, price: 4500, total: 540000 },
    { id: 2, name: 'Кирпичная кладка', unit: 'м²', quantity: 850, price: 3200, total: 2720000 },
    { id: 3, name: 'Электромонтаж', unit: 'точка', quantity: 56, price: 1800, total: 100800 },
    { id: 4, name: 'Сантехнические работы', unit: 'компл.', quantity: 12, price: 25000, total: 300000 },
    { id: 5, name: 'Отделочные работы', unit: 'м²', quantity: 1200, price: 1500, total: 1800000 },
  ]

  const total = items.reduce((sum, item) => sum + item.total, 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Смета</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            Экспорт (PDF)
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            + Добавить позицию
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-900">
                <tr>
                  <th className="text-left p-4">Наименование</th>
                  <th className="text-left p-4">Ед.</th>
                  <th className="text-left p-4">Кол-во</th>
                  <th className="text-left p-4">Цена</th>
                  <th className="text-left p-4">Сумма</th>
                  <th className="text-left p-4">Действия</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.unit}</td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4">{item.price.toLocaleString()} ₽</td>
                    <td className="p-4 font-semibold">{item.total.toLocaleString()} ₽</td>
                    <td className="p-4">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline mr-3">
                        Ред.
                      </button>
                      <button className="text-red-600 dark:text-red-400 hover:underline">
                        Удл.
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
            <h2 className="text-xl font-bold mb-4">Итоги</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Общая стоимость:</span>
                <span className="font-bold text-2xl">{total.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>НДС (20%):</span>
                <span className="font-semibold">{(total * 0.2).toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between border-t dark:border-gray-700 pt-4">
                <span>Итого к оплате:</span>
                <span className="font-bold text-2xl text-green-600 dark:text-green-400">
                  {(total * 1.2).toLocaleString()} ₽
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">
                Утвердить смету
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Распределение по категориям</h2>
            <div className="space-y-3">
              {[
                { label: 'Работы', percent: 45, color: 'bg-blue-500' },
                { label: 'Материалы', percent: 35, color: 'bg-green-500' },
                { label: 'Оборудование', percent: 15, color: 'bg-amber-500' },
                { label: 'Накладные', percent: 5, color: 'bg-purple-500' },
              ].map((cat) => (
                <div key={cat.label}>
                  <div className="flex justify-between mb-1">
                    <span>{cat.label}</span>
                    <span>{cat.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${cat.color} h-2 rounded-full`}
                      style={{ width: `${cat.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}