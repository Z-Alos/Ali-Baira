import React from 'react'
import './Login.css'
import { signInWithGoogleRedirect } from '../../firebase'

import googleIMG from '../../assets/google.png'

function Login() {

  const handleSignIn = () =>{
    console.log("how are you")
    signInWithGoogleRedirect()
  }
    
  return (
    <>
        <div onClick={handleSignIn} id="sign-in-with-google-redirect">
          <img id="sign-in-btn-logo" src={googleIMG} />
          <p id="sign-in-btn-label">Sign In</p>
        </div>
    </>
  )
}

export default Login