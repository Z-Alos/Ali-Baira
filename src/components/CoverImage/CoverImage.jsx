import React, { useState } from 'react'
import './CoverImage.css'

function CoverImage({ src }) {
    const [isLoaded, setIsLoaded] = useState(false);

    const brokenImage = {
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
        <div id="cover-image-component">
            <svg id="music-svg" className='music-icon' data-encore-id="icon" role="img" aria-hidden="true" data-testid="track" viewBox="0 0 24 24">
                <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path>
                </svg>
                <img 
                style={brokenImage} 
                src={src} 
                id="cic-image" 
                onError={handleBrokenImage} 
                onLoad={handleImageLoad}/>
        </div>
    </>
  )
}

export default CoverImage