import styles from './home.module.css'
import { Header } from '../../components/header'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { deleteAddress, fetchUserById, fetchUsers } from '../../redux/user/slice'

export function Home() {

  const { user, users, loading } = useSelector((rootReducer) => rootReducer.user)
  console.log("user", user)
  console.log("users", users)

  const dispatch = useDispatch()

  function handleDeleteAddress() {
    dispatch(deleteAddress())
    alert("Endereço deletado com sucesso!")
  }

  function handleFetchUsers() {
    dispatch(fetchUsers())
  }

  function handleFetchUserById() {
    const id = 7
    dispatch(fetchUserById(id))
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

            <hr />
            <br />

            <h2>Lista de usuários</h2>
            <button onClick={handleFetchUsers}>Buscar usuários</button>
            <button onClick={handleFetchUserById}>Buscar usuário com ID</button>
            <br />

            {loading && <p>Carregando...</p>}

            {!loading && users.map((user) => (
              <div key={user.id}>
                <p>ID: {user.id}
                  <br />
                  Nome: {user.name}
                  <br />
                  Email: {user.email}
                  <br /><br />
                </p>
              </div>
            ))}

          </div>

        </main>
      </div>
    </>
  )
}
