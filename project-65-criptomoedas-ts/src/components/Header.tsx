import { Link } from "react-router-dom"

export default function Header() {
	return (
		<h1 className='text-center p-8 text-3xl font-bold'>
			<Link to='/' className='text-blue-500'>
				Cotação de Criptomoedas
			</Link>
		</h1>
	)
}
