import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { email, username, isAdmin, status } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!username) {
            return new NextResponse("username field is required", { status: 400 });
        }

        if (!isAdmin) {
            return new NextResponse("isAdmin field is required", { status: 400 });
        }

        if (!status) {
            return new NextResponse("status field is required", { status: 400 });
        }

        if (!params.id) {
            return new NextResponse("userid is required", { status: 400 });
        }

        const user = await prismadb.user.updateMany({
            where: {
                id: params.id
            },
            data: {
                email,
                username,
                isAdmin,
                status
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