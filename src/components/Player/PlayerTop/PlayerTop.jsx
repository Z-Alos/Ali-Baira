import React from 'react'
import './PlayerTop.css'

function PlayerTop() {
  return (
    <>
        <div id="player-top">
          <img className='icons' src="src/assets/player/down.png" alt="<" id="close-player" />
          <p id="now-playing">Now Playing</p>
          <img className='icons' src="src/assets/player/dots.png" alt=":" id="player-extra-options" />
        </div>
    </>
  )
}

export default PlayerTop