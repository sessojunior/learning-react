import { useState, createContext } from 'react'
import PropTypes from 'prop-types'

export const ConfigContext = createContext({})

export default function ConfigProvider({ children }) {

  const [config, setConfig] = useState({
    showHeaderFooter: true,
    quantityFrames: 4,
  })

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}

ConfigProvider.propTypes = {
  children: PropTypes.node
}
