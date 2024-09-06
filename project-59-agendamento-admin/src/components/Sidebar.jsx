import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="min-w-80 bg-gray-800 text-white h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin" className="flex items-center space-x-2">
            <FaCalendarAlt />
            <span>Agendamentos</span>
          </Link>
        </li>
        <li>
          <Link to="/profissionais" className="flex items-center space-x-2">
            <FaUser />
            <span>Profissionais</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
