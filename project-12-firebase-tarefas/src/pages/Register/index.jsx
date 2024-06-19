import "./register.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../firebaseConnection"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", repeatpassword: "" })
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    if (form.email.trim() === "" || form.password.trim() === "" || form.repeatpassword.trim() === "") {
      alert("Preencha todos os campos")
      return
    }
    if (form.password !== form.repeatpassword) {
      alert("Senhas diferentes")
      return
    }
    if (form.password.length < 6) {
      alert("A senha deve conter pelo menos 6 caracteres")
      return
    }
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password)
      navigate("/admin", { replace: true })
    } catch (error) {
      console.log("Erro ao cadastrar:", error)
    }
  }

  return (
    <div className="home">
      <h1>Lista de tarefas</h1>
      <p>Esta é a página inicial.</p>

      <form onSubmit={handleRegister}>
        <div>
          <input type="email" name="email" placeholder="Digite seu e-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <input type="password" name="password" placeholder="Digite sua senha" value={form.password} autoComplete="off" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <div>
          <input type="password" name="repeatpassword" placeholder="Repita sua senha" value={form.repeatpassword} autoComplete="off" onChange={(e) => setForm({ ...form, repeatpassword: e.target.value })} />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
        <div className="label-center">
          <p>Já possui conta? <Link to="/">Faça login</Link></p>
        </div>
      </form>
    </div>
  )
}