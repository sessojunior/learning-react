import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Fez o login com sucesso!')

    navigate('/dashboard')
  }

  return (
    <>
      <h1>Página de login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" />
        </div>
        <div>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </>
  )
}
