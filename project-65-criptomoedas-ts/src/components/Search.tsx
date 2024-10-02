import { useState } from "react"
import { useNavigate } from "react-router-dom"

type SearchProps = {}

export default function Search({}: SearchProps) {
	const [inputSearch, setInputSearch] = useState("")
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (inputSearch.trim().length === 0) {
			return
		}

		navigate(`/criptomoeda/${inputSearch.trim()}`)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className='flex justify-center'>
				<input type='text' value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} placeholder='Digite o nome da moeda...' className='px-4 py-2 border border-gray-300 rounded mr-2 min-w-60' />
				<button type='submit' className='bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all'>
					Pesquisar
				</button>
			</div>
		</form>
	)
}
