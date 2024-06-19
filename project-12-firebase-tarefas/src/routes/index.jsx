import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Register from "../pages/Register"
import Admin from "../pages/Admin"
import NotFound from "../pages/NotFound"
import Private from "../pages/Private"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Private> <Admin /> </Private>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}