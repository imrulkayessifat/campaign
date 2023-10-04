'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Avatar from "@/components/avatar";
import MenuItem from "@/components/MenuItem";

interface User {
    name: string ;
    email: string ;
    image: string ;
}

interface CurrentUser {
    currentUser: User;
}


const UserMenu: React.FC<CurrentUser> = ({
    currentUser
}) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);


    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={toggleOpen}
                    className="
          p-4
          
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser && (
                            <>
                                <MenuItem
                                    label="My Profile"
                                    onClick={() => router.push('/dashboard/profile')}
                                />

                                <hr />
                                <MenuItem
                                    label="Logout"
                                    onClick={() => signOut()}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;