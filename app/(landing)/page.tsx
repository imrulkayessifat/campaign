"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

import useLoginModal from '@/hooks/useLoginModal'
import { Button } from '@/components/ui/button'

const LandingPage = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  return (
    <div className='flex items-center justify-center h-full'>
      {/* <Button onClick={() => router.push("/sign-in")}>Landing</Button> */}
      <Button onClick={() => loginModal.onOpen()}>Landing</Button>
    </div>
  )
}

export default LandingPage