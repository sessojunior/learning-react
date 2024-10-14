import { Link } from "react-router-dom"

export default function SignUp() {
	return (
		<div>
			<div className='flex justify-center items-center h-screen'>
				<form>
					<div>
						<h1 className='text-2xl font-bold text-center pb-4'>Revenda de carros</h1>
						<h2 className='text-xl font-bold text-center pb-4'>Cadastre-se</h2>
					</div>
					<div className='flex flex-col w-96 bg-white rounded p-4'>
						<div className='mb-2'>
							<input type='text' name='name' placeholder='Nome' className='border border-gray-300 rounded p-2 w-full' />
						</div>
						<div className='mb-2'>
							<input type='text' name='email' placeholder='E-mail' className='border border-gray-300 rounded p-2 w-full' />
						</div>
						<div className='mb-2'>
							<input type='password' name='password' placeholder='Senha' className='border border-gray-300 rounded p-2 w-full' />
						</div>
						<div>
							<button className='bg-blue-600 text-white border border-blue-300 rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all select-none w-full'>Acessar</button>
						</div>
					</div>
					<div className='text-center mt-4'>
						<p className='text-sm'>
							<Link to='/login'>Já possui uma conta? Faça login</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}
