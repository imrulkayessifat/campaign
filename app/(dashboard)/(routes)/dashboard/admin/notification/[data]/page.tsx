import prismadb from "@/lib/prismadb";

import AdminNotificationForm from "@/components/AdminNotificationForm";

const AdminNotificationUpdate = async ({
    params
}: {
    params: { data: string }
}) => {

    const notification = await prismadb.notification.findUnique({
        where: {
            id: params.data
        }
    });


    console.log(notification)

    return (
        <div className="h-full p-14 space-y-4">
            <AdminNotificationForm initialdata={notification} />
        </div>
    )
}

export default AdminNotificationUpdate