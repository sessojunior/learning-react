import { useState } from "react"
import "./App.css"

export default function App() {
	const [inputAlcohol, setInputAlcohol] = useState<number>(0)
	const [inputGasoline, setInputGasoline] = useState<number>(0)
	const [recomendacao, setRecomendacao] = useState<string>("")
	const [priceAlcohol, setPrecoAlcool] = useState<number>(0)
	const [priceGasoline, setPrecoGasoline] = useState<number>(0)

	function recomendarCombustivel(precoAlcool: number, precoGasolina: number): string | false {
		const limite = 0.7
		if (precoAlcool === 0 || precoGasolina === 0) {
			return false
		}
		if (precoAlcool / precoGasolina <= limite) {
			return "Álcool"
		} else {
			return "Gasolina"
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setPrecoAlcool(inputAlcohol)
		setPrecoGasoline(inputGasoline)
		const compensaCombustivel = recomendarCombustivel(inputAlcohol, inputGasoline)
		if (!compensaCombustivel) {
			alert("Por favor, preencha todos os campos com valores válidos")
			setRecomendacao("")
			return
		}
		setRecomendacao(compensaCombustivel)
	}

	const handleReset = () => {
		setInputAlcohol(0)
		setInputGasoline(0)
		setRecomendacao("")
		setPrecoAlcool(0)
		setPrecoGasoline(0)
	}

	return (
		<div className="app">
			<div className="container">
				<div className="title">
					<img src="./src/assets/abastecer.png" alt="Abastecer" width={150} />
					<h1>Qual a melhor opção?</h1>
					<p>Abastecer com álcool (ou etanol) vai ser recomendado quando o preço for até 70% do valor da gasolina. Caso ultrapasse esses 70%, a recomendação é o abastecimento do veículo com gasolina.</p>
				</div>
				<form onSubmit={handleSubmit} className="form">
					<div className="row">
						<label htmlFor="alcohol">Álcool (preço por litro)</label>
						<input type="number" step=".01" id="alcohol" value={inputAlcohol} onChange={(e) => setInputAlcohol(Number(e.target.value))} placeholder="0.00" />
					</div>
					<div className="row">
						<label htmlFor="gasoline">Gasolina (preço por litro)</label>
						<input type="number" step=".01" id="gasoline" value={inputGasoline} onChange={(e) => setInputGasoline(Number(e.target.value))} placeholder="0.00" />
					</div>
					<div>
						<button type="submit">Calcular</button>
						<button type="button" onClick={handleReset}>
							Limpar
						</button>
					</div>
				</form>
				<div className={`${!recomendacao && "hidden"} result`}>
					<h3>Compensa usar {recomendacao}</h3>
					<p>
						Álcool: R$ {priceAlcohol.toFixed(2)} ({((priceAlcohol / priceGasoline) * 100).toFixed(2)}%)
					</p>{" "}
					<p>Gasolina: R$ {priceGasoline.toFixed(2)}</p>
				</div>
			</div>
		</div>
	)
}
