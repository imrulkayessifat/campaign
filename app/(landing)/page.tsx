

import React from 'react'
import { redirect, useRouter } from 'next/navigation'

import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function getSession() {
    return await getServerSession(authOptions)
}

import DashboardConnector from '@/components/dashboard-connector'

const LandingPage = async () => { 
  const session = await getSession();
  if(session) redirect("dashboard")
  
  return (
    <div className='flex items-center justify-center h-full'>
      <DashboardConnector />
    </div>
  )
}

export default LandingPage