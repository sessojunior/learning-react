import TopBar from "../components/TopBar"
import FormAdd from "../components/FormAdd"

import { FaTrash } from "react-icons/fa"

import { db } from "../services/firebaseConnection"
import { doc, deleteDoc, onSnapshot, query, collection, orderBy } from "firebase/firestore"

import { LinkProps } from "../App"
import { useEffect, useState } from "react"

export default function Admin() {
	const [links, setLinks] = useState<LinkProps[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsub = onSnapshot(query(collection(db, "links"), orderBy("createAt", "desc")), (snapshot) => {
			const list: LinkProps[] = []
			snapshot.forEach((doc) => {
				list.push({
					id: doc.id,
					name: doc.data().name,
					url: doc.data().url,
					bg: doc.data().bg,
					color: doc.data().color,
					createAt: doc.data().createAt,
				})
			})
			setLinks(list)
			setLoading(false)
		})
		return () => unsub()
	}, [])

	const handleDelete = async (id: string) => {
		try {
			await deleteDoc(doc(db, "links", id))
			setLinks(links.filter((link) => link.id !== id))
			alert("Link deletado com sucesso!")
		} catch (err) {
			alert("Erro ao deletar o link: " + err)
		}
	}

	return (
		<div className='text-center flex flex-col items-center'>
			<TopBar />
			<FormAdd setLinks={setLinks} setLoading={setLoading} />
			<hr className='w-80 border-gray-400 mb-4' />
			<p className='text-xl font-bold m-2'>Meus links</p>
			{loading && <p className='text-center p-8'>Carregando...</p>}
			{links.length == 0 ? (
				<p>Não ha links</p>
			) : (
				<div className='flex flex-col justify-center w-80 pt-2'>
					{links.map((link) => (
						<div key={link.id} className='px-4 py-2 m-2 rounded-md flex justify-between' style={{ backgroundColor: link.bg, color: link.color }}>
							<a href={link.url} target='_blank' rel='noopener noreferrer' className='hover:scale-105 transition-all'>
								{link.name}
							</a>
							<button className='hover:scale-125 transition-all' onClick={() => handleDelete(link.id)}>
								<FaTrash />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
