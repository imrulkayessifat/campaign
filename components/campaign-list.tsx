"use client";

import React from 'react'
import { Plus,ArrowDownUp } from 'lucide-react'
import { ColumnDef } from "@tanstack/react-table"

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator";
import DataTable from '@/components/ui/datatable';
import { CampaignCellAction } from './campaigncell-action';
import { Approval } from '@prisma/client';

export interface CampaignColumnProps {
    name:string;
    groupId:string;
    startDate:Date;
    endDate:Date;
    state:Approval;
}

interface CampaignListProps {
    data: CampaignColumnProps[]
}

const columns: ColumnDef<CampaignListProps,any>[] = [
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
        accessorKey:"groupId",
        header: "Group"
    },
    {
        accessorKey:"startDate",
        header: "Start Date"
    },
    {
        accessorKey:"endDate",
        header: "End Date"
    },
    {
        accessorKey:"state",
        header: "State"
    },
    {
        id: "actions",
        cell: ({ row }) => <CampaignCellAction data={row.original} />
    },
];

const CampaignList: React.FC<CampaignListProps> = ({
    data
}) => {
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Campaign List (${data.length})`} description="Manage users for your user group" />
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
        </>
    )
}

export default CampaignList