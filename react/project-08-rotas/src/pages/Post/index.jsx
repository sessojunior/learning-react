import { Link, useParams } from "react-router-dom"

export default function Post() {
  const { id } = useParams()

  return (
    <div>
      <h2>Post {id}</h2>
      <p>Conteúdo do post com o id {id}</p>
      <p><Link to="/blog">Voltar para o blog</Link></p>
    </div>
  )
}