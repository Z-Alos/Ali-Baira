import React from 'react'
import './LibraryGridTile.css'

function LibraryGridTile({details}) {
  return (
    <>
        <div className="library-grid-tile">
            <img className='library-img' src="src/assets/profile-pic.png"/>
            <p className="library-name">{details.playlistName}</p>
        </div>   
    </>
  )
}

export default LibraryGridTile