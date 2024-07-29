import { useLocation, useNavigate } from "react-router-dom"

import { Alimento, nomesAlimentos, quantidadePessoas } from "../types"

type ResultadosChurrasco = {
  pessoas: number
  alimentosSelecionados: Alimento[]
}

export default function ResultadoChurrasco() {

  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state as ResultadosChurrasco

  console.log(state)

  const totalPorAlimento = state.alimentosSelecionados.reduce((total, alimento) => {
    total[alimento] = (quantidadePessoas[alimento] * state.pessoas) / 1000
    return total
  }, {} as Record<Alimento, number>)

  const reiniciar = () => {
    navigate('/')
  }

  return (
    <div>
      <h2>Resultado do churrasco:</h2>
      <p>Pessoas: {state.pessoas}</p>
      <p>Alimentos selecionados:</p>
      {state.alimentosSelecionados.map((alimento) => (
        <p key={alimento}>{nomesAlimentos[alimento]}: {totalPorAlimento[alimento]} total kg</p>
      ))}
      <p><button onClick={reiniciar}>Reiniciar</button></p>
    </div>
  )
}
