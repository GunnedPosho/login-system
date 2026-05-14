import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

function PublicRoute() {
  const { isAuthenticated } = useAuthStore()

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export default PublicRoute