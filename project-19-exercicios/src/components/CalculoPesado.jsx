import { useMemo } from "react"
import { PropTypes } from "prop-types"

export default function CalculoPesado({numero}) {
  const operacaoPesada = (num) => {
    let total = 0
    for (let i = 0; i < 100000000; i++) {
      total += i
    }
    return total * num
  }

  const resultadoCalculoPesado = useMemo(() => {
    return operacaoPesada(numero)
  }, [numero])

  return (
    <div>
      <h4>Calculo Pesado</h4>
      <p>Resultado do cálculo pesado: {resultadoCalculoPesado}</p>
    </div>
  )
}

CalculoPesado.propTypes = {
  numero: PropTypes.number
}
