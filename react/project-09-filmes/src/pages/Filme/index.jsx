import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api, { apiKey } from "../../services/api"
import NotFound from "../NotFound"

export default function Filme() {
  const { id } = useParams()
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => { 
    async function loadFilme() {
      try {
        const response = await api.get(`/movie/${id}`, {
          headers: {
            Authorization: "Bearer " + apiKey
          },
          params: {
            language: "pt-BR",
          }
        })
        console.log(response.data)
        setFilme(response.data)
        setLoading(false)
      } catch (error) {
        setNotFound(true)
        setLoading(false)
        console.log(error.response.data)
      }
    }
    loadFilme()
  }, [])


  if (loading) {
    return (
      <div>
        <h1>Carregando dados do filme...</h1>
      </div>
    )
  }

  if (notFound) {
    return <NotFound />
  }

  return (
    <div>
      {filme && <article>
        <h1>{filme.title}</h1>
        <div><img src={`https://media.themoviedb.org/t/p/w220_and_h330_face${filme.poster_path}`} alt={filme.title} /></div>
        <p>{filme.overview}</p>
        <p>Lançamento: {new Date(filme.release_date).toLocaleDateString("pt-BR")} - Nota: {filme.vote_average > 0 ? filme.vote_average.toFixed(1) : "Sem avaliação"}</p>
      </article>}
    </div>
  )
}