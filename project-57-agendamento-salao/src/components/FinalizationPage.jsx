import { useContext, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppointmentContext } from '../contexts/AppointmentContext';

export default function FinalizePage() {
  const { appointmentData, setAppointmentData } = useContext(AppointmentContext);
  const navigate = useNavigate();

  // Ao entrar diretamente na página pela URL
  useEffect(() => {
    if (!appointmentData.professional || !appointmentData.services || !appointmentData.date || !appointmentData.time) {
      navigate('/servicos'); // Redireciona para a página de seleção de data e hora se não houver dados
    }
  }, []);

  // Ao ser redirecionado através de um link na página
  useLayoutEffect(() => {
    if (!appointmentData.professional || !appointmentData.services || !appointmentData.date || !appointmentData.time) {
      navigate('/servicos'); // Redireciona para a página de seleção de data e hora se não houver dados
    }
  }, [appointmentData.professional, appointmentData.services, appointmentData.date, appointmentData.time, navigate]);

  console.log("appointmentData", appointmentData);

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-extrabold mb-6 text-gray-800 text-center">Confirmação do Agendamento</h1>
        <div className="text-left">
          <p className="mb-2 text-gray-600"><strong>Profissional:</strong> {appointmentData.professional?.name}</p>
          <p className="mb-2 text-gray-600"><strong>Serviços:</strong></p>
          <ul className="list-disc list-inside mb-4">
            {appointmentData.services.map((service) => (
              <li key={service.id} className="text-gray-600">{service.title} - R${service.value}</li>
            ))}
          </ul>
          <p className="mb-2 text-gray-600"><strong>Data:</strong> {appointmentData.date}</p>
          <p className="mb-2 text-gray-600"><strong>Hora:</strong> {appointmentData.time}</p>
          <p className="text-lg font-semibold text-gray-800"><strong>Total:</strong> R${appointmentData.total}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-center font-semibold rounded-lg shadow-lg hover:bg-blue-700"
        >
          Voltar à Página Inicial
        </button>
      </div>
    </div>
  );
}
