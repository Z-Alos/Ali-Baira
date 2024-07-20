import React, { useEffect, useState } from 'react'
import './Library.css'
import ProfileBtn from '../../components/ProfileBtn/ProfileBtn'
import LibraryItems from './LibraryItems'
import AddLibrary from './AddLibrary/AddLibrary'

import addImg from '../../assets/plus.png'

import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { db, auth, storage } from '../../firebase';


function Library() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("Playlist #");
  const [library, setLibrary] = useState();
  const temp = [];
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  },[])
  let userRefID = "UserSampleData"
  if(auth.currentUser) (userRefID = auth.currentUser.uid)


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("close modal")
    setIsModalOpen(false);
  };

  async function handleCreatePlaylist(value){
    setPlaylistName(value);
    const fields = {
      playlistName:value
      }

    try{
      const col = doc(db,"users",userRefID);
      const collectionCol = collection(col,"userLibrary")
      const libRef = await addDoc(collectionCol, fields)
    }catch(e){
      console.log("ERROR CREATING PLAYLIST!!!")
    }
  };

  async function listLibraries(){
    if(loading) return null
    const colSnap = await getDocs(collection(db,'users',userRefID, 'userLibrary'));
    console.log("retrieving....Libraries")
    try {
      if(colSnap){
        colSnap.forEach((doc) => {
          let snap = doc.data()
          console.log("data:: ", doc.id)
          temp.push({playlistName: snap.playlistName,
                     lvCover: snap.lvCover,
                     libraryID: doc.id});
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
    listLibraries()
    console.log("listing libraries...")
  },[loading])

  return (
    <>
        <header id="looser">
          <div id='topper'>
            <ProfileBtn/>
            <p id="search-header">Library</p>
          </div>
            <img onClick={openModal} className='icons' src={addImg} alt="+" id="add-playlist" /> 
        </header>

        <AddLibrary isOpen={isModalOpen} onClose={closeModal} onPlaylistName={handleCreatePlaylist} />

        <div className="margintop">
          { !loading ?
            (library?.map((data, index) => (
              <LibraryItems key={index} details={data} />
            ))) : null      
          }
        </div>
    </>
  )
}

export default Library