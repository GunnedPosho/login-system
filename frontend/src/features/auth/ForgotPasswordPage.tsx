import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import AuthLayout from '../../shared/components/AuthLayout'
import Input from '../../shared/components/Input'

const schema = z.object({
  email: z.string().email('Email inválido'),
})

type ForgotPasswordForm = z.infer<typeof schema>

function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: ForgotPasswordForm) => {
    console.log(data)
  }

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-text">
            Recuperar contraseña
          </h1>
          <p className="text-sm text-text-soft">
            Te enviaremos instrucciones a tu email
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

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer text-text hover:opacity-85"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-end))' }}
          >
            Enviar instrucciones
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-text-soft">
          <Link
            to="/login"
            className="font-medium transition-colors text-primary hover:text-primary-end hover:underline"
          >
            Volver al login
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default ForgotPasswordPage