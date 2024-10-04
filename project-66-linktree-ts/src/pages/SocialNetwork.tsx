import { useEffect, useState } from "react"
import TopBar from "../components/TopBar"

import { db } from "../services/firebaseConnection"
import { setDoc, doc, getDoc } from "firebase/firestore"

export default function SocialNetwork() {
	const [inputFacebook, setInputFacebook] = useState("")
	const [inputInstagram, setInputInstagram] = useState("")
	const [inputYoutube, setInputYoutube] = useState("")

	useEffect(() => {
		async function loadLinks() {
			try {
				const docRef = doc(db, "social", "links")
				const docSnap = await getDoc(docRef)

				if (docSnap.exists()) {
					setInputFacebook(docSnap.data()?.facebook)
					setInputInstagram(docSnap.data()?.instagram)
					setInputYoutube(docSnap.data()?.youtube)
				}
			} catch (error) {
				console.log(error)
			}
		}

		loadLinks()
	}, [])

	const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// console.log(inputFacebook, inputInstagram, inputYoutube)

		// if (inputFacebook.trim().length === 0 || inputInstagram.trim().length === 0 || inputYoutube.trim().length === 0) {
		// 	alert("Preencha todos os campos")
		// 	return
		// }

		try {
			await setDoc(doc(db, "social", "links"), {
				facebook: inputFacebook,
				instagram: inputInstagram,
				youtube: inputYoutube,
			})
			alert("Links atualizados")
		} catch (error) {
			alert("Erro ao adicionar o link: " + error)
		}
	}

	return (
		<div className='text-center flex flex-col items-center'>
			<TopBar />
			<p className='text-2xl font-bold p-4'>Minhas redes sociais</p>
			<div className='flex flex-col justify-center w-80 pt-2'>
				<form onSubmit={handleAdd}>
					<div className='flex flex-col items-start mb-2'>
						<label htmlFor='facebook' className='pb-1'>
							Link do Facebook
						</label>
						<input type='text' name='facebook' value={inputFacebook} onChange={(e) => setInputFacebook(e.target.value)} id='email' required autoFocus placeholder='Digite a url do facebook' className='border border-gray-400 px-2 py-1 rounded w-full' />
					</div>
					<div className='flex flex-col items-start mb-4'>
						<label htmlFor='instagram' className='pb-1'>
							Link do Instagram
						</label>
						<input type='text' name='text' value={inputInstagram} onChange={(e) => setInputInstagram(e.target.value)} id='password' required autoFocus placeholder='Digite a url do instagram' className='border border-gray-400 px-2 py-1 rounded w-full' />
					</div>
					<div className='flex flex-col items-start mb-4'>
						<label htmlFor='youtube' className='pb-1'>
							Link do Youtube
						</label>
						<input type='text' name='text' value={inputYoutube} onChange={(e) => setInputYoutube(e.target.value)} id='password' required autoFocus placeholder='Digite a url do youtube' className='border border-gray-400 px-2 py-1 rounded w-full' />
					</div>
					<div className='mb-4'>
						<button type='submit' className='border border-blue-500 rounded py-2 px-8 text-white bg-blue-500 hover:bg-blue-600'>
							Salvar links
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
