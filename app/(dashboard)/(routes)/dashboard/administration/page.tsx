import prismadb from '@/lib/prismadb'
import React from 'react'

import AdministratorList from '@/components/administrator-list'

const AdministrationPage = async () => {
  const users = await prismadb.user.findMany()
  console.log(users)
  return (
    <div className='h-full p-14 space-y-4'>
      <AdministratorList data={users} />
    </div>
  )
}

export default AdministrationPage