import React, { useEffect } from 'react'
import './Navigation.css'
import { Link, Route, Routes, useLocation, Navigate } from "react-router-dom"
import { useState } from 'react'

import homeImg from '../../assets/navigation/home.png'
import homeFilledImg from '../../assets/navigation/home-filled.png'
import searchImg from '../../assets/navigation/search.png'
import searchFilledImg from '../../assets/navigation/search-filled.png'
import libraryImg from '../../assets/navigation/library.png'
import libraryFilledImg from '../../assets/navigation/library-filled.png'
import uploadImg from '../../assets/navigation/upload.png'

import Home from '../../Pages/Home/Home';
import Search from '../../Pages/Search/Search';
import Library from '../../Pages/Library/Library';
import Upload from '../../Pages/Upload/Upload';
import Player from '../Player/Player'
import LibraryView from '../../Pages/Library/LibraryView/LibraryView';

function Navigation() {
  const [homeSrc, setHomeSrc] = useState(homeImg);
  const [searchSrc, setSearchSrc] = useState(searchImg);
  const [librarySrc, setLibrarySrc] = useState(libraryImg);
  const [uploadSrc, setUploadSrc] = useState(uploadImg);

  const location = useLocation();

  const buttonState = () =>{
    location.pathname == "/home" ? setHomeSrc(homeFilledImg) : setHomeSrc(homeImg) 
    location.pathname == "/search" ? setSearchSrc(searchFilledImg) : setSearchSrc(searchImg) 
    //location.pathname == "/library" ? setLibrarySrc("src/assets/navigation/library-filled.png") : setLibrarySrc("src/assets/navigation/library.png") 
    if(location.pathname == "/library" || location.pathname == "/LibraryView"){
      setLibrarySrc(libraryFilledImg)
    }else{
      setLibrarySrc(libraryImg)
    }
  }

  useEffect(() => {
    buttonState()
  }, [location])
  
  return (
    <>
        <footer id="navigation">
          <Link to='/home' style={{textDecoration: 'none', color: 'white'}}>
            <div className="pages">
              <img src={homeSrc} className="icons" />
              <p className="page-label">Home</p>
            </div>
          </Link>
          <Link to='/search' style={{textDecoration: 'none', color: 'white'}}>
            <div className="pages">
              <img src={searchSrc} className="icons" />
              <p className="page-label">Search</p>
            </div>
          </Link>
          <Link to='/library' style={{textDecoration: 'none', color: 'white'}}>
            <div className="pages">
              <img src={librarySrc} className="icons" />
              <p className="page-label">Library</p>
            </div>
          </Link>
          <Link to='/upload' style={{textDecoration: 'none', color: 'white'}}>
            <div className="pages">
              <img src={uploadSrc} className="icons" />
              <p className="page-label">Upload</p>
            </div>
          </Link>
          
        </footer>
        <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/library' element={<Library/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/player' element={<Player/>}/>
        <Route path='/*' element={<Navigate to="/home" />} />
        <Route path="/libraryView" element={<LibraryView />} />
      </Routes>
    </>
  )
}

export default Navigation
