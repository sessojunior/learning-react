export default function TopBar() {
	return (
		<div className='flex justify-between p-4 bg-red-500 text-white rounded-md my-8'>
			<ul className='flex gap-4 pl-4'>
				<li>Dashboard</li>
				<li>Novo carro</li>
			</ul>
			<div className='flex gap-4 pr-4'>
				<button>Sair</button>
			</div>
		</div>
	)
}
