import { BrowserRouter, Routes, Route } from "react-router-dom"
import Private from "./pages/Private"

import Layout from "./components/Layout"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import SocialNetwork from "./pages/SocialNetwork"

export type LinkProps = {
	id: string
	name: string
	url: string
	bg: string
	color: string
	createAt: Date
}

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route
							path='/admin'
							element={
								<Private>
									<Admin />
								</Private>
							}
						/>
						<Route
							path='/socialnetwork'
							element={
								<Private>
									<SocialNetwork />
								</Private>
							}
						/>

						<Route path='*' element={<NotFound />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</>
	)
}
