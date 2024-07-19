import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import FetchPosts from './pages/FetchPosts'
import AxiosPosts from './pages/AxiosPosts'
import Posts from './pages/Posts'
import PostViewer from './pages/PostViewer'

export default function App() {
  return (
    <>
      <h1>Fetch API e Axios</h1>
      <p>Obtendo posts de JSON Placeholder</p>
      <BrowserRouter>
        <p><Link to="/">Home</Link> - <Link to="/fetch-posts">Fetch Posts</Link> - <Link to="/axios-posts">Axios Posts</Link></p>
        <p><Link to="/posts">Gerenciar Posts</Link></p>
        <p><Link to="/custom-hooks-posts/1">Carregar Post usando Custom Hooks</Link></p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fetch-posts" element={<FetchPosts />} />
          <Route path="/axios-posts" element={<AxiosPosts />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/custom-hooks-posts/:id" element={<PostViewer />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
