"use client"

import { signOut } from "next-auth/react";
import { LogOut } from 'lucide-react';

import { MobileSidebar } from "@/components/mobile-sidebar";

const Navbar = () => {

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