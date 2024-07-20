import './App.css'
import Navigation from './components/Navigation/Navigation'
import Login from './components/Login/Login'
import { auth } from './firebase'
import { useState } from 'react'
import Home from './Pages/Home/Home'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function App() {
  const [user, setUser] = useState(false)
  auth.onAuthStateChanged((user)=>{
    if(user){
      console.log("User::", user.uid)
      setUser(true)
    }else{
      console.log("Logged Out")
      setUser(false)
    }
  })

  useGSAP(()=>{
    let tl = gsap.timeline()
    tl.from('#loader p',{
      x:20,
      opacity: 0,
      stagger: 0.1,
      duration:1,
    })
    tl.to('#loader p',{
      x:-10,
      opacity: 0,
      stagger: 0.1,
      duration:1,
    })
    tl.to('#loader',{
      opacity: 0
    })
    tl.to('#loader',{
      display: 'none'
    })
  })

  return (
    <>
    <div id="loader">
      <div>
        <p>Zalos</p>
        <p>Play</p>
      </div>
    </div>
    <Navigation />
    </>
  )
}

export default App