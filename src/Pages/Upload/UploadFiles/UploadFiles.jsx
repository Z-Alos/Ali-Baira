import React from 'react'
import { useRef } from 'react'

function UploadFiles({ cover, audio }) {
  const coverPhoto = useRef();
  const songAudio = useRef();
    return (
    <>
       <div id="upload-files-grid">
            <div onClick={()=> coverPhoto.current.click()} className='upload-area' id="upload-photo">
                <span id="upload-photo-img">
                    <img src="/src/assets/image.png"/>
                    <input ref={coverPhoto} onChange={(e) => cover(e.target)} type="file" id="upload-photo-input"/>
                    <p className="upload-area-titles">Upload Image<span> *optional</span></p>
                </span>
            </div>
            <div onClick={()=> songAudio.current.click()} className='upload-area' id="upload-audio">
            <span id="upload-photo-img">
                    <svg className='music-icon' data-encore-id="icon" role="img" aria-hidden="true" data-testid="track" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>                
                    <input ref={songAudio} onChange={(e)=> audio(e.target)} type="file" id="upload-audio-input" required/>
                    <p className="upload-area-titles">Upload Audio</p>
                </span>
            </div>
        </div> 
    </>
  )
}

export default UploadFiles