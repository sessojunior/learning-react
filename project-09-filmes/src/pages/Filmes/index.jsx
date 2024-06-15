import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api, { apiKey } from "../../services/api"

export default function Filmes() {
  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => { 
    async function loadFilmes() {
      try { 
        const response = await api.get("/movie/now_playing", {
          headers: {
            Authorization: "Bearer " + apiKey
          },
          params: {
            language: "pt-BR",
            page: 1,
          }
        })
        console.log(response.data.results)
        setFilmes(response.data.results)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }
    loadFilmes()
  }, [])

  if (error) {
    return (
      <div>
        <h1>Erro</h1>
        <p>Algo deu errado ao obter os filmes</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <h1>Carregando dados dos filmes...</h1>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Filmes</h1>
      <p>Esta é a página de Filmes.</p>
      <h2>Mais assistidos</h2>
      <p>Filmes mais assistidos no momento</p>
        {filmes && <div className="filmes">
          {filmes.slice(0, 10).map(filme => (
            <article key={filme.id}>
              <div><Link to={`/filmes/${filme.id}`}><img src={`https://media.themoviedb.org/t/p/w220_and_h330_face${filme.poster_path}`} alt={filme.title} /></Link></div>
              <h3><Link to={`/filmes/${filme.id}`}>{filme.title}</Link></h3>
              <p>{filme.overview}</p>
            </article>
          ))}
        </div>}
    </div>
  )
}
