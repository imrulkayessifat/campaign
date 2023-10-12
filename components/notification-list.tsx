"use client";

import { Heading } from '@/components/ui/heading'
import { Separator } from "@/components/ui/separator";
import DataTable from '@/components/ui/datatable';
import { NotificationColumnProps,notificationcolumns } from '@/components/col/notification-columns';
interface CampaignListProps {
    data: NotificationColumnProps[]
}

const NotificationList: React.FC<CampaignListProps> = ({
    data
}) => {
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Notification List (${data.length})`} description="Manage Notification for campaign" />
            </div>
            <Separator />
            <DataTable columns={notificationcolumns} data={data} searchKey="name" />
        </>
    )
}

export default NotificationList