import './App.css'
import Navigation from './components/Navigation/Navigation'
import Login from './components/Login/Login'
import { auth } from './firebase'
import { useState } from 'react'

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

  return (
    <>
    {(auth.currentUser !== null) ? <Navigation/> : <Login/>}
    </>
  )
}

export default App