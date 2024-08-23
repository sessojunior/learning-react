import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Products() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      async function fetchProducts() {
        const response = await fetch("http://localhost:5000/products")
        const json = await response.json()
        setProducts(json)
      }
      fetchProducts()
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <>
      <h2>Página dos produtos</h2>
      {loading && <p>Carregando...</p>}
      {error && <p>{error.message}</p>}
      {products.length === 0 ? (
        <p>Não ha produtos</p>
      ) : (
        <>
          <p>Lista de produtos:</p>
          <ul>
            {products.map((product) => (
              <li key={product.id}><Link to={`/products/${product.id}`}>{product.name}</Link></li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
