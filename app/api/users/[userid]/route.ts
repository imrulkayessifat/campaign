import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { group } from "console";
export async function PATCH(
    req: Request,
    { params }: { params: { userid: string } }
) {
    try {
        const body = await req.json();
        const { email,name,userGroupName,role } = body;

        const currentUser =await getCurrentUser()
        console.log(currentUser)
        if(currentUser?.role==='USER'){
            return new NextResponse("Only admin can delete a user", { status: 400 })
        }
        
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
                userGroupName,
                role
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
        const currentUser =await getCurrentUser()
        console.log(currentUser)
        if(currentUser?.role==='USER'){
            return new NextResponse("Only admin can delete a user", { status: 400 })
        }
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