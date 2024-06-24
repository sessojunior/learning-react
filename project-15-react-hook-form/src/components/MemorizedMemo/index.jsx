import { useState, memo } from "react"

function MemoForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  return (
    <>
      <h2>Memo</h2>
      <label htmlFor="name">Nome</label>
      <input type="text" name="name" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label htmlFor="email">E-mail</label>
      <input type="text" name="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />

      <p>Nome: {name}</p>
      <p>E-mail: {email}</p>
      <p>Não é interessante usar o Memo em componentes que tenham useState, useEffect, por cuasa da reatividade. É interessante usá-lo em casos onde não é necessário ficar re-renderizando esse componente, como um Header, um Aside...</p>
    </>
  )
}

export const MemorizedMemo = memo(MemoForm)