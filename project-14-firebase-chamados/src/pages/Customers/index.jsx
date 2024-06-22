import { useState } from "react"
import { FiUser } from "react-icons/fi"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import { toast } from "react-toastify"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

export default function Customers() {
  const [formAdd, setFormAdd] = useState({
    name: "",
    cnpj: "",
    address: "",
  })

  async function handleSave(e) {
    e.preventDefault()

    if (formAdd.name.length < 3) {
      toast.error("Nome fantasia precisa ter pelo menos 3 caracteres")
      return
    }
    if (formAdd.cnpj.length < 3) {
      toast.error("CNPJ precisa ter pelo menos 3 caracteres")
      return
    }
    if (formAdd.address.length < 3) {
      toast.error("Endereço precisa ter pelo menos 3 caracteres")
      return
    }

    await addDoc(collection(db, "customers"), {
      nomeFantasia: formAdd.name,
      cnpj: formAdd.cnpj,
      address: formAdd.address,
    }).then(() => {
      setFormAdd({
        name: "",
        cnpj: "",
        address: "",
      })
      toast.success("Cadastrado com sucesso")
    }).catch((error) => {
        toast.error("Erro ao cadastrar o cliente")
        console.log(error)
      })
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Topbar title="Novo cliente"><FiUser size={24} color="#666" /></Topbar>
        <div className="box">
          <form onSubmit={handleSave}>
            <div>
              <label htmlFor="name">Nome fantasia</label>
              <input type="text" name="name" id="name" value={formAdd.name} onChange={(e) => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} placeholder="Nome da empresa" />
            </div>
            <div>
              <label htmlFor="cnpj">CNPJ</label>
              <input type="text" name="cnpj" id="cnpj" value={formAdd.cnpj} onChange={(e) => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} placeholder="CNPJ" />
            </div>
            <div>
              <label htmlFor="email">Endereço</label>
              <input type="text" name="address" id="address" value={formAdd.address} onChange={(e) => setFormAdd({ ...formAdd, [e.target.name]: e.target.value })} placeholder="Endereço" />
            </div>
            <div>
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
