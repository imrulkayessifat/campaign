import { Contact,Tent,BadgeDollarSign,Users,User2 } from "lucide-react";
export const tools = [
    {
      label: 'Administration',
      icon: User2,
      href: '/administration',
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      label: 'Client List',
      icon: Users,
      href: '/client',
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: 'Payment',
      icon: BadgeDollarSign,
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
      href: '/payment',
    },
    {
      label: 'Campaign List',
      icon: Tent,
      color: "text-orange-700",
      bgColor: "bg-orange-700/10",
      href: '/campain',
    },
    {
      label: 'Users',
      icon: Contact,
      color: "text-green-700",
      bgColor: "bg-green-700/10",
      href: '/users',
    },
  ];