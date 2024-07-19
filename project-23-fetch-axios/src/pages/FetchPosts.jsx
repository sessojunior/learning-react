import { useState, useEffect } from "react"

export default function FetchPosts() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => { 
      setLoading(true)
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const json = await response.json()
        setPosts(json)
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
      <h1>Fetch API Posts</h1>
      <p><b>{posts.length}</b> posts de JSON Placeholder</p>
      {posts.length === 0 && <p>Não há posts a mostrar</p>}
      {posts.length > 0 && <PostList />}
    </>
  )
}
