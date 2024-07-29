import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Calculadora from './pages/Calculadora'
import Resutado from './pages/Resutado'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calculadora />} />
          <Route path="/resultado" element={<Resutado />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
