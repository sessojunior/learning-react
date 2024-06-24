import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 letras' }),
  email: z
    .string()
    .email({ message: 'E-mail inválido' }),
  username: z
    .string()
    .min(3, { message: 'O username deve ter pelo menos 3 letras' }),
  phone: z
    .string()
    .refine((value) => /^(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})$/.test(value), {
      message: 'Telefone inválido. Formato: (99) 99999-9999 ou (99) 9999-9999.',
    }),
  description: z
    .string()
    .min(3, { message: 'A descição deve ter pelo menos 3 letras' }),
})

export default function FormZod() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  function handleSave(data){
    console.log(data)
    // console.log(data.name)
  }
  
  return (
    <>
      <h2>React Hook Form e validação com Zod e resolvers</h2>
      <form className="form" onSubmit={handleSubmit(handleSave)}>
        <input
          type="text"
          placeholder="Digite seu nome..."
          className="input"
          {...register('name')}
        />
        {errors.name && <p className='error'>{errors.name.message}</p>}

        <input
          type="text"
          placeholder="Digite seu email..."
          className="input"
          {...register('email')}
        />
        {errors.email && <p className='error'>{errors.email.message}</p>}

        <input
          type="text"
          placeholder="Digite seu username..."
          className="input"
          {...register('username')}
        />
        {errors.username && <p className='error'>{errors.username.message}</p>}

        <input
          type="text"
          placeholder="Digite seu telefone..."
          className="input"
          {...register('phone')}
        />
        {errors.phone && <p className='error'>{errors.phone.message}</p>}

        <textarea
          type="text"
          placeholder="Digite sua descriçao..."
          className="input"
          {...register('description')}
        ></textarea>
        {errors.description && <p className='error'>{errors.description.message}</p>}


        <select  
          className="select"
          {...register('type')}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <button className="button" type="submit">Enviar</button>
      </form>
    </>
  )
}
