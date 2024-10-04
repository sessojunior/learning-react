import { auth } from "../services/firebaseConnection"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

type PrivateProps = {
	children: React.ReactNode
}

export default function Private({ children }: PrivateProps) {
	const [loading, setLoading] = useState(true)
	const [signIn, setSignIn] = useState(false)

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (!user) {
				setLoading(false)
				setSignIn(false)
			} else {
				const userDate = {
					uid: user?.uid,
					email: user?.email,
				}
				localStorage.setItem("linktree-user", JSON.stringify(userDate))
				setLoading(false)
				setSignIn(true)
			}
			//console.log(user)
		})

		return () => {
			unsub()
		}
	}, [])

	if (loading) {
		return <p className='text-center p-8'>Carregando...</p>
	}

	if (!signIn) {
		return <Navigate to='/login' />
	}

	return <>{children}</>
}
