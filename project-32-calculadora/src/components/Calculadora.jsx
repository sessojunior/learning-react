import { useState } from "react";
import Botao from "./Botao";
import Visor from "./Visor";

export default function Calculadora() {

  const btnNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const btnOperators = [
    { symbol: "+", value: "+" },
    { symbol: "-", value: "-" },
    { symbol: "X", value: "*" },
    { symbol: "%", value: "/" },
  ]

  const [currentValue, setCurrentValue] = useState(0)
  const [pendingOperation, setPendingOperation] = useState(null)
  const [pendingValue, setPendingValue] = useState(null)
  const [completeOperation, setCompleteOperation] = useState("0")

  const handleClear = () => {
    setCurrentValue(0)
    setPendingOperation(null)
    setPendingValue(null)
    setCompleteOperation("0")
  }

  const handleNumber = (number) => {
    console.log("number", number)
    console.log("currentValue", currentValue)
    console.log("completeOperation", completeOperation)
    if (currentValue === 0) {
      setCurrentValue(number)
    } else {
      setCurrentValue(`${currentValue}${number}`)
    }
    setCompleteOperation((prev) => {
      console.log("prev", prev)
      console.log("number setCompleteOperation", number)
      return completeOperation !== "00" ? `${prev}${number}` : `${number}`
    })
  }

  const handleOperation = (operator) => {
    setPendingOperation(operator)
    setPendingValue(currentValue)
    setCurrentValue(0)
    setCompleteOperation((prev) => `${prev} ${operator} `)
  }

  const handleCalculate = () => {
    if (pendingOperation && pendingValue) {
      let result = 0
      switch (pendingOperation) {
        case '+':
          result = Number(pendingValue) + Number(currentValue)
          break
        case '-':
          result = Number(pendingValue) - Number(currentValue)
          break
        case '*':
          result = Number(pendingValue) * Number(currentValue)
          break
        case '/':
          if (currentValue === 0) {
            alert("Erro! Não é possível dividir por zero.")
            handleClear()
            return
          }
          result = Number(pendingValue) / Number(currentValue)
          break
      }

      setCurrentValue(result)
      setPendingOperation(null)
      setPendingValue(null)
      setCompleteOperation((prev) => `${prev} = ${result}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-80 border bg-white border-gray-200 rounded p-4">
      <div className="w-full pb-4">
        <Visor size="small" label={completeOperation} />
        <Visor size="big" label={currentValue} />
      </div>
      <div className="grid grid-cols-4 w-full gap-2">
        <Botao onClick={handleClear}>AC</Botao>
        {btnNumbers.map((number, index) => (
          <Botao key={index} type="number" onClick={() => handleNumber(number)}>{number}</Botao>
        ))}
        {btnOperators.map(({ symbol, value }, index) => (
          <Botao key={index} type="operation" onClick={() => handleOperation(value)}>{symbol}</Botao>
        ))}
        <Botao onClick={() => handleCalculate()}>=</Botao>
      </div>
    </div>
  )
}
