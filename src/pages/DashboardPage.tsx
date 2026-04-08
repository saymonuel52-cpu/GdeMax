export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Дашборд</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Активные объекты</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">12</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">+2 за неделю</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Бюджет</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">4.2M ₽</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">использовано 68%</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Задачи сегодня</h3>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">7</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">3 завершены</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Последняя активность</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Добавлен новый объект "ЖК Солнечный"</span>
              <span className="text-gray-500 text-sm ml-auto">2 часа назад</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Смета утверждена для объекта "Склад №5"</span>
              <span className="text-gray-500 text-sm ml-auto">5 часов назад</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span>Задача "Укладка плитки" просрочена</span>
              <span className="text-gray-500 text-sm ml-auto">вчера</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}