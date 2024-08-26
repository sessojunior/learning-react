import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export default function Home() {
  const { theme, handleToggleTheme } = useContext(ThemeContext)

  return (
    <>
      <h3>Página inicial</h3>
      <p>Esta é a página inicial.</p>
      
      <p>Usando o Context API, para alterar de forma global:</p>
      <p>Tema: {theme === 'light' ? 'Claro' : 'Escuro'}</p>
      <button onClick={handleToggleTheme}>Mudar tema</button>
    </>
  )
}
