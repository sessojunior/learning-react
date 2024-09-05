// /contexts/AppointmentContext.jsx
import { createContext, useState } from 'react';

export const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointmentData, setAppointmentData] = useState({
    professional: null,
    services: [],
    date: null,
    time: null,
    total: 0,
  });

  return (
    <AppointmentContext.Provider value={{ appointmentData, setAppointmentData }}>
      {children}
    </AppointmentContext.Provider>
  );
}
