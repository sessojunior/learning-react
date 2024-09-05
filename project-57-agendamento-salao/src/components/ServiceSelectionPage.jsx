import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppointmentContext } from '../contexts/AppointmentContext';

export default function ServiceSelectionPage() {
  const { appointmentData, setAppointmentData } = useContext(AppointmentContext);
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState([]);

  // Ao entrar diretamente na página pela URL
  useEffect(() => {
    if (!appointmentData.professional) {
      navigate('/profissional'); // Redireciona para a página de seleção de profissional se não houver dados
    }
  }, []);

  // Ao ser redirecionado através de um link na página
  useLayoutEffect(() => {
    if (!appointmentData.professional) {
      navigate('/profissional'); // Redireciona para a página de seleção de profissional se não houver dados
    }
  }, [appointmentData.professional, navigate]);

  const services = [
    { id: 1, title: 'Corte de cabelo', description: 'Corte básico', value: 30 },
    { id: 2, title: 'Barba', description: 'Aparar e modelar', value: 20 },
  ];

  // Sincroniza selectedServices com appointmentData.services
  useEffect(() => {
    if (appointmentData.services) {
      setSelectedServices(appointmentData.services);
    }
  }, [appointmentData.services]);

  console.log("appointmentData", appointmentData);

  const handleSelectService = (service) => {
    setSelectedServices((prevServices) => {
      if (prevServices.find((s) => s.id === service.id)) {
        return prevServices.filter((s) => s.id !== service.id);
      } else {
        return [...prevServices, service];
      }
    });
  };

  const handleContinue = () => {
    if (selectedServices.length > 0) {
      const total = selectedServices.reduce((sum, service) => sum + service.value, 0);
      setAppointmentData((prevData) => ({
        ...prevData,
        services: selectedServices,
        total,
      }));
      navigate('/dataehora');
    } else {
      alert('Selecione pelo menos um serviço para continuar.');
    }
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-extrabold mb-6 text-gray-800">Selecione os Serviços</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-6 border rounded-lg shadow-lg cursor-pointer ${
              selectedServices.find((s) => s.id === service.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onClick={() => handleSelectService(service)}
          >
            <h2 className="text-xl font-semibold text-gray-700">{service.title}</h2>
            <p className="mt-2 text-gray-600">{service.description}</p>
            <p className="mt-2 text-lg font-semibold text-gray-800">R${service.value}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleContinue}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700"
      >
        Próximo
      </button>
    </div>
  );
}
