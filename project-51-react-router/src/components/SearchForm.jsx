import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchForm() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate("/search?q=" + search)
  }

  return (
    <>
      <p>Procurar produto:</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Procurar produto..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Procurar</button>
      </form>
    </>
  )
}
