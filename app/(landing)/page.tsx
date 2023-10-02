"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const LandingPage = () => {
  const router = useRouter()
  return (
    <div className='flex items-center justify-center h-full'>
      <Button onClick={() => router.push("/sign-in")}>Landing</Button>
    </div>
  )
}

export default LandingPage