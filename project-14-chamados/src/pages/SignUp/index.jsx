import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import Logo from "../../assets/logo.png"

import { AuthContext } from "../../contexts/AuthContext"

export default function SignUp() {
  const [formAdd, setFormAdd] = useState({})
  const { signUp, loadingAuth } = useContext(AuthContext)

  async function handleSignUp(e) {
    e.preventDefault()

    await signUp(formAdd.name, formAdd.email, formAdd.password, formAdd.confirmPassword)
  }

  return (
    <div className="login">
      <div className="box">
        <div className="header">
          <img src={Logo} alt="Logo" className="logo" />
          <h1>Nova conta</h1>
          <p>Preencha os dados abaixo para criar uma nova conta.</p>
        </div>
        <div className="body">
          <form onSubmit={(e) => handleSignUp(e)}>
            <div>
              <input type="text" name="name" placeholder="Digite seu nome" onChange={(e) => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} required />
            </div>
            <div>
              <input type="email" name="email" placeholder="Digite seu e-mail" onChange={(e) => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} required />
            </div>
            <div>
              <input type="password" name="password" autoComplete="off" placeholder="Digite sua senha" onChange={(e) => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} required />
            </div>
            <div>
              <input type="password" name="confirmPassword" autoComplete="off" placeholder="Repita sua senha" onChange={(e) => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} required />
            </div>
            <div>
              {loadingAuth ? <button type="submit" disabled>Carregando...</button> : <button type="submit">Cadastrar</button>}
            </div>
          </form>
        </div>
      </div>
      <p><Link to="/">Já possui conta? Faça login</Link></p>
    </div>
  )
}