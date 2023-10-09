import prismadb from "@/lib/prismadb";

import NotificationListForm from "@/components/notificationlist-form";
import { Heading } from "@/components/ui/heading";

const NotificationUpdate = async ({
    params
}: {
    params: { data: string }
}) => {

    const notification = await prismadb.notification.findUnique({
        where: {
            id: params.data
        }
    });

    const usergroup = await prismadb.userGroup.findMany()

    console.log(notification)

    return (
        <div className="h-full p-14 space-y-4">
            <NotificationListForm initaildata={notification} usergroup={usergroup} />
        </div>
    )
}

export default NotificationUpdate