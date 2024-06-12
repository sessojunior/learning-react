import { useState } from "react"

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "F",
  })
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const cadastrar = (event) => {
    event.preventDefault()
    if (form.name.length < 6) {
      setError(true)
      setErrorMessage("Nome inválido")
    } else if (form.email.length < 6) {
      setError(true)
      setErrorMessage("E-mail inválido")
    } else if (form.password.length < 6) {
      setError(true)
      setErrorMessage("Senha inválida")
    } else {
      setError(false)
      setErrorMessage("")
    }
    console.log(form.email, form.password, form.gender)
  }

  const changeForm = (e) => { 
    setForm({ ...form, [e.target.name]: e.target.value })
    console.log(form)
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={cadastrar}>
        {error && <p style={{ color: "red" }}>{errorMessage}</p>}
        Nome: <input type="text" name="name" value={form.name} placeholder="Digite seu nome" onChange={changeForm} required /><br />
        E-mail: <input type="email" name="email" value={form.email} placeholder="Digite seu e-mail" onChange={changeForm} required /><br />
        Senha: <input type="password" name="password" value={form.password} placeholder="Digite sua senha" onChange={changeForm} required /><br />
        Sexo: <select name="gender" value={form.gender} onChange={changeForm}>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select><br />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>Opções escolhidas:</p>
      <p>Nome: {form.name}<br />
        E-mail: {form.email}<br />
        Senha: {form.password}<br />
        Sexo: {form.gender == "M" ? "Masculino" : "Feminino"}</p>
    </>
  )
}
