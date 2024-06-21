import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Criar um arquivo ".env" na raiz da aplicação e colocar o seguinte conteúdo: VITE_FIREBASE_API_KEY=[CHAVE_DE_API] substituindo [CHAVE_DE_API] pela apiKey gerada pelo Firebase em Configurações do projeto
// O arquivo .env não é enviado para o GitHub (é ignorado no .gitignore)
const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
//console.log(FIREBASE_API_KEY);

const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: "cursoreact-sessojunior.firebaseapp.com",
	projectId: "cursoreact-sessojunior",
	storageBucket: "cursoreact-sessojunior.appspot.com",
	messagingSenderId: "1006504453096",
	appId: "1:1006504453096:web:a04a849a176e231fa07a5d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
