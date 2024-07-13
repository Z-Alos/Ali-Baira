import React, { useRef, useState } from 'react';
import './LibraryViewItems.css';
import Player from '../../../components/Player/Player';

function LibraryViewItems({ details, list, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("close modal")
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={openModal} className="lv-item">
        <img className="lv-img" src={details.coverURL} alt="Cover" />
        <div className="lv-details">
          <p className="lv-songName">{details.songName}</p>
          <p className="lv-artistName">{details.artistName}</p>
        </div>
      </div>
      <Player isOpen={isModalOpen} onClose={closeModal} index={index} list={list}/>

    </>
  );
}

export default LibraryViewItems;
