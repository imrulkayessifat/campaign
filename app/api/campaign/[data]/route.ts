import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { data: string } }
) {
    try {
        const body = await req.json();
        const { name,group,startDate,endDate,design } = body;
        

        if (!name) {
            return new NextResponse("name field is required", { status: 400 });
        }

        if (!startDate) {
            return new NextResponse("startDate field is required", { status: 400 });
        }

        if (!endDate) {
            return new NextResponse("endDate field is required", { status: 400 });
        }

        if (!design) {
            return new NextResponse("design field is required", { status: 400 });
        }

        if (!params.data) {
            return new NextResponse("id is required", { status: 400 });
        }

        const groupData = await prismadb.userGroup.findMany({
            where:{
                name:group
            }
        })

        const groupId = groupData[0].id;

        const campaign = await prismadb.campaign.updateMany({
            where: {
                id: params?.data
            },
            data: {
                name,
                groupId,
                startDate,
                endDate,
                design
            }
        })

        return NextResponse.json(campaign)
    } catch (error) {
        console.log('[CAMPAIGN_PATCH]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { data: string } }
) {
    try {
        const campaign = await prismadb.campaign.delete({
            where: {
                id: params.data
            },
        })

        return NextResponse.json(campaign)
    } catch (error) {
        console.log('[CAMPAIGN_DELETE]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}