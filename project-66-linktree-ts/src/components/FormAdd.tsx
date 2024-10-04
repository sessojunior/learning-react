import { useState, useEffect } from "react"
import { db } from "../services/firebaseConnection"
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore"

import { LinkProps } from "../App"

export default function FormAdd({ setLinks, setLoading }: { setLinks: React.Dispatch<React.SetStateAction<LinkProps[]>>; setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [inputNameLink, setInputNameLink] = useState("")
	const [inputUrlLink, setInputUrlLink] = useState("")
	const [selectBgLink, setSelectBgLink] = useState("#121212")
	const [selectColorLink, setSelectColorLink] = useState("#f1f1f1")

	useEffect(() => {
		const linksRef = collection(db, "links")
		const queryRef = query(linksRef, orderBy("createAt", "desc"))
		const onsub = onSnapshot(queryRef, (snapshot) => {
			let links: LinkProps[] = []
			snapshot.forEach((doc) => {
				links.push({
					id: doc.id,
					name: doc.data().name,
					url: doc.data().url,
					bg: doc.data().bg,
					color: doc.data().color,
					createAt: doc.data().createAt,
				})
			})
			setLinks(links)
			setLoading(false)
		})

		return () => {
			onsub()
		}
	}, [])

	const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		//console.log(inputNameLink, inputUrlLink, selectBgLink, selectColorLink)

		if (inputNameLink.trim().length === 0 || inputUrlLink.trim().length === 0) {
			alert("Preencha todos os campos")
			return
		}

		try {
			await addDoc(collection(db, "links"), {
				name: inputNameLink,
				url: inputUrlLink,
				bg: selectBgLink,
				color: selectColorLink,
				createAt: new Date(),
			})
			setInputNameLink("")
			setInputUrlLink("")
			alert("Link adicionado")
		} catch (err) {
			alert("Erro ao adicionar o link: " + err)
		}
	}

	return (
		<div className='text-center flex flex-col items-center'>
			<form onSubmit={handleAdd} className='w-96'>
				<p className='text-xl font-bold mb-4'>Cadastrar link</p>
				<div className='flex flex-col items-start mb-4'>
					<label htmlFor='name'>Nome</label>
					<input type='text' name='name' id='name' value={inputNameLink} onChange={(e) => setInputNameLink(e.target.value)} required autoFocus autoComplete='username' className='border border-gray-400 px-2 py-1 rounded w-full' />
				</div>
				<div className='flex flex-col items-start mb-4'>
					<label htmlFor='url'>Url</label>
					<input type='text' name='url' id='url' value={inputUrlLink} onChange={(e) => setInputUrlLink(e.target.value)} className='border border-gray-400 px-2 py-1 rounded w-full' />
				</div>
				<div className='flex items-start gap-4 mb-4'>
					<label htmlFor='bg'>Fundo</label>
					<input type='color' name='bg' id='bg' value={selectBgLink} onChange={(e) => setSelectBgLink(e.target.value)} className='border border-gray-400 px-2 py-1 rounded w-full' />
					<label htmlFor='color'>Cor</label>
					<input type='color' name='color' id='color' value={selectColorLink} onChange={(e) => setSelectColorLink(e.target.value)} className='border border-gray-400 px-2 py-1 rounded w-full' />
				</div>
				{inputNameLink && inputUrlLink && selectBgLink && selectColorLink && (
					<div className='text-center flex flex-col items-center border border-gray-400 px-2 py-4 mt-8 mb-4 w-96 rounded'>
						<p>Veja como está ficando:</p>
						<div className='flex flex-col justify-center w-80 pt-2'>
							<a href={inputUrlLink} target='_blank' style={{ backgroundColor: selectBgLink, color: selectColorLink }} className='px-4 py-2 m-2 rounded-md hover:scale-105 transition-all'>
								{inputNameLink}
							</a>
						</div>
					</div>
				)}
				<div className='mb-8'>
					<button type='submit' className='border border-blue-500 rounded py-2 px-8 text-white bg-blue-500 hover:bg-blue-600'>
						Cadastrar
					</button>
				</div>
			</form>
		</div>
	)
}
