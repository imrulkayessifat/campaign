"use client"

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
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Users (${data.length})`} description="Manage users for your campaign" />
            </div>
            <Separator />
            <DataTable  columns={administratorcolumns} data={data} searchKey="email" />
        </>
    )
}

export default AdministratorList