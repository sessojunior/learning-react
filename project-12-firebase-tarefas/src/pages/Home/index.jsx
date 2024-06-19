import "./home.css"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebaseConnection"

export default function Home() {
  const [form, setForm] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  
  async function handleLogin(e) {
    e.preventDefault()
    if (form.email.trim() === "" || form.password.trim() === "") {
      alert("Preencha todos os campos")
      return
    }
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password)
      navigate("/admin", { replace: true })
    } catch (error) {
      console.log("Erro ao fazer o login:", error)
      if (error.code === "auth/invalid-credential") {
        alert("Usuário ou e-mail inválido")
      }
    }
  }

  return (
    <div className="home">
      <h1>Lista de tarefas</h1>
      <p>Esta é a página inicial.</p>

      <form onSubmit={handleLogin}>
        <div>
          <input type="email" name="email" placeholder="Digite seu e-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <input type="password" name="password" placeholder="Digite sua senha" value={form.password} autoComplete="off" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <div>
          <button type="submit">Entrar</button>
        </div>
        <div className="label-center">
          <p>Não possui conta? <Link to="/register">Cadastre-se aqui</Link></p>
        </div>
      </form>
    </div>
  )
}