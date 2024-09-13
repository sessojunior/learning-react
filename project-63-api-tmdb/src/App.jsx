import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import Header from "./components/Header"
import Footer from "./components/Footer"

import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Movie from "./pages/Movie"
import Search from "./pages/Search"
import About from "./pages/About"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filme/:id" element={<Movie />} />
          <Route path="/procurar/:search" element={<Search />} />
          <Route path="/sobre" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
