import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "./contexts/CartContext"

import Layout from "./components/Layout"

import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Product from "./pages/Product"

export default function App() {
	return (
		<>
			<CartProvider>
				<BrowserRouter>
					<Layout>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/carrinho' element={<Cart />} />
							<Route path='/produto/:id' element={<Product />} />

							<Route path='*' element={<NotFound />} />
						</Routes>
					</Layout>
				</BrowserRouter>
			</CartProvider>
		</>
	)
}
