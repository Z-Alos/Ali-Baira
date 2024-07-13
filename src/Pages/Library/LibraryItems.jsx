import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LibraryItems.css';

function LibraryItems({ details }) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false)

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

  const handleLibraryClick = () => {
    console.log("Opening LibraryView...")
    navigate('/LibraryView', { state: { details } });
  };

  return (
    <>
      <div onClick={handleLibraryClick} className="library-item">
        <div id="lib-item-cover">
        <svg className='lib-item-icon' data-encore-id="icon" role="img" aria-hidden="true" data-testid="track" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>                
        <img style={brokenImage} className="library-img" src={details.coverURL} onLoad={handleImageLoad} onError={handleBrokenImage} alt="Profile" />
        </div>
        <div className="library-details">
          <p className="lib-library-name">{details.playlistName}</p>
          <p className="library-type">Playlist</p>
        </div>
      </div>
    </>
  );
}

export default LibraryItems;
