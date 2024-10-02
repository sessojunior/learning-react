import Search from "../components/Search"
import List from "../components/List"

export default function Home() {
	return (
		<>
			<h2 className='text-2xl font-bold text-center pb-8'>Lista de criptomoedas</h2>
			<Search />
			<List />
		</>
	)
}
