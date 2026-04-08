export default function ChatPage() {
  const conversations = [
    { id: 1, name: 'Иванов П.С.', lastMessage: 'Где чертежи?', time: '10:30', unread: 2 },
    { id: 2, name: 'Петров А.В.', lastMessage: 'Материалы завезли', time: '09:15', unread: 0 },
    { id: 3, name: 'Сидоров М.К.', lastMessage: 'Смету проверил', time: 'Вчера', unread: 1 },
    { id: 4, name: 'Кузнецов Д.И.', lastMessage: 'Завтра встреча', time: 'Вчера', unread: 0 },
    { id: 5, name: 'Объект "Солнечный"', lastMessage: 'Новые фото', time: '28.03', unread: 0 },
  ]

  const messages = [
    { id: 1, sender: 'Иванов П.С.', text: 'Где чертежи фундамента?', time: '10:30', isOwn: false },
    { id: 2, sender: 'Вы', text: 'Отправил на почту', time: '10:32', isOwn: true },
    { id: 3, sender: 'Иванов П.С.', text: 'Не пришли, проверьте', time: '10:33', isOwn: false },
    { id: 4, sender: 'Вы', text: 'Пересылаю ещё раз', time: '10:35', isOwn: true },
    { id: 5, sender: 'Иванов П.С.', text: 'Получил, спасибо', time: '10:40', isOwn: false },
  ]

  return (
    <div className="h-[calc(100vh-12rem)]">
      <h1 className="text-2xl font-bold mb-6">Чат / Комментарии</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Список чатов */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full p-2 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
            />
          </div>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{conv.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{conv.lastMessage}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{conv.time}</p>
                  {conv.unread > 0 && (
                    <span className="inline-block mt-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="w-full py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              + Новый чат
            </button>
          </div>
        </div>

        {/* Окно переписки */}
        <div className="lg:col-span-3 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          {/* Заголовок чата */}
          <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="font-bold">ИП</span>
              </div>
              <div>
                <p className="font-bold">Иванов П.С.</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Прораб</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">📎</button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">📞</button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">⋮</button>
            </div>
          </div>

          {/* Сообщения */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md rounded-2xl p-4 ${msg.isOwn
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none'
                    }`}
                >
                  {!msg.isOwn && <p className="text-xs font-semibold mb-1">{msg.sender}</p>}
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-2 ${msg.isOwn ? 'text-blue-200' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Поле ввода */}
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">😊</button>
              <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">📎</button>
              <input
                type="text"
                placeholder="Введите сообщение..."
                className="flex-1 p-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              />
              <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Отправить
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Чат синхронизирован с Telegram. Используйте @ для упоминания.
            </div>
          </div>
        </div>
      </div>

      {/* Комментарии к объектам */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Комментарии к объектам</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-sm">СК</span>
              </div>
              <div>
                <p className="font-medium">Сидоров М.К.</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Объект "Склад №5"</p>
              </div>
              <span className="text-gray-500 text-sm ml-auto">2 часа назад</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Фундамент готов, можно приступать к кладке. Нужно завезти ещё 5 тонн песка.
            </p>
            <div className="mt-3 flex gap-2">
              <button className="text-blue-600 dark:text-blue-400 text-sm">Ответить</button>
              <button className="text-gray-500 dark:text-gray-400 text-sm">👍 3</button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-sm">ПА</span>
              </div>
              <div>
                <p className="font-medium">Петров А.В.</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Объект "ЖК Солнечный"</p>
              </div>
              <span className="text-gray-500 text-sm ml-auto">5 часов назад</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Электрики завершили работу на 3 этаже. Требуется проверка.
            </p>
            <div className="mt-3 flex gap-2">
              <button className="text-blue-600 dark:text-blue-400 text-sm">Ответить</button>
              <button className="text-gray-500 dark:text-gray-400 text-sm">👍 1</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}