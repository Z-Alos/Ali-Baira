import React, { useState } from 'react'
import './Player.css'
import Cover from './Cover/Cover'
import Controls from './Controls/Controls'
import Options from './Options/Options';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import downImg from "../../assets/player/down.png"
import dotsImg from "../../assets/player/dots.png"

function Player({isOpen, onClose, index, list}){
  if(!isOpen) return null;
  const [key, setKey] = useState(index);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useGSAP(()=>{
    gsap.from('#player',{
      opacity: 0,
      duration: 0.3
    })
  }) 

  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("close modal")
    gsap.to('#options',{
      y: '100%',
      duration: 0.2,
      onComplete: () =>{
        gsap.to('#options',{y: 0}),
        setIsModalOpen(false)
      }
    })
  };
  
  const handlePlayerClose = () =>{
    gsap.to('#player',{
      y: '100%',
      duration: 0.3,
      onComplete: () =>{
        gsap.to('#player',{y: 0}),
        onClose()
      }
    })

  }

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
            <img onClick={handlePlayerClose}  className='icons' src={downImg} alt="<" id="close-player" />
            <p id="now-playing">Now Playing</p>
            <img onClick={handleOptions} className='icons' src={dotsImg} alt=":" id="player-extra-options" />
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