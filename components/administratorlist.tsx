"use client";

import React from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator";

const AdministratorList = () => {
    const router = useRouter()
    return (
        <>
            <div className='flex items-center justify-between'>
                <Heading title={`Users (0)`} description="Manage users for your campaign" />
                <Button onClick={() => router.push(`/administration/createuser`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
        </>
    )
}

export default AdministratorList