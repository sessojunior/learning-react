import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Menu from './components/Menu'
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import NotFound from './pages/NotFound'
import About from './pages/About'
import SearchForm from './components/SearchForm'
import Search from './pages/Search'

export default function App() {
  return (
    <>
      <h1>React Router</h1>
      <BrowserRouter>
        <Menu />
        <SearchForm />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
