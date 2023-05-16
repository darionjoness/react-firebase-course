import React, {useState} from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log(auth?.currentUser?.email)

  // Create signIn function
  const signIn = async () => {
    try {
      // Pass auth, email, and password to createUserWithEmailAndPassword function
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      // throw error to console if error
      console.error(error)
    }
  }

  // Create signInWith google function
  const signInWithGoogle = async () => {
    try {
      // Run signInWithPopup and pass in auth and googleProvider
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      // Throw error to console if error
      console.error(error)
    }
  }

  // Create logout function
  const logout = async () => {
    try {
      // Run signout and pass through auth
      await signOut(auth)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
        <input type="text" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} value={password} />
        <button onClick={signIn}>Sign In</button>

        <button onClick={signInWithGoogle}>Sign in with google</button>

        <button onClick={logout}> Logout </button>
    </div>
  )
}

export default Auth 