import { Link } from "react-router-dom"

export default function Header() {
	return (
		<div>
			<h1 className='text-center pt-8 pb-2 px-4 text-3xl font-bold'>
				<Link to='/'>Linktree</Link>
			</h1>
		</div>
	)
}
