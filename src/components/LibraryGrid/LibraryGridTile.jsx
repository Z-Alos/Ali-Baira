import React from 'react'
import './LibraryGridTile.css'
import CoverImage from '../CoverImage/CoverImage'
import { useNavigate } from 'react-router-dom';

function LibraryGridTile({details}) {

  const navigate = useNavigate();

  const handleLibraryClick = () => {
    console.log("Opening LibraryView...")
    navigate('/LibraryView', { state: { details } });
  };

  return (
    <>
        <div onClick={handleLibraryClick} className="library-grid-tile">
          <span id="sp-2" >
            <CoverImage src={details.lvCover}/>
          </span>
            <p className="library-name">{details.playlistName}</p>
        </div>   
    </>
  )
}

export default LibraryGridTile