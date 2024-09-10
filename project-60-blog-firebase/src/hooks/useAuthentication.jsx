import { app } from '../firebase/config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'

export function useAuthentication() {

  // clean up
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  const auth = getAuth()

  function checkIfIsCancelled() {
    if (cancelled) {
      return
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled()

    let systemErrorMessage

    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await updateProfile(user, {
        displayName: data.name
      })
      return user
    } catch (error) {
      console.log("error.message", error.message)
      console.log(typeof error.message)
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha deve conter pelo menos 6 caracteres."
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado."
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
      }
    }

    return {
      auth, createUser, error: systemErrorMessage
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  const signIn = async (data) => {
    checkIfIsCancelled()

    let systemErrorMessage

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (error) {
      console.log("error.message", error.message)
      console.log(typeof error.message)
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado."
      } else if (error.message.includes("invalid-credential")) {
        systemErrorMessage = "E-mail ou senha incorreta."
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta."
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
      }
    }

    return {
      auth, signIn, error: systemErrorMessage
    }
  }

  const logout = () => {
    checkIfIsCancelled()
    signOut(auth)
  }

  return {
    auth,
    createUser,
    signIn,
    logout,
  }
}
