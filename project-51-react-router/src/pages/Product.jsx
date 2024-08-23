import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const navigate = useNavigate()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { 
    try {
      async function fetchProduct() {
        const response = await fetch(`http://localhost:5000/products/${id}`)
        if (response.status !== 200) {
          navigate('/not-found')
          return
        }
        const json = await response.json()
        setProduct(json)
      }
      fetchProduct()
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <>
      <h2>Página do produto</h2>
      {loading && <p>Carregando...</p>}
      {error && <p>{error.message}</p>}
      {!loading && !error && (
        <>
          <ul>
            <li>Id: {product.id}</li>
            <li>Nome: {product.name}</li>
            <li>Preço: R$ {product.price}</li>
          </ul>
        </>
      )}
      <p><Link to="/products">Voltar para a página de produtos</Link></p>
    </>
  )
}
