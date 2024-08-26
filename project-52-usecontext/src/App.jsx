import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ThemeContextProvider from './contexts/ThemeContext'

import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Menu from './components/Menu'

export default function App() {
  return (
    <>
      <ThemeContextProvider>
        <h1>Utilização do Context API</h1>
        <BrowserRouter>
          <h2>Menu de páginas</h2>
          <Menu />
          <h2>Conteúdo da página</h2>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/sobre" element={<About />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeContextProvider>
    </>
  )
}
