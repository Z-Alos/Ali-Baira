import React, { useEffect } from 'react'
import './Home.css'
import {useState} from 'react'
import ProfileBtn from '../../components/ProfileBtn/ProfileBtn'
import LibraryGrid from '../../components/LibraryGrid/LibraryGrid'
import Login from '../../components/Login/Login'
import Songs from '../../components/Songs/Songs'
import { auth } from '../../firebase' 


function Home() {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  },[])
  return (
    <>
        <header id="topper">
          {!loading ? (auth.currentUser !== null ? <ProfileBtn/> : <Login/>) : null}
            <span id="site-logo">Satyam</span>
        </header>
        {!loading ? <LibraryGrid /> : null}
        {!loading ? <Songs/> : null}
    </>
  )
}

export default Home