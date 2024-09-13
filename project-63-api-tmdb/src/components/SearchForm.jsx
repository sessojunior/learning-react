import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Search } from "lucide-react"

export default function SearchForm() {
  const [inputSearch, setInputSearch] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputSearch.trim().length === 0) {
      return
    }
    navigate(`/procurar/${inputSearch}`)
  }

  return (
    <div className="flex">
      <form>
        <div className="flex items-center">
          <input type="text" placeholder="Pesquisar" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} className="w-60 px-4 py-2 border border-gray-300 rounded mr-2 text-gray-600" />
          <button onClick={(e) => handleSubmit(e)} className="ml-4rounded py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md border border-blue-500"><Search /></button>
        </div>
      </form>
    </div>
  )
}
