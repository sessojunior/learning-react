import { useContext } from "react"
import { ProfileContext } from "../contexts/Profile"

const User = () => {
  const { profile, setProfile } = useContext(ProfileContext)

  return (
    <>
      <h4>Perfil do usuário</h4>
      <p>Nome: {profile.name}</p> <p>Idade: {profile.age}</p>
      <button onClick={() => setProfile({ name: 'Mario', age: 42 })}>Mudar nome e idade</button>
    </>
  )
}

export default User