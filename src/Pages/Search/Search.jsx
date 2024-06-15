import React from 'react'
import './Search.css'
import ProfileBtn from '../../components/ProfileBtn/ProfileBtn'

function Search() {
  return (
    <>
        <header id="topper">
            <ProfileBtn/>
            <span id="search-header">Search</span>
        </header>
        <div id="search-bar">
          <img className="search-bar-icon" src='src/assets/navigation/search.png'></img>
          <input id="search-input" type="text" placeholder='What do you want to listen to?'/>
        </div>
    </>
  )
}

export default Search