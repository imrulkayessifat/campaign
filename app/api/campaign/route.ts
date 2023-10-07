import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        
        const body = await req.json();
        const { name, group, startDate,endDate,html } = body;

        const user = await getCurrentUser();

        const groupData = await prismadb.userGroup.findMany({
            where:{
                name:group
            }
        })
        
        const groupId = groupData[0].id;
        const userId = user?.id;
        console.log(name, groupId, startDate,endDate,html,userId)
        if (!name) {
            return new NextResponse("name field is required", { status: 400 });
        }

        if (!groupId) {
            return new NextResponse("groupId field is required", { status: 400 });
        }

        if (!startDate) {
            return new NextResponse("startDate field is required", { status: 400 });
        }
        if (!endDate) {
            return new NextResponse("endDate field is required", { status: 400 });
        }

        if (!html) {
            return new NextResponse("html field is required", { status: 400 });
        }

        if (!userId) {
            return new NextResponse("userId field is required", { status: 400 });
        }
        
        const campaign = await prismadb.campaign.createMany({
            data: [{
                name,
                groupId,
                startDate,
                endDate,
                html,
                userId
            }]
        })
      
        return NextResponse.json(campaign)
    } catch (error) {
        console.log('[CAMPAIGN_POST]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


