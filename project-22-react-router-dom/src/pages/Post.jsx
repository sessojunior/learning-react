import { useParams } from "react-router-dom"

export default function Blog() {
  const { id } = useParams()
  return (
    <>
      <h1>Página do post {id}</h1>
      <p>Texto do post com o id {id}</p>
    </>
  )
}
