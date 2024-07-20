import React, { useState } from 'react'
import './ProfileBtn.css'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import SignOut from './../SignOut/SignOut'

function ProfileBtn() {
  if(!auth.currentUser) return null;

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      console.log("close modal")
      setIsModalOpen(false);
      navigate("/home")
  };

  const handleProfileClick = () => {
    openModal()
    navigate('#menu')
  }
  
  return (
    <>
        <div onClick={handleProfileClick} id="profile">
            <img src={auth.currentUser.photoURL} id="profile-img"/>
        </div>
        <SignOut isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

export default ProfileBtn