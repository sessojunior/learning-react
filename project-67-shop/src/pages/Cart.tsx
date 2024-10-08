import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function Cart() {
	const { cart, decreaseQuantity, addToCart, removeFromCart } = useContext(CartContext)!

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value)
	}

	return (
		<div className='p-4'>
			<h2 className='text-xl font-bold text-center py-8'>Carrinho</h2>
			{cart.length === 0 && <p className='text-center'>Nenhum item no carrinho.</p>}
			{cart.length > 0 && (
				<table className='min-w-full border-collapse border border-gray-200'>
					<thead>
						<tr className='bg-gray-100 text-left'>
							<th className='p-4'>Produto</th>
							<th className='p-4 text-center'>Quantidade</th>
							<th className='p-4'>Preço</th>
							<th className='p-4'>Total</th>
							<th className='p-4'>Ações</th>
						</tr>
					</thead>
					<tbody>
						{cart.map((item) => (
							<tr key={item.id} className='border border-gray-200 text-left'>
								<td className='p-4'>
									<div className='flex items-center'>
										<img src={item.data.img} alt={item.data.name} className='w-24 h-24 mr-2' />
										<Link to={`/produto/${item.id}`} className='text-blue-500 hover:text-blue-700'>
											{item.data.name}
										</Link>
									</div>
								</td>
								<td className=' p-4 text-center'>
									<div className='flex items-center justify-center'>
										<button onClick={() => decreaseQuantity(item.id)} className='text-red-500 hover:text-red-700 mr-2'>
											<FaMinusCircle />
										</button>
										{item.quantity}
										<button onClick={() => addToCart(item.data)} className='text-green-500 hover:text-green-700 ml-2'>
											<FaPlusCircle />
										</button>
									</div>
								</td>
								<td className='p-4'>{formatCurrency(item.data.price)}</td>
								<td className='p-4'>{formatCurrency(item.data.price * item.quantity)}</td>
								<td className='p-4 text-center'>
									<button onClick={() => removeFromCart(item.id)} className='text-red-500 hover:text-red-700'>
										<FaTrash />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{cart.length > 0 && (
				<div className='text-right mt-4 px-4'>
					<h3 className='font-bold'>Total: {formatCurrency(cart.reduce((total, item) => total + item.data.price * item.quantity, 0))}</h3>
				</div>
			)}
		</div>
	)
}
