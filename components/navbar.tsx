"use client"

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { LogOut } from 'lucide-react';

import { MobileSidebar } from "@/components/mobile-sidebar";

interface NavbarProps {
    currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    return (
        <div className="flex items-center p-4">
            <MobileSidebar />
            <div className="flex w-full justify-end">
                <LogOut className="cursor-pointer" onClick={() => signOut()} />
            </div>
        </div>
    );
}

export default Navbar;