
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Layout/Header'
import Footer from './Layout/Footer'

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
