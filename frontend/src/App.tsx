import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'
import ForgotPasswordPage from './features/auth/ForgotPasswordPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  )
}

export default App