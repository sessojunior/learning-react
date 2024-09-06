import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AdminPage from './pages/AdminPage';
import ProfessionalsPage from './pages/ProfessionalsPage';

export default function App() {

  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <div className="flex-grow">
            <Routes>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/profissionais" element={<ProfessionalsPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}
