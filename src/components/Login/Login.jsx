import React from 'react'
import './Login.css'
import { useEffect } from 'react'
import { getRedirectResult, browserSessionPersistence, setPersistence, updateCurrentUser } from "firebase/auth";
import { signInWithGoogleRedirect, auth, createUserDocumentFromAuth } from '../../firebase'

function Login() {
    if(auth.currentUser != null) return null;
    useEffect(() => {
        async function getRes(){
            setPersistence(auth, browserSessionPersistence)
            const response = await getRedirectResult(auth);
        
            if (response){
                const userDocRef = await createUserDocumentFromAuth(response.user)
            }
        }
        getRes()
    }, [])
    
  return (
    <>
        <button onClick={signInWithGoogleRedirect} id="sign-in-with-google-redirect">Log In</button>
    </>
  )
}

export default Login