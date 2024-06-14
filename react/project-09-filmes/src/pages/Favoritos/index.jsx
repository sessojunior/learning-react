import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Message from "../../components/Message"

export default function Favoritos() {
  const [filmes, setFilmes] = useState([])
  const [msg, setMsg] = useState("")
  const [msg2, setMsg2] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilmes() {
      const favoritos = await localStorage.getItem('favoritos')
      setFilmes(JSON.parse(favoritos) || [])
      setLoading(false)
    }
    loadFilmes()
  }, [])

  useEffect(() => {
    filmes.length === 0 ? setMsg("Nenhum filme foi adicionado aos favoritos") : setMsg("")
  }, [filmes])

  const handleRemoveFromFavoritos = (id) => {
    const favorito = filmes.find((filme) => filme.id === id)
    const novosFavoritos = filmes.filter((filme) => filme.id !== id)
    localStorage.setItem('favoritos', JSON.stringify(novosFavoritos))
    setMsg2(`Filme "${favorito.title}" removido dos favoritos`)
    setFilmes(novosFavoritos)
  }

  if (loading) {
    return (
      <div>
        <h1>Carregando filmes favoritos...</h1>
      </div>
    )
  }

  return (
    <div>
      <h1>Favoritos</h1>
      <p>Esta é a página de Favoritos.</p>
      {msg && <Message title={msg} />}
      {msg2 && <Message title={msg2} />}
      {filmes && <div className="favoritos">
        {filmes.map((filme) => (
          <article key={filme.id}>
            <div><Link to={`/filmes/${filme.id}`}><img src={`https://media.themoviedb.org/t/p/w220_and_h330_face${filme.poster_path}`} alt={filme.title} /></Link></div>
            <h3><Link to={`/filmes/${filme.id}`}>{filme.title}</Link></h3>
            <p><button onClick={() => handleRemoveFromFavoritos(filme.id)}>Remover de favoritos</button></p>
          </article>
        ))}
      </div>}
    </div>
  )
}