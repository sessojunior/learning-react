import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Admin() {

  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const page = 1
  const limit = 15

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        setError(error)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleDelete = async (id) => {
    console.log("Deletando o post: ", id)
    // try {
    //   await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    //     method: "DELETE"
    //   })
    //   setPosts(posts.filter(post => post.id !== id))
    // } catch (error) {
    //   setError(error)
    //   console.log(error)
    // }
  }

  return (
    <div className="w-full flex flex-col p-8">
      <h1 className="text-2xl font-bold pt-2 pb-8">Últimos posts</h1>
      {error && <p className="text-center p-8">{error.message}</p>}
      {loading ? (
        <p className="text-center p-8">Carregando...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
          <div key={post.id} className="pb-6 border-gray-300">
            <h2 className="text-lg font-semibold">{post.id} - {post.title}</h2>
            <p className="text-gray-500">{post.body}</p>
            <p className="flex gap-2">
              <Link to={`/post/${post.id}`} className="inline-block font-medium hover:cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-700 px-4 py-2 mt-2">Ler post</Link>
              <Link to={`/post/${post.id}/edit`} className="inline-block font-medium hover:cursor-pointer bg-green-700 text-white rounded-md hover:bg-green-800 px-4 py-2 mt-2">Editar</Link>
              <button className="inline-block font-medium hover:cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 px-4 py-2 mt-2" onClick={() => handleDelete(post.id)}>Excluir</button>
            </p>
          </div>
        ))}
        </div>
      )}
    </div>
  )
}
