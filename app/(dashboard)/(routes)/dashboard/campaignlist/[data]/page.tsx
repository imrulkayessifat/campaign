import prismadb from "@/lib/prismadb";

import CampaignListForm from "@/components/campaignlist-form";

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

    const usergroup = await prismadb.userGroup.findMany()

    return (
        <div className="h-full p-14 space-y-4">
            <CampaignListForm initaildata={campaign} usergroup={usergroup} />
        </div>
    )
}

export default CampaignUpdate