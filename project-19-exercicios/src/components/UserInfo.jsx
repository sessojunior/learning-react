import { useEffect } from "react"
import PropTypes from "prop-types"

export default function UserInfo({ userInfo }) {
  useEffect(() => {
    function getUserInfo() {
      document.title = `${userInfo.name} - ${userInfo.age} anos`
    }
    getUserInfo()
  }, [userInfo])

  return (
    <div>
      <h4>Informações do usuário</h4>
      <p>Este componente utiliza useEffect para alterar o título da aba do navegador.</p>
      <p>Nome: {userInfo.name} - Idade: {userInfo.age} anos</p>
    </div>
  )
}

UserInfo.propTypes = {
  userInfo: PropTypes.object
}
