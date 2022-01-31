// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import "firebase/compat/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSKlSpCN9qOp93r0TvLzp6Zd1uq9DqPuc",
    authDomain: "flipkartclone-96945.firebaseapp.com",
    projectId: "flipkartclone-96945",
    storageBucket: "flipkartclone-96945.appspot.com",
    messagingSenderId: "785303513194",
    appId: "1:785303513194:web:1200280ed1a3ee4cfe4213",
    measurementId: "G-DMJR9H0PP3"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()
export { auth, provider }
export default db