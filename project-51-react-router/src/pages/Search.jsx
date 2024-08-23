import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function Search() {
  const [searchParams] = useSearchParams()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    try {
      async function fetchProducts() {
        const response = await fetch(`http://localhost:5000/products?q=${searchParams.get('q')}`)
        const json = await response.json()
        setProducts(json)
      }
      fetchProducts()
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [searchParams])

  return (
    <>
      <h2>Procurar</h2>
      {error && <p>{error.message}</p>}
      {loading && <p>Carregando...</p>}
      {!error && !loading && <p>Procurando por: <b>{searchParams.get('q')}</b></p>}
      {products.length === 0 ? (
        <p>Não há produtos</p>
      ) : (
        <>
          <p>Lista de produtos encontrados com a busca:</p>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
