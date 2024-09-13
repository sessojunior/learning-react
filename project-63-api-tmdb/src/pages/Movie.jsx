import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Star, Clapperboard, ChartNoAxesCombined, Hourglass, ScrollText } from "lucide-react"

export default function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [movie_id, setMovieId] = useState(id)

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true)
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=pt-BR`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`
          }
        })
        // console.log("response", response)

        if (response.status === 404) {
          throw new Error("Filme não encontrado")
        }

        const json = await response.json()
        setMovie(json)

        // console.log("json", json)
      } catch (error) {
        console.log(error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [movie_id])

  return (
    <div className="flex items-center flex-col py-8 px-16 w-full min-h-screen bg-gray-950 text-white pb-16">
      <div className="flex flex-col gap-4 w-full max-w-[600px] py-8">
        {error ? (
          <p className="text-center p-8 text-lg font-medium">{error}</p>
        ) : (
          <>
            {loading ?
              (<p className="text-center p-8 text-lg font-medium">Carregando...</p>)
            : (
                <>
                  <img src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.backdrop_path}`} alt={movie.title} className="rounded-md" />
                  <h2 className="text-4xl pt-8 font-medium text-center">{movie.title}</h2>
                  <h3 className="flex items-center justify-center gap-2 text-xl"><Star className="text-yellow-500" /> {movie.vote_average.toFixed(2)}</h3>
                  <p className="text-2xl text-center">Um filme que você não pode perder.</p>
                  <div className="flex flex-col">
                    <h4 className="text-2xl font-medium pt-6 pb-2 flex items-center gap-2"><Clapperboard className="text-yellow-500 w-8 h-8" /> Orçamento:</h4>
                    <p className="text-lg">{movie.budget.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    <h4 className="text-2xl font-medium pt-6 pb-2 flex items-center gap-2"><ChartNoAxesCombined className="text-yellow-500 w-8 h-8" /> Receita:</h4>
                    <p className="text-lg">{movie.revenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    <h4 className="text-2xl font-medium pt-6 pb-2 flex items-center gap-2"><Hourglass className="text-yellow-500 w-8 h-8" /> Duração:</h4>
                    <p className="text-lg">{Math.floor(movie.runtime / 60)} horas e {movie.runtime % 60} minutos ({movie.runtime} minutos)</p>
                    <h4 className="text-2xl font-medium pt-6 pb-2 flex items-center gap-2"><ScrollText className="text-yellow-500 w-8 h-8" /> Descrição:</h4>
                    <p className="text-lg">{movie.overview}</p>
                  </div>
                </>
              )}
          </>
        )}
      </div>
    </div>
  )
}
