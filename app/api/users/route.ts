import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
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


        const user = await prismadb.user.createMany({
            data: [{
                email,
                username,
                isAdmin,
                status
            }]
        })
      
        return NextResponse.json(user)
    } catch (error) {
        console.log('[ADMINISTRATION_POST]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


