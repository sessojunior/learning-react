import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <h2>Sobre nós</h2>
      <p>Esta é a página de sobre mais informações.</p>
      <p><Link to="/">Ir para a página inicial</Link></p>
    </>
  )
}
