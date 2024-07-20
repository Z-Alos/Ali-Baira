import React from 'react'
import './Search.css'
import ProfileBtn from '../../components/ProfileBtn/ProfileBtn'

import searchBtnImg from '../../assets/navigation/search.png'

function Search() {
  return (
    <>
        <header id="topper">
            <ProfileBtn/>
            <span id="search-header">Search</span>
        </header>
        <div id="search-bar">
          <img className="search-bar-icon" src={searchBtnImg}></img>
          <input id="search-input" type="text" placeholder='What do you want to listen to?'/>
        </div>
        <div id="currently-unavailable">
          <p>Currently Unavailable</p>
        </div>
    </>
  )
}

export default Search