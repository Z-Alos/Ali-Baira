import React from 'react'
import './PlayerDetails.css'

function PlayerDetails() {
    
  return (
    <>
        <div id="song-details">
            <p id="p-song-title">Bruce Lee</p>
            <p id="p-artist-name">Chris Brown</p>
        </div>
        <div id="progress-area">
            <div id="progress-bar">
                <span id="progress"></span>
            <div id="times">
                <span id="currently-at">0:54</span>
                <span id="total-duration">3:23</span>
            </div>
            </div>
        </div>
    </>
  )
}

export default PlayerDetails