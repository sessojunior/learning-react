import PropTypes from "prop-types"
import { useParams } from "react-router-dom"
import useHttp from "../hooks/useHttp"

export default function PostViewer() {
  const { id } = useParams()
  const { data: post, error, loading } = useHttp(`https://jsonplaceholder.typicode.com/posts/${id}`, "GET", null, [id])

  return (
    <div>
      <h3>Post: {id}</h3>
      {loading && <p>Carregando...</p>}
      {error && <p>{error.message}</p>}
      {post && (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </>
      )}
    </div>
  )
}

PostViewer.propTypes = {
  id: PropTypes.number,
}
