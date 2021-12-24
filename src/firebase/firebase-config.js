import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2AezgM0dYiJB02sPN4NpHaneGihwb-jo",
    authDomain: "react-hooks-course-2d060.firebaseapp.com",
    projectId: "react-hooks-course-2d060",
    storageBucket: "react-hooks-course-2d060.appspot.com",
    messagingSenderId: "867797147795",
    appId: "1:867797147795:web:a7ac0c9cd7c8485db72d66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export{
    db,
    googleAuthProvider,
    app
}
