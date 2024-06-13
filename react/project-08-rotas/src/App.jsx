import "./App.css"
import AppRoutes from "./routes"

export default function App() {
  return (
    <>
      <h1>Usando Rotas</h1>
      <p>Não dá pra colocar links no App.jsx. Teria que ser no componente que está abaixo do BrowserRoutes. Se colocar links aqui, não irá funcionar. Depende do componente Router.</p>
      <hr />
      <AppRoutes />
    </>
  )
}
