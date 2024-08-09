import { NavLink } from "react-router-dom"

export default function Header() {
  return (
    <header className="bg-gray-200 w-full flex justify-between p-4 border-b border-gray-300">
      <div>
        <h1 className="text-xl font-bold">Blog</h1>
      </div>
      <nav>
        <ul className="flex gap-2">
          <li><NavLink to="/" className={({ isActive }) => "font-medium px-4 py-2 hover:text-blue-500 " + (isActive ? 'text-blue-500' : '')}>Home</NavLink></li>
          <li><NavLink to="/post/add" className={({ isActive }) => "font-medium px-4 py-2 text-white rounded-md hover:bg-blue-700 " + (isActive ? 'bg-blue-700' : 'bg-blue-500')}>Novo Post</NavLink></li>
          <li><NavLink to="/admin" className={({ isActive }) => "font-medium px-4 py-2 hover:text-blue-500 " + (isActive ? 'text-blue-500' : '')}>Gerenciar</NavLink></li>
        </ul>
      </nav>

    </header>
  )
}
