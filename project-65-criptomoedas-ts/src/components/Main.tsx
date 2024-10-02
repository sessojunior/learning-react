type MainProps = { children: React.ReactNode }

export default function Main({ children }: MainProps) {
	return <main className='flex flex-col w-full'>{children}</main>
}
