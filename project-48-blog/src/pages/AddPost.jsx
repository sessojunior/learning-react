import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function AddPost() {

  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
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
      console.log("Post criado:", data)
      toast.success(`Post ${data.id} criado com sucesso!`)
      navigate("/")
    } catch (error) {
      setError(error)
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <div className="w-full flex flex-col p-8">
      <h1 className="text-2xl font-bold pt-2 pb-8">Inserir novo post</h1>
      {error && <p className="text-center p-8">{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 pb-4">
          <label htmlFor="title" className="font-medium block">Título do Post</label>
          <input type="text" name="title" id="title" placeholder="Título do Post" className="border border-gray-300 p-2 rounded" />
        </div>
        <div className="flex flex-col gap-2 pb-4">
          <label htmlFor="body" className="font-medium block">Conteúdo do Post</label>
          <textarea name="body" id="body" cols="30" rows="10" className="border border-gray-300 p-2 rounded"></textarea>
        </div>
        <div>
          <button type="submit" className="inline font-medium hover:cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-700 px-4 py-2 mt-2">Cadastrar</button>
        </div>
      </form>
    </div>
  )
}
