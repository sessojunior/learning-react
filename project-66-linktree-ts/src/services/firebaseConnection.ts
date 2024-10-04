import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyDUdNywr-4WEJ_07bQFtcXsoSSpr0lwMYo",
	authDomain: "linktree-c20b9.firebaseapp.com",
	projectId: "linktree-c20b9",
	storageBucket: "linktree-c20b9.appspot.com",
	messagingSenderId: "863031002962",
	appId: "1:863031002962:web:6d29b7e278cef0061a9c8b",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { db, auth }
