import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

import { auth, db } from "../services/firebaseConnection"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"

import { toast } from "react-toastify"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loadingUser, setLoadingUser] = useState(true)
  const [signed, setSigned] = useState(false)
  
  const navigate = useNavigate()

  useEffect(() => { 
    console.log("AuthContext: useEffect")
    function loadStorage() {
      const storageUser = localStorage.getItem("user")
      if (storageUser) {
        setUser(JSON.parse(storageUser))
        setSigned(true)
      }
    }
    loadStorage()
    setLoadingUser(false)
  }, [])
  
  console.log("AuthContext: signed", signed)
  console.log("AuthContext: loadingUser", loadingUser)


  function validateEmail(email) {
    return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  }

  function checkData(name, email, password, confirmPassword) {
    if (name.length < 3) {
      toast.error("Nome precisa ter pelo menos 3 caracteres")
      setLoadingAuth(false)
      return false
    } else if (!validateEmail(email)) {
      toast.error("Digite um e-mail válido")
      setLoadingAuth(false)
      return false
    } else if (password.length < 6) {
      toast.error("Senha precisa ter pelo menos 6 caracteres")
      setLoadingAuth(false)
      return false
    } else if (password !== confirmPassword) {
      toast.error("Senhas diferentes")
      setLoadingAuth(false)
      return false
    } else {
      return true
    }
  }

  function saveUserInLocalStorage(data) {
    localStorage.setItem("user", JSON.stringify(data))
  }

  function removeUserFromLocalStorage() {
    localStorage.removeItem("user")
  }

  async function signIn(email, password) {
    setLoadingAuth(true)

    if (!validateEmail(email)) {
      toast.error("Digite um e-mail valido")
    } else if (password.length < 6) {
      toast.error("Senha inválida")
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
          let uid = value.user.uid
          const docRef = doc(db, "users", uid)
          const docSnap = await getDoc(docRef)
          if (!docSnap.exists()) {
            toast.error("Não foi encontrado um usuário com esse e-mail!")
          } else {
            let data = {
              uid: uid,
              name: docSnap.data().name,
              email: value.user.email,
              avatarUrl: docSnap.data().avatarUrl
            }

            setUser(data)
            saveUserInLocalStorage(data)
            setSigned(true)
            setLoadingAuth(false)
            console.log("Logado com sucesso")
            toast.success("Bem vindo ao sistema!")
            navigate("/dashboard", { replace: true })
          }
        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential") {
            toast.error("E-mail ou senha inválida")
          } else if (error.code === "auth/wrong-password") {
            toast.error("Senha inválida")
          } else {
            toast.error("Erro ao fazer o login")
            console.log(error)
          }
          setLoadingAuth(false)
        })
    }
  }

  async function signUp(name, email, password, confirmPassword) {
    setLoadingAuth(true)

    if (checkData(name, email, password, confirmPassword)) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
          let uid = value.user.uid

          await setDoc(doc(db, "users", uid), {
            name: name,
            email: email,
            avatarUrl: null
          })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              email: email,
              createdAt: new Date(),
              avatarUrl: null
            }
            setUser(data)
            saveUserInLocalStorage(data)
            setSigned(true)
            setLoadingAuth(false)
            navigate("/dashboard", { replace: true })
            toast.success("Cadastrado com sucesso")
            //alert("Cadastrado com sucesso")
          })
        })
        .catch((error) => {
          console.log(error)
          if (error.code === "auth/invalid-email") {
            toast.error("E-mail inválido")
          } else if (error.code === "auth/weak-password") {
            toast.error("Senha fraca")
          } else if (error.code === "auth/email-already-in-use") {
            toast.error("E-mail já cadastrado")
          } else {
            toast.error("Erro ao cadastrar")
          }
          setLoadingAuth(false)
        })
    }
  }

  async function logout() {
    console.log("AuthContext: logout")
    await signOut(auth)
    removeUserFromLocalStorage()
    setUser(null)
    setSigned(false)
  }

  return (
    <AuthContext.Provider value={{ signed, user, signIn, signUp, logout, saveUserInLocalStorage, setUser, loadingAuth, loadingUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}

export default AuthProvider