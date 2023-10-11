import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserGroupCellAction } from "@/components/groupcell-action";

export type UserGroupColumnProps  = {
    id: string;
    userId: string;
    name:string;
}

export const usergroupcolumns: ColumnDef<UserGroupColumnProps,any>[] = [
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