import React from 'react'
import './Songs.css'
import SongItems from './SongItems/SongItems'
import { db, storage, auth } from '../../firebase'
import { collection, getDoc, getDocs, doc } from 'firebase/firestore'

function Songs() {
    console.log("brh thi si frustration")
    async function displaySongs(id){
        const colSnap = await getDocs(collection(db,'users',id, 'songCollection'));
        // try {
        //     if(colSnap){
        //         console.log(colSnap)
        //         colSnap.forEach(doc =>{
        //             <SongItems coverURL={doc.data().coverURL} />
        //         })
    
        //     }else{
        //         console.log("No Such Document!");
        //     }
        // } catch (error) {
        //     console.log("error: ",error);
        // }
        
    }
  return (
    <>
        <p id="your-songs">Your Songs</p>
        <div id="songs-grid">
        </div>
    </>
  )
}

export default Songs