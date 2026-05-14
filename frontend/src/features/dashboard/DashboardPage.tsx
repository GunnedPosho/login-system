import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

function DashboardPage() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Bienvenido, {user?.name}</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}

export default DashboardPage