import axios from "axios"
import { useEffect, useState } from "react"

const Conversor = () => {

  const apiKey: string = import.meta.env.VITE_EXCHANGERATE_API_KEY
  const [value, setValue] = useState<number>(0)
  const [currencies, setCurrencies] = useState<{[key: string]: number}>({})
  const [currencyFrom, setCurrencyFrom] = useState<string>("BRL")
  const [currencyTo, setCurrencyTo] = useState<string>("USD")
  const [result, setResult] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function getCurrencies() {
      setLoading(true)
      try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyFrom}`)

        // console.log(response.data)

        setCurrencies(response.data.conversion_rates)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getCurrencies()
  }, [currencyFrom])

  const handleConverter = () => {
    
    // console.log("currencies", currencies)
    // console.log("currencyFrom", currencyFrom)
    // console.log("currencyTo", currencyTo)
    // console.log("currencies[currencyTo]", currencies[currencyTo] as number)

    if (currencies[currencyTo]) {
      setResult(value * currencies[currencyTo]);
    }
  }

  return (
    <div className="border border-gray-300 bg-gray-50 rounded p-4 w-96">
      <h1 className="text-2xl font-bold text-center py-4">Conversor de moedas</h1>
      <div>
        <div className="flex flex-col py-2">
          <label htmlFor="value" className="font-medium pb-2">Digite o valor:</label>
          <input type="number" name="value" value={value.toFixed(2)} onChange={e => setValue(Number(e.target.value))} placeholder="0.00" className="border border-gray-300 rounded p-2" />
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="currencyFrom" className="font-medium pb-2">Selecione a moeda:</label>
          <select name="currencyFrom" value={currencyFrom} onChange={e => setCurrencyFrom(e.target.value)} className="border border-gray-300 rounded p-2">
            <option value="USD">Dólar Americano</option>
            <option value="EUR">Euro</option>
            <option value="BRL">Real</option>
          </select>
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="currencyTo" className="font-medium pb-2">Converter para:</label>
          <select name="currencyTo" value={currencyTo} onChange={e => setCurrencyTo(e.target.value)} className="border border-gray-300 rounded p-2">
            <option value="USD">Dólar Americano</option>
            <option value="EUR">Euro</option>
            <option value="BRL">Real</option>
          </select>
        </div>
        <div className="flex flex-col py-2">
          {loading ? (
            <button className="bg-transparent text-gray-700 font-bold py-2 px-4 rounded" disabled>Carregando...</button>
          ) : (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleConverter}>Converter</button>
          )}
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="result" className="font-medium pb-2">Resultado:</label>
          <input type="text" name="result" value={`${result.toFixed(2)} ${currencyTo}`} placeholder="0.00 BRL" disabled className="border border-gray-300 rounded p-2" />
        </div>
      </div>
    </div>
  )
}

export default Conversor