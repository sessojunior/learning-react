import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer>
      <hr />
      <h3>Rodapé</h3>
      <p>Aqui dá para colocar links</p>
      <Link to="/">Home</Link>
    </footer>
  )
}
