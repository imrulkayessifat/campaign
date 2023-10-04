"use client";

import React from 'react'
import { Plus,ArrowDownUp } from 'lucide-react'
import { ColumnDef } from "@tanstack/react-table"

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator";
import { useUserGroupModal } from '@/hooks/userUserGroupModal';
import DataTable from '@/components/ui/datatable';
import { UserGroupCellAction } from '@/components/groupcell-action';

interface UserGroupColumnProps {
    id: string;
    userId: string;
    name:string;
}

interface UserGroupListProps {
    data: UserGroupColumnProps[]
}

const columns: ColumnDef<UserGroupListProps>[] = [
    {
        accessorKey:"id",
        header: "Id"
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Name
                <ArrowDownUp className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        id: "actions",
        cell: ({ row }) => <UserGroupCellAction data={row.original} />
    },
];

const UserGroupList: React.FC<UserGroupListProps> = ({
    data
}) => {

    const userGroupModal = useUserGroupModal()
    console.log(data)
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`User Group (${data.length})`} description="Manage users for your user group" />
                <Button onClick={() => userGroupModal.onOpen()}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
        </>
    )
}

export default UserGroupList