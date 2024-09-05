import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppointmentContext } from '../contexts/AppointmentContext';

export default function ProfessionalSelectionPage() {
  const { appointmentData, setAppointmentData } = useContext(AppointmentContext);
  const navigate = useNavigate();
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const professionals = [
    { id: 1, name: 'João', description: 'Barbeiro experiente' },
    { id: 2, name: 'Maria', description: 'Cabeleireira especializada' },
  ];

  // Sincroniza o selectedProfessional com o valor do contexto
  useEffect(() => {
    if (appointmentData.professional) {
      setSelectedProfessional(appointmentData.professional);
    }
  }, [appointmentData.professional]);

  const handleSelectProfessional = (professional) => {
    setSelectedProfessional(professional);
  };

  const handleContinue = () => {
    if (selectedProfessional) {
      setAppointmentData((prevData) => ({
        ...prevData,
        professional: selectedProfessional,
      }));
      navigate('/servicos');
    } else {
      alert('Selecione um profissional para continuar.');
    }
  };

  console.log("appointmentData", appointmentData);

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-extrabold mb-6 text-gray-800">Selecione um Profissional</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {professionals.map((prof) => (
          <div
            key={prof.id}
            className={`p-6 border rounded-lg shadow-lg cursor-pointer ${
              selectedProfessional?.id === prof.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onClick={() => handleSelectProfessional(prof)}
          >
            <h2 className="text-xl font-semibold text-gray-700">{prof.name}</h2>
            <p className="mt-2 text-gray-600">{prof.description}</p>
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
