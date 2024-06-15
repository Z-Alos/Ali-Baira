import React from 'react'
import './Library.css'
import ProfileBtn from '../../components/ProfileBtn/ProfileBtn'
import LibraryItems from './LibraryItems'


function Library() {
  return (
    <>
        <header id="topper">
            <ProfileBtn/>
            <span id="search-header">Your Library</span>
        </header>

        <div className="margintop">
          <LibraryItems/>
          <LibraryItems/>
          <LibraryItems/>
          <LibraryItems/>
          <LibraryItems/>
          <LibraryItems/>
          <LibraryItems/>
          <LibraryItems/>
          <LibraryItems/>
          <LibraryItems/>
        </div>
    </>
  )
}

export default Library