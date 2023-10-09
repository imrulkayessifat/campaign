"use client";

import React from 'react'

import { ArrowDownUp } from 'lucide-react';
import { Approval } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { AdminCampaignCellAction } from '@/components/admin-campaigncell-action';
import DataTable from '@/components/ui/datatable';


export interface AdminCampaignColumnProps {
    name:string;
    state:Approval;
}

interface AdminCampaignListProps {
    data: AdminCampaignColumnProps[]
}

const AdminCampaign: React.FC<AdminCampaignListProps> = ({data}) => {
    console.log(data)
    const columns: ColumnDef<AdminCampaignListProps, any>[] = [
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
            accessorKey: "state",
            header: "State"
        },
        {
            id: "actions",
            cell: ({ row }) => <AdminCampaignCellAction data={row.original} />
        },
    ];
    return (
        <DataTable columns={columns} data={data} searchKey="name" />
    )
}

export default AdminCampaign