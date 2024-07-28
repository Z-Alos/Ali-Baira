import React, { useEffect, useState } from 'react'
import './SelectLibrary.css'

import { collection, getDocs } from "firebase/firestore";
import { db, auth } from '../../../firebase';


function SelectLibrary({ isSelectionOpen, onSelectionClose }) {
  if(!isSelectionOpen) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("Playlist #");
  const [library, setLibrary] = useState();
  const temp = [];
  const [isLoaded, setIsLoaded] = useState(false)

  let userRefID = "UserSampleData"
    if(auth.currentUser) (userRefID = auth.currentUser.uid)

  let brokenImage = {
    opacity: isLoaded ? 1 : 0
  }

  const handleBrokenImage = () => {
      console.log("lol ho gaya bhai")
      setIsLoaded(false)  
  }

  const handleImageLoad = () => {
      setIsLoaded(true)  
  }

  async function listLibraries(){
    const colSnap = await getDocs(collection(db,'users',userRefID, 'userLibrary'));
    console.log("retrieving....Libraries")
    try {
      if(colSnap){
        colSnap.forEach((doc) => {
          let snap = doc.data()
          temp.push({playlistName: snap.playlistName,
                     libraryID: doc.id,
                     lvCover: snap.lvCover});
        })
          setLibrary(temp)
          console.log("done")
      }else{
          console.log("No Such Library!");
      }
    } catch (error) {
        console.log("Error: ",error);
    }
  }

  useEffect(()=>{
    listLibraries();
    console.log("listing libraries...")
  },[playlistName])

  useEffect(()=>{
    console.log("listing libraries...")
  },[])

  return (
    <>
        
        <div id="select-library-list">
          <p id="sl-heading">Select Library</p>
          {
            library?.map((data, index) => (
              <div key={index} onClick={() => onSelectionClose(data.libraryID)} className="library-item">
              <div className="library-item-inner">
                <div className="lib-item-cover">
                <svg className='lib-item-icon' data-encore-id="icon" role="img" aria-hidden="true" data-testid="track" viewBox="0 0 24 24"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>                
                <img style={brokenImage} className="library-img" src={data.lvCover} onLoad={handleImageLoad} onError={handleBrokenImage} alt="Profile" />
                </div>
                <div className="library-details">
                  <p className="lib-library-name">{data.playlistName}</p>
                  <p className="library-type">Playlist</p>
                </div>
              </div>
              <div>
              </div>
            </div>
            ))         
          }
        </div>
    </>
  )
}

export default SelectLibrary