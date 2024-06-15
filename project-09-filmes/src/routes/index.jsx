import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Filmes from "../pages/Filmes"
import Filme from "../pages/Filme"
import Favoritos from "../pages/Favoritos"

import NotFound from "../pages/NotFound"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmes" element={<Filmes />} />
          <Route path="/filmes/:id" element={<Filme />} />
          <Route path="/favoritos" element={<Favoritos />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
