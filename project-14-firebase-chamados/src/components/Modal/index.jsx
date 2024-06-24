import { FiX } from "react-icons/fi"
import "./modal.css"
import PropTypes from "prop-types"
import { format } from "date-fns"

export default function Modal({ details, setShowModal }) {

  const { created, customer, description, status, subject } = details
  const createdFormated = format(created.toDate(), "dd/MM/yyyy HH:mm:ss")
  const statusColor = status === "Aberto" ? "status red" : status === "Progresso" ? "status green" : "status gray"
  // console.log(details)
  // console.log(setShowModal)

  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={() => setShowModal(false)}><FiX size={25} color="#fff" /> <span>Voltar</span></button>
        <main>
          <h2>Detalhes do chamado</h2>
          <div className="row">
            <span>Cliente: <i>{customer}</i></span>
          </div>
          <div className="row">
            <span>Assunto: <i>{subject}</i></span>
            <span>Cadastrado em: <i>{createdFormated}</i></span>
          </div>
          <div className="row">
            <span>Status: <span className={statusColor}>{status}</span></span>
          </div>
          <div className="row">
            <span>Complemento: </span>
          </div>
          <div className="row">
            <p>{description ? description : "Sem descrição"}</p>
          </div>
        </main>
      </div>
    </div>
  )
}

Modal.propTypes = {
  details: PropTypes.object,
  setShowModal: PropTypes.func
}