import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export function useThemeContext() {
  const { theme, handleToggleTheme } = useContext(ThemeContext)

  if (!theme) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider')
  }

  return { theme, handleToggleTheme }
}