
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwO6cEntpoSYRqcgB4WGtFGOgQFS8jT_A",
    authDomain: "crown-clothing-db-99e83.firebaseapp.com",
    projectId: "crown-clothing-db-99e83",
    storageBucket: "crown-clothing-db-99e83.appspot.com",
    messagingSenderId: "1066353147997",
    appId: "1:1066353147997:web:33b4f500d79c0bb4434db4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, googleProvider)
}

export const db = getFirestore()


export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if(!userAuth) return
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date()
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch(e){
            console.log('error creating the user', e.message)
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

    return createUserWithEmailAndPassword(auth, email, password)
}



