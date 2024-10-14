import CarList from "../components/CarList"
import Search from "../components/Search"

export default function Home() {
	return (
		<div className='flex flex-col w-full'>
			<Search />
			<h2 className='text-xl font-bold text-center pb-8'>Carros novos e usados em todo o Brasil</h2>
			<CarList />
		</div>
	)
}
