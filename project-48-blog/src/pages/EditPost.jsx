import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { toast } from "react-toastify"

export default function EditPost() {

  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const navigate = useNavigate()

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
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: 1,
          title: e.target.title.value,
          body: e.target.body.value
        })
      })
      const data = await response.json()
      console.log("Post alterado:", data)
      toast.success(`Post ${data.id} alterado com sucesso!`)
      navigate("/")
    } catch (error) {
      setError(error)
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <>
      {error && <p className="text-center p-8">{error.message}</p>}
      {loading ? (
        <p className="text-center p-8">Carregando...</p>
      ) : (
        <div className="w-full flex flex-col p-8">
          <h1 className="text-2xl font-bold pt-2 pb-8">Editar o post {post?.id}</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 pb-4">
              <label htmlFor="title" className="font-medium block">Título do Post</label>
              <input type="text" name="title" id="title" value={post?.title} onChange={(e) => setPost({ ...post, title: e.target.value })} placeholder="Título do Post" className="border border-gray-300 p-2 rounded" />
            </div>
            <div className="flex flex-col gap-2 pb-4">
              <label htmlFor="body" className="font-medium block">Conteúdo do Post</label>
              <textarea name="body" id="body" value={post?.body} onChange={(e) => setPost({ ...post, body: e.target.value })} cols="30" rows="10" className="border border-gray-300 p-2 rounded"></textarea>
            </div>
            <div>
              <button type="submit" className="inline font-medium hover:cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-700 px-4 py-2 mt-2">Salvar</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
