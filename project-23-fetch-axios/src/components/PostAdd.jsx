import { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"

export default function FormPost({ posts, setPosts }) {
  const [form, setForm] = useState({
    title: "",
    body: "",
  })
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const post = {
      userId: 1,
      title: form.title,
      body: form.body,
      id: null,
    }

    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", post)

      if (response.status !== 201) {
        throw new Error("Não foi possível cadastrar o post")
      }

      setPosts([response.data, ...posts])
    } catch (error) {
      setError(error)
    }

    console.log(posts)

    console.log("Cadastrado com sucesso!")
  }

  return (
    <>
      <h2>Adicionar post</h2>
      <form onSubmit={handleSubmit}>
        {error && <p>{error.message}</p>}
        <div>
          <label htmlFor="title">Título</label>
          <input type="text" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label htmlFor="body">Conteudo</label>
          <textarea name="body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}></textarea>
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </>
  )
}

FormPost.propTypes = {
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
}
