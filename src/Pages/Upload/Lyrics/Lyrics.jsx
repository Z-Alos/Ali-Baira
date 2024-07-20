import React from 'react'
import './Lyrics.css'

function Lyrics({ lyrics }) {
  const handleLyrics = (e) => {
    lyrics(e.target.value)
  }
  return (
    <>
        <div id="upload-subs">
            <textarea onChange={handleLyrics} id="write-subs">Write Lyrics...</textarea>
        </div>
    </>
  )
}

export default Lyrics