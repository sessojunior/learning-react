import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <h1>Página de dashboard</h1>
      <p>
        <Link to="profile">Ir para a página de perfil</Link> - <Link to="table">Ir para a página de tabela</Link>
      </p>
      <div>
        <p>Alvo da página (Outlet):</p>
        <Outlet />
      </div>
    </>
  )
}
