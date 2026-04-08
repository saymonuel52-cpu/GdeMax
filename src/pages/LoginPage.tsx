import { Building, User, HardHat, Briefcase } from 'lucide-react'
import { useAuthStore } from '@stores/useAuthStore'
import { UserRole } from '@types'
import { useNavigate } from 'react-router-dom'

const ROLES: { id: UserRole; name: string; description: string; icon: any }[] = [
  {
    id: 'admin',
    name: 'Администратор',
    description: 'Полный доступ ко всем объектам и настройкам',
    icon: Building,
  },
  {
    id: 'foreman',
    name: 'Прораб',
    description: 'Управление объектами, задачами, складом',
    icon: HardHat,
  },
  {
    id: 'master',
    name: 'Мастер',
    description: 'Выполнение задач, отчётность, приёмка',
    icon: User,
  },
  {
    id: 'client',
    name: 'Заказчик',
    description: 'Просмотр объектов, подписание актов',
    icon: Briefcase,
  },
]

export default function LoginPage() {
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = (role: UserRole) => {
    login(role)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gold-500 mb-2">ГдеМакс</h1>
          <p className="text-2xl text-gray-300">Строительный ежедневник</p>
          <p className="text-gray-400 mt-4">
            Модульная система управления строительными объектами, сметами, складом и задачами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROLES.map((role) => {
            const Icon = role.icon
            return (
              <button
                key={role.id}
                onClick={() => handleLogin(role.id)}
                className="card p-6 text-left hover:border-gold-500 hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-10 h-10 text-gold-500 group-hover:text-gold-400" />
                  <div className="text-xs bg-gray-700 px-2 py-1 rounded">Демо</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{role.name}</h3>
                <p className="text-gray-400 text-sm">{role.description}</p>
                <div className="mt-6 text-gold-500 font-medium">
                  Войти как {role.name.toLowerCase()} →
                </div>
              </button>
            )
          })}
        </div>

        <div className="card mt-10 p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Демо-режим</h3>
          <p className="text-gray-400">
            Для входа выберите роль. Пароль не требуется. Все данные хранятся локально в вашем браузере.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            После входа вы сможете создавать объекты, работать со сметой, складом, календарём и модулями.
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Это демо-версия приложения. В реальном проекте будет реализована полноценная аутентификация через Firebase
            Auth или JWT.
          </p>
          <p className="mt-2">
            Исходный код доступен на{' '}
            <a
              href="https://github.com/example/gdemaks"
              className="text-gold-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}