import React from 'react'
import './ProfileBtn.css'
import { auth } from '../../firebase'

function ProfileBtn() {
  if(auth.currentUser == null) return null;
  return (
    <>
        <div id="profile">
            <img src={auth.currentUser.photoURL} alt="Profile" id="profile-img"/>
        </div>
    </>
  )
}

export default ProfileBtn