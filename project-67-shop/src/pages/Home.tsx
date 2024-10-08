import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { CartContext, ProductProps } from "../contexts/CartContext"

import { FaCartPlus } from "react-icons/fa6"

export default function Home() {
	const { addToCart } = useContext(CartContext)!
	const [products, setProducts] = useState<ProductProps[]>([])

	useEffect(() => {
		async function loadProducts() {
			try {
				const response = await fetch("http://localhost:5000/products")
				const json = await response.json()

				console.log(json)
				setProducts(json)
			} catch (error) {
				console.log(error)
			}
		}

		loadProducts()
	}, [])

	return (
		<div>
			<h2 className='text-xl font-bold text-center py-8'>Produtos em alta</h2>
			<ul className='grid grid-cols-5 gap-4 mb-16'>
				{products.map((product: ProductProps) => (
					<li key={product.id} className='border-gray-200 border rounded p-4'>
						<img src={product.img} alt={product.name} />
						<h3 className='font-bold py-2'>
							<Link to={`/produto/${product.id}`} className='hover:underline'>
								{product.name}
							</Link>
						</h3>
						<div className='flex items-center gap-4'>
							<span>R$ {product.price}</span>
							<button onClick={() => addToCart(product)} className='bg-slate-800 text-white text-sm rounded py-1 px-2 hover:bg-slate-900 transition-all flex items-center gap-2'>
								<FaCartPlus /> Comprar
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
