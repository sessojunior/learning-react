import { BrowserRouter, Routes, Route } from "react-router-dom"

 import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Header from "./components/Header"
import Home from "./pages/Home"
import Post from "./pages/Post"
import AddPost from "./pages/AddPost"
import Admin from "./pages/Admin"
import NotFound from "./pages/NotFound"
import Footer from "./components/Footer"
import EditPost from "./pages/EditPost"

export default function App() {

  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/add" element={<AddPost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}
