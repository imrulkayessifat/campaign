"use client";

import React from 'react'

import DataTable from '@/components/ui/datatable';
import { admincampaigncolumns,AdminCampaignColumnProps } from '@/components/col/admin-campaign-columns';

interface AdminCampaignListProps {
    data: AdminCampaignColumnProps[]
}

const AdminCampaign: React.FC<AdminCampaignListProps> = ({ data }) => {

    
    return (
        <DataTable columns={admincampaigncolumns} data={data} searchKey="name" />
    )
}

export default AdminCampaign