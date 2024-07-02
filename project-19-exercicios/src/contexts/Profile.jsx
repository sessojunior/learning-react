import { createContext, useState } from 'react'
import { PropTypes } from 'prop-types'

export const ProfileContext = createContext()

export default function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    name: 'Luis',
    age: 30
  })
  return (
    <ProfileContext.Provider value={{profile, setProfile}}>
      {children}
    </ProfileContext.Provider>
  )
}

ProfileProvider.propTypes = {
  children: PropTypes.node
}
