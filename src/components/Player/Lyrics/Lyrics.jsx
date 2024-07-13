import React, { useEffect, useState } from 'react';
import './Lyrics.css';

function Lyrics({ isOpen, onClose, details }) {
  const [lyrics, setLyrics] = useState("Couldn't Load Lyrics");

  useEffect(() => {
    if (details && details.songLyrics) {
      setLyrics(details.songLyrics);
    }
  }, [details]);

  if (!isOpen) return null;

  return (
    <>
      <div id="display-lyrics">
        <div id="lyrics-options">
          <img onClick={onClose} className='icons' src="src/assets/player/down.png" alt="<" id="close-lyrics" />
          <p id="lyrics-song-name">{details.songName}</p>
          <img src="src/assets/player/lyrics.png" alt="" className="empty icons" />
        </div>
        <p id="lyrics">{lyrics}</p>
      </div>
    </>
  );
}

export default Lyrics;
