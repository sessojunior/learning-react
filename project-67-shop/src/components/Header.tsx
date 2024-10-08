import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"
import { FaCartShopping } from "react-icons/fa6"
import { Link } from "react-router-dom"

export default function Header() {
	const { cart } = useContext(CartContext)!

	// Função para calcular a quantidade total de produtos no carrinho
	const getTotalItems = () => {
		return cart.reduce((total, item) => total + item.quantity, 0)
	}

	return (
		<header className='flex justify-center bg-gray-200 text-black p-4 text-center'>
			<div className='flex justify-between items-center w-full max-w-screen-xl'>
				<div>
					<h1 className='text-xl font-bold'>
						<Link to='/'>Shop</Link>
					</h1>
				</div>
				<div className='text-xl'>
					<button className='flex relative'>
						<Link to='/carrinho'>
							<FaCartShopping />
							<span className='absolute -top-2 -right-3 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex justify-center items-center'>{getTotalItems()}</span>
						</Link>
					</button>
				</div>
			</div>
		</header>
	)
}
