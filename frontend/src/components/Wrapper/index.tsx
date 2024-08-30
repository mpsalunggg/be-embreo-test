'use client'
import React from 'react'
import Navbar from '../Navbar'
import { usePathname } from 'next/navigation'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  const renderNavbar = ['/login'].includes(pathName)
  return (
    <div>
      {!renderNavbar ? (
        <>
          <Navbar />
          <div className="max-w-7xl mx-auto p-5">{children}</div>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}
export default Wrapper
