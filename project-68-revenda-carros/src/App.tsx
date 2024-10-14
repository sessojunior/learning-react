import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./components/Layout"

import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Car from "./pages/Car"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<Layout>
							<Home />
						</Layout>
					}
				/>
				<Route
					path='/carro/:id'
					element={
						<Layout>
							<Car />
						</Layout>
					}
				/>
				<Route path='/login' element={<Login />} />
				<Route path='/registrar' element={<SignUp />} />
				<Route
					path='/dashboard'
					element={
						<Layout>
							<Dashboard />
						</Layout>
					}
				/>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
