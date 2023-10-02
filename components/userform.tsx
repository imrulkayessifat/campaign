"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { User } from "@prisma/client"

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
    email: z.string().email(),
    username: z.string().min(4).max(8),
    isAdmin: z.string(),
    status: z.string()
});

type UserFormValues = z.infer<typeof formSchema>

interface UserFormProps {
    initialdata: User;
}

const UserForm: React.FC<UserFormProps> = ({
    initialdata
}) => {
    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<UserFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialdata
    })

    const onSubmit = async (data: UserFormValues) => {
        try {
            setLoading(true)
            const res = await axios.post(`/api/users/`, data)
            console.log(res)
            toast.success("User Created")
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Users"
                    description="Create or Update users"
                />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UserName</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="UserName" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isAdmin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>IS Admin ?</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} disabled={loading} {...field}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="admin">admin</SelectItem>
                                                    <SelectItem value="user">user</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} disabled={loading} {...field}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="pending">pending</SelectItem>
                                                    <SelectItem value="active">active</SelectItem>
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

export default UserForm