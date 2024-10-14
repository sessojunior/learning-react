import CarItem from "./CarItem"

export default function CarList() {
	const cars = [
		{
			id: 1,
			name: "Nissan Versa",
			year: 2020,
			km: 20.352,
			price: 10000,
		},
	]

	return (
		<div className='w-full px-8'>
			<div className='grid grid-cols-3 gap-4 w-full'>
				{cars.map((car) => (
					<CarItem key={car.id} {...car} />
				))}
			</div>
		</div>
	)
}
