import React, { useEffect, useState } from 'react';
import './LibraryGrid.css';
import LibraryGridTile from './LibraryGridTile';
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase';

function LibraryGrid() {
  const [library, setLibrary] = useState([]);
  let index = 1;
  let userRefID = "UserSampleData";

  if(auth.currentUser){
    userRefID = auth.currentUser.uid
  }else{
    userRefID="UserSampleData";
  }

  async function listLibraries(){
    const colSnap = await getDocs(collection(db, 'users', userRefID, 'userLibrary'));
    console.log("retrieving....Libraries")
    try {
      if(!colSnap.empty){
        const temp = [];
        colSnap.forEach((doc) => {
          let snap = doc.data();
          if(index <= 8){
            temp.push({
              playlistName: snap.playlistName,
              libraryID: doc.id,
              lvCover:snap.lvCover
            });
          }
          index += 1;
        });
        setLibrary(temp);
        index = 0;
        console.log("done")
      } else {
        console.log("No Such Library!");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    listLibraries();
  }, [userRefID]);  // Empty dependency array to run the effect only once

  return (
    <div id="library-grid">
      {library?.map((data, index) => (
        <LibraryGridTile key={index} details={data} />
      ))}
    </div>
  );
}

export default LibraryGrid;
