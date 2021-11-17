import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCGCd3Lpy0GW1m-WFy6TU9CfciOVcGd-XQ",
    authDomain: "h2-firebase-8b64e.firebaseapp.com",
    projectId: "h2-firebase-8b64e",
    storageBucket: "h2-firebase-8b64e.appspot.com",
    messagingSenderId: "785760414723",
    appId: "1:785760414723:web:d343655cce27a712e0b236"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);