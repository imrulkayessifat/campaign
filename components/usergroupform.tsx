"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { MoveLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { UserGroup } from "@prisma/client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
    name:z.string().min(4)
});

type UserGroupFormValues = z.infer<typeof formSchema>

interface UserFormProps {
    initialdata: UserGroup | null;
}

const UserGroupForm: React.FC<UserFormProps> = ({
    initialdata
}) => {
    const params = useParams()
    const router = useRouter()

    const [loading, setLoading] = useState(false);

    const form = useForm<UserGroupFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialdata || {
            name:''
        },
    })

    const onSubmit = async (values: UserGroupFormValues) => {
        try {
            setLoading(true)
            const res = await axios.patch(`/api/usergroup/${params.data}`, values)
            toast.success("User Group Updated")
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="User Group "
                    description="Update User Group"
                />
                <Button
                    disabled={loading}
                    variant="outline"
                    size="icon"
                    onClick={() => router.push('/dashboard/usergroup')}
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
                                        <Input type="text" disabled={loading} placeholder="Name" {...field} />
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

export default UserGroupForm