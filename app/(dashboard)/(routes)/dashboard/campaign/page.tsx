

import prismadb from "@/lib/prismadb";
import CampaignForm from "@/components/campaign-form";

const CampaignPage =async () => {

  const usergroup =await prismadb.userGroup.findMany()

  return (
    <div className='h-full p-14 space-y-4'>
      <CampaignForm usergroup={usergroup}/>
    </div>
  )
}

export default CampaignPage