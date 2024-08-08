import { useState } from 'react'

import Tabela from "./components/Tabela"

export default function App() {

  const [data, setData] = useState([
    { nome: "Rafael", idade: 22, cargo: "Programador" },
    { nome: "Amanda", idade: 22, cargo: "Diretora" },
    { nome: "Fernanda", idade: 34, cargo: "Designer" },
    { nome: "Lucas", idade: 42, cargo: "Analista" },
    { nome: "Julio", idade: 18, cargo: "Programador" },
    { nome: "Carla", idade: 26, cargo: "Designer" },
    { nome: "João", idade: 38, cargo: "Analista" },
    { nome: "Matias", idade: 30, cargo: "Designer" },
    { nome: "Pedro", idade: 48, cargo: "Analista" },
    { nome: "Cardoso", idade: 28, cargo: "Contador" },
    { nome: "Luana", idade: 30, cargo: "Designer" },
    { nome: "Rafaela", idade: 48, cargo: "Analista" },
    { nome: "Jonatas", idade: 28, cargo: "Programador" },
    { nome: "Luis", idade: 30, cargo: "Designer" },
    { nome: "Vinicius", idade: 48, cargo: "Motoboy" },
  ])
  const [searchData, setSearchData] = useState([...data])
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("nome")

  return (
    <div className="w-full p-8">
      <h1 className="text-2xl font-bold text-center my-6">Tabela ordenável</h1>
      <Tabela data={data} setData={setData} order={order} setOrder={setOrder} orderBy={orderBy} setOrderBy={setOrderBy} searchData={searchData} setSearchData={setSearchData} />
    </div>
  )
}
