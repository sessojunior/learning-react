import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import Logo from "../../assets/logo.png"

import { AuthContext } from "../../contexts/AuthContext" 

export default function SignIn() {
  const [formLogin, setFormLogin] = useState({})
  const { signIn, loadingAuth } = useContext(AuthContext)

  async function handleSignIn(e) {
    e.preventDefault()

    await signIn(formLogin.email, formLogin.password)
  }

  return (
    <div className="login">
      <div className="box">
        <div className="header">
          <img src={Logo} alt="Logo" className="logo" />
          <h1>Login</h1>
          <p>Faça o login para entrar.</p>
        </div>
        <div className="body">
          <form onSubmit={(e) => handleSignIn(e)}>
            <div>
              <input type="email" name="email" placeholder="Digite seu e-mail" onChange={(e) => setFormLogin({ ...formLogin, [e.target.name]: e.target.value })} required />
            </div>
            <div>
              <input type="password" name="password" autoComplete="off" placeholder="Digite sua senha" onChange={(e) => setFormLogin({ ...formLogin, [e.target.name]: e.target.value })} required />
            </div>
            <div>
              {loadingAuth ? <button type="submit" disabled>Carregando...</button> : <button type="submit">Entrar</button>}
            </div>
          </form>
        </div>
      </div>
      <p><Link to="/signup">Não possui conta? Cadastre-se</Link></p>
    </div>
  )
}