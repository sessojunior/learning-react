import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Repository from "../pages/Repository"
import NotFound from "../pages/NotFound"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/repository" element={<Repository />} />
        <Route path="/repository/:repository" element={<Repository />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
