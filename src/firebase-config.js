import { initializeApp } from 'firebase/app'

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAWkGj3uwm06HlSMgLdQuhwoPCkUZkPQIk',
  authDomain: 'spark-e53fb.firebaseapp.com',
  projectId: 'spark-e53fb',
  storageBucket: 'spark-e53fb.appspot.com',
  messagingSenderId: '2107683198',
  appId: '1:2107683198:web:4bf34429a0e1320327432f',
  measurementId: 'G-G99S0C72H5',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const credential = GoogleAuthProvider.credentialFromResult(res)
    const googleToken = credential.accessToken
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: user.displayName,
      authProvider: 'google',
      email: user.email,
      googleToken: googleToken,
    })
  } catch (err) {
    console.error('', err)
    alert(err.message)
  }
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    })
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert('Password reset link sent!')
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

const logout = () => {
  signOut(auth)
}

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
}
