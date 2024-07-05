import PropTypes from "prop-types"
import { useMemo } from "react" 

export default function CalculoFibonacci({ numero }) {
  const operacaoFibonacci = (num) => {
    // calcular o fibonacci do num
    if (num <= 1) {
      return num
    } else {
      return operacaoFibonacci(num - 1) + operacaoFibonacci(num - 2)
    }
  }

  const resultadoCalculoFibonacci = useMemo(() => {
    return operacaoFibonacci(numero)
  }, [numero])

  return (
    <div>
      <h4>Calculo Fibonacci</h4>
      <p>Resultado do cálculo Fibonacci do número {numero}: {resultadoCalculoFibonacci}</p>
    </div>
  )
}

CalculoFibonacci.propTypes = {
  numero: PropTypes.number
}
