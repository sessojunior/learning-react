import avatarImg from "../../assets/avatar.png"
import { Link } from "react-router-dom"
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi"
import "./sidebar.css"

import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext)

  async function handleLogout() {
    await logout()
  }

  return (
    <div className="sidebar">
      <div className="header">
        <img src={user && user.avatarUrl ? user.avatarUrl : avatarImg} className={user && user.avatarImg} alt="Foto do usuário" />
      </div>
      <div className="menu">
        <Link to="/dashboard">
          <FiHome color="#666" size={24} />
          <span>Chamados</span>
        </Link>
        <Link to="/customers">
          <FiUser color="#666" size={24} />
          <span>Clientes</span>
        </Link>
        <Link to="/profile">
          <FiSettings color="#666" size={24} />
          <span>Minha conta</span>
        </Link>
        <a onClick={handleLogout}>
          <FiLogOut color="#666" size={24} />
          <span>Sair</span>
        </a>
      </div>
    </div>
  )
}