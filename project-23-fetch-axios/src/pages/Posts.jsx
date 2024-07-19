import { useState, useEffect } from "react"
import axios from "axios"
import PostAdd from "../components/PostAdd"
import PostEdit from "../components/PostEdit"

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)	
  const [loading, setLoading] = useState(false)
  const [showPostEdit, setShowPostEdit] = useState(false)
  const [postToEdit, setPostToEdit] = useState(0)

  useEffect(() => {
    const fetchPosts = async () => { 
      setLoading(true)
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
        setPosts(response.data.slice(0, 10))
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

  const handleEdit = ({ id }) => {
    setShowPostEdit(true)
    const post = posts.find((post) => post.id === id)
    console.log("Editando o post: ", post.id)
    setPostToEdit(post.id)

    // console.log("Editando o post: ", id)
  }

  const handleDelete = async ({ id }) => {
    try {
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      if (response.status !== 200) {
        throw new Error("Não foi possível deletar o post")
      }
      const newPosts = posts.filter((post) => post.id !== id)
      setPosts(newPosts)
      setShowPostEdit(false)
      console.log("Deletado com sucesso!")
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      <h1>Posts</h1>
      <PostAdd posts={posts} setPosts={setPosts} />
      <hr />
      {error && <p>{error.message}</p>}
      <p><b>{posts.length}</b> posts de JSON Placeholder</p>
      {posts.length === 0 && <p>Não há posts a mostrar</p>}
      <hr />
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.id} - {post.title}</h3>
          <p>{post.body}</p>
          <p><button onClick={() => handleEdit({ id: post.id })}>Editar</button> <button onClick={() => handleDelete({ id: post.id })}>Deletar</button></p>
          <hr />
        </div>
      ))}
      {showPostEdit && <PostEdit id={postToEdit} posts={posts} setPosts={setPosts} handleDelete={handleDelete} setShowPostEdit={setShowPostEdit} />}
    </>
  )
}
