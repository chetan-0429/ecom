import React from 'react'
import Header from './Header'
import Footer from './Footer'
import LeftPanel from './LeftPanel'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
     <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <div className="w-64 min-h-full">
          <LeftPanel />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
      </div>
    </>
  )
}

export default Layout
