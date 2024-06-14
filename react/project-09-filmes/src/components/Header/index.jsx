import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header>
      <h3>Cabeçalho</h3>
      <p><Link to="/">Home</Link> - <Link to="/filmes">Filmes</Link> - <Link to="/favoritos">Favoritos</Link></p>
    </header>
  )
}