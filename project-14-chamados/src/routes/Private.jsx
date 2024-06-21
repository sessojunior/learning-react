import { useContext } from "react"
import PropTypes from "prop-types"

import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"

export default function Private({ children }) {
  const { signed, loadingUser } = useContext(AuthContext)

  console.log("Private: signed", signed)
  console.log("Private: loadingUser", loadingUser)
  
  if (loadingUser) {
    return <div>Carregando...</div>
  }

  if (!signed) {
    console.log("Private: Usário não logado")
    return <Navigate to="/" />
  }

  return children
}

Private.propTypes = {
  children: PropTypes.node
}
