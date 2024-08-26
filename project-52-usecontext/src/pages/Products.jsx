import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export default function Products() {
  const { theme, handleToggleTheme } = useContext(ThemeContext)

  return (
    <>
      <h3>Página de Produtos</h3>
      <p>Esta é a página de produtos.</p>
      
      <p>Usando o Context API, para alterar de forma global:</p>
      <p>Tema: {theme === 'light' ? 'Claro' : 'Escuro'}</p>
      <button onClick={handleToggleTheme}>Mudar tema</button>
    </>
  )
}
