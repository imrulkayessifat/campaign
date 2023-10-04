import React, { useEffect, useState } from 'react'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function getSession() {
    return await getServerSession(authOptions)
}
import Navbar from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'

const DashboardLayout =async (
    { children }: { children: React.ReactNode }
) => {
    const session = await getSession();
    console.log(session)
    return (
        <div className='h-full relative'>
            <div className='hidden h-full md:flex
             md:flex-col md:fixed md:inset-y-0 z-80
             md:border-r-2 md:w-52'>
                <Sidebar />
            </div>
            <main className='md:pl-56 pb-10'>
                <Navbar />

                {children}
            </main>
        </div>
    )
}

export default DashboardLayout