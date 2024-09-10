import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthentication } from '../hooks/useAuthentication'

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuthentication()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const user = {
      name,
      email,
      password
    }

    const res = await signIn(user)

    console.log(email, password, res)

    setLoading(false)

    if (res.error) {
      setError(res.error)
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full p-8">
      <h1 className="text-2xl font-bold p-4">Entrar</h1>
      <p>Faça login para acessar o sistema.</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center w-[480px] p-2 m-8 border border-gray-300">
          <div className="flex flex-col gap-1 p-4 w-full justify-center items-center mx-4">
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="email" className="text-sm font-bold pb-2">Email</label>
              <input type="email" id="email" placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded p-2 mr-2 w-full" required />
            </div>
            <div className="flex flex-col w-full pb-2">
              <label htmlFor="password" className="text-sm font-bold pb-2">Senha</label>
              <input type="password" id="password" placeholder="Senha" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded p-2 mr-2 w-full" required />
            </div>
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all min-w-32">Entrar</button>
            {error && <p className="p-2 m-2 text-red-500 border border-red-200 bg-red-50 rounded-md">{error}</p>}
            <p className="p-4 text-center text-sm"><Link to="/register" className="text-blue-600">Se você não está cadastrado, clique aqui para se cadastrar.</Link></p>
          </div>
        </div>
      </form>
    </div>
  )
}
