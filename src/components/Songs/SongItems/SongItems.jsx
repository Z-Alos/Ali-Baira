import React, { useState, useEffect } from 'react'
import './SongItems.css'
import Player from '../../Player/Player'

function SongItems({ list, index, details }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("close modal")
    setIsModalOpen(false);
  };

  const [isLoaded, setIsLoaded] = useState(true)
 
  let brokenImage = {
    opacity: isLoaded ? 1 : 0
  }

  const handleBrokenImage = () => {
    setIsLoaded(false)  
  }


  return (
    <>
      <div className="song-grid-container">
        <div onClick={openModal} className="song-grid-item">
        <svg className='music-icon' data-encore-id="icon" role="img" aria-hidden="true" data-testid="track" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>                

            <img src={details.coverURL} style={brokenImage} onError={handleBrokenImage} className="sg-cover" />
        </div>
        <div className="sgi-details">
          <p className="sgid-title">{details.songName}</p>
          <p className="sgid-artist">{details.artistName}</p>
        </div>
      </div>
      <Player isOpen={isModalOpen} onClose={closeModal} index={index} list={list}/>
    </>
  )
}

export default SongItems