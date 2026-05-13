import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

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
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: RegisterForm) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Nombre completo" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register('email')} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register('password')} type="password" placeholder="Contraseña" />
      {errors.password && <p>{errors.password.message}</p>}

      <input {...register('confirmPassword')} type="password" placeholder="Confirmar contraseña" />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <button type="submit">Crear cuenta</button>

      <Link to="/login">Ya tengo cuenta</Link>
    </form>
  )
}

export default RegisterPage