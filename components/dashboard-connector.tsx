"use client"
import React from 'react'

import useLoginModal from '@/hooks/useLoginModal'
import { Button } from '@/components/ui/button'

const DashboardConnector = () => {
    const loginModal = useLoginModal()
  return (
    <Button onClick={() => loginModal.onOpen()}>Landing</Button>
  )
}

export default DashboardConnector