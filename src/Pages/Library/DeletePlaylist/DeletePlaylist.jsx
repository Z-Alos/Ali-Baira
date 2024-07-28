import React, { useState } from 'react'

import { doc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../../../firebase'

import downIMG from '../../../assets/player/down.png'
import deleteImg from '../../../assets/delete.png'


function DeletePlaylist({ isOpen, onClose, libraryID, playlistName, lvCover, onDelete }) {
    if(!isOpen) return null;
    const [isLoaded, setIsLoaded] = useState(true)

    let userRefID = "UserSampleData"
    if(auth.currentUser) (userRefID = auth.currentUser.uid)

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

    async function handleDeletePlaylist() {
        try {
            const libraryRef = doc(db, "users", userRefID, "userLibrary", libraryID);
            await deleteDoc(libraryRef);
            console.log(`Deleted library with ID: ${libraryID}`);
            onDelete()
            onClose()
        } catch (e) {
            console.error("Error deleting library: ", e);
        }
    }

  return (
    <>              
        <div id="options">
            <div onClick={onClose} id="option-song">
            <div className="lv-item">
                <div id="lv-cover">
                    <svg className='lv-music-icon' data-encore-id="icon" role="img" aria-hidden="true" data-testid="track" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>                
                    <img id='op-cover-img' style={brokenImage} src={lvCover} onError={handleBrokenImage} onLoad={handleImageLoad}/>
                </div>
                <div className="lv-details lv-details-mod">
                    <p className="lv-songName">{playlistName}</p>
                    <p className="lv-artistName">Playlist</p>
                </div>
            </div>
            <img id="close-options" className='icons' src={downIMG} />

            </div>
            <div id="option-list">
                <div onClick={handleDeletePlaylist} className='option-list-item' id="add-to-playlist">
                    <img className='icons' src={deleteImg} />
                    <p className="option-label">Delete Playlist</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default DeletePlaylist