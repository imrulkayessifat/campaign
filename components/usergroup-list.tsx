"use client";

import { Plus } from 'lucide-react'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator";
import { useUserGroupModal } from '@/hooks/useUserGroupModal';
import DataTable from '@/components/ui/datatable';
import { UserGroupColumnProps,usergroupcolumns } from '@/components/col/user-group-columns';

interface UserGroupListProps {
    data: UserGroupColumnProps[]
}

const UserGroupList: React.FC<UserGroupListProps> = ({
    data
}) => {
    const userGroupModal = useUserGroupModal()
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`User Group (${data.length})`} description="Manage users for your user group" />
                <Button onClick={() => userGroupModal.onOpen()}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={usergroupcolumns} data={data} searchKey="name" />
        </>
    )
}

export default UserGroupList