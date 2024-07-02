import { createContext, useState } from "react";
import PropTypes from "prop-types"

export const ThemeContext = createContext("")

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node
}