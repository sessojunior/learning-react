import { useParams } from "react-router-dom"
//import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api, { apiKey } from "../../services/api"
import NotFound from "../NotFound"
import Message from "../../components/Message"

export default function Filme() {
  const { id } = useParams()
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [msg, setMsg] = useState("")
  //const navigate = useNavigate()

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
        //navigate("/", { replace: true })
        setNotFound(true)
        setLoading(false)
        console.log(error.response.data)
      }
    }
    loadFilme()
    return () => {
      console.log("Componente foi desmontado")
    }
  }, [id])


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

  const handleAddToFavoritos = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || []
    console.log(filme)
    console.log(favoritos)
    const hasFavorito = favoritos.some(favorito => favorito.id === filme.id)
    if (hasFavorito) {
      setMsg(`Filme "${filme.title}" já havia sido adicionado aos favoritos anteriormente`)
    } else {
      localStorage.setItem("favoritos", JSON.stringify([...favoritos, filme]))
      setMsg(`Filme "${filme.title}" foi adicionado agora aos favoritos`)
    }
  }

  return (
    <div>
      {msg && <Message title={msg} />}
      {filme && <article>
        <h1>{filme.title}</h1>
        <div><img src={`https://media.themoviedb.org/t/p/w220_and_h330_face${filme.poster_path}`} alt={filme.title} /></div>
        <p>{filme.overview}</p>
        <p>Lançamento: {new Date(filme.release_date).toLocaleDateString("pt-BR")} - Nota: {filme.vote_average > 0 ? filme.vote_average.toFixed(1) + " / 10" : "Sem avaliação"}</p>
        <p><a href={`https://www.youtube.com/results?search_query=trailer+legendado+${filme.title.toLowerCase().replace(/ /g, "+")}`} target="_blank" rel="external">Trailer</a></p>
        <p><button onClick={handleAddToFavoritos}>Salvar em favoritos</button></p>
      </article>}
    </div>
  )
}