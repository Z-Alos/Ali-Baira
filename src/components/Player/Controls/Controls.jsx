import React, { useEffect, useRef, useState } from 'react'
import './Controls.css'
import Lyrics from '../Lyrics/Lyrics';

import playImg from '../../../assets/player/play.png'
import pauseImg from '../../../assets/player/pause.png'
import replayImg from '../../../assets/player/replay.png'
import arrowHeadImg from '../../../assets/player/arrow-head.png'
import lyricsImg from '../../../assets/player/lyrics.png'

function Controls({autoPlay, index, list, onPrevious, onNext}) {
    const audioRef = useRef(null);
    const progressBar = useRef(null);
    const [key, setIndex] = useState(index);
    const [playPause,setPlayPause]=useState(playImg)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);  
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log("close modal")
        setIsModalOpen(false);
    };

    const handleReplay = () => {
        audioRef.current.currentTime = 0;
    }
    
    const togglePlayPause = () => {
        if (isPlaying) {
          audioRef.current.pause();
          setPlayPause(playImg)
        } else {
            audioRef.current.play();
            setPlayPause(pauseImg)
        }
        setIsPlaying(!isPlaying);
      };  

    const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
    };
    const handleProgressBar = (e) => {
    let progressWidth = progressBar.current.clientWidth;
    let clickedOffsetX = e.clientX-10;
    setCurrentTime((clickedOffsetX/progressWidth)*duration)
    audioRef.current.currentTime = ((clickedOffsetX/progressWidth)*duration)      
    console.log(currentTime)
    };
    
    const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const progressBarStyles = {
    width: `${(currentTime / duration) * 100}%`
    };

    useEffect(()=>{
        console.log("loaded")
        if(isPlaying){
            audioRef.current.play();
        }
    },[index])

    useEffect(()=>{
        if(autoPlay){
            togglePlayPause()
        }
    },[])
      
  return (
    <>
    <div id="controls-wrapper">
        <>
            <div id="song-details">
                <p id="p-song-title">{list[index].songName}</p>
                <p id="p-artist-name">{list[index].artistName}</p>
            </div>
            <div id="progress-area">
                <div ref={progressBar} onClick={(e)=>{handleProgressBar(e)}} id="progress-bar">
                    <span style={progressBarStyles} id="progress"></span>
                <div id="times">
                    <span id="currently-at">{formatTime(currentTime)}</span>
                    <span id="total-duration">{formatTime(duration)}</span>
                </div>
                </div>
            </div>
        </>
        <div id="controls">
            <img onClick={handleReplay} src={replayImg} id="replay" className="icons" />
            <audio ref={audioRef} src={list[index].audioURL} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={onNext} ></audio>
            <div id="main-controls">
                <img onClick={onPrevious} src={arrowHeadImg} className="icons rotate" />
                <img onClick={togglePlayPause} id="play-btn" className='icons' src={playPause}/>
                <img onClick={onNext} src={arrowHeadImg} className="icons" />
            </div>
            <img onClick={openModal} src={lyricsImg} className="icons" />
            <Lyrics isOpen={isModalOpen} onClose={closeModal} details={list[index]}/>

        </div>
        </div>
    </>
  )
}

export default Controls