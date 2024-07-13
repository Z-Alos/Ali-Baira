import React from 'react'
import './Login.css'
import { useEffect } from 'react'
import { getRedirectResult, browserSessionPersistence, setPersistence, updateCurrentUser } from "firebase/auth";
import { signInWithGoogleRedirect, auth, createUserDocumentFromAuth } from '../../firebase'

function Login() {
    
  return (
    <>
        <button onClick={signInWithGoogleRedirect} id="sign-in-with-google-redirect">Log In</button>
    </>
  )
}

export default Login