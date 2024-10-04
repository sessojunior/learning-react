import { LinkProps } from "../App"
import { useEffect, useState } from "react"

import { getDocs, collection, orderBy, query } from "firebase/firestore"
import { db } from "../services/firebaseConnection"

export default function Home() {
	const [links, setLinks] = useState<LinkProps[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		function loadLinks() {
			const linksRef = collection(db, "links")
			const queryRef = query(linksRef, orderBy("createAt", "asc"))
			getDocs(queryRef).then((snapshot) => {
				let lista: LinkProps[] = []
				snapshot.forEach((link) => {
					lista.push({
						id: link.id,
						name: link.data().name,
						url: link.data().url,
						bg: link.data().bg,
						color: link.data().color,
						createAt: link.data().createAt,
					})
				})
				setLinks(lista)
				setLoading(false)
			})
		}
		loadLinks()
	}, [])

	return (
		<div className='text-center flex flex-col items-center'>
			<p>Veja meus links abaixo:</p>
			{loading ? (
				<p className='text-center p-8'>Carregando...</p>
			) : (
				<>
					{links.length == 0 ? (
						<p>Não ha links</p>
					) : (
						<div className='flex flex-col justify-center w-80 pt-2'>
							{links.map((link) => (
								<a key={link.id} href={link.url} target='_blank' className='px-4 py-2 m-2 rounded-md hover:scale-105 transition-all' style={{ backgroundColor: link.bg, color: link.color }}>
									{link.name}
								</a>
							))}
						</div>
					)}
				</>
			)}
		</div>
	)
}
