export default function Search() {
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<div className='w-full'>
			<form onSubmit={handleSearch}>
				<div className='flex justify-center w-full py-8'>
					<div>
						<input type='text' name='search' placeholder='Digite o nome do carro...' className='px-4 py-2 w-80 border border-blue-300 mr-2 rounded' />
					</div>
					<div>
						<button className='bg-blue-600 text-white border border-blue-300 rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all select-none' type='submit'>
							Buscar
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
