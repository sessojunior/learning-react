import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppointmentProvider } from './contexts/AppointmentContext';

import Container from './components/Container';
import EstablishmentPage from './components/EstablishmentPage';
import ProfessionalSelectionPage from './components/ProfessionalSelectionPage';
import ServiceSelectionPage from './components/ServiceSelectionPage';
import DateTimeSelectionPage from './components/DateTimeSelectionPage';
import LoginPage from './components/LoginPage';
import FinalizationPage from './components/FinalizationPage';
import ProgressMenu from './components/ProgressMenu';

export default function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <AppointmentProvider>
        <BrowserRouter>
          <Container>
            <Routes>
              <Route path="/" element={<EstablishmentPage />} />
              <Route path="/profissional" element={<ProfessionalSelectionPage />} />
              <Route path="/servicos" element={<ServiceSelectionPage />} />
              <Route path="/dataehora" element={<DateTimeSelectionPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/finalizar" element={<FinalizationPage />} />

              <Route path="*" element={<EstablishmentPage />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </AppointmentProvider>
    </GoogleOAuthProvider>
  );
}
