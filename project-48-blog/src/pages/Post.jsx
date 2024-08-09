import { useEffect, useState } from "react"
import { useParams, NavLink } from "react-router-dom"

export default function Post() {

  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  return (
    <>
      {error && <p className="text-center p-8">{error.message}</p>}
      {loading ? (
        <p className="text-center p-8">Carregando...</p>
      ) : (
        <div className="w-full flex flex-col p-8">
          <h1 className="text-2xl font-bold pt-2 pb-4">{post.id} - {post.title}</h1>
          <div className="pb-6 border-gray-300">
            <p className="text-gray-500">{post.body}</p>
          </div>
        </div>
      )}
    </>
  )
}
