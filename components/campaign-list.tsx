"use client";

import { Heading } from '@/components/ui/heading'
import { Separator } from "@/components/ui/separator";
import DataTable from '@/components/ui/datatable';


import { CampaignColumnProps,campaigncolumns } from '@/components/col/campaign-columns';

interface CampaignListProps {
    data: CampaignColumnProps[]
}


const CampaignList: React.FC<CampaignListProps> = ({
    data
}) => {
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Campaign List (${data.length})`} description="Manage users for your user group" />
            </div>
            <Separator />
            <DataTable columns={campaigncolumns} data={data} searchKey="name" />
        </>
    )
}

export default CampaignList