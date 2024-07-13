import React, { useState } from 'react'
import './Player.css'
import Cover from './Cover/Cover'
import Controls from './Controls/Controls'
import Options from './Options/Options';

function Player({isOpen, onClose, index, list}){
  if(!isOpen) return null;
  const [key, setKey] = useState(index);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      console.log("close modal")
      setIsModalOpen(false);
  };

  const handlePrevious = () =>{
    if(key > 0){
      setKey(key-1)
    }
  }

  const handleNext = () =>{
    if(key < (list.length - 1)){
      setKey(key+1);
    };

    if(key == (list.length - 1)){
      setKey(0)
    }
  }

  const handleOptions = () => {
    console.log("Options");
    openModal();
  }
  return (
    <>
        <div id="player">
        <>
          <div id="player-top">
            <img onClick={onClose}  className='icons' src="src/assets/player/down.png" alt="<" id="close-player" />
            <p id="now-playing">Now Playing</p>
            <img onClick={handleOptions} className='icons' src="src/assets/player/dots.png" alt=":" id="player-extra-options" />
          </div>
        </>
            <Cover index={key} list={list} />
            <Controls autoPlay={true} onPrevious={handlePrevious} onNext={handleNext} index={key} list={list}/>
            <Options isOpen={isModalOpen} onClose={closeModal} index={key} details={list}/>
        </div>

    </>
  )
}

export default Player