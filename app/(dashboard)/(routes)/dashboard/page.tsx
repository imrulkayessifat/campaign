import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import AdminCampaign from "@/components/admin-campaign";
import AdminNotification from "@/components/admin-notification";
import prismadb from "@/lib/prismadb";


const HomePage = async () => {
  

  const campaign = await prismadb.campaign.findMany();
  const notification = await prismadb.notification.findMany()
  console.log(campaign)

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Campaign Management Platform
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Highly recommended for real estate industry but it can be also used for any promotional purpose
        </p>
      </div>
      <div className="px-6 md:px-20 lg:px-32 space-y-6">
        <Heading
          title="Campaign "
          description="Admin Approval"
        />
        <Separator />
        <AdminCampaign data={campaign} />
      </div>
      <div className="px-6 md:px-20 lg:px-32 space-y-7">
        <Heading
          title="Notification "
          description="Admin Approval"
        />
        <Separator />
        <AdminNotification data={notification} />
        <Separator />
      </div>
    </div>
  );
}

export default HomePage;