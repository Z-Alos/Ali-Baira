import React, { useState } from 'react'
import './Options.css'
import SelectLibrary from '../SelectLibrary/SelectLibrary';
import { useNavigate } from 'react-router-dom';

import { doc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth, storage } from '../../../firebase';
import { ref, deleteObject } from "firebase/storage";

import downImg from '../../../assets/player/down.png'
import addImg from '../../../assets/player/add.png'
import deleteImg from '../../../assets/delete.png'

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Options({ isOpen, onClose, details, index }) {
    if(!isOpen) return null;
    const [isLoaded, setIsLoaded] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate()

    let userRefID = "UserSampleData"
    if(auth.currentUser) {
        userRefID = auth.currentUser.uid
    }else{
        userRefID = "UserSampleData"
    }

    useGSAP(()=>{
        gsap.from('#options',{
            y: '100%',
            duration: 0.2
        })
    })

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log("close modal")
        setIsModalOpen(false);
    };
 
    let brokenImage = {
        opacity: isLoaded ? 1 : 0
    }

    const handleBrokenImage = () => {
        console.log("lol ho gaya bhai")
        setIsLoaded(false)  
    }

    const handleImageLoad = () => {
        setIsLoaded(true)  
    }

    const openSelectLibrary = () => {
        setIsModalOpen(true)
    }

    async function handleAddToPlaylist(libraryID){
        setIsModalOpen(false);
        const fields = {
          playlistID:libraryID,
          createdAt:serverTimestamp()
        }
    
        try{
            console.log(details[index].songID)
            const songID = details[index].songID
            const userLibraryRef = doc(db, "users", userRefID, "userLibrary", libraryID);
            const newDocRef = doc(userLibraryRef, "songs", songID);
            await setDoc(newDocRef, fields);

            console.log("Added to Playlist")
        }
        catch(e){
            console.log("ERROR Adding to PLAYLIST!!! ", e)
        }
        onClose();
      };

    async function handleDeleteSong() {
        try {
            const songID = details[index].songID
            const coverRef = ref(storage, `users/${userRefID}/coverPhoto/${songID}`);
            await deleteObject(coverRef);

            const audioRef = ref(storage, `users/${userRefID}/audioFile/${songID}`);
            await deleteObject(audioRef);

            const songDocRef = doc(db, `users/${userRefID}/songCollection/${songID}`);
            await deleteDoc(songDocRef);
            console.log("Song::Deleted...", songID);

            window.location.reload();
        } catch (error) {
            console.error("Error deleting song: ", error);
        }
    }


  return (
    <>              
        <div id="options">
            <div onClick={onClose} id="option-song">
            <div className="lv-item">
                <div id="lv-cover">
                    <svg className='lv-music-icon' data-encore-id="icon" role="img" aria-hidden="true" data-testid="track" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>                
                    <img id='op-cover-img' style={brokenImage} src={details[index].coverURL} alt="Cover" onError={handleBrokenImage} onLoad={handleImageLoad}/>
                </div>
                <div className="lv-details lv-details-mod">
                    <p className="lv-songName">{details[index].songName}</p>
                    <p className="lv-artistName">{details[index].artistName}</p>
                </div>
            </div>
            <img id="close-options" className='icons' src={downImg} alt="" />

            </div>
            <div id="option-list">
                <div onClick={openSelectLibrary} className='option-list-item' id="add-to-playlist">
                    <img className='icons' src={addImg} alt="+" />
                    <p className="option-label">Add to Playlist</p>
                </div>
                <div onClick={handleDeleteSong} className='option-list-item' id="delete-song">
                    <img className='icons' src={deleteImg} alt="-" />
                    <p className="option-label">Delete</p>
                </div>
                
            </div>
        </div>
        <SelectLibrary isSelectionOpen={isModalOpen} onSelectionClose={handleAddToPlaylist} songID={details[index].songID}/>
    </>
  )
}

export default Options