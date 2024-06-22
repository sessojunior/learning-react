import { FiHome } from "react-icons/fi";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useContext, useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom"

export default function New() {
  const [customers, setCustomers] = useState([])
  const initialFormAdd = {
    customer: "",
    subject: "Suporte",
    status: "Aberto",
    description: "",
  }
  const [formAdd, setFormAdd] = useState(initialFormAdd)
  const [idNotExists, setIdNotExists] = useState(true)
  const { user } = useContext(AuthContext)

  const { id } = useParams()

  useEffect(() => { 
    async function loadCustomers() {
      await getDocs(collection(db, "customers")).then((snapshot) => {
        let list = []
        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            nomeFantasia: doc.data().nomeFantasia
          })
        })
        setCustomers(list)
        setFormAdd({ ...formAdd, customer: list[0].nomeFantasia })
        if (snapshot.docs.size === 0) {
          console.log("Nenhum cliente encontrado")
        }
        
        console.log("id", id)
        if (id) {
          loadTicket()
        }
      }).catch((error) => {
        console.log("Ocorreu um erro ao obter os clientes: ", error)
      })
    }
    loadCustomers()
  }, [id])

  async function loadTicket() {
    const docRef = doc(db, "tickets", id)
    await getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.data() === undefined) {
          setIdNotExists(true)
          console.log("Ticket não encontrado")
        } else {
          setFormAdd({ ...snapshot.data(), id: snapshot.id })
          setIdNotExists(false)
        }
      }).catch((error) => {
        console.log("Ocorreu um erro ao obter o ticket: ", error)
      })
  }

  async function handleAdd(e) {
    e.preventDefault()
    //console.log(formAdd)

    if (formAdd.customer === "" || formAdd.description === "") {
      alert("Preencha todos os campos")
      return
    }

    await addDoc(collection(db, "tickets"), {
      created: new Date(),
      customer: formAdd.customer,
      subject: formAdd.subject,
      status: formAdd.status,
      description: formAdd.description,
      userId: user.uid,
    }).then(() => {
      toast.success("Chamado adicionado com sucesso")
      setFormAdd(initialFormAdd)
    }).catch((error) => {
      toast.error("Erro ao adicionar o chamado")
      console.log("Erro ao adicionar o chamado: ", error)
    })
  }

  async function handleUpdate(e) {
    e.preventDefault()
    await updateDoc(doc(db, "tickets", id), {
      customer: formAdd.customer,
      subject: formAdd.subject,
      status: formAdd.status,
      description: formAdd.description,
      userId: user.uid,
    }).then(() => {
      toast.success("Chamado editado com sucesso")
    }).catch((error) => {
      toast.error("Erro ao editar o chamado")
      console.log("Erro ao editar o chamado: ", error)
    })
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Topbar title={idNotExists ? "Novo chamado" : "Editar chamado"}><FiHome size={24} color="#666" /></Topbar>
        <div className="box">
          <form onSubmit={idNotExists ? handleAdd : handleUpdate}>
            <div>
              <label htmlFor="customer">Cliente</label>
              <select name="customer" id="customer" onChange={e => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} value={formAdd.customer}>
                {customers.length === 0 ? (
                  <option readOnly>Carregando lista de clientes...</option>
                ) : (
                  customers.map((item) => (
                    <option key={item.id} value={item.nomeFantasia}>{item.nomeFantasia}</option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label htmlFor="subject">Assunto</label>
              <select name="subject" id="subject" onChange={e => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} value={formAdd.subject}>
                <option key={1} value="Suporte">Suporte</option>
                <option key={2} value="Visita técnica">Visita técnica</option>
                <option key={3} value="Financeiro">Financeiro</option>
              </select>
            </div>
            <div>
              <label htmlFor="status">Status</label>
              <div className="input-radios">
                <input type="radio" name="status" value="Aberto" id="status-open" onChange={e => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} checked={formAdd.status === "Aberto"} /> <label htmlFor="status-open">Em aberto</label>
                <input type="radio" name="status" value="Progresso" id="status-progress" onChange={e => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} checked={formAdd.status === "Progresso"} /> <label htmlFor="status-progress">Em progresso</label>
                <input type="radio" name="status" value="Atendido" id="status-finished" onChange={e => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} checked={formAdd.status === "Atendido"} /> <label htmlFor="status-finished">Atendido</label>
              </div>
            </div>
            <div>
              <label htmlFor="description">Complemento</label>
              <textarea name="description" id="description" placeholder="Descreva o chamado" cols="30" rows="6" onChange={e => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} value={formAdd.description}></textarea>
            </div>
            <div>
              <button type="submit">{idNotExists ? "Cadastrar" : "Salvar alterações"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}