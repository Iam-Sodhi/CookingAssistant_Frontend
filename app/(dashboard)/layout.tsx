import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

export default function DashboardLayout({children}:{
    children:React.ReactNode
}) {
  return (
    <div className='h-full w-screen overflow-x-hidden'>
        <div className='hidden md:flex h-full w-[275px] flex-col fixed inset-y-0 '>
                <Sidebar />
        </div>

        <main className='md:pl-[275px]' >
            <Navbar />
            {children}
        </main>
    </div>
  )
}
