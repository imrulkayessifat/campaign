import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { userid: string } }
) {
    try {
        const body = await req.json();
        console.log(body)
        console.log(params)
        const { email,name,userGroupName } = body;

        

        if (!userGroupName) {
            return new NextResponse("Group field is required", { status: 400 });
        }

        

        const user = await prismadb.user.updateMany({
            where: {
                id: params.userid
            },
            data: {
                email,
                name,
                userGroupName
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.log('[ADMINISTRATION_PATCH]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userid: string } }
) {
    try {
        const { userId } = auth();
        const user = await prismadb.user.delete({
            where: {
                id: params.userid
            },
        })

        return NextResponse.json(user)
    } catch (error) {
        console.log('[ADMINISTRATION_DELETE]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}