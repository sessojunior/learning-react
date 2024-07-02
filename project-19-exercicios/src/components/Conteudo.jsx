import { useContext } from "react"
import { ThemeContext } from "../contexts/Theme"

export default function Conteudo() {
  const { theme, setTheme } = useContext(ThemeContext)

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div>
      <h4>Alterar tema da página</h4>
      <p>Tema: {theme === "light" ? "Claro" : "Escuro"}</p>
      <button onClick={handleToggleTheme}>Mudar tema</button>
    </div>
  )
}
