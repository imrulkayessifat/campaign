import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function getSession() {
    return await getServerSession(authOptions)
}

import UserMenu from "@/components/user-menu";
import { MobileSidebar } from "@/components/mobile-sidebar";

const Navbar =async () => {
    const session = await getSession();
    const currentUser = session ? session.user : null;
    console.log(currentUser)
    return (
        <div className="flex items-center p-4">
            <MobileSidebar />
            <div className="flex w-full justify-end">
                <UserMenu currentUser={currentUser}/>
            </div>
        </div>
    );
}

export default Navbar;