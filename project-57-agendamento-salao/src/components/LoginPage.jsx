import { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';

import { AppointmentContext } from '../contexts/AppointmentContext';

export default function LoginPage() {
  const { appointmentData, setAppointmentData } = useContext(AppointmentContext);

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    // Process the login response (e.g., send token to backend)
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
    // Handle login failure
  };

  console.log("appointmentData", appointmentData);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-extrabold mb-6 text-gray-800">Login</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        className="w-full max-w-xs"
      />
      <Link
        to="/finalize"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700"
      >
        Finalizar Agendamento
      </Link>
    </div>
  );
}
