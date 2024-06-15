import React from 'react'
import './SongItems.css'

function SongItems({ coverURL }) {
  return (
    <>
        <div className="song-grid-item">
            <img src={coverURL} className="sg-cover" />
        </div>
    </>
  )
}

export default SongItems