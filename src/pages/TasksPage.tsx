export default function TasksPage() {
  const tasks = [
    { id: 1, title: 'Заливка фундамента', assignee: 'Иванов П.С.', dueDate: '2024-04-10', status: 'completed', priority: 'high' },
    { id: 2, title: 'Кирпичная кладка стен', assignee: 'Петров А.В.', dueDate: '2024-04-15', status: 'in-progress', priority: 'high' },
    { id: 3, title: 'Монтаж электропроводки', assignee: 'Сидоров М.К.', dueDate: '2024-04-12', status: 'pending', priority: 'medium' },
    { id: 4, title: 'Установка окон', assignee: 'Кузнецов Д.И.', dueDate: '2024-04-20', status: 'pending', priority: 'low' },
    { id: 5, title: 'Отделка фасада', assignee: 'Васильев С.П.', dueDate: '2024-04-25', status: 'not-started', priority: 'medium' },
    { id: 6, title: 'Укладка кровли', assignee: 'Николаев В.А.', dueDate: '2024-04-18', status: 'in-progress', priority: 'high' },
  ]

  const statusColors: Record<string, string> = {
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'pending': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    'not-started': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  }

  const priorityColors: Record<string, string> = {
    'high': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'low': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Календарь задач</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            Фильтры
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            + Новая задача
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-900">
                <tr>
                  <th className="text-left p-4">Задача</th>
                  <th className="text-left p-4">Исполнитель</th>
                  <th className="text-left p-4">Срок</th>
                  <th className="text-left p-4">Статус</th>
                  <th className="text-left p-4">Приоритет</th>
                  <th className="text-left p-4">Действия</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-medium">{task.title}</td>
                    <td className="p-4">{task.assignee}</td>
                    <td className="p-4">{task.dueDate}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${statusColors[task.status]}`}>
                        {task.status === 'completed' && 'Завершена'}
                        {task.status === 'in-progress' && 'В работе'}
                        {task.status === 'pending' && 'Ожидает'}
                        {task.status === 'not-started' && 'Не начата'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}>
                        {task.priority === 'high' && 'Высокий'}
                        {task.priority === 'medium' && 'Средний'}
                        {task.priority === 'low' && 'Низкий'}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline mr-3">
                        Ред.
                      </button>
                      <button className="text-green-600 dark:text-green-400 hover:underline">
                        Завершить
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
              <div>
                <div className="flex justify-between mb-1">
                  <span>Завершено</span>
                  <span>1 из 6</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '16%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>В работе</span>
                  <span>2 из 6</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Просрочено</span>
                  <span>0 из 6</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t dark:border-gray-700">
              <h3 className="font-bold mb-2">Ближайшие дедлайны</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Заливка фундамента</span>
                  <span className="font-semibold">10.04.2024</span>
                </li>
                <li className="flex justify-between">
                  <span>Монтаж электропроводки</span>
                  <span className="font-semibold">12.04.2024</span>
                </li>
                <li className="flex justify-between">
                  <span>Кирпичная кладка стен</span>
                  <span className="font-semibold">15.04.2024</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">График Ганта</h2>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">📅</div>
              <p>Интерактивный график будет отображаться здесь</p>
              <button className="mt-4 px-4 py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                Открыть полный график
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}