import React from 'react'
import './SignOut.css'
import { signOut } from "firebase/auth";
import {auth} from './../../firebase'

import logOutBTN from '../../assets/logOut.png'
import closeImg from '../../assets/close.png'

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


function SignOut({ isOpen, onClose }) {
  if(!isOpen) return null;
  console.log("signOUT component")
  const handleLogOut = () => {

    signOut(auth).then(() => {
        console.log("Logout Successful!")
    }).catch((error) => {
        console.log("Error Logging Out...")
    });
  }

  useGSAP(()=>{
    gsap.from('#log-out-menu',{
      x: '-100%',
      duration: 0.2
    })
  })

  return (
    <>
        <div id="log-out-menu">
          <div id="log-out-menu-container">
          <div id="log-out-btn" onClick={handleLogOut} >
            <img src={logOutBTN} id="log-out-btn-img" />
            <p id="log-out-btn-label">Log Out</p>
          </div>
          <img onClick={onClose} id="log-out-menu-close-btn" src={closeImg} />
          </div>
        </div>
    </>
  )
}

export default SignOut