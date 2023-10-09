import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { data: string } }
) {
    try {
        const body = await req.json();
        const { state } = body;

        const currentUser = await getCurrentUser();

        if (!params.data) {
            return new NextResponse("id is required", { status: 400 });
        }

        if (currentUser?.role !== 'ADMIN') {
            return new NextResponse("Admin access required!",{status:400})
        }

        const campaign = await prismadb.campaign.updateMany({
            where: {
                id: params?.data
            },
            data: {
                state
            }
        })

        return NextResponse.json(campaign)
    } catch (error) {
        console.log('[ADMINCAMPAIGN_PATCH]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}