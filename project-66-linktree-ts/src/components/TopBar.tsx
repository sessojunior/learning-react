import { Link } from "react-router-dom"
import { MdLogout } from "react-icons/md"

import { auth } from "../services/firebaseConnection"
import { signOut } from "firebase/auth"

export default function TopBar() {
	const handleLogout = async () => {
		await signOut(auth)
	}

	return (
		<div className='w-96 flex justify-between bg-black text-white p-4 border mb-4 rounded-md'>
			<ul className='flex gap-4'>
				<li>
					<Link to='/' className='text-white hover:text-blue-500 font-bold'>
						Home
					</Link>
				</li>
				<li>
					<Link to='/admin' className='text-white hover:text-blue-500 font-bold'>
						Links
					</Link>
				</li>
				<li>
					<Link to='/socialnetwork' className='text-white hover:text-blue-500 font-bold'>
						Redes sociais
					</Link>
				</li>
			</ul>
			<div>
				<button onClick={handleLogout} className='text-white hover:text-blue-500 font-bold' title='Sair'>
					<MdLogout size={24} />
				</button>
			</div>
		</div>
	)
}
