import { createContext, useState } from "react"

export const ThemeContext = createContext("")

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light")

  function handleToggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
