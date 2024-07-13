import React, { useEffect, useState } from 'react'
import './LibraryGrid.css'
import LibraryGridTile from './LibraryGridTile'

import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { db, auth, storage } from '../../firebase';

function LibraryGrid() {
  
  const [library, setLibrary] = useState();
  const temp = [];

  async function listLibraries(){
    const colSnap = await getDocs(collection(db,'users',auth.currentUser.uid, 'userLibrary'));
    console.log("retrieving....Libraries")
    try {
      if(colSnap){
        colSnap.forEach((doc) => {
          let snap = doc.data()
          temp.push({playlistName: snap.playlistName});
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
  },[])

  return (
    <>
        <div id="library-grid">
            {
            library?.map((data, index) => (
              <LibraryGridTile key={index} details={data} />
            ))         
          }
        </div>
    </>
  )
}

export default LibraryGrid