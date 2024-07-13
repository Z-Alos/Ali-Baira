import React, { useEffect } from 'react'
import './Navigation.css'
import { Link, Route, Routes, useLocation } from "react-router-dom"
import { useState } from 'react'

import Home from '../../Pages/Home/Home';
import Search from '../../Pages/Search/Search';
import Library from '../../Pages/Library/Library';
import Upload from '../../Pages/Upload/Upload';
import Player from '../Player/Player'
import LibraryView from '../../Pages/Library/LibraryView/LibraryView';

function Navigation() {
  const [homeSrc, setHomeSrc] = useState("src/assets/navigation/home.png");
  const [searchSrc, setSearchSrc] = useState("src/assets/navigation/search.png");
  const [librarySrc, setLibrarySrc] = useState("src/assets/navigation/library.png");
  const [uploadSrc, setUploadSrc] = useState("src/assets/navigation/upload.png");

  const location = useLocation();

  const buttonState = () =>{
    location.pathname == "/home" ? setHomeSrc("src/assets/navigation/home-filled.png") : setHomeSrc("src/assets/navigation/home.png") 
    location.pathname == "/search" ? setSearchSrc("src/assets/navigation/search-filled.png") : setSearchSrc("src/assets/navigation/search.png") 
    //location.pathname == "/library" ? setLibrarySrc("src/assets/navigation/library-filled.png") : setLibrarySrc("src/assets/navigation/library.png") 
    if(location.pathname == "/library" || location.pathname == "/LibraryView"){
      setLibrarySrc("src/assets/navigation/library-filled.png")
    }else{
      setLibrarySrc("src/assets/navigation/library.png")
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
        <Route path="/libraryView" element={<LibraryView />} />
      </Routes>
    </>
  )
}

export default Navigation
