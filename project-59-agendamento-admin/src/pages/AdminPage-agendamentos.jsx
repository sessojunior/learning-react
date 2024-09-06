import { useState } from 'react';

export default function AdminPage() {
  const [selectedDay, setSelectedDay] = useState('2024-09-05');
  const [selectedSalon, setSelectedSalon] = useState('Salão 1');

  const salons = ['Salão 1', 'Salão 2', 'Salão 3'];

  // Dados dos profissionais com horários bloqueados e horários de funcionamento
  const professionals = [
    {
      id: 1,
      name: "Carlos Almeida",
      avatar: "https://via.placeholder.com/50",
      workTime: { start: "10:00", end: "18:00" },
      blockedTimes: [
        { time: "10:15", duration: "15m", description: null },
        { time: "13:15", duration: "1h15m", description: "Almoço" },
        { time: "15:00", duration: "45m", description: null }
      ]
    },
    {
      id: 2,
      name: "Ana Maria",
      avatar: "https://via.placeholder.com/50",
      workTime: { start: "09:00", end: "18:00" },
      blockedTimes: [
        { time: "12:00", duration: "30m", description: null },
        { time: "12:00", duration: "3h15", description: "Almoço" },
        { time: "16:00", duration: "1h15", description: "Lanche" }
      ]
    },
    {
      id: 3,
      name: "Fernanda Costa",
      avatar: "https://via.placeholder.com/50",
      workTime: { start: "08:30", end: "17:00" },
      blockedTimes: [
        { time: "11:30", duration: "1h30", description: null }
      ]
    },
    {
      id: 4,
      name: "Juliano Pereira",
      avatar: "https://via.placeholder.com/50",
      workTime: { start: "08:00", end: "19:00" },
      blockedTimes: []
    },
    {
      id: 5,
      name: "Luana Souza",
      avatar: "https://via.placeholder.com/50",
      workTime: { start: "10:00", end: "18:00" },
      blockedTimes: [
        { time: "14:15", duration: "2h15", description: null }
      ]
    }
  ];

  // Horários agora de 15 em 15 minutos
  const timeSlots = [
    "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45",
    "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45"
  ];

  const appointments = [
    { id: 1, start: "11:15", duration: "1h30", client: "Maria Barbosa", services: ["Corte de cabelo", "Escova"], professionalId: 1 },
    { id: 2, start: "09:30", duration: "15m", client: "Carlos Silva", services: ["Barba"], professionalId: 2 },
    { id: 3, start: "13:00", duration: "1h15", client: "João Silva", services: ["Barba"], professionalId: 2 },
    { id: 4, start: "09:45", duration: "30m", client: "Pedro Santos", services: ["Escova"], professionalId: 4 },
    { id: 5, start: "10:15", duration: "1h30", client: "Ana Costa", services: ["Corte de cabelo"], professionalId: 5 },
    { id: 6, start: "16:30", duration: "1h15", client: "José Souza", services: ["Corte"], professionalId: 1 },
    { id: 7, start: "09:00", duration: "1h", client: "Thiago Moura", services: ["Escova"], professionalId: 3 },
  ];

  const baseHeight = 64; // altura base para 30m
  const borderHeightFix = 17; // descontar a altura das bordas + 1px

  // Função para calcular a duração em minutos
  const getDurationInMinutes = (duration) => {
    let durationMinutes = 0;

    if (duration.includes('h')) {
      const [hours, minutes] = duration.split('h');
      durationMinutes += parseInt(hours) * 60;
      if (minutes) {
        durationMinutes += parseInt(minutes);
      }
    } else {
      durationMinutes = parseInt(duration);
    }

    return durationMinutes;
  };

  // Função para calcular a altura baseada na duração
  const getHeight = (duration) => {
    const durationMinutes = getDurationInMinutes(duration);
    return ((durationMinutes / 15) * baseHeight) - borderHeightFix;
  };

  // Função para calcular o horário de fim
  const getEndTime = (start, duration) => {
    const [startHour, startMinutes] = start.split(':').map(Number);
    const durationMinutes = getDurationInMinutes(duration);

    const totalMinutes = startHour * 60 + startMinutes + durationMinutes;
    const endHour = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;

    return `${endHour.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  };

  // Função para verificar se o horário está dentro do horário de funcionamento do profissional
  const isWithinWorkHours = (timeSlot, professional) => {
    const startTime = professional.workTime.start;
    const endTime = professional.workTime.end;
    return timeSlot >= startTime && timeSlot <= endTime;
  };

  // Função para verificar se o horário está ocupado por bloqueios ou agendamentos
  const isTimeSlotOccupied = (timeSlot, professionalId) => {
    const professional = professionals.find(pro => pro.id === professionalId);
    if (!professional) return false;

    // Verifica bloqueios
    const isBlocked = professional.blockedTimes.some(block => {
      const blockStart = block.time;
      const blockEnd = getEndTime(blockStart, block.duration);
      return timeSlot >= blockStart && timeSlot < blockEnd;
    });

    // Verifica agendamentos
    const isBooked = appointments.some(appointment => {
      const appStart = appointment.start;
      const appEnd = getEndTime(appStart, appointment.duration);
      return appointment.professionalId === professionalId &&
        timeSlot >= appStart && timeSlot < appEnd;
    });

    return isBlocked || isBooked;
  };

  // Função para retornar os horários indisponíveis
  const blockedTimesByTimeSlot = (timeSlot) => {
    return professionals.flatMap((professional) =>
      professional.blockedTimes
        .filter((block) => block.time === timeSlot)
        .map((block) => ({
          professional: professional.name,
          height: getHeight(block.duration)
        }))
    );
  };

  // Função para retornar os agendamentos por horário
  const appointmentsByTimeSlot = (timeSlot, professionalId) => {
    return appointments
      .filter(appointment => appointment.start === timeSlot && appointment.professionalId === professionalId)
      .map(appointment => ({
        id: appointment.id,
        client: appointment.client,
        services: appointment.services.join(', '),
        height: getHeight(appointment.duration),
        startTime: appointment.start,
        endTime: getEndTime(appointment.start, appointment.duration),
        durationInMinutes: getDurationInMinutes(appointment.duration) // Exibir a duração em minutos
      }));
  };
  
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleSalonChange = (event) => {
    setSelectedSalon(event.target.value);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDay);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDay(nextDay.toISOString().split('T')[0]);
  };

  const handlePreviousDay = () => {
    const prevDay = new Date(selectedDay);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDay(prevDay.toISOString().split('T')[0]);
  };

  return (
    <div className="flex flex-col p-6">

      {/* Topbar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-2">
          <button onClick={handlePreviousDay} className="bg-gray-300 px-3 py-1 rounded">← Voltar</button>
          <input type="date" value={selectedDay} onChange={handleDayChange} className="border p-1 rounded" />
          <button onClick={handleNextDay} className="bg-gray-300 px-3 py-1 rounded">Avançar →</button>
        </div>
        <div>
          <select value={selectedSalon} onChange={handleSalonChange} className="border p-1 rounded">
            {salons.map((salon) => (
              <option key={salon} value={salon}>{salon}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cabeçalho da tabela */}
      <div className="flex">
        {/* Botão de mais profissionais */}
        <div className="w-16 h-16 border-r border-r-transparent flex justify-center items-center">
          <button className="bg-gray-300 px-3 py-1 rounded">→</button>
        </div>
        {/* Profissionais */}
        {professionals.map(professional => (
          <div key={professional.id} className="w-56 h-16 flex gap-2 justify-center items-center border-r border-r-transparent border-b-4 border-b-gray-200 select-none">
            <img src={professional.avatar} alt={professional.name} className="rounded-full w-10 h-10" />
            <span className="text-ellipsis overflow-hidden whitespace-nowrap font-bold">{professional.name}</span>
          </div>
        ))}
      </div>

      {/* Tabela de horas e minuto de cada profissional */}
      <div className="flex flex-col">
        {timeSlots.map((timeSlot) => (
          <div key={timeSlot} className="flex">
            {/* Horário */}
            <div className="w-16 h-16 border-r border-r-gray-200 flex justify-end items-start select-none">
              <span className="text-sm pt-1 pr-2">{timeSlot}</span>
            </div>
            {/* Profissionais */}
            {professionals.map(professional => {
              const blockedTimes = blockedTimesByTimeSlot(timeSlot);
              const blockedTime = blockedTimes.find(block => block.professional === professional.name);
              const appointment = appointmentsByTimeSlot(timeSlot, professional.id)[0];
              const isFree = !isTimeSlotOccupied(timeSlot, professional.id);
              const isWithinHours = isWithinWorkHours(timeSlot, professional);
              const isTimeClosed = !isWithinWorkHours(timeSlot, professional);

              console.log("isWithinHours", isWithinHours)
              console.log("isTimeClosed", isTimeClosed)
              
              return (
                <div key={professional.id} className="w-56 h-16 flex gap-2 justify-start items-start border-r border-r-gray-200 border-b border-b-gray-200">
                  {isTimeClosed ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-200 bg-gray-50 bg-[repeating-linear-gradient(135deg,_#FFFFFF_0,_#FFFFFF_5px,_transparent_5px,_transparent_10px)]"></div>
                  ) : isWithinHours && (
                    appointment ? (
                      <div className="w-full relative z-index-10">
                        <button className="flex flex-col justify-between absolute top-0 left-0 py-2 px-3 m-2 rounded border-l-4 border-l-blue-400 w-[208px] bg-blue-200 hover:bg-blue-300 select-none" style={{ height: `${appointment.height}px` }}>
                          <span className="flex flex-col justify-start items-start">
                            <span className="text-md font-bold">{appointment.client}</span>
                            <span className="text-sm" style={{ display: appointment.durationInMinutes < 30 ? "none" : "inline" }}>{appointment.services}</span>
                          </span>
                          <div className="flex justify-between w-full" style={{ display: appointment.durationInMinutes < 30 ? "none" : "flex" }}>
                            <div className="text-xs">{appointment.startTime} - {appointment.endTime}</div>
                            <div className="text-xs">#{appointment.id}</div>
                          </div>
                        </button>
                      </div>
                    ) : blockedTime ? (
                      <div className="w-full relative z-index-10">
                        <span className="flex flex-col justify-center items-center absolute top-0 left-0 py-2 px-3 m-2 bg-gray-200 rounded w-[208px] cursor-default select-none" style={{ height: `${blockedTime.height}px` }}>
                          <span className="text-md font-medium text-gray-300">Indisponível</span>
                        </span>
                      </div>
                    ) : isFree && (
                      <div className="w-56 h-16 flex gap-2 justify-start items-start border-b border-b-gray-200">
                        {/* Exemplo de horário livre - todos os campos que não tem agendamento e que não estão indisponíveis */}
                        <div className="w-full relative z-index-10">
                          <a href="#" className="flex flex-col absolute top-0 left-0 py-2 px-3 border-8 border-white rounded w-full h-[63px] bg-transparent hover:bg-green-100 justify-center items-center text-transparent hover:text-black select-none">
                            <span className="text-md font-medium">Horário livre</span>
                          </a>
                        </div>
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
