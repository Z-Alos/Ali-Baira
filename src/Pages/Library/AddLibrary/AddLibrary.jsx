import React, { useState, useEffect, useRef } from 'react'
import './AddLibrary.css'

function AddLibrary({isOpen, onClose, onPlaylistName}) {
    if(!isOpen) return null;

    const [playlistName, setPlaylistName] = useState("Playlist #");

    const inputRef = useRef(null);
    useEffect(()=>{
        inputRef.current.value = "Playlist #"
        inputRef.current.focus()
        inputRef.current.select()
    },[])

    const createPlaylist = () =>{
        console.log(playlistName)
        onPlaylistName(playlistName)
    }  


  return (
    <>
        <div id="add-library">
            <div id="al-details">
                <p id="give-name">Give your playlist a name</p>
                <input onChange={(e)=> {setPlaylistName(e.target.value)}} ref={inputRef} type="text" id="enter-name" placeholder="Playlist #"/>
                <div id="al-btn">
                    <p onClick={onClose} className="btn">Cancel</p>
                    <p onClick={()=>{createPlaylist(),onClose()}} id="create-btn" className="btn">Create</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddLibrary