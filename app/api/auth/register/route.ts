import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
export async function POST(
    req: Request
) {
    try {
        const body = await req.json();
        const { email, name, password } = body;
        const hashedPassword = await bcrypt.hash(password,12);
        console.log(email,name,hashedPassword)
        if (!email) {
            return new NextResponse("email field is required", { status: 400 });
        }

        if (!name) {
            return new NextResponse("name field is required", { status: 400 });
        }

        if (!password) {
            return new NextResponse("password field is required", { status: 400 });
        }


        const user = await prismadb.user.createMany({
            data: [{
                email,
                name,
                hashedPassword,
            }]
        })
      
        return NextResponse.json(user)
    } catch (error) {
        console.log('[REGISTER_POST]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


