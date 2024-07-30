import { useForms } from "../hooks/useForms"
import { FormSchema } from "../schemas/formSchema"

export default function Form() {

  const { register, handleSubmit, errors } = useForms()

  const onSubmit = (data: FormSchema) => {
    console.log(data)
  }

  return (
    <div className="w-96 border border-gray-300 rounded pt-4 bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col px-4 pb-4">
          <label htmlFor="name" className="font-medium pb-2">Nome</label>
          <input type="text" id="name" {...register('name')} placeholder="Digite seu nome" className="border border-gray-300 rounded p-2" />
          {errors.name && <p className='pt-2 text-red-500 text-sm'>{errors.name.message}</p>}
        </div>
        <div className="flex flex-col px-4 pb-4">
          <label htmlFor="lastname" className="font-medium pb-2">Sobrenome</label>
          <input type="text" id="lastname" {...register('lastname')} placeholder="Digite seu sobrenome" className="border border-gray-300 rounded p-2" />
          {errors.lastname && <p className='pt-2 text-red-500 text-sm'>{errors.lastname.message}</p>}
        </div>
        <div className="flex flex-col px-4 pb-4">
          <label htmlFor="gender" className="font-medium pb-2">Gênero</label>
          <select id="gender" {...register('gender')} className="border border-gray-300 rounded p-2">
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
          {errors.gender && <p className='pt-2 text-red-500 text-sm'>{errors.gender.message}</p>}
        </div>
        <div className="flex flex-col px-4 pb-4">
          <label htmlFor="email" className="font-medium pb-2">E-mail</label>
          <input type="email" id="email" {...register('email')} placeholder="Digite seu e-mail" className="border border-gray-300 rounded p-2" />
          {errors.email && <p className='pt-2 text-red-500 text-sm'>{errors.email.message}</p>}
        </div>
        <div className="flex flex-col px-4 pb-4">
          <label htmlFor="password" className="font-medium pb-2">Senha</label>
          <input type="password" id="password" {...register('password')} placeholder="Digite sua senha" className="border border-gray-300 rounded p-2" />
          {errors.password && <p className='pt-2 text-red-500 text-sm'>{errors.password.message}</p>}
        </div>
        <div className="flex flex-col px-4 pb-4">
          <label htmlFor="repeat-password" className="font-medium pb-2">Confirme a senha</label>
          <input type="password" id="repeat-password" {...register('repeatPassword')} placeholder="Confirme sua senha" className="border border-gray-300 rounded p-2" />
          {errors.repeatPassword && <p className='pt-2 text-red-500 text-sm'>{errors.repeatPassword.message}</p>}
        </div>
        <div className="flex flex-col px-4 pb-4">
          <div className="flex items-center">
            <input type="checkbox" id="terms" {...register('terms')} className="mr-2" />
            <label htmlFor="terms" className="font-medium w-full">Eu li e aceito os <a href="#" className="text-blue-500">termos de uso</a></label>
          </div>
          {errors.terms && <p className='pt-2 text-red-500 text-sm'>{errors.terms.message}</p>}
        </div>
        <div className="flex flex-col px-4 pb-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 transition-all text-white font-medium py-2 px-4 rounded">Cadastrar</button>
        </div>
      </form>
    </div>
  )
}
