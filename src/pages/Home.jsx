import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/SideBar'
import Chat from '../components/Chat'
const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar />
    <Chat/>
      </div>
    </div>
  )
}

export default Home
