import React from 'react'
import './LibraryItems.css'

function LibraryItems() {
  return (
    <>
        <div className="library-item">
            <img className='library-img' src="src\assets\profile-pic.png"/>
            <div className="library-details">
                <p className="lib-library-name">Brazilian Phonk</p>
                <p className="library-type">Playlist</p>
            </div>
        </div>  
    </>
  )
}

export default LibraryItems