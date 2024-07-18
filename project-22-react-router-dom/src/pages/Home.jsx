import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Página inicial</h1>
      <Link to="/about">Ir para a página sobre</Link>
    </>
  )
}
