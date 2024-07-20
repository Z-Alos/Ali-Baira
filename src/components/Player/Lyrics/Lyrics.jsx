import React, { useEffect, useState } from 'react';
import './Lyrics.css';

import downImg from '../../../assets/player/down.png'
import lyricsImg from '../../../assets/player/lyrics.png'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Lyrics({ isOpen, onClose, details }) {
  if (!isOpen) return null;

  const [lyrics, setLyrics] = useState("Couldn't Load Lyrics");

  useEffect(() => {
    if (details && details.songLyrics) {
      setLyrics(details.songLyrics);
    }
  }, [details]);

  useGSAP(()=>{
    gsap.from('#display-lyrics',{
      y: '100%',
      duration: 0.2
    })
  })

  const handleLyricsClose = () => {
    gsap.to('#display-lyrics',{
      y: '100%',
      duration: 0.2,
      onComplete: () =>{
        gsap.to('#display-lyrics',{y: 0}),
        onClose()
      }
    })
  }

  return (
    <>
      <div id="display-lyrics">
        <div id="lyrics-options">
          <img onClick={handleLyricsClose} className='icons' src={downImg} alt="<" id="close-lyrics" />
          <p id="lyrics-song-name">{details.songName}</p>
          <img src={lyricsImg} alt="" className="empty icons" />
        </div>
        <p id="lyrics">{lyrics}</p>
      </div>
    </>
  );
}

export default Lyrics;
