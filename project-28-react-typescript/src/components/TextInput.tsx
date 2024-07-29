import { useState } from 'react'

export default function TextInput() {
  const [texto, setTexto] = useState<string>("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTexto(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(texto)
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Nome:</p>
      <input type="text" value={texto} onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  )
}

