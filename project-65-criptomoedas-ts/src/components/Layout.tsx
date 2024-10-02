import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"

type Props = {
	children: React.ReactNode
}

export default function Layout({ children }: Props) {
	return (
		<div className='flex flex-col w-full'>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</div>
	)
}
