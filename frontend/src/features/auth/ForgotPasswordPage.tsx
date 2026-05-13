import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Enviar instrucciones</button>

      <Link to="/login">Volver al login</Link>
    </form>
  )
}

export default ForgotPasswordPage