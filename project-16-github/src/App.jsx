import GlobalStyle from "./styles/global"
import "react-toastify/dist/ReactToastify.css"

import { ToastContainer } from "react-toastify"

import AppRoutes from "./routes"

function App() {

  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={6000} />
      <AppRoutes />
    </>
  )
}

export default App
