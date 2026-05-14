import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import AuthLayout from '../../shared/components/AuthLayout'
import Input from '../../shared/components/Input'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

const schema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'Mínimo 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

type RegisterForm = z.infer<typeof schema>

function RegisterPage() {
  const { register: registerUser, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError(null)
      await registerUser(data.name, data.email, data.password)
      navigate('/login')
    } catch {
      setError('Error al crear la cuenta. Intenta de nuevo.')
    }
  }

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-text">
            Crear cuenta
          </h1>
          <p className="text-sm text-text-soft">
            Empieza hoy, es gratis
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Input
            label="Nombre completo"
            type="text"
            placeholder="Juan García"
            error={errors.name}
            {...register('name')}
          />
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            error={errors.email}
            {...register('email')}
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            error={errors.password}
            {...register('password')}
          />
          <Input
            label="Confirmar contraseña"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword}
            {...register('confirmPassword')}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer text-text hover:opacity-85"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-end))' }}
          >
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-text-soft">
          ¿Ya tienes cuenta?{' '}
          <Link
            to="/login"
            className="font-medium transition-colors text-primary hover:text-primary-end hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default RegisterPage