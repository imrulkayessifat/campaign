"use client";

import { Approval } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AdminCampaignCellAction } from "@/components/admin-campaigncell-action";


export type AdminCampaignColumnProps = {
    id:string;
    name: string;
    state: Approval;
}

export const admincampaigncolumns: ColumnDef<AdminCampaignColumnProps, any>[] = [
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