import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { Toaster } from 'react-hot-toast'
import Navbar from '../New_Nav/Navbar'

export default function Layout() {
  return (
    <>
      <div className="flex flex-col justify-between min-h-[100vh] bg-[url('assets/light-patten.svg')] dark:bg-slate-900 overflow-x-hidden " >
        <Toaster />
        {/* <NavBar /> */}
        <Navbar/>
         <Outlet /> 
        <Footer /> 

        {/* <img src={} alt="" /> */}
      </div>
    </>
  )
}

