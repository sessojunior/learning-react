import { NavLink } from 'react-router-dom'
import style from './Menu.module.css'

export default function Menu() {
  const links = [
    { to: '/', label: 'Página inicial' },
    { to: '/produtos', label: 'Produtos' },
    { to: '/sobre', label: 'Sobre' },
  ]

  return (
    <>
      <ul>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} className={({ isActive }) => (isActive ? style.active : undefined)}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}
