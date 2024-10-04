import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { auth } from "../services/firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth"

export default function Login() {
	const [inputEmail, setInputEmail] = useState("")
	const [inputPassword, setInputPassword] = useState("")
	const navigate = useNavigate()

	const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (inputEmail.trim().length === 0 || inputPassword.trim().length === 0) {
			alert("Preencha todos os campos")
			return
		}

		signInWithEmailAndPassword(auth, inputEmail, inputPassword)
			.then(() => {
				console.log("Login efetuado com sucesso!")
				navigate("/admin", { replace: true })
			})
			.catch((error) => {
				console.log("Erro ao fazer o login:", error)
				if (error.code === "auth/invalid-credential") {
					alert("Usuário ou e-mail inválido")
				}
			})
	}

	return (
		<div className='text-center flex flex-col items-center'>
			<p>Faça login abaixo:</p>
			<div className='flex flex-col justify-center w-80 pt-2'>
				<form onSubmit={handleSignin}>
					<div className='flex flex-col items-start mb-2'>
						<label htmlFor='email' className='pb-1'>
							E-mail
						</label>
						<input type='email' name='email' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} id='email' required autoFocus autoComplete='username' className='border border-gray-400 px-2 py-1 rounded w-full' />
					</div>
					<div className='flex flex-col items-start mb-4'>
						<label htmlFor='email' className='pb-1'>
							Senha
						</label>
						<input type='password' name='password' value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} id='password' required autoFocus autoComplete='username' className='border border-gray-400 px-2 py-1 rounded w-full' />
					</div>
					<div className='mb-4'>
						<button type='submit' className='border border-blue-500 rounded py-2 px-8 text-white bg-blue-500 hover:bg-blue-600'>
							Entrar
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
