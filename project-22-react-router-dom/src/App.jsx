import './App.css'

import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Table from './pages/Table'
import Blog from './pages/Blog'
import Post from './pages/Post'


export default function App() {
  return (
    <>
      <h1>React Router Dom</h1>
      <BrowserRouter>
        <p><Link to="/">Home</Link> - <Link to="/contact">Contato</Link> - <Link to="/about">Sobre</Link></p>
        <p>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink> - <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contato</NavLink> - <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>Sobre</NavLink> - <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink></p>
        <p><Link to="/blog/1">Post 1</Link> - <Link to="/blog/2">Post 2</Link> - <Link to="/blog/3">Post 3</Link></p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="table" element={<Table />} />
          </Route>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Post />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
