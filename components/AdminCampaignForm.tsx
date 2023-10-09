"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { MoveLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Campaign } from "@prisma/client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"

const formSchema = z.object({
    name: z.string().min(4),
    state: z.string()
});

type UserGroupFormValues = z.infer<typeof formSchema>

interface AdminCampaignFormProps {
    initialdata: Campaign | null;
}

const AdminCampaignForm: React.FC<AdminCampaignFormProps> = ({
    initialdata
}) => {
    const params = useParams()
    const router = useRouter()

    console.log(initialdata)

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<UserGroupFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialdata
        ? {
            name: initialdata.name || '',
            state: initialdata.state || 'PENDING',
        }
        : {
            name: '',
            state: 'PENDING',
        },
    })

    const onSubmit = async (values: UserGroupFormValues) => {
        try {
            setLoading(true)
            const res = await axios.patch(`/api/admin/campaign/${params.data}`, values)
            toast.success("Admin Approved")
            router.refresh()
        } catch (error) {
            toast.error("Admin access required!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Admin Campaign "
                    description="Approval"
                />
                <Button
                    disabled={loading}
                    variant="outline"
                    size="icon"
                    onClick={() => router.push('/dashboard/')}
                >
                    <MoveLeft className="h-5 w-5" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-8">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={true} placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role ?</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} disabled={loading} {...field}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="PENDING">PENDING</SelectItem>
                                                    <SelectItem value="APPROVE">APPROVE</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default AdminCampaignForm