import prismadb from "@/lib/prismadb";

import UserGroupForm from "@/components/usergroupform";

const UserGroupUpdate = async ({
    params
}: {
    params: { data: string }
}) => {

    const user = await prismadb.userGroup.findUnique({
        where: {
            id: params.data
        }
    });
    
    return (
        <div className="h-full p-14 space-y-4">
            <UserGroupForm initialdata={user} />
        </div>
    )
}

export default UserGroupUpdate