import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
// import { useNavigate } from "react-router-dom"

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
	data: CoinProps
	error?: string
}

export default function Currency() {
	const { currency } = useParams()
	// const navigate = useNavigate()
	const [coin, setCoin] = useState<CoinProps | null>(null)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)

	async function getCoin() {
		if (currency?.trim().length === 0) return

		try {
			const response = await fetch(`https://api.coincap.io/v2/assets/${currency}`)
			const data: DataProps = await response.json()
			if (data.error) {
				console.log("data", data)
				throw new Error(data.error)
			}
			setCoin(data.data)
			console.log("data", data)
		} catch (err) {
			console.log(err)
			setError(true)
			// navigate("/", { replace: true })
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getCoin()
	}, [])

	return (
		<>
			{error ? (
				<p className='text-center text-red-500'>Ocorreu um erro! Moeda não encontrada!</p>
			) : (
				<>
					{loading ? (
						<p className='text-center'>Carregando...</p>
					) : (
						<>
							<h2 className='text-2xl font-bold text-center pb-8'>
								<img src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`} alt={coin?.name} className='inline-block w-12 h-auto pr-2' />
								{coin?.name} ({coin?.symbol})
							</h2>
							<div className='text-center'>
								<p>
									<b>Preço:</b> {Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 8 }).format(Number(coin?.priceUsd))}
								</p>
								<p>
									<b>Mercado:</b> {Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(Number(coin?.marketCapUsd))}
								</p>
								<p>
									<b>Volume:</b> {Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(Number(coin?.volumeUsd24Hr))}
								</p>
								<p>
									<b>Mudança em 24h:</b> {Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(Number(coin?.changePercent24Hr))}
								</p>
							</div>
						</>
					)}
				</>
			)}
			<p className='text-center pt-4'>
				<Link to='/' className='text-blue-500'>
					Ir para a página inicial
				</Link>
			</p>
		</>
	)
}
