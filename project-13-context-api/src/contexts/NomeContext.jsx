import { useState, createContext } from 'react'
import { PropTypes } from 'prop-types'

export const NomeContext = createContext({})

function NomeProvider({ children, nomeInicial }) {
  const [ nome, setNome ] = useState(nomeInicial)
  return (
    <NomeContext.Provider value={{ nome, setNome }}>
      {children}
    </NomeContext.Provider>
  )
}

NomeProvider.propTypes = {
  children: PropTypes.node,
  nomeInicial: PropTypes.string
}

export default NomeProvider