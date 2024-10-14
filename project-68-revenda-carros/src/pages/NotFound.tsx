import { Link } from "react-router-dom"

export default function NotFound() {
	return (
		<div>
			<div className='flex justify-center items-center h-screen'>
				<form>
					<div>
						<h1 className='text-2xl font-bold text-center pb-4'>Revenda de carros</h1>
						<h2 className='text-9xl font-bold text-center'>404</h2>
						<h2 className='text-3xl font-bold text-center pb-4'>Página não encontrada</h2>
					</div>
					<div className='text-center mt-4'>
						<p className='text-sm'>
							<Link to='/'>Voltar para a página inicial</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}
