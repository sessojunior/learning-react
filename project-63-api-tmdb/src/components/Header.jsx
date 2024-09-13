import { Link, NavLink } from "react-router-dom"
import SearchForm from "./SearchForm"
import { Clapperboard as IconClapperboard } from "lucide-react"

export default function Header() {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white">
      <h1 className="flex items-center text-lg font-medium"><IconClapperboard className="mr-2" /><Link to="/">Filmes TMDB</Link></h1>
      <div className="flex items-center">
        <div className="flex items-center flex-nowrap gap-4 mr-8">
          <NavLink to="/" className={({ isActive }) => `hover:text-blue-500 ${isActive ? "text-blue-500" : ""}`}>Página inicial</NavLink>
          <NavLink to="/sobre" className={({ isActive }) => `hover:text-blue-500 ${isActive ? "text-blue-500" : ""}`}>Sobre nós</NavLink>
        </div>
        <SearchForm />
      </div>
    </div>
  )
}
