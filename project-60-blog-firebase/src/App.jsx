import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication"
import { AuthProvider } from "./contexts/AuthContext";

import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Post from './pages/Post'
import PostEdit from './pages/PostEdit'
import Sobre from './pages/Sobre'
import Dashboard from './pages/Dashboard'
import PostAdd from './pages/PostAdd'

import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Header />
          <div className="min-h-[calc(100vh-120px)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!user? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/dashboard/post/add" element={user ? <PostAdd /> : <Navigate to="/login" />} />
              <Route path="/dashboard/post/:id/edit" element={user ? <PostEdit /> : <Navigate to="/login" />} />
              <Route path="/sobre" element={<Sobre />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}
