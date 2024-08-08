import { useState } from "react"


export default function SearchBar({ data, setSearchData }) {

  const [inputSearch, setInputSearch] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()

    if (inputSearch.trim() === "") {
      setSearchData(data)
      return
    }

    setSearchData(data.filter((item) => item.nome.toLowerCase().includes(inputSearch.toLowerCase())))
  }

  return (
    <div className="w-full py-4">
      <input type="text" name="search" placeholder="Pesquisar na tabela..." className="w-full px-4 py-2 border border-slate-300 rounded mr-2" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} onKeyUp={handleSearch} />
    </div>
  )
}
