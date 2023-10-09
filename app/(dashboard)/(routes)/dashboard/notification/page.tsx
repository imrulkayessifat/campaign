

import prismadb from "@/lib/prismadb";
import NotificationForm from "@/components/notification-form";
import { Heading } from "@/components/ui/heading";

const NotificationPage = async () => {

  const usergroup = await prismadb.userGroup.findMany()

  return (
    <div className='h-full p-14 space-y-4'>
      <Heading
        title="Notification "
        description="Notification Campaign Create"
      />
      <NotificationForm usergroup={usergroup} />
    </div>
  )
}

export default NotificationPage