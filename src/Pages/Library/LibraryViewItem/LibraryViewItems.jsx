import React, { useState } from 'react';
import './LibraryViewItems.css';
import Player from '../../../components/Player/Player';
import LibraryOptions from '../LibraryOptions/LibraryOptions';
import CoverImage from '../../../components/CoverImage/CoverImage';

import dotsImg from '../../../assets/player/dots.png'

function LibraryViewItems({ details, list, index, libraryID }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("close modal")
    setIsModalOpen(false);
  };

  const openOptionModal = () => {
    setIsOptionModalOpen(true);
  };

  const closeOptionModal = () => {
    console.log("close modal")
    setIsOptionModalOpen(false);
  };

  const handleOptionClick = (event) => {
    event.stopPropagation();
    console.log(list);
    openOptionModal();
    console.log("Delete::Playlist");
  };

  return (
    <>
      <div className="lv-item">
        <div onClick={openModal} className="lv-flex">
          <div className='lv-flex-inner'>
            <CoverImage src={details.coverURL} />
            <div className="lv-details">
              <p className="lv-songName">{details.songName}</p>
              <p className="lv-artistName">{details.artistName}</p>
            </div>
          </div>
          <div onClick={handleOptionClick} className="lv-song-options">
            <img className='icons' src={dotsImg} alt="Options" />
          </div>
        </div>
      </div>
      <Player isOpen={isModalOpen} onClose={closeModal} index={index} list={list} />
      <LibraryOptions isOpen={isOptionModalOpen} onClose={closeOptionModal} details={details} index={index} libraryID={libraryID} />
    </>
  );
}

export default LibraryViewItems;
