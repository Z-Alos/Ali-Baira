import React, { useState, useRef } from 'react'
import './Upload.css'
import ProfileBtn from '../../components/ProfileBtn/ProfileBtn'
import Lyrics from './Lyrics/Lyrics'
import UploadDetails from './UploadDetails/UploadDetails'

import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db, auth, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import ProgressModal from './ProgressModal/ProgressModal'

function Upload() {
  const [songName, setSongName] = useState("")
  function setSong(data){
    setSongName(data)
  }

  const [artistName, setArtistName] = useState("")
  function setArtist(data){
    setArtistName(data)
  }

  const [songLyrics, setSongLyrics] = useState("No Lyrics Uploaded...")
  function setLyrics(data){
    setSongLyrics(data)
  }

  const [audioFileTitle, setAudioFileTitle] = useState("Upload Audio")
  
  const [isOpen, setIsOpen] = useState(false)
  const [modalText, setModalText] = useState("Uploading...")

  const cover = useRef();
  const audio = useRef();
  const form = useRef();
  const preview = useRef();
   
   
  const uploadData = async(e)=>{
    if(!form.current.checkValidity()){
      console.log("running.....")
      form.current.reportValidity();
    }
    else{
      e.preventDefault();
      setIsOpen(true); 
      console.log("setisopen")

    if(auth.currentUser.uid){
      if(songName!=""){
        console.log(songName)
        if(artistName!=""){
          console.log(artistName)
          if(songLyrics!=""){
            console.log(songLyrics)
            
            const fields = {
              songName:songName,
              artistName:artistName,
              songLyrics:songLyrics,
              audioURL:"link"
              }
              
              uploadSongDetails(fields);

          }
        }
      }
    }
  }
  }

  function updateCoverURL(url, id){
    try {
        const addHere = doc(db, `users/${auth.currentUser.uid}/songCollection/${id}`);
        const docData = {
            coverURL:url
        }
        setDoc(addHere,docData,{merge:true});
        console.log("updated the cover link...");
    } catch(e){
        console.error("Error updating cover link: ",e);
    } 
  }

  function updateAudioURL(url, id){
      try {
          const addHere = doc(db, `users/${auth.currentUser.uid}/songCollection/${id}`);
          const docData = {
              audioURL:url
          }
          setDoc(addHere,docData,{merge:true});
          console.log("updated the audio link...");
          setIsOpen(false)
          alert("Upload Completed");
      } catch(e){
          console.error("Error updating audio link: ",e);
      } 
  }

  async function uploadSongDetails(fields){
    try {
        setModalText("Uploading Song Details...")
        const col = doc(db,"users",auth.currentUser.uid);
        const collectionCol = collection(col,"songCollection")
        const songRef = await addDoc(collectionCol, fields)
        //setDoc(songDetails,docData,{merge:true});
        console.log("uploaded the song details...", songRef.id);
        
        if(cover.current.files[0] != undefined){
          console.log(cover.current.files[0].name);
          setModalText("Uploading Cover Photo...")
          uploadCover(songRef.id)
          }
          
        if(audio.current.files[0] != undefined){
          console.log(audio.current.files[0].name);
          setModalText("Uploading Audio, This might take a minute...")
          uploadAudio(songRef.id)
        }
    } catch(e){
        console.error("Error adding song: ",e);
        setModalText("Some Error Occurred!!");
    }   
  }

  async function uploadCover(id){
    const coverRef = ref(storage, `users/${auth.currentUser.uid}/coverPhoto/${id}`)
    await uploadBytes(coverRef, cover.current.files[0]).then((snapshot) =>{
        console.log("Image Uploaded!!");
    });
    
    //retrieving coverURL
    getDownloadURL(coverRef)
    .then((coverURL)=>{
        updateCoverURL(coverURL,id);
        console.log(coverURL);
    })
  }

  async function uploadAudio(id){

    const audioRef = ref(storage, `users/${auth.currentUser.uid}/audioFile/${id}`)
    await uploadBytes(audioRef, audio.current.files[0]).then((snapshot) =>{
        console.log("Audio File Uploaded!!");
    });
    
    //retrieving AudioURL
    getDownloadURL(audioRef)
    .then((audioURL)=>{
        updateAudioURL(audioURL,id);
        console.log(audioURL);
    })
}


  return (
    <>
        <header id="topper">
            <ProfileBtn/>
            <span id="search-header">Upload</span>
        </header>
        <form ref={form} >

        <UploadDetails songName={setSong} artistName={setArtist}/>

        <div id="upload-files-grid">
            <div onClick={()=> cover.current.click()} className='upload-area' id="upload-photo">
                <span id="upload-photo-img">
                    <img className='images' src="/src/assets/image.png"/>
                    <img ref={preview} id="cover-preview"/>
                    <input ref={cover} onChange={(e) =>{preview.current.src= URL.createObjectURL(e.target.files[0]); preview.current.style.opacity = 1}} type="file" id="upload-photo-input"/>
                    <p className="upload-area-titles">Upload Image<span> *optional</span></p>
                </span>
            </div>
            <div onClick={()=> audio.current.click()} className='upload-area' id="upload-audio">
            <span id="upload-photo-img">
                    <svg className='music-icon' data-encore-id="icon" role="img" aria-hidden="true" data-testid="track" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>                
                    <input ref={audio} onChange={(e)=>setAudioFileTitle(e.target.files[0].name)} type="file" id="upload-audio-input" required/>
                    <p className="upload-area-titles">{audioFileTitle}</p>
                </span>
            </div>
        </div> 

        <Lyrics lyrics={setLyrics}/>

        <div id="upload-btn">
          <button onClick={uploadData} type='submit'>Publish</button>
        </div>
        </form>
        <ProgressModal open={isOpen} text={modalText}/>
    </>
  )
}

export default Upload