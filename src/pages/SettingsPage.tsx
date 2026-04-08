import { useThemeStore } from '@stores/useThemeStore'

export default function SettingsPage() {
  const { currentTheme, darkMode, setTheme, toggleDarkMode } = useThemeStore()

  const themes = [
    { name: 'gold', label: 'Золотой', color: 'bg-amber-500' },
    { name: 'amethyst', label: 'Аметист', color: 'bg-purple-500' },
    { name: 'terracotta', label: 'Терракота', color: 'bg-orange-600' },
    { name: 'forest', label: 'Лесной', color: 'bg-green-600' },
    { name: 'ocean', label: 'Океан', color: 'bg-blue-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Настройки</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Внешний вид</h2>
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Цветовая тема</h3>
              <div className="flex flex-wrap gap-4">
                {themes.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setTheme(t.name)}
                    className={`flex flex-col items-center ${currentTheme.name === t.name ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                  >
                    <div className={`w-12 h-12 ${t.color} rounded-lg mb-2`}></div>
                    <span className="text-sm">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Тёмный режим</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Переключить между светлой и тёмной темой</p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Уведомления</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email-уведомления</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Отправлять на почту</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push-уведомления</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">В браузере</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Telegram-бот</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Интеграция с Telegram</p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS-оповещения</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Критические события</p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Интеграции</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="font-bold">1С</span>
                  </div>
                  <div>
                    <p className="font-bold">1С:Бухгалтерия</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Синхронизация счетов</p>
                  </div>
                </div>
                <button className="w-full py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  Настроить
                </button>
              </div>
              <div className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="font-bold">TG</span>
                  </div>
                  <div>
                    <p className="font-bold">Telegram</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Чат и уведомления</p>
                  </div>
                </div>
                <button className="w-full py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  Настроить
                </button>
              </div>
              <div className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                    <span className="font-bold">WA</span>
                  </div>
                  <div>
                    <p className="font-bold">WhatsApp Business</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Общение с заказчиками</p>
                  </div>
                </div>
                <button className="w-full py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  Настроить
                </button>
              </div>
              <div className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <span className="font-bold">G</span>
                  </div>
                  <div>
                    <p className="font-bold">Google Calendar</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Синхронизация задач</p>
                  </div>
                </div>
                <button className="w-full py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  Настроить
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Профиль</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">СВ</span>
              </div>
              <div>
                <p className="font-bold text-lg">Сергей Васильев</p>
                <p className="text-gray-500 dark:text-gray-400">Администратор</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Имя</label>
                <input
                  type="text"
                  defaultValue="Сергей Васильев"
                  className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="sergey@example.com"
                  className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Телефон</label>
                <input
                  type="tel"
                  defaultValue="+7 (999) 123-45-67"
                  className="w-full p-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                />
              </div>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                Сохранить изменения
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Безопасность</h2>
            <div className="space-y-4">
              <button className="w-full text-left p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                🔒 Сменить пароль
              </button>
              <button className="w-full text-left p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                📱 Двухфакторная аутентификация
              </button>
              <button className="w-full text-left p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                📋 История входов
              </button>
              <button className="w-full text-left p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                🚪 Выйти со всех устройств
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">О приложении</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Версия</span>
                <span className="font-semibold">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Сборка</span>
                <span className="font-semibold">2024.04.07</span>
              </div>
              <div className="flex justify-between">
                <span>Лицензия</span>
                <span className="font-semibold">Проприетарная</span>
              </div>
              <div className="flex justify-between">
                <span>Разработчик</span>
                <span className="font-semibold">ООО "ГдеМакс"</span>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                📄 Пользовательское соглашение
              </button>
              <button className="w-full py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mt-3">
                🐛 Сообщить об ошибке
              </button>
              <button className="w-full py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mt-3">
                🔄 Проверить обновления
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}