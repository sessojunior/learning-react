import { useParams } from "react-router-dom"

export default function Car() {
	const { id } = useParams()

	return (
		<div className='flex flex-col w-full justify-center max-w-screen-xl pt-8 px-8'>
			<div className='flex w-full'>
				<img src='https://s2-autoesporte.glbimg.com/Bdc6qDqP5tR2icfSf_5RyYTAwY4=/0x0:1529x939/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2023/0/r/4fT5TzTPmEtAhTA5nCyA/novo-nissan-versa-2024-7-.jpg' alt='carro' className='w-full object-cover rounded-t-md' />
			</div>
			<div className='bg-white rounded-b-md p-4'>
				<div className='flex justify-between items-top'>
					<h2 className='text-xl font-bold uppercase pb-2'>Nissan Versa {id}</h2>
					<h3 className='text-xl font-bold'>R$ 90.000</h3>
				</div>
				<p className='text-sm pb-4 uppercase'>1.6 16V Flex Exclusive Xtronic</p>
				<p className='pb-2 uppercase'>
					<b>Cidade: </b>Curitiba - PR
				</p>
				<p className='pb-2 uppercase'>
					<b>Km:</b> 20.352 km
				</p>
				<p className='pb-4 uppercase'>
					<b>Ano:</b> 2019/2020
				</p>
				<p className='uppercase'>
					<b>Descrição:</b>
				</p>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi laborum facilis perferendis voluptas modi ipsam ratione voluptatibus, sit distinctio autem iste itaque. Odio voluptatem, vel voluptates eligendi magni laborum ipsam.</p>
				<p className='pt-4 pb-6 uppercase'>
					<b>Telefone:</b> (41) 99999-9999
				</p>
				<button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full'>Conversar com o vendedor</button>
			</div>
		</div>
	)
}
