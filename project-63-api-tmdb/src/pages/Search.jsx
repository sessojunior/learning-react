import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

export default function Search() {
  /*
  Reference API: https://developer.themoviedb.org/reference/intro/getting-started
  API v3
  */
  
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { search } = useParams()

  const navigate = useNavigate()

  async function loadMovies() {
    // Configurar o .env na raiz do projeto para usar a chave do TMDB: 
    // VITE_TMDB_BEARER_TOKEN = "chave-TMDB"
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&language=pt-BR&page=1`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`
      }
    })
    const json = await response.json()
    // console.log("json", json)
    const results = json.results

    // console.log("results", results)
    setMovies(results)
  }
  
  useEffect(() => {
    // console.log("search", search)
    setLoading(true)
    try {
      loadMovies()
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [search])

  return (
    <div className="flex flex-col py-8 px-16 w-full min-h-screen bg-gray-950 text-white pb-16">
      <h2 className="text-4xl font-bold pt-8 pb-12 text-center">Busca por {search}...</h2>
      {error ? (
        <p className="text-center p-8 text-lg font-medium">{error}</p>
      ) : (
        <>
          {loading ?
            <p className="text-center p-8 text-lg font-medium">Carregando...</p>
          : (
            <>
              {movies.length === 0 ? (
                <p className="text-center p-8 text-lg font-medium">Nenhum resultado encontrado</p>
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
