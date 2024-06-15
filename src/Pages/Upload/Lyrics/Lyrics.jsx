import React from 'react'
import './Lyrics.css'

function Lyrics({ lyrics }) {
  return (
    <>
        <div id="upload-subs">
            <textarea onChange={(e)=> lyrics(e.target.value)} id="write-subs">Write Lyrics...</textarea>
        </div>
    </>
  )
}

export default Lyrics