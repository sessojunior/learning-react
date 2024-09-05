import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppointmentContext } from '../contexts/AppointmentContext';

export default function EstablishmentPage() {
  const { appointmentData, setAppointmentData } = useContext(AppointmentContext);

  console.log("appointmentData", appointmentData);

  return (
    <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 text-center">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800">Bem-vindo ao Nosso Salão/Barbearia</h1>
      <p className="text-gray-700 mb-6">Aqui você encontrará informações sobre o nosso estabelecimento e os serviços oferecidos. Entre em contato conosco para mais detalhes ou para agendar um serviço.</p>
      <Link
        to="/profissional"
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Agendar Serviço
      </Link>
    </div>
  );
}
