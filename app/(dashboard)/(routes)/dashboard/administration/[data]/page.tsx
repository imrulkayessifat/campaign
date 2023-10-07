import prismadb from "@/lib/prismadb";

import UserForm from "@/components/userform";

const AdministratorUpdate = async ({
    params
}: {
    params: { data: string }
}) => {

    const user = await prismadb.user.findUnique({
        where: {
            id: params.data
        }
    });
    const group = await prismadb.userGroup.findMany();
    console.log(user)
    return (
        <div className="h-full p-14 space-y-4">
            <UserForm initialdata={user} group={group} />
        </div>
    )
}

export default AdministratorUpdate