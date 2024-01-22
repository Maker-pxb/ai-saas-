import NavBar from '@/components/NavBar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full relative">
      <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 z-[80] md:w-72 bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <NavBar />
        {children}
      </main>
    </div>
  )
}

export default layout
