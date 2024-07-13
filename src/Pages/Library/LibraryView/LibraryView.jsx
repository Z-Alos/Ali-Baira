import React, { useEffect, useState } from 'react';
import './LibraryView.css'
import { useLocation } from 'react-router-dom';
import { getDocs, doc, collection, query, where } from "firebase/firestore"; 
import { db, auth } from '../../../firebase';
import LibraryViewItems from '../LibraryViewItem/LibraryViewItems';
import Player from '../../../components/Player/Player';

function LibraryView() {
  const location = useLocation();
  const { details } = location.state;
  const [isPlaying, setIsPlaying] = useState(false);
  const [playPause,setPlayPause]=useState("src/assets/lv-play.png")
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("close modal")
    setIsModalOpen(false);
    setIsPlaying(false)
  };

  let temp = [];
  let songTemp = [];
  const [songs, setSongs] = useState([]);

  const togglePlayPause = () => {
    if (isPlaying) {
      setPlayPause("src/assets/lv-play.png")
    } else {
      setPlayPause("src/assets/lv-pause.png")
      openModal();
    }
    setIsPlaying(!isPlaying);
  }; 

  async function getSongsFromLibrary(libraryID) {
    try {
        const userId = auth.currentUser.uid;
        const userLibraryRef = doc(db, "users", userId, "userLibrary", libraryID);
        const songsCollectionRef = collection(userLibraryRef, "songs");

        const querySnapshot = await getDocs(songsCollectionRef);

        const songsSnap = querySnapshot.docs.map(doc => ({ id: doc.id }));

        songsSnap.forEach((song) => {
          temp.push(song.id);
        });

        console.log("Retrieved songs:", temp);

        getSongsByIds(temp);
    } catch (e) {
        console.error("Error retrieving songs: ", e);
    }
  }

  const getSongsByIds = async (ids) => {
    try {
      const songCollectionRef = collection(db, 'users', auth.currentUser.uid, 'songCollection');
      const q = query(songCollectionRef, where('__name__', 'in', ids));
      const colSnap = await getDocs(q);

      colSnap.forEach((doc) => {
        songTemp.push({ id: doc.id, ...doc.data() });
      });

      setSongs(songTemp);
    } catch (error) {
      console.error("Error retrieving documents: ", error);
      throw error;
    }
  };

  useEffect(() => {
    getSongsFromLibrary(details.libraryID);
  }, [details.libraryID]);

  return (
    <>
      <div id="lv-container"></div>

      <div id="lib-view-top">
        <div id="library-view-cover">
            <img src="src/assets/profile-pic.png" id="library-view-cover-img"/>
        </div>
        <div id="lv-details">
            <div id="lv-name">
                <p id="lv-playlist-name">fucckk</p> 
                <div id="lv-profile">
                    <img src={auth.currentUser.photoURL} alt="profile" id="lv-pic" />
                    <p id="lv-username">{auth.currentUser.displayName}</p>
                </div>
            </div>
            <div id="lv-play">
                <img onClick={togglePlayPause} src={playPause} id="lv-play-btn"/>
            </div>
        </div>
      </div>

      <div id="lv-list">
        {
          songs?.map((song, index) => (
            <LibraryViewItems isPlaying={isPlaying} key={index} details={song} list={songs} index={index}/>
          ))
        }
      </div>
      <Player isOpen={isModalOpen} onClose={closeModal} index={0} list={songs} />

    </>
  );
}

export default LibraryView;
