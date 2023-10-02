"use client";

import React from 'react'
import { Plus } from 'lucide-react'
import { ColumnDef } from "@tanstack/react-table"

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator";
import { useUserModal } from "@/hooks/use-user-modal";
import DataTable from '@/components/ui/datatable';
import { CellAction } from '@/components/cell-action';

interface AdministratorColumnProps {
    id: string;
    email: string;
    username: string;
    isAdmin: string;
    status: string;
    createdAt: Date;
    emailVerified: Date | null;
}

interface AdministratorListProps {
    data: AdministratorColumnProps[]
}

const columns: ColumnDef<AdministratorColumnProps>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "isAdmin",
        header: "Type",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "emailVerified",
        header: "Verification"
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];

const AdministratorList: React.FC<AdministratorListProps> = ({
    data
}) => {
    const userModal = useUserModal()
    console.log(data)
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Users (${data.length})`} description="Manage users for your campaign" />
                <Button onClick={() => userModal.onOpen()}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="email" />
        </>
    )
}

export default AdministratorList