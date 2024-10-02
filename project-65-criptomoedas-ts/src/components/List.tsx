import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

type CoinProps = {
	id: string
	name: string
	marketCapUsd: string
	priceUsd: string
	volumeUsd24Hr: string
	changePercent24Hr: string
	symbol: string
}

type DataProps = {
	data: CoinProps[]
	error?: string
}

export default function List() {
	const [coins, setCoins] = useState<CoinProps[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [offset, setOffset] = useState(0)
	const limit = 25

	async function getCoins() {
		try {
			const response = await fetch(`https://api.coincap.io/v2/assets?limit=${limit}&offset=${offset}`)
			const data: DataProps = await response.json()
			setCoins([...coins, ...data.data])
			console.log(data.data)
		} catch (err) {
			console.log(err)
			setError(true)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getCoins()
	}, [offset])

	const handleGetMore = () => {
		console.log("handleGetMore")
		setOffset((prev) => prev + limit)
	}

	return (
		<div className='w-full p-8'>
			<table className='w-full'>
				<thead>
					<tr>
						<th>Moeda</th>
						<th>Valor de mercado</th>
						<th>Preço</th>
						<th>Volume</th>
						<th>Mudança em 24h</th>
					</tr>
				</thead>
				<tbody>
					{coins.length > 0 &&
						coins.map((coin) => (
							<tr key={coin.id}>
								<td className='text-center'>
									<Link to={`/criptomoeda/${coin.id}`} className='text-blue-500'>
										<div>
											<img src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`} alt={coin.name} className='inline-block w-8 h-auto pr-1' />
											{coin.name} ({coin.symbol})
										</div>
									</Link>
								</td>
								<td className='text-center'>{Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(Number(coin.marketCapUsd))}</td>
								<td className='text-center'>{Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 8 }).format(Number(coin.priceUsd))}</td>
								<td className='text-center'>{Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(Number(coin.volumeUsd24Hr))}</td>
								<td className={`text-center ${Number(coin.changePercent24Hr) < 0 ? "text-red-500" : "text-green-500"}`}>{Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(Number(coin.changePercent24Hr))}</td>
							</tr>
						))}
				</tbody>
			</table>
			{error && <p className='text-center'>Erro ao carregar dados</p>}
			{loading && <p className='text-center'>Carregando criptomeoedas...</p>}
			<p className='text-center pt-4'>
				<button onClick={handleGetMore} className='bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all'>
					Carregar mais
				</button>
			</p>
		</div>
	)
}
