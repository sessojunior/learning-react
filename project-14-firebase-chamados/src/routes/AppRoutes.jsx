import { BrowserRouter, Routes, Route } from "react-router-dom"

import { ToastContainer } from "react-toastify"

import AuthProvider from "../contexts/AuthContext"

import Private from "./Private"

import NotFound from "../pages/NotFound"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import Dashboard from "../pages/Dashboard"
import Customers from "../pages/Customers"
import Profile from "../pages/Profile"
import New from "../pages/New"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={6000} />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Private> <Dashboard /> </Private>} />
          <Route path="/profile" element={<Private> <Profile /> </Private>} />
          <Route path="/customers" element={<Private> <Customers /> </Private>} />
          <Route path="/new" element={<Private> <New /> </Private>} />
          <Route path="/new/:id" element={<Private> <New /> </Private>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}