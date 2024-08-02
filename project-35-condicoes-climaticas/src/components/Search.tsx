import { useEffect, useState } from "react"


const Search = ({ city, setCity }: { city: string, setCity: (city: string) => void }) => {
  const [inputCity, setInputCity] = useState(city)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCity(inputCity)
  }

  useEffect(() => {
    setInputCity(city)
  }, [city])

  return (
    <form onSubmit={handleSearch}>
      <div className="flex justify-center">
        <div>
          <input type="text" name="city" value={inputCity} onChange={(e) => setInputCity(e.target.value)} placeholder="Cidade do Brasil" className="px-4 py-2 border border-blue-300 mr-2 rounded" />
        </div>
        <div>
          <button className="bg-blue-600 text-white border border-blue-300 rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all select-none" type="submit">Buscar</button>
          </div>
      </div>
    </form>
  )
}

export default Search