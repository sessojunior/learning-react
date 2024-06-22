import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div>
      <h1>Página não encontrada</h1>
      <p><Link to="/">Ir para a página inicial</Link></p>
    </div>
  )
}