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

        if (!email || !username) {
            return new NextResponse("Email or Username is required", { status: 400 });
        }

        const user = await prismadb.user.create({
            data: {
                email,
                username,
                isAdmin,
                status
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.log('[ADMINISTRATION_POST]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}