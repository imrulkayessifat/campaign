import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    req: Request
) {
    try {
        const currentUser = await getCurrentUser()
        const body = await req.json();
        const userId = currentUser?.id || '';
        const { name } = body;

        if (!name) {
            return new NextResponse("name field is required", { status: 400 });
        }

        const user = await prismadb.userGroup.createMany({
            data: [{
                userId,
                name
            }]
        })
      
        return NextResponse.json(user)
    } catch (error) {
        console.log('[USERGROUP_POST]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


