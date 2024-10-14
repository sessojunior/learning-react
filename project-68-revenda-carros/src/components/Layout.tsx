import Header from "./Header"

type HomeProps = {
	children: React.ReactNode
}

export default function Layout({ children }: HomeProps) {
	return (
		<div className='flex flex-col w-full min-h-screen bg-gray-100'>
			<Header />
			<div className='flex flex-col items-center w-full mb-8'>
				<div className='w-full max-w-screen-xl'>{children}</div>
			</div>
		</div>
	)
}
