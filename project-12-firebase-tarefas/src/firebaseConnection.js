import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
	authDomain: "cursoreact-sessojunior.firebaseapp.com",
	projectId: "cursoreact-sessojunior",
	storageBucket: "cursoreact-sessojunior.appspot.com",
	messagingSenderId: "1006504453096",
	appId: "1:1006504453096:web:a04a849a176e231fa07a5d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
