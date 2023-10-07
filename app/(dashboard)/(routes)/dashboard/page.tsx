"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";


export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
        Campaign Management Platform
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
        Highly recommended for real estate industry but it can be also used for any promotional purpose
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        hlw
      </div>
    </div>
  );
}