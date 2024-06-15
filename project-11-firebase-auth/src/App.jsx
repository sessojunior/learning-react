import { useState, useEffect } from "react"
// import { getDocs } from "firebase/firestore";
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebaseConnection";
import './App.css'

function App() {
  const [formAdd, setFormAdd] = useState({
    titulo: "",
    autor: "",
  })
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [posts, setPosts] = useState([])
  const [formUpdate, setFormUpdate] = useState({
    titulo: "",
    autor: "",
    data: "",
  })
  const [formAddUser, setFormAddUser] = useState({
    email: "",
    senha: "",
  })
  const [formLogin, setFormLogin] = useState({
    email: "",
    senha: "",
  })
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState({})

  function formatDate(date) {
    // YYYY-MM-DD HH:MM:SS
    return (date.getFullYear()) + "-" + (String(date.getMonth() + 1).padStart(2, '0')) + "-" + (String(date.getDate()).padStart(2, '0')) + " " + (String(date.getHours()).padStart(2, '0')) + ":" + (String(date.getMinutes()).padStart(2, '0')) + ":" + (String(date.getSeconds()).padStart(2, '0'))
  }

  async function addPost(event) {
    event.preventDefault()
    if (formAdd.titulo.length < 6) {
      setError(true)
      setErrorMessage("Titulo inválido")
    } else if (formAdd.autor.length < 3) {
      setError(true)
      setErrorMessage("Autor inválido")
    } else {
      console.log(formAdd)
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          titulo: formAdd.titulo,
          autor: formAdd.autor,
          data: formatDate(new Date()),
        })
        setFormAdd({ ...formAdd, titulo: "", autor: "" })
        setError(false)
        setErrorMessage("")
        //getPosts()
        console.log("Documento cadastrado com o ID:", docRef.id)
      } catch (error) {
        setError(true)
        setErrorMessage("Erro ao cadastrar o documento: " + error)
        console.error("Erro ao cadastrar o documento:", error)
      }
    }
  }

  async function addUser(event) {
    event.preventDefault()
    try {
      const data = await createUserWithEmailAndPassword(auth, formLogin.email, formLogin.senha)
      console.log("Cadastrado com sucesso")
      console.log(data.user.uid)
    } catch (error) {
      console.log("Erro ao cadastrar usuário")
      if (error.code === "auth/invalid-email") {
        alert("E-mail inválido")
      } else if (error.code === "auth/weak-password") {
        alert("Senha fraca")
      } else if (error.code === "auth/email-already-in-use") {
        alert("E-mail já cadastrado")
      }
      console.log(error)
    }
  }

  async function login(event) {
    event.preventDefault()
    try {
      const data = await signInWithEmailAndPassword(auth, formLogin.email, formLogin.senha)
      console.log("Usuário fez login com sucesso")
      console.log(data.user.uid)
      setIsLogged(true)
      setUser({
        uid: data.user.uid,
        email: data.user.email
      })
    } catch (error) {
      console.log("Erro ao logar")
      if (error.code === "auth/invalid-email") {
        alert("E-mail inválido")
      } else if (error.code === "auth/user-not-found") {
        alert("E-mail não encontrado")
      } else if (error.code === "auth/wrong-password") {
        alert("Senha inválida")
      }
      console.log(error)
    }
  }

  async function logout() {
    try {
      await signOut(auth)
      setIsLogged(false)
      setUser({
        uid: "",
        email: ""
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function getPost(event, id) {
    event.preventDefault()
    try {
      const docRef = doc(db, "posts", id)
      const docSnap = await getDoc(docRef)
      setFormUpdate({ ...docSnap.data(), id: docSnap.id })
      console.log(docSnap.data())
    } catch (error) {
      console.log(error)
    }
  }

  async function updatePost(event, id) {
    event.preventDefault()
    try {
      const docRef = doc(db, "posts", id)
      await updateDoc(docRef, {
        titulo: formUpdate.titulo,
        autor: formUpdate.autor,
        data: formUpdate.data,
      })
      setFormUpdate({ ...formUpdate, titulo: formUpdate.titulo, autor: formUpdate.autor, data: formUpdate.data })
      //getPosts()
      console.log(formUpdate)
    } catch (error) {
      console.log(error)
    }
  }

  async function deletePost(id) {
    try {
      const docRef = doc(db, "posts", id)
      await deleteDoc(docRef)
      setFormUpdate({ ...formUpdate, titulo: "", autor: "", data: "" })
      //getPosts()
    } catch (error) {
      console.log(error)
    }
  }

  // async function getPosts() {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "posts"));
  //     const docs = []
  //     querySnapshot.forEach((doc) => {
  //       docs.push({ ...doc.data(), id: doc.id })
  //     })
  //     setPosts(docs)
  //     console.log(docs)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // Usando essa função loadPosts() com onSnapshot ao invés de getPosts(), para que o array seja atualizado automaticamente até mesmo quando alterar diretamente no banco de dados, sem ser na aplicação, refletindo os dados alterados nesta aplicação em tempo real
  // Não é pra ficar utilizando onSnapshot para ficar pegando tudo em tempo real para tudo, senão irá pesar a aplicação
  async function loadPosts() {
    try {
      await onSnapshot(collection(db, "posts"), (snapshot) => {
        const docs = []
        snapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id })
        })
        setPosts(docs)
        //console.log(docs)
      });
    } catch (error) {
      console.log(error)
    }
  }

  async function checkLogin() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setIsLogged(true)
        setUser({
          uid: user.uid,
          email: user.email
        })
      } else {
        setIsLogged(false)
        setUser({
          uid: "",
          email: ""
        })
      }
    })
  }

  function confirmDelete(id, titulo) {
    if (window.confirm(`Deseja realmente excluir o post "${titulo}"?`)) {
      deletePost(id)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])
  
  useEffect(() => {
    checkLogin()
  }, [])

  const changeFormLogin = (e) => { 
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value })
    //console.log(formLogin)
  }
  
  const changeFormAddUser = (e) => { 
    setFormAddUser({ ...formAddUser, [e.target.name]: e.target.value })
    //console.log(formAddUser)
  }

  const changeFormAdd = (e) => { 
    setFormAdd({ ...formAdd, [e.target.name]: e.target.value })
    //console.log(formAdd)
  }
  
  const changeFormUpdate = (e) => { 
    setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value })
    //console.log(formUpdate)
  }

  return (
    <>
      <h1>Projeto utilizando o Firebase</h1>
      <br />
      
      <div className="container">
        <h2>Login de usuário</h2>
        {isLogged && (
          <div>
            <div>Seja bem-vindo! Você está logado.</div>
            <div>Uid: {user.uid} - E-mail: {user.email}</div>
            <button onClick={logout}>Fazer logout</button>
          </div>
        )}
        {!isLogged && (
          <form onSubmit={login}>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" id="email" autoComplete="email" placeholder="Digite o email" value={formLogin.email} onChange={changeFormLogin} required />
            </div>
            <div>
              <label htmlFor="senha">Senha:</label>
              <input type="password" name="senha" id="senha" autoComplete="current-password" placeholder="Digite a senha" value={formLogin.senha} onChange={changeFormLogin} required />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        )}
      </div>

      <br />
      <hr />
      <br />

      <div className="container">
        <h2>Cadastrar usuário</h2>
        <form onSubmit={addUser}>
          <div>
            <label htmlFor="add-email">Email:</label>
            <input type="text" name="email" id="add-email" autoComplete="email" placeholder="Digite o email" value={formAddUser.email} onChange={changeFormAddUser} required />
          </div>
          <div>
            <label htmlFor="add-senha">Senha:</label>
            <input type="password" name="senha" id="add-senha" autoComplete="current-password" placeholder="Digite a senha" value={formAddUser.senha} onChange={changeFormAddUser} required />
          </div>
          <div>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>

      <br />
      <hr />
      <br />

      <div className="container">
        <h2>Cadastrar Post</h2>
        <form onSubmit={addPost}>
          {error && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div>
            <label htmlFor="add-titulo">Titulo:</label>
            <input type="text" name="titulo" id="add-titulo" placeholder="Digite o título" value={formAdd.titulo} onChange={changeFormAdd} required />
          </div>
          <div>
            <label htmlFor="add-autor">Autor:</label>
            <input type="text" name="autor" id="add-autor" placeholder="Digite o autor" value={formAdd.autor} onChange={changeFormAdd} required />
          </div>
          <div>
            <button type="submit">Cadastrar</button>
            </div>
        </form>
        <br />
        <h2>Lista de Posts</h2>
        <br />
        <ul>
        {posts && posts.map((post) => (
          <li key={post.id}>
            <p>ID: <small>{post.id}</small><br />
              Titulo: <a href="#" onClick={(event) => getPost(event, post.id)}>{post.titulo}</a><br />
              <i>Autor: {post.autor}</i><br />
              <i>Data de cadastro: {post.data}</i><br /><br />
            </p>
          </li>
        ))}
        </ul>
        <br />
        <hr />
        <br />
        <h2>Obtendo dados de um post</h2>
        <br />
        {formUpdate && (
          <div>
            <form onSubmit={(event) => updatePost(event, formUpdate.id)}>
              {error && <p style={{ color: "red" }}>{errorMessage}</p>}
              <div>
                <label htmlFor="update-titulo">Titulo:</label>
                <input type="text" name="titulo" id="update-titulo" placeholder="Digite o título" value={formUpdate.titulo} onChange={changeFormUpdate} required />
              </div>
              <div>
                <label htmlFor="update-autor">Autor:</label>
                <input type="text" name="autor" id="update-autor" placeholder="Digite o autor" value={formUpdate.autor} onChange={changeFormUpdate} required />
              </div>
              <div>
                <label htmlFor="update-data">Data:</label>
                <input type="text" name="data" id="update-data" placeholder="Digite a data" value={formUpdate.data} onChange={changeFormUpdate} required />
              </div>
              <div>
                <button type="submit">Alterar dados</button> - <button type="button" onClick={() => confirmDelete(formUpdate.id, formUpdate.titulo)}>Excluir</button>
                </div>
            </form>
            <br />
          </div>
        )}
      </div>
    </>
  )
}

export default App