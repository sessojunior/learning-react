import PropTypes from "prop-types"
import { auth } from "../../firebaseConnection"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

export default function Private({ children }) {
  const [loading, setLoading] = useState(true)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        await onAuthStateChanged(auth, (user) => {
          if (!user) {
            setIsLogged(false)
          } else {
            setIsLogged(true)
            localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }))
          }
          setLoading(false)
        })
      } catch (error) {
        console.log(error)
      }
    }
    checkAuth()
  }, [])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!isLogged) {
    return <Navigate to="/" />
  }

  return (
    <>
      {children}
    </>
  )
}

Private.propTypes = {
  children: PropTypes.node
}