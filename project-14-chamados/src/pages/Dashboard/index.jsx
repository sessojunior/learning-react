import { useContext } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"

export default function Dashboard() {
  const { logout } = useContext(AuthContext)

  async function handleLogout() {
    await logout()
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Esta é a página do dashboard.</p>
      <p><Link to="/">Ir para a página de login</Link></p>
      <p><button onClick={handleLogout}>Logout</button></p>
    </div>
  )
}