
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
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

export const addCollectionsAndDocuments = async(
    collectionKey,
    objectsToAdd,
    field='title') => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object[field].toLocaleLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')

}

export const getCatecoriesAndDocuments = async() => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data()
        acc[title.toLocaleLowerCase()] = items
        return acc;
    }, {})

    return categoryMap
}


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

   return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

   return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => {
    return await signOut(auth)
}


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,  callback)

