import { Outlet } from 'react-router-dom'
import { useAuthStore } from '@stores/useAuthStore'
import { useThemeStore } from '@stores/useThemeStore'

export default function Layout() {
  const { user } = useAuthStore()
  const { darkMode } = useThemeStore()

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar for desktop - временно скрыт */}
        <div className="hidden md:block w-64 bg-gray-100 dark:bg-gray-800 border-r dark:border-gray-700 p-4">
          <div className="text-lg font-bold text-gray-800 dark:text-white mb-6">ГдеМакс</div>
          <nav className="space-y-2">
            <a href="/" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Дашборд</a>
            <a href="/objects" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Объекты</a>
            <a href="/estimate" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Смета</a>
            <a href="/tasks" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Задачи</a>
            <a href="/warehouse" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Склад</a>
            <a href="/acts" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Акты</a>
            <a href="/chat" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Чат</a>
            <a href="/modules" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Модули</a>
            <a href="/settings" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Настройки</a>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Top bar */}
          <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-4 py-3 flex items-center justify-between">
            <div className="text-xl font-bold text-gray-800 dark:text-white">
              ГдеМакс
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user?.name} ({user?.role})
              </span>
              <button
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                onClick={() => useAuthStore.getState().logout()}
              >
                Выйти
              </button>
            </div>
          </header>

          {/* Page content */}
          <main className="p-4 md:p-6">
            <Outlet />
          </main>

          {/* Bottom navigation for mobile */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 p-2 flex justify-around">
            <a href="/" className="p-2 text-gray-600 dark:text-gray-300">🏠</a>
            <a href="/objects" className="p-2 text-gray-600 dark:text-gray-300">🏗️</a>
            <a href="/estimate" className="p-2 text-gray-600 dark:text-gray-300">💰</a>
            <a href="/tasks" className="p-2 text-gray-600 dark:text-gray-300">📅</a>
            <a href="/warehouse" className="p-2 text-gray-600 dark:text-gray-300">📦</a>
          </div>
        </div>
      </div>
    </div>
  )
}