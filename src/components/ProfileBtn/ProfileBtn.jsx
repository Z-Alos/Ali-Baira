import React, { useState, useEffect } from 'react'
import './ProfileBtn.css'
import { auth } from '../../firebase'
import { useNavigate, useLocation } from 'react-router-dom'
import SignOut from './../SignOut/SignOut'

function ProfileBtn() {
  if (!auth.currentUser) return null;

  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/home");
  };

  const handleProfileClick = () => {
    openModal();
    navigate('#menu');
  };

  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (location.hash !== '#menu' && isModalOpen) {
      closeModal();
    }
  }, [location]);

  return (
    <>
      <div onClick={handleProfileClick} id="profile">
        <img src={auth.currentUser.photoURL} id="profile-img" alt="Profile" />
      </div>
      <SignOut isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

export default ProfileBtn
