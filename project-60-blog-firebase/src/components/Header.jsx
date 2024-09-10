import { NavLink } from 'react-router-dom'

import { useContext } from 'react'
import { useAuthValue } from "../contexts/AuthContext";
import { useAuthentication } from '../hooks/useAuthentication'

export default function Header() {

  const { user } = useAuthValue()
  const { logout } = useAuthentication()

  const links = [
    { to: '/', label: 'Home', show: true },
    { to: '/sobre', label: 'Sobre', show: true },
    { to: '/dashboard', label: 'Dashboard', show: (user ? true : false) },
    { to: '/dashboard/post/add', label: 'Cadastrar post', show: (user ? true : false) },
    { to: '/login', label: 'Entrar', show: (user ? false : true) },
  ]

  return (
    <div className="flex w-full justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div className="text-lg"><span className="font-light">Mini</span><span className="font-bold">Blog</span></div>
      <div>
        <nav>
          <ul className="flex gap-4">
            {links.map((link) => {
              if (link.show) {
                return <li key={link.to}><NavLink to={link.to} className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}>{link.label}</NavLink></li>
              }
            })}
            {user && (
              <li>
                <button onClick={logout} className="text-red-500 font-bold hover:text-red-600 ">Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}
