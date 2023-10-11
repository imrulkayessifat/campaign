import React from 'react'
import prismadb from '@/lib/prismadb'

import NotificationList from '@/components/notification-list'

const NotificationListPage = async () => {
    const data = await prismadb.notification.findMany()
    return (
        <div className='h-full p-14 space-y-4'>
            <NotificationList data={data} />
        </div>
    )
}

export default NotificationListPage