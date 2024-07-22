import PropTypes from "prop-types"
import { useState } from "react"

export default function Toolbar({ category, changeCategory }) {
  const [query, setQuery] = useState("")

  function handleChangeCategory(category) {
    setQuery("")
    changeCategory(category)
  }

  const categories = [
    { name: "Todas as categorias", value: "all" },
    { name: "Viagens", value: "travel" },
    { name: "Pessoas", value: "people" },
    { name: "Edifícios", value: "buildings" },
    { name: "Animais", value: "animals" },
    { name: "Esportes", value: "sports" },
    { name: "Arquitetura", value: "architecture" }
  ]

  return (
    <>
      <div className="flex justify-center">
        <div>
          <input type="text" placeholder="Pesquisar fotos" className="w-60 px-4 py-2 border border-gray-300 rounded mr-2" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div>
          <button className="px-4 py-2 text-white bg-blue-500 rounded" onClick={() => changeCategory(query)}>Pesquisar</button>
        </div>
        <div>
          <select name="catogory" value={category} onChange={(e) => handleChangeCategory(e.target.value)} className="w-48 px-4 py-2 border border-gray-300 rounded ml-2">
            {categories.map((category, index) => (
              <option key={index} value={category.value}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

Toolbar.propTypes = {
  category: PropTypes.string,
  changeCategory: PropTypes.func
}
