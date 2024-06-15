import React from 'react'
import './SignOut.css'
import { getAuth, signOut } from "firebase/auth";


function SignOut() {

    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });

  return (
    <>
        
    </>
  )
}

export default SignOut