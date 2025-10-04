import BottomBall from '@/components/commonComponent/BottomBall'
import Footer from '@/components/commonComponent/Footer'
import Navbar from '@/components/commonComponent/Navbar'
import React from 'react'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div>
      <Navbar />

      {/* it is nothing but a children components */}
      <div className='' >
        <Outlet />
        <BottomBall />
      </div>
        
      <Footer />

    </div>
  )
}

export default Layout
