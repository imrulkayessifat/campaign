"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { Users,User2,LayoutDashboard, BellRing,BellPlus,Settings, Tent } from "lucide-react";
import {TbBrandCampaignmonitor} from "react-icons/tb"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500"
  },
  {
    label: 'Administration',
    icon: User2,
    href: '/dashboard/administration',
    color: "text-violet-500",
  },
  {
    label: 'User Group',
    icon: Users,
    color: "text-pink-700",
    href: '/dashboard/usergroup',
  },
  {
    label: 'Campaign',
    icon: TbBrandCampaignmonitor,
    color: "text-orange-700",
    href: '/dashboard/campaign',
  },
  {
    label: 'Campaign List',
    icon: Tent,
    color: "text-emerald-500",
    href: '/dashboard/campaignlist',
  },
  {
    label: 'Notification',
    icon: BellRing,
    color: "text-green-700",
    href: '/dashboard/notification',
  },
  {
    label: 'NotificationList',
    icon: BellPlus,
    color: "text-green-700",
    href: '/dashboard/notificationlist',
  },
  // {
  //   label: 'Settings',
  //   icon: Settings,
  //   href: '/dashboard/settings',
  // },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full  text-black">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            Hois
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((btn) => (
            <Link
              key={btn.label}
              href={btn.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-black/10 rounded-lg transition",
                pathname === btn.href ? "text-zinc-700 bg-black/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <btn.icon className={cn("h-5 w-5 mr-3", btn.color)} />
                {btn.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};