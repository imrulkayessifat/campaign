"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CellAction } from "@/components/cell-action";

export type AdministratorColumnProps = {
    id: string;
    email: string | null;
    name: string | null;
    userGroupName: string[] ;
    role: "ADMIN" | "USER";
    image: string | null;
    hashedPassword: string | null;
    updatedAt : Date;
    createdAt: Date;
    emailVerified: Date | null;
}

export const administratorcolumns: ColumnDef<AdministratorColumnProps>[] = [
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Email
                <ArrowDownUp className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "userGroupName",
        header: "Group",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original}/>
    },
];