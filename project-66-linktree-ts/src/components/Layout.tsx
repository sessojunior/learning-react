import Footer from "./Footer"
import Header from "./Header"

type LayoutProps = {
	children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className='flex flex-col w-full mb-8'>
			<Header />
			{children}
			<Footer />
		</div>
	)
}
