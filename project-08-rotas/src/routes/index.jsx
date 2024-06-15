import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Sobre from "../pages/Sobre"
import Contato from "../pages/Contato"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Blog from "../pages/Blog"
import Post from "../pages/Post"
import NotFound from "../pages/NotFound"

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sobre" element={<Sobre />} />
				<Route path="/contato" element={<Contato />} />
				<Route path="/blog" element={<Blog />}></Route>
				<Route path="/blog/:id" element={<Post />} />
				
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}
