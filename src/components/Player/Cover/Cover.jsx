import React, { useState } from 'react'
import './Cover.css'

function Cover({index, list }) {
  const [isLoaded, setIsLoaded] = useState(true)
 
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

  return (
    <>
        <div id="cover">
            <div id="cover-img-container">
              <svg className='music-icon' data-encore-id="icon" role="img" aria-hidden="true" data-testid="track" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>                
              <img src={list[index].coverURL} style={brokenImage} onError={handleBrokenImage} onLoad={handleImageLoad} id="cover-img" />
            </div>
        </div>
    </>
  )
}

export default Cover