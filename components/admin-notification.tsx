"use client";

import React from 'react'


import DataTable from '@/components/ui/datatable';
import { adminnotificationcolumns,AdminNotificationColumnProps } from '@/components/col/admin-notification-columns';




interface AdminNotificationListProps {
    data: AdminNotificationColumnProps[]
}

const AdminNotification: React.FC<AdminNotificationListProps> = ({data}) => {
    
    
    return (
        <DataTable columns={adminnotificationcolumns} data={data} searchKey="name" />
    )
}

export default AdminNotification