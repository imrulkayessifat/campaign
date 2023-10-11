import { Approval } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CampaignCellAction } from "@/components/campaigncell-action";

export type  CampaignColumnProps = {
    id:string;
    name:string;
    groupId:string;
    startDate:Date;
    endDate:Date;
    state:Approval;
}

export const campaigncolumns: ColumnDef<CampaignColumnProps,any>[] = [
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