import { useState } from "react"
import Form from "./components/Form"
import Result from "./components/Result"

export default function App() {
  const [taxData, setTaxData] = useState(null)

  const calculateTax = (data) => {
    let tax = 0
    const income = parseFloat(data.income)

    if (income <= 10000) {
      tax = income * 0.05
    } else if (income <= 20000) {
      tax = income * 0.1
    } else {
      tax = income * 0.15
    }

    setTaxData({ name: data.name, age: data.age, income: data.income, tax: tax })
  }

  return (
    <div className="w-full p-8 flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-center pb-8">Calculadora de impostos</h1>
      <Form calculateTax={calculateTax} />
      {taxData && <Result taxData={taxData} />}
    </div>
  )
}
