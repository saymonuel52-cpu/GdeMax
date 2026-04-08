import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from '@components/layout/Layout'
import AuthGuard from '@components/auth/AuthGuard'
import LoadingSpinner from '@components/common/LoadingSpinner'
import { useAuthStore } from '@stores/useAuthStore'

// Lazy load pages
const LoginPage = lazy(() => import('@pages/LoginPage'))
const DashboardPage = lazy(() => import('@pages/DashboardPage'))
const ObjectsPage = lazy(() => import('@pages/ObjectsPage'))
const ObjectDetailPage = lazy(() => import('@pages/ObjectDetailPage'))
const EstimatePage = lazy(() => import('@pages/EstimatePage'))
const TasksPage = lazy(() => import('@pages/TasksPage'))
const WarehousePage = lazy(() => import('@pages/WarehousePage'))
const ActsPage = lazy(() => import('@pages/ActsPage'))
const ChatPage = lazy(() => import('@pages/ChatPage'))
const ModulesPage = lazy(() => import('@pages/ModulesPage'))
const SettingsPage = lazy(() => import('@pages/SettingsPage'))

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/" element={<AuthGuard><Layout /></AuthGuard>}>
            <Route index element={<DashboardPage />} />
            <Route path="objects" element={<ObjectsPage />} />
            <Route path="objects/:id" element={<ObjectDetailPage />} />
            <Route path="estimate" element={<EstimatePage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="warehouse" element={<WarehousePage />} />
            <Route path="acts" element={<ActsPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="modules" element={<ModulesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App