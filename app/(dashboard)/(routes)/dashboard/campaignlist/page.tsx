import React from 'react'
import prismadb from '@/lib/prismadb'

import CampaignList from '@/components/campaign-list'

const CampaignListPage = async () => {
    const data = await prismadb.campaign.findMany()
    console.log(data);
    return (
        <div className='h-full p-14 space-y-4'>
            <CampaignList data={data} />
        </div>
    )
}

export default CampaignListPage