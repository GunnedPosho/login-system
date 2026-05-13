import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import AuthLayout from '../../shared/components/AuthLayout'
import Input from '../../shared/components/Input'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type LoginForm = z.infer<typeof schema>

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: LoginForm) => {
    console.log(data)
  }

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-text">
            Iniciar sesión
          </h1>
          <p className="text-sm text-text-soft">
            Bienvenido de nuevo
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm transition-colors text-primary hover:text-primary-end hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer text-text hover:opacity-85"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-end))' }}
          >
            Iniciar sesión
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-text-soft">
          ¿No tienes cuenta?{' '}
          <Link
            to="/register"
            className="font-medium transition-colors text-primary hover:text-primary-end hover:underline"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default LoginPage