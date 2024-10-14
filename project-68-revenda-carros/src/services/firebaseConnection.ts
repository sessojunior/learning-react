import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
	apiKey: import.meta.env.APIKEY,
	authDomain: import.meta.env.AUTHDOMAIN,
	projectId: import.meta.env.PROJECTID,
	storageBucket: import.meta.env.STORAGEBUCKET,
	messagingSenderId: import.meta.env.MESSAGINGSENDERID,
	appId: import.meta.env.APPID,
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage }
