import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { groupid: string } }
) {
    try {
        const body = await req.json();
        const { name } = body;

        if (!name) {
            return new NextResponse("name field is required", { status: 400 });
        }

        if (!params.groupid) {
            return new NextResponse("id is required", { status: 400 });
        }

        const usergroup = await prismadb.userGroup.updateMany({
            where: {
                id: params?.groupid
            },
            data: {
                name
            }
        })

        return NextResponse.json(usergroup)
    } catch (error) {
        console.log('[USERGROUP_PATCH]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { groupid: string } }
) {
    try {
        const usergroup = await prismadb.userGroup.delete({
            where: {
                id: params.groupid
            },
        })

        return NextResponse.json(usergroup)
    } catch (error) {
        console.log('[USERGROUP_DELETE]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}