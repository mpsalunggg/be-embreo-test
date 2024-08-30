import React from 'react'
import Navbar from '../Navbar'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
export default Wrapper
