import prismadb from "@/lib/prismadb";

import AdminCampaignForm from "@/components/AdminCampaignForm";

const AdminCampaignUpdate = async ({
    params
}: {
    params: { data: string }
}) => {

    const campaign = await prismadb.campaign.findUnique({
        where: {
            id: params.data
        }
    });

    return (
        <div className="h-full p-14 space-y-4">
            <AdminCampaignForm initialdata={campaign} />
        </div>
    )
}

export default AdminCampaignUpdate