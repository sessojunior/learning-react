import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <h2>Página inicial</h2>
      <p>Esta é a página inicial.</p>
      <p><Link to="/products">Ir para a página de produtos</Link></p>
    </>
  )
}
