import { useState, useEffect } from 'react'
import axios from 'axios'

import { Post } from '../types/post'

export default function ExibirPostagens() {

  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(response.data.slice(0, 10))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

  }, [])

  return (
    <div>
      <h2>Exibir Postagens</h2>
      {isLoading && <p>Carregando...</p>}
      <p>Quantidade: {posts.length}</p>
      <p>Primeiras 10 postagens:</p>
      {posts.length > 0 && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id}>
              <h3>{index + 1}. {post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
