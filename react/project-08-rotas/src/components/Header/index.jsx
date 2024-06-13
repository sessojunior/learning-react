import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header>
      <h3>Cabeçalho</h3>
      <p>Aqui dá para colocar links</p>
      <Link to="/">Home</Link> - <Link to="/sobre">Sobre</Link> - <Link to="/contato">Contato</Link> - <Link to="/blog">Blog</Link>
      <hr />
    </header>
  )
}