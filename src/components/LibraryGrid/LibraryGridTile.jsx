import React from 'react'
import './LibraryGridTile.css'

function LibraryGridTile() {
  return (
    <>
        <div className="library-grid-tile">
            <img className='library-img' src="src/assets/profile-pic.png"/>
            <p className="library-name">Arijit Singh</p>
        </div>   
    </>
  )
}

export default LibraryGridTile