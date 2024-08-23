import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <h2>Página não encontrada</h2>
      <p><Link to="/">Ir para a página inicial</Link></p>
    </>
  )
}
