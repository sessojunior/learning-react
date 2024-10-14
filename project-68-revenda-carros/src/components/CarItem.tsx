import { Link } from "react-router-dom"

type CarItemProps = {
	id: number
	name: string
	year: number
	km: number
	price: number
}

export default function CarItem({ id, name, year, km, price }: CarItemProps) {
	return (
		<div className='flex flex-col w-full rounded-md bg-white'>
			<div>
				<img src='https://s2-autoesporte.glbimg.com/Bdc6qDqP5tR2icfSf_5RyYTAwY4=/0x0:1529x939/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2023/0/r/4fT5TzTPmEtAhTA5nCyA/novo-nissan-versa-2024-7-.jpg' alt='carro' className='w-full h-full rounded-md' />
			</div>
			<div className='p-4'>
				<h3 className='font-bold uppercase'>
					<Link to={`/carro/${id}`}>{name}</Link>
				</h3>
				<div className='text-sm'>
					Ano {year} | {km.toLocaleString()} km
				</div>
				<div className='font-bold pt-2'>R$ {price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
			</div>
			<div className='border-t border-t-gray-200 py-2 px-4 text-sm'>Curitiba - PR</div>
		</div>
	)
}
