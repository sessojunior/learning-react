import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"

export default function PostEdit({ id, posts, setPosts, handleDelete, setShowPostEdit }) {
  const [form, setForm] = useState({
    title: "",
    body: "",
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        setForm(response.data)
      } catch (error) {
        setError(error)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const handleEdit = async (event) => {
    event.preventDefault()
    console.log("Alterando o post: ", id)
    console.log("form: ", form)

    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, form)
      if (response.status !== 200) {
        throw new Error("Não foi possível alterar o post")
      }
      const newPosts = posts.map((post) => (post.id === id ? response.data : post))
      setPosts(newPosts)
      console.log(response.data)
      console.log("Alterado com sucesso!")
    } catch (error) {
      setError(error)
    }
  }
  
  return (
    <>
      <h1>Editar post</h1>
      {error && <p>{error.message}</p>}
      {loading && <p>Carregando...</p>}
      {!error && !loading && (
        <form onSubmit={handleEdit}>
          <div>
            Id: {form.id}
          </div>
          <div>
            <label htmlFor="title">Título</label>
            <input type="text" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label htmlFor="body">Conteudo</label>
            <textarea name="body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}></textarea>
          </div>
          <div>
            <button type="submit">Alterar</button> 
            <button type="button" onClick={() => handleDelete({ id: form.id })}>Deletar</button>
            <button type="button" onClick={() => setShowPostEdit(false)}>Cancelar</button>
          </div>
        </form>
      )}
    </>
  )
}

PostEdit.propTypes = {
  id: PropTypes.number.isRequired,
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setShowPostEdit: PropTypes.func.isRequired
}
