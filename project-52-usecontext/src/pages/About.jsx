// import { useContext } from 'react'
// import { ThemeContext } from '../contexts/ThemeContext'
import { useThemeContext } from "../hooks/useThemeContext"

export default function About() {
  // const { theme, handleToggleTheme } = useContext(ThemeContext)
  const { theme, handleToggleTheme } = useThemeContext()

  return (
    <>
      <h3>Página Sobre</h3>
      <p>Página com informações...</p>

      <p>Exemplo de uso usando o <i>custom hook</i> <b>useThemeContext</b>, para alterar de forma global sem precisar importar o useContext e ainda validando o context:</p>
      <p>Tema: {theme === 'light' ? 'Claro' : 'Escuro'}</p>
      <button onClick={handleToggleTheme}>Mudar tema</button>
    </>
  )
}
