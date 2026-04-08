import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@stores/useAuthStore'
import LoadingSpinner from '@components/common/LoadingSpinner'

interface AuthGuardProps {
  children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, user } = useAuthStore()

  // В демо-режиме пропускаем проверку аутентификации
  // В реальном приложении здесь должна быть проверка токена и загрузка пользователя
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Если пользователь загружается (в будущем)
  if (!user) {
    return <LoadingSpinner />
  }

  return <>{children}</>
}