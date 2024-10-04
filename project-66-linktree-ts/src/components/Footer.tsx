import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa"

import { db } from "../services/firebaseConnection"
import { getDocs, collection } from "firebase/firestore"
import { useEffect, useState } from "react"

type SocialProps = {
	facebook: string
	youtube: string
	instagram: string
}

export default function Footer() {
	const [social, setSocial] = useState<SocialProps | null>(null)

	useEffect(() => {
		async function loadSocial() {
			const socialRef = collection(db, "social")
			const socialSnapshot = await getDocs(socialRef)
			setSocial(socialSnapshot.docs.map((doc) => doc.data() as SocialProps)[0])
		}

		loadSocial()
	}, [])

	return (
		<div className='p-4 text-center'>
			<ul className='flex justify-center gap-4 text-xl'>
				<li>
					<a href={social?.youtube} target='_blank' rel='noopener noreferrer'>
						<FaYoutube />
					</a>
				</li>
				<li>
					<a href={social?.facebook} target='_blank' rel='noopener noreferrer'>
						<FaFacebook />
					</a>
				</li>
				<li>
					<a href={social?.instagram} target='_blank' rel='noopener noreferrer'>
						<FaInstagram />
					</a>
				</li>
			</ul>
		</div>
	)
}
