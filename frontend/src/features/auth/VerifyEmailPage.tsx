import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import api from '../../lib/api'
import AuthLayout from '../../shared/components/AuthLayout'

function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      setStatus('error')
      return
    }

    api.get('/auth/verify-email', { params: { token } })
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6 text-center">
        {status === 'loading' && (
          <p className="text-text-soft">Verificando tu email...</p>
        )}
        {status === 'success' && (
          <>
            <h1 className="text-2xl font-bold text-text">¡Email verificado!</h1>
            <p className="text-sm text-text-soft">Tu cuenta está activa.</p>
            <Link
              to="/login"
              className="text-sm font-medium text-primary hover:text-primary-end hover:underline"
            >
              Iniciar sesión
            </Link>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="text-2xl font-bold text-text">Link inválido</h1>
            <p className="text-sm text-text-soft">El token no existe o ya expiró.</p>
            <Link
              to="/login"
              className="text-sm font-medium text-primary hover:text-primary-end hover:underline"
            >
              Volver al login
            </Link>
          </>
        )}
      </div>
    </AuthLayout>
  )
}

export default VerifyEmailPage