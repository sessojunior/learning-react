import { BrowserRouter, Routes, Route } from "react-router-dom"

import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Currency from "./pages/Currency"
import Layout from "./components/Layout"

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/criptomoeda/:currency' element={<Currency />} />

						<Route path='*' element={<NotFound />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</>
	)
}
