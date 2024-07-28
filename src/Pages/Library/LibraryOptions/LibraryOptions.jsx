import React, { useState } from 'react'

import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from '../../../firebase'

import downImg from '../../../assets/player/down.png'
import removeImg from '../../../assets/player/remove.png'

function LibraryOptions({ isOpen, onClose, details, index, libraryID }) {
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

    async function removeSongFromPlaylist() {
    try {
        const songRef = doc(db, "users", userRefID, "userLibrary", libraryID, "songs", details.songID);
        await deleteDoc(songRef);
        console.log(`Deleted song with ID: ${details.songID}`);
        window.location.reload()

    } catch (e) {
        console.error("Error deleting song: ", e);
    }
    }

  return (
    <>              
        <div id="options">
            <div onClick={onClose} id="option-song">
            <div className="lv-item">
                <div id="lv-cover">
                    <svg className='lv-music-icon' data-encore-id="icon" role="img" aria-hidden="true" data-testid="track" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>                
                    <img id='op-cover-img' style={brokenImage} src={details.coverURL} alt="Cover" onError={handleBrokenImage} onLoad={handleImageLoad}/>
                </div>
                <div className="lv-details lv-details-mod">
                    <p className="lv-songName">{details.songName}</p>
                    <p className="lv-artistName">{details.artistName}</p>
                </div>
            </div>
            <img id="close-options" className='icons' src={downImg} alt="" />

            </div>
            <div id="option-list">
                <div onClick={removeSongFromPlaylist} className='option-list-item' id="add-to-playlist">
                    <img className='icons' src={removeImg} alt="+" />
                    <p className="option-label">Remove From Playlist</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default LibraryOptions