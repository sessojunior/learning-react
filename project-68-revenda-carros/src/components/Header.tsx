import { Link } from "react-router-dom"

import { IoMdLogIn } from "react-icons/io"

export default function Header() {
	return (
		<div className='flex justify-center bg-white border-b border-b-gray-300 h-16 w-full'>
			<div className='flex justify-between items-center w-full h-full max-w-screen-xl px-8'>
				<div>
					<h1 className='text-lg font-bold'>Revenda de carros</h1>
				</div>
				<div>
					<Link to='/login'>
						<button className='flex items-center gap-1 bg-blue-600 text-white border border-blue-300 rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all select-none'>
							<IoMdLogIn /> Login
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}
