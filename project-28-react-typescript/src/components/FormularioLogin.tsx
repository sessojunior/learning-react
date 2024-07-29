import { useState } from "react"

export default function FormularioLogin() {

  const [usuario, setUsuario] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    alert(`Nome de usuário: ${usuario}, senha: ${senha}`)
  }

  return (
    <div>
      <h4>Formulário de Login</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usuario">Nome de usuário:</label>
          <input type="text" id="usuario" name="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
