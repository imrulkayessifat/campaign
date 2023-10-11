"use client";

import React from 'react'

import { Heading } from '@/components/ui/heading'
import { Separator } from "@/components/ui/separator";
import { useUserModal } from "@/hooks/use-user-modal";
import DataTable from '@/components/ui/datatable';

import { AdministratorColumnProps,administratorcolumns } from '@/components/col/administrator-columns';
interface AdministratorListProps {
    data: AdministratorColumnProps[],
}

const AdministratorList: React.FC<AdministratorListProps> = ({
    data,
}) => {
    const userModal = useUserModal()
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Users (${data.length})`} description="Manage users for your campaign" />
                {/* <Button onClick={() => userModal.onOpen()}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button> */}
            </div>
            <Separator />
            <DataTable  columns={administratorcolumns} data={data} searchKey="email" />
        </>
    )
}

export default AdministratorList