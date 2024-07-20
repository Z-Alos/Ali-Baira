import React, { useState, lazy, Suspense, useEffect } from 'react'
import './Songs.css'
import SongItems from './SongItems/SongItems'
import { db, storage, auth } from '../../firebase'
import { collection, getDoc, getDocs, doc } from 'firebase/firestore'

function Songs() {
  const [songs, setSongs] = useState();
  let index = 0;
  const temp = [];
  let userRefID = "UserSampleData";
  if (auth.currentUser) (userRefID = auth.currentUser.uid) 
  async function displaySongs(){
    const colSnap = await getDocs(collection(db,'users',userRefID, 'songCollection'));
    console.log("retrieving....")
    try {
      if(colSnap){
        colSnap.forEach((doc) => {
          let snap = doc.data()
          temp.push({index: index,
                    coverURL: snap.coverURL,
                    songName: snap.songName,
                    artistName: snap.artistName,
                    songLyrics: snap.songLyrics,
                    audioURL: snap.audioURL,
                    songID: doc.id}
          );
              index = index+1;         
          })
          setSongs(temp)
      }else{
          console.log("No Such Document!");
      }
    } catch (error) {
        console.log("error: ",error);
    }
  }

  useEffect(()=>{
    displaySongs();
  },[userRefID])


  return (
    <>
        <p id="your-songs">Your Songs</p>
        <div id="songs-grid">
          {
            songs?.map((data, index) => (
              <SongItems key={index} list={songs} index={index} details={data} />
            ))         
          }
          
          
        </div>
    </>
  )
}

export default Songs