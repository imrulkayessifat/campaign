import prismadb from '@/lib/prismadb'
import React from 'react'

import getCurrentUser from '@/app/actions/getCurrentUser'
import AdministratorList from '@/components/administrator-list'

const AdministrationPage = async () => {
  const users = await prismadb.user.findMany()
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  
  return (
    <div className='h-full p-14 space-y-4'>
      <AdministratorList data={users} />
    </div>
  )
}

export default AdministrationPage