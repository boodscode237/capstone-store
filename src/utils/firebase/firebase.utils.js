import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
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

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider)
}

export const db = getFirestore()


export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date()
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch(e){
            console.log('error creating the user', e.message)
        }
    }
    return userDocRef

//    If user data exists


    // return userDocRef
}




