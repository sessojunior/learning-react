import { useState } from "react"

export default function Calc() {

  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [imc, setImc] = useState(0)
  const [classification, setClassification] = useState('')

  const handleCalculate = (event) => {
    event.preventDefault()

    const heighInMeters = height / 100
    const calculateImc = (weight / (heighInMeters * heighInMeters))
    setImc(calculateImc)

    if (calculateImc < 18.5) {
      setClassification('Abaixo do peso')
    } else if (calculateImc < 24.9) {
      setClassification('Peso normal')
    } else if (calculateImc < 29.9) {
      setClassification('Sobrepeso')
    } else if (calculateImc < 34.9) {
      setClassification('Obesidade grau I')
    } else if (calculateImc < 39.9) {
      setClassification('Obesidade grau II')
    } else {
      setClassification('Obesidade grau III')
    }
  }

  const handleReset = () => {
    setHeight(0)
    setWeight(0)
    setImc(0)
    setClassification('')
  }

  return (
    <div className="flex flex-col items-center justify-center w-[480px] bg-gray-50 border border-gray-300 rounded p-8 m-4">
      <div className={`w-full ${imc === 0 ? '' : 'hidden'}`}>
        <h1 className="text-2xl font-bold text-center pb-8">Calculadora de IMC</h1>
        <form onSubmit={handleCalculate}>
          <div>
            <label htmlFor="height" className="block pb-2">Altura</label>
            <input type="number" id="height" name="height" value={height > 0 ? height : ''} onChange={(event) => setHeight(event.target.value)} placeholder="Altura em centímetros" className="w-full px-4 py-2 border border-gray-300 rounded mb-4" />
          </div>
          <div>
            <label htmlFor="weight" className="block pb-2">Peso</label>
            <input type="number" id="weight" name="weight" value={weight > 0 ? weight : ''} onChange={(event) => setWeight(event.target.value)} placeholder="Peso em kg" className="w-full px-4 py-2 border border-gray-300 rounded mb-4" />
          </div>
          <div className="flex gap-2 justify-center pt-2">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Calcular</button>
            <button type="reset" className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleReset}>Limpar</button>
          </div>
        </form>
      </div>
      <div className={`w-full ${imc === 0 ? 'hidden' : ''}`}>
        <p className="text-2xl font-bold text-center pb-8">Seu IMC: {imc.toFixed(2)}</p>
        <p className="text-lg font-bold text-center pb-4">Seu peso é {weight} kg e altura {height} centímetros.</p>
        <p className="text-lg font-bold text-center pb-4">Sua classificação: {classification}</p>
        <p className="text-lg font-bold text-center pb-4">Confira as classificações abaixo:</p>
        <table className="w-full">
          <thead className="border-b-2 border-gray-600">
            <tr>
              <th className="text-left">IMC</th>
              <th className="text-left">Classificação</th>
              <th className="text-left">Obesidade</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-600">
              <td>Menor que 18,5</td>
              <td>Abaixo do peso</td>
              <td>-</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td>Entre 18,5 e 24,9</td>
              <td>Peso normal</td>
              <td>-</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td>Entre 25 e 29,9</td>
              <td>Sobrepeso</td>
              <td>-</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td>Entre 30 e 34,9</td>
              <td>Obesidade</td>
              <td>Grau I</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td>Entre 35 e 39,9</td>
              <td>Obesidade</td>
              <td>Grau II</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td>Maior que 40</td>
              <td>Obesidade</td>
              <td>Grau III</td>
            </tr>
          </tbody>
        </table>
        <p className="text-center pt-8"><button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={handleReset}>Voltar</button></p>
      </div>
    </div>
  )
}
