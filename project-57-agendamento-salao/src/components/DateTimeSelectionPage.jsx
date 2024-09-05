import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppointmentContext } from '../contexts/AppointmentContext';

export default function DateTimeSelectionPage() {
  const { appointmentData, setAppointmentData } = useContext(AppointmentContext);
  const navigate = useNavigate();

  // Ao entrar diretamente na página pela URL
  useEffect(() => {
    if (!appointmentData.professional || !appointmentData.services) {
      navigate('/servicos'); // Redireciona para a página de seleção de serviços se não houver dados
    }
  }, []);

  // Ao ser redirecionado através de um link na página
  useLayoutEffect(() => {
    if (!appointmentData.professional || !appointmentData.services) {
      navigate('/servicos'); // Redireciona para a página de seleção de serviços se não houver dados
    }
  }, [appointmentData.professional, appointmentData.services, navigate]);

  const [dateHours, setDateHours] = useState({
    professional: "Mario",
    dateHoursAvailables: [
      "2024-08-10 08:00", "2024-08-10 08:30", "2024-08-10 09:00",
      "2024-08-11 10:00", "2024-08-12 11:00", "2024-08-12 13:00",
      "2024-08-13 14:00", "2024-08-14 15:00", "2024-08-15 16:00",
      "2024-08-16 17:00", "2024-08-17 08:00", "2024-08-18 09:00",
      "2024-08-18 10:00", "2024-08-18 11:00", "2024-08-18 17:00"
    ]
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Sincroniza selectedDate e selectedTime com appointmentData
  useEffect(() => {
    if (appointmentData.date) {
      setSelectedDate(appointmentData.date);
    }
    if (appointmentData.time) {
      setSelectedTime(appointmentData.time);
    }
  }, [appointmentData.date, appointmentData.time]);

  console.log("appointmentData", appointmentData);

  // Separar datas e horários disponíveis
  const availableDates = Array.from(new Set(dateHours.dateHoursAvailables.map(dt => dt.split(' ')[0])));
  const hoursByDate = availableDates.reduce((acc, date) => {
    acc[date] = dateHours.dateHoursAvailables.filter(dt => dt.startsWith(date));
    return acc;
  }, {});

  // Função para formatar a data
  const formatDate = (dateStr) => {
    const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const date = new Date(dateStr + 'T00:00');
    const dayOfWeek = DAYS[date.getDay()];
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2); // Obtém os últimos 2 dígitos do ano

    return [dayOfWeek, day, `${month}/${year}`];
  };

  // Função para formatar o horário
  const formatTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Limpa a seleção de hora ao mudar a data
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      const selectedDateTime = `${selectedDate} ${selectedTime}`;
      setAppointmentData((prevData) => ({
        ...prevData,
        date: selectedDate,
        time: selectedTime,
      }));
      navigate('/finalizar');
    } else {
      alert('Selecione uma data e uma hora para continuar.');
    }
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-extrabold mb-6 text-gray-800">Selecione a Data e Hora</h1>
      
      {/* Datas */}
      <div className="w-full max-w-2xl mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Datas Disponíveis</h2>
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-4">
          {availableDates.map((date) => {
            const [dayOfWeek, day, monthYear] = formatDate(date);

            return (
              <div
                key={date}
                className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
                  selectedDate === date ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onClick={() => handleSelectDate(date)}
              >
                <span className="text-gray-800 font-semibold">{dayOfWeek}</span>
                <span className="text-gray-800 font-semibold">{day}</span>
                <span className="text-gray-800 font-semibold mes-ano">{monthYear}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Horários */}
      {selectedDate && (
        <div className="w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Horários Disponíveis</h2>
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-4">
            {hoursByDate[selectedDate].map((dateTime) => (
              <div
                key={dateTime}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedTime === dateTime.split(' ')[1] ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onClick={() => handleSelectTime(dateTime.split(' ')[1])}
              >
                <span className="text-lg font-semibold text-gray-700">{formatTime(dateTime)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleContinue}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700"
      >
        Finalizar Agendamento
      </button>
    </div>
  );
}
