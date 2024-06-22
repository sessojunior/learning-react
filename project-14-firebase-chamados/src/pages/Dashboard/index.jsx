import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import { FiHome, FiEdit2, FiSearch } from "react-icons/fi"
import "./table.css"

import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { AuthContext } from "../../contexts/AuthContext"

import { format } from "date-fns"

export default function Dashboard() {
  const [tickets, setTickets] = useState([])
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [lastDoc, setLastDoc] = useState(null)
  const [loadingMore, setLoadingMore] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const limitItems = 5

  async function querySnapshot(query) {
    await getDocs(query)
      .then((snapshot) => {
        const list = []
        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            customer: doc.data().customer,
            subject: doc.data().subject,
            status: doc.data().status,
            created: doc.data().created.toDate(),
            createdFormated: format(doc.data().created.toDate(), "dd/MM/yyyy"),
            userId: doc.data().userId,
          })
        })
        //console.log("lastDoc", snapshot.docs[snapshot.docs.length - 1])
        setLastDoc(snapshot.docs[snapshot.docs.length - 1])
        setTickets(tickets => [...tickets, ...list])
        if (snapshot.size === 0) {
          setIsEmpty(true)
        }
        setLoading(false)
        setLoadingMore(false)
      }).catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }
  
  async function handleLoadMore() {
    setLoadingMore(true)
    const q = query(collection(db, "tickets"), orderBy("created", "desc"), startAfter(lastDoc), limit(limitItems), where("userId", "==", user.uid))
    await querySnapshot(q)
  }

  useEffect(() => {
    async function loadTickets() {
      const q = query(collection(db, "tickets"), orderBy("created", "desc"), limit(limitItems), where("userId", "==", user.uid))
      await querySnapshot(q)
    }
    loadTickets()
    console.log("tickets", tickets)
    console.log("loading", loading)
  }, [])

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Topbar title="Chamados"><FiHome size={24} color="#666" /></Topbar>
        <div className="header">
          <Link to="/new">Novo chamado</Link>
        </div>
        {loading ? (
          <div>
            <p>Carregando...</p>
          </div>
        ) : (
          tickets.length === 0 ? (
            <div>
              <p>Não há chamados...</p>
            </div>
          ) : (
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Assunto</th>
                    <th scope="col">Status</th>
                    <th scope="col">Data de cadastro</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((item) => (
                    <tr key={item.id}>
                      <td data-label="Cliente">{item.customer}</td>
                      <td data-label="Assunto">{item.subject}</td>
                      <td data-label="Status">
                        <span className={
                          (item.status === "Aberto"
                            ? "badge red"
                            : (item.status === "Progresso")
                              ? "badge green"
                              : "badge"
                          )}>{item.status}</span>
                      </td>
                      <td data-label="Cadastrando">{item.createdFormated}</td>
                      <td data-label="">
                        <div className="buttons">
                          <button className="blue">
                            <FiSearch size={18} color="#fff" />
                          </button>
                          <Link to={`/new/${item.id}`} className="orange">
                            <FiEdit2 size={18} color="#fff" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="load-more">
                {loadingMore && <p>Carregando mais chamados...</p>}
                {!loadingMore && !isEmpty && <button onClick={handleLoadMore}>Carregar mais chamados</button>}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
