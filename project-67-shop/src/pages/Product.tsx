import { useParams, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { CartContext, ProductProps } from "../contexts/CartContext"

export default function Product() {
	const { id } = useParams()
	const { addToCart } = useContext(CartContext)!
	const [product, setProduct] = useState<ProductProps | null>(null)
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value)
	}

	useEffect(() => {
		async function loadProduct() {
			try {
				const response = await fetch(`http://localhost:5000/products/${id}`)
				if (!response.ok) {
					setError(true) // Define erro se o status não for OK (200-299)
					return
				}
				const json = await response.json()
				setProduct(json)
				setLoading(false) // Carregamento concluído
			} catch (error) {
				setError(true) // Define erro em caso de falha na requisição
			}
		}

		loadProduct()
	}, [id])

	// Redireciona em caso de erro
	useEffect(() => {
		if (error) {
			navigate("/") // Redireciona para a página inicial em caso de erro
		}
	}, [error, navigate])

	if (loading) {
		return <p>Carregando...</p>
	}

	if (!product) {
		return <p>Produto não encontrado.</p>
	}

	return (
		<div>
			<p className='flex justify-center'>
				<img src={product.img} alt={product.name} width={300} />
			</p>
			<h2 className='text-xl font-bold'>{product.name}</h2>
			<p className='py-4'>{product.description}</p>
			<p className='text-lg font-bold py-4'>{formatCurrency(product.price)}</p>
			<p className='flex justify-center mb-8'>
				<button onClick={() => addToCart(product)} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
					Adicionar ao carrinho
				</button>
			</p>
		</div>
	)
}
