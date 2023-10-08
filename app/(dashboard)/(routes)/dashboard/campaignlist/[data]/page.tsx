import prismadb from "@/lib/prismadb";

import CampaignForm from "@/components/campaign-form";

const CampaignUpdate = async ({
    params
}: {
    params: { data: string }
}) => {

    const campaign = await prismadb.campaign.findUnique({
        where: {
            id: params.data
        }
    });

    console.log(campaign)
    
    return (
        <div className="h-full p-14 space-y-4">
            <CampaignForm initialdata={campaign} />
        </div>
    )
}

export default CampaignUpdate