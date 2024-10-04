import { Link } from "react-router-dom"

export default function NotFound() {
	return (
		<div className='p-8 text-center'>
			<p className='text-center text-9xl'>404</p>
			<p className='text-center text-2xl font-bold'>Página não encontrada</p>
			<p className='text-center pt-4'>
				<button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
					<Link to='/'>Ir para a página inicial</Link>
				</button>
			</p>
		</div>
	)
}
