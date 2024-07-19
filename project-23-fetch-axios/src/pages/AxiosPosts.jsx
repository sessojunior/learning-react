import { useState, useEffect } from "react"
import axios from "axios"

export default function AxiosPosts() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => { 
      setLoading(true)
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
        setPosts(response.data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (error) {
    return <p>{error.message}</p>
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  const PostList = () => {
    return (
      <>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.id} - {post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      <h1>Axios Posts</h1>
      <p><b>{posts.length}</b> posts de JSON Placeholder</p>
      {posts.length === 0 && <p>Não há posts a mostrar</p>}
      {posts.length > 0 && <PostList />}
    </>
  )
}
