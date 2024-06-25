import styles from './home.module.css'
import { Header } from '../../components/header'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { deleteAddress } from '../../redux/user/slice'

export function Home() {

  const { user } = useSelector((rootReducer) => rootReducer.user)
  console.log(user)

  const dispatch = useDispatch()

  function handleDeleteAddress() {
    dispatch(deleteAddress())
    alert("Endereço deletado com sucesso!")
  }

  return (
    <>
    <Header/>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Login
          </Link>
          <Link to="/painel" className={styles.link}>
            Painel
          </Link>
          <Link to="/address" className={styles.link}>
            Meus endereços
          </Link>
        </nav>

        <main className={styles.content}>
          <div className={styles.message}>
            <h1 className={styles.title}>
              Olá {user ? user.name : 'visitante'}, bem vindo!
            </h1>

            {user && user.email && (
              <span>Email: {user.email}</span>
            )}

            {user && user.address && (
              <>
                <strong className={styles.addressLabel}>Endereço atual:</strong>
                <div className={styles.address}>
                  <p>{user.address.location} {user.address.number}</p>
                  <button onClick={handleDeleteAddress}>Deletar endereço</button>
                </div>
              </>
            )}

          </div>

        </main>
      </div>
    </>
  )
}
