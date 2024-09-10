import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthentication } from '../hooks/useAuthentication'

export default function Register() {
  const navigate = useNavigate()
  const { createUser } = useAuthentication()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais.')
      setLoading(false)
      return
    } 

    const user = {
      name,
      email,
      password
    }

    const res = await createUser(user)

    console.log("res", res)

    setLoading(false)

    if (res.error) {
      setError(res.error)
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full p-8">
      <h1 className="text-2xl font-bold p-4">Cadastrar usuário</h1>
      <p>Utilize esta página para se cadastrar para fazer login depois.</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center w-[480px] p-2 m-8 border border-gray-300">
          <div className="flex flex-col gap-1 p-4 w-full justify-center items-center mx-4">
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="name" className="text-sm font-bold pb-2">Nome</label>
              <input type="text" id="name" placeholder="Nome completo" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded p-2 mr-2 w-full" required />
            </div>
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="email" className="text-sm font-bold pb-2">Email</label>
              <input type="email" id="email" placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded p-2 mr-2 w-full" required />
            </div>
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="password" className="text-sm font-bold pb-2">Senha</label>
              <input type="password" id="password" placeholder="Senha" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded p-2 mr-2 w-full" required />
            </div>
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="confirmPassword" className="text-sm font-bold pb-2">Repita a senha</label>
              <input type="password" id="confirmPassword" placeholder="Repita a senha" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border border-gray-300 rounded p-2 mr-2 w-full" required />
            </div>
            {!loading ? (
              <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all min-w-32">Cadastrar</button>
            ) : (
              <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all min-w-32" disabled>Aguarde...</button>
            )}
            
            {error && <p className="p-2 m-2 text-red-500 border border-red-200 bg-red-50 rounded-md">{error}</p>}
            <p className="p-4 text-center text-sm"><Link to="/login" className="text-blue-600">Se você já tem cadastro, clique aqui para fazer login.</Link></p>
          </div>
        </div>
      </form>
    </div>
  )
}
