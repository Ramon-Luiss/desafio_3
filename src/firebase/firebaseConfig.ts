// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDVJMX2KhvfyyLvgEb8WBaVTmdqlXY399I",
    authDomain: "desafio-8cb1b.firebaseapp.com",
    projectId: "desafio-8cb1b",
    storageBucket: "desafio-8cb1b.firebasestorage.app",
    messagingSenderId: "254735822741",
    appId: "1:254735822741:web:4f78c158eb8428c20e909c",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut };