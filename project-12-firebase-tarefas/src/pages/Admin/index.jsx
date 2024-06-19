import "./admin.css"
import { useEffect, useState } from "react"
import { auth, db } from "../../firebaseConnection"
import { signOut } from "firebase/auth"
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore"

export default function Admin() {
  const [formAdd, setFormAdd] = useState({ tarefa: "" })
  const [formUpdate, setFormUpdate] = useState({ tarefa: "" })
  const [tarefas, setTarefas] = useState([])
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  useEffect(() => {
    if (auth.currentUser === null) {
      console.log("Nenhum usuário logado")
      return
    }
    async function loadPosts() {
      try {
        const taskRef = collection(db, "tarefas")
        const q = query(taskRef, orderBy("createdAt", "desc"), where("userUid", "==", auth.currentUser.uid))
        await onSnapshot(q, (snapshot) => {
          const docs = []
          snapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id })
          })
          setTarefas(docs)
          // console.log(docs)
        });
      } catch (error) {
        console.log(error)
      }
    }
    loadPosts()
  }, [])

  async function handleAddForm(e) {
    e.preventDefault()
    if (formAdd.task.trim() === "") {
      alert("Preencha a tarefa")
      return
    }
    try {
      await addDoc(collection(db, "tarefas"), {
        task: formAdd.task,
        createdAt: new Date(),
        completed: false,
        userUid: auth.currentUser.uid,
      })
      alert("Tarefa adicionada")
    } catch (error) {
      console.log("Erro ao adicionar tarefa", error)
    }
  }

  async function handleUpdateForm(e, id) {
    e.preventDefault()
    if (formUpdate.task.trim() === "") {
      alert("Preencha a tarefa")
      return
    }
    try {
      const taskRef = doc(db, "tarefas", id)
      await updateDoc(taskRef, {
        task: formUpdate.task,
        createdAt: new Date(),
        completed: false,
        userUid: auth.currentUser.uid,
      })
      alert("Tarefa alterada")
    } catch (error) {
      console.log("Erro ao alterar tarefa", error)
    }
  }

  async function handleDelete(id) {
    try {
      const taskRef = doc(db, "tarefas", id)
      await deleteDoc(taskRef)
      console.log("Tarefa concluída")
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdate(id) {
    const taskRef = doc(db, "tarefas", id)
    const docSnap = await getDoc(taskRef)
    setFormUpdate({ id: docSnap.id, task: docSnap.data().task })
    setShowUpdateForm(true)
  }

  async function handleLogout() {
    await signOut(auth)
    console.log("Fez logout")
  }

  return (
    <div className="admin">
      <h1>Minhas tarefas</h1>
      {!showUpdateForm && (
        <form onSubmit={handleAddForm}>
          <div>
            <textarea name="task" id="task" onChange={(e) => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} placeholder="Digite sua tarefa"></textarea>
            <button type="submit">Adicionar</button>
          </div>
        </form>
      )}
      {showUpdateForm && (
        <form onSubmit={(e) => handleUpdateForm(e, formUpdate.id)}>
          <div>
            <textarea name="task" id="task" onChange={(e) => setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value })} value={formUpdate.task} placeholder="Digite sua tarefa"></textarea>
            <button type="submit">Alterar tarefa</button>
            <button onClick={() => setShowUpdateForm(false)}>Cancelar</button>
          </div>
        </form>
      )}
      <div className="list">
        {tarefas.length === 0 && <p>Não há tarefas</p>}
        {tarefas.length > 0 && tarefas.map((item) => (
          <div key={item.id} className="task">
            <div><p>{item.task}</p></div>
            <div><button onClick={() => handleUpdate(item.id)}>Editar</button> <button onClick={() => handleDelete(item.id)}>Concluir</button></div>
          </div>
        ))}
      </div>
      <p><button onClick={handleLogout}>Logout</button></p>
    </div>
  )
}
