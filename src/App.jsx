import './App.css'
import Navigation from './components/Navigation/Navigation'
import Login from './components/Login/Login'
import { auth } from './firebase'
import { useState } from 'react'
import Home from './Pages/Home/Home'

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
    <Navigation />
    </>
  )
}

export default App