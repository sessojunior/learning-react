import { Link } from "react-router-dom"
import { Star } from "lucide-react"

export default function MovieCard({ movie }) {
  return (
    <div className="border-gray-950 border-[16px] border-spacing-8 rounded-md text-white hover:border-gray-900">
      <Link to={`/filme/${movie.id}`}>
        <div className="flex flex-col-reverse w-full">
          <h3 className="text-2xl p-4 font-medium hover:text-blue-800">{movie.title}</h3>
          <img src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="flex">
          <div className="text-md pb-4 px-4 w-full">
            <div className="flex items-center gap-2 text-xl"><Star className="text-yellow-500" /> {movie.vote_average.toFixed(2)}</div>
            <div className="pt-4">
              <button className="bg-blue-600 text-white font-medium text-lg rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all select-none w-full">Ver detalhes</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
