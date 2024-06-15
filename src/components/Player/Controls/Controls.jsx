import React, { useRef, useState } from 'react'
import './Controls.css'

function Controls() {
    const audio = useRef<HTMLAudioElement>(0);

    const [src, setSrc] = useState("src/assets/player/play.png")

    function handleAudioStream(){
        // if(isPlay == false){
        //     isPlay.current = true;
        // }
        // else{
        //     isPlay.current = false;
        // }
        // if(true){
        //     audio.current?.play();
        // }else{
        //     audio.current?.pause();
        // }
    }
      
  return (
    <>
        <div id="controls">
            <img src="src/assets/player/replay.png" id="replay" className="icons" />
            <div id="main-controls">
                <audio ref={audio} src="src/assets/player/check.mp3"></audio>
                <img src="src/assets/player/arrow-head.png" className="icons rotate" />
                <img onClick={handleAudioStream()} id="play-btn" className='icons' src={src}/>
                <img src="src/assets/player/arrow-head.png" className="icons" />
            </div>
            <img src="src/assets/player/lyrics.png" className="icons" />
        </div>
    </>
  )
}

export default Controls