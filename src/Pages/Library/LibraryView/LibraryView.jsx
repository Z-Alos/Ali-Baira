import React, { useState, useEffect } from 'react';
import './LibraryView.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDocs, doc, setDoc, collection, query, where } from "firebase/firestore"; 
import { db, auth } from '../../../firebase';
import LibraryViewItems from '../LibraryViewItem/LibraryViewItems';
import Player from '../../../components/Player/Player';

import lvPlayImg from '../../../assets/lv-play.png';
import lvPauseImg from '../../../assets/lv-pause.png';
import downImg from '../../../assets/player/down.png';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function LibraryView({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { details } = location.state;

  const [isPlaying, setIsPlaying] = useState(false);
  const [playPause, setPlayPause] = useState(lvPlayImg);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lvCover, setLvCover] = useState("");
  const [songs, setSongs] = useState([]);
  const [profileSRC, setProfileSRC] = useState("https://lh3.googleusercontent.com/a/ACg8ocJeqn7ssxb7PwnLHJ-BZ2FRpZXWRejkMTCONHpKyvZu2QdxPZs=s288-c-no");
  const [userDisplayName, setUserDisplayName] = useState("Zalos");
  const [userRefID, setUserRefID] = useState("UserSampleData");

  useEffect(() => {
    if (auth.currentUser) {
      setUserRefID(auth.currentUser.uid);
      setProfileSRC(auth.currentUser.photoURL || profileSRC); // Use existing photoSRC if available
      setUserDisplayName(auth.currentUser.displayName || userDisplayName); // Use existing displayName if available
    }
  }, [auth.currentUser]); // Runs when auth.currentUser changes

  useEffect(() => {
    if (details.libraryID) {
      getSongsFromLibrary(details.libraryID);
    }
  }, [details.libraryID, userRefID]); // Fetch songs when either libraryID or userRefID changes

  async function changeLvCover(url){
    try {
      const addHere = doc(db, `users/${userRefID}/userLibrary/${details.libraryID}`);
      const docData = {
          lvCover:url
      }
      setDoc(addHere,docData,{merge:true});
      console.log("updated the lvCover link...");
  } catch(e){
      console.error("Error updating lvCover link: ",e);
  } 
  }

  const getSongsFromLibrary = async (libraryID) => {
    try {
      const userLibraryRef = doc(db, "users", userRefID, "userLibrary", libraryID);
      const songsCollectionRef = collection(userLibraryRef, "songs");
      const querySnapshot = await getDocs(songsCollectionRef);

      const songIds = querySnapshot.docs.map(doc => doc.id);
      console.log("Retrieved songs:", songIds);

      if (songIds.length > 0) {
        await getSongsByIds(songIds);
      }
    } catch (e) {
      console.error("Error retrieving songs: ", e);
    }
  };

  const getSongsByIds = async (ids) => {
    try {
      const songCollectionRef = collection(db, 'users', userRefID, 'songCollection');
      const q = query(songCollectionRef, where('__name__', 'in', ids));
      const colSnap = await getDocs(q);

      const songData = colSnap.docs.map(doc => ({ songID: doc.id, ...doc.data() }));

      setSongs(songData);
      if (songData.length > 0) {
        setLvCover(songData[0].coverURL || "path/to/your/default/image.png"); // set a default image path if coverURL is empty
        changeLvCover(songData[0].coverURL)
      }
    } catch (error) {
      console.error("Error retrieving documents: ", error);
    }
  };

  const navigateToLibrary = () => {
    gsap.to('#lv-wrapper',{
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        navigate('/library');
        gsap.to('#lv-wrapper',{opacity: 1})
      }
    })
  };

  const handleBrokenImage = () => {
    setIsLoaded(false);
    setLvCover("path/to/your/default/image.png"); // Set a default image path
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("close modal");
    setIsModalOpen(false);
    setIsPlaying(false);
    setPlayPause(lvPlayImg);
  };

  const togglePlayPause = () => {
    if (songs.length === 0) return;
    if (isPlaying) {
      setPlayPause(lvPlayImg);
    } else {
      setPlayPause(lvPauseImg);
      openModal();
    }
    setIsPlaying(!isPlaying);
  };

  useGSAP(()=>{
    gsap.from('#lv-wrapper',{
      opacity: 0,
      duration: 0.3
    })
  })

  return (
    <>
    <div id="lv-wrapper">
      <div id="lv-container"></div>
      <img 
        onClick={navigateToLibrary} 
        className='icons' 
        src={downImg} 
        alt="<-" 
        id="lv-back-btn" 
      />
      <div id="lib-view-top">
        <div id="library-view-cover">
          <div id="lv-cover-img-container">
            <svg className='music-icon' data-encore-id="icon" role="img" aria-hidden="true" data-testid="track" viewBox="0 0 24 24">
              <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path>
            </svg>
            <img 
              style={{ opacity: isLoaded ? 1 : 0 }} 
              src={lvCover} 
              id="library-view-cover-img" 
              onError={handleBrokenImage} 
              onLoad={handleImageLoad} 
            />
          </div>
        </div>
        <div id="lv-details">
          <div id="lv-name">
            <p id="lv-playlist-name">{details.playlistName}</p> 
            <div id="lv-profile">
              <img src={profileSRC} alt="profile" id="lv-pic" />
              <p id="lv-username">{userDisplayName}</p>
            </div>
          </div>
          <div onClick={togglePlayPause} id="lv-play">
            <img src={playPause} id="lv-play-btn" alt="play/pause" />
          </div>
        </div>
      </div>

      <div id="lv-list">
        {songs.map((song, index) => (
          <LibraryViewItems 
            isPlaying={isPlaying} 
            key={index} 
            details={song} 
            list={songs} 
            index={index} 
            libraryID={details.libraryID} 
          />
        ))}
      </div>
      <Player isOpen={isModalOpen} onClose={closeModal} index={0} list={songs} />
      </div>
    </>
  );
}

export default LibraryView;
