import React from 'react'
import './Home.css'
import {useState} from 'react'
import ProfileBtn from '../../components/ProfileBtn/ProfileBtn'
import LibraryGrid from '../../components/LibraryGrid/LibraryGrid'
import Login from '../../components/Login/Login'
import Songs from '../../components/Songs/Songs'
import { auth } from '../../firebase' 

function Home() {
  return (
    <>
        <header id="topper">
          {auth.currentUser !== null ? <ProfileBtn/> : <Login/>}
            <span id="site-logo">Nazmul</span>
        </header>
        <LibraryGrid/>
        {(auth.currentUser !== null)? <Songs/> : console.log("bulbasaur")}
    </>
  )
}

export default Home