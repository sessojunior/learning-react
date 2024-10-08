import Footer from "./Footer"
import Header from "./Header"

type LayoutProps = {
	children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className='flex flex-col w-full min-h-screen'>
			<Header />
			<main className='flex justify-center bg-white text-black p-4 text-center'>
				<div className='flex justify-center items-center w-full max-w-screen-xl'>{children}</div>
			</main>
			<Footer />
		</div>
	)
}
