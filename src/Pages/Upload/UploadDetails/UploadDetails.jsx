import React from 'react'
import './UploadDetails.css'

function UploadDetails({ songName, artistName }) {
  return (
    <>
    <div id='upload-section'>
        <div>
            <p className="upload-details-titles">
                Song Name
            </p>
            <input onChange={(e)=> songName(e.target.value)} type="text" id="music-name" required/>
        </div>
        <div>
            <p className="upload-details-titles">
                Artist Name
            </p>
            <input onChange={(e)=> artistName(e.target.value)} type="text" id="artist-name" required/>
        </div>
    </div>
    </>
  )
}

export default UploadDetails