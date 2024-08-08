import { useState, useEffect } from "react"
import axios from "axios"

export default function InfiniteScroll() {
  
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [endPosts, setEndPosts] = useState(false)

  const pixelsToEndPage = 200 // Pixels antes de chegar ao fim da página para carregar novos posts

  async function fetchPosts() {
    try {
      setIsLoading(true)
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _page: page,
          _limit: 10,
        }
      })
      if (response.data.length === 0) {
        setEndPosts(true)
      } else {
        setPosts((prev) => [...prev, ...response.data])
      }
    } catch (error) {
      setError(error.message)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [page])

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - pixelsToEndPage &&
        !isLoading &&
        !endPosts
      ) {
        setPage((prev) => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading, endPosts])

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {posts.map((post, index) => (
            <div key={index} className="border border-gray-300 p-6 mb-4 rounded-md">
              <h2 className="text-lg font-bold pb-2">{post.id}. {post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
          {isLoading && <p className="text-center pt-4">Carregando posts...</p>}
          {endPosts && <p className="text-center pt-4">Não há mais posts para serem carregados.</p>}
        </>
      )}
    </div>
  )
}
