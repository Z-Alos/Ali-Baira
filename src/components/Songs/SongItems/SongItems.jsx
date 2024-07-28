import React, { useState, useEffect } from 'react';
import './SongItems.css';
import Player from '../../Player/Player';
import { useLocation } from 'react-router-dom';

function SongItems({ list, index, details }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const openModal = () => {
    window.history.pushState({}, '', '#player');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    window.history.pushState({}, '', '/home');
    setIsModalOpen(false);
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

  const [isLoaded, setIsLoaded] = useState(true);

  let brokenImage = {
    opacity: isLoaded ? 1 : 0
  };

  const handleBrokenImage = () => {
    setIsLoaded(false);
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <div className="song-grid-container">
        <div onClick={openModal} className="song-grid-item">
          <svg className='music-icon' data-encore-id="icon" role="img" aria-hidden="true" data-testid="track" viewBox="0 0 24 24">
            <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path>
          </svg>
          <img src={details.coverURL} style={brokenImage} onError={handleBrokenImage} onLoad={handleImageLoad} className="sg-cover" />
        </div>
        <div className="sgi-details">
          <p className="sgid-title">{details.songName}</p>
          <p className="sgid-artist">{details.artistName}</p>
        </div>
      </div>
      <Player isOpen={isModalOpen} onClose={closeModal} index={index} list={list} />
    </>
  );
}

export default SongItems;
