import style from './Menu.module.css'
import { NavLink } from 'react-router-dom'

export default function Menu() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Produtos' },
    { to: '/about', label: 'Sobre' },
  ]

  return (
    <div>
      <p>Menu:</p>
      <ul>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} className={({ isActive }) => (isActive ? style.active : undefined)}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
