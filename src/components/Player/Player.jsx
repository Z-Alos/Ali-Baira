import React from 'react'
import './Player.css'
import PlayerTop from './PlayerTop/PlayerTop'
import Cover from './Cover/Cover'
import PlayerDetails from './PlayerDetails/PlayerDetails'
import Controls from './Controls/Controls'

function Player() {
  return (
    <>
        <div id="player">
            <PlayerTop/>
            <Cover/>
            <PlayerDetails/>
            <Controls/>
        </div>
    </>
  )
}

export default Player