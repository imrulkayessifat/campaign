"use client"

import * as z from "zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { MoveLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { UserGroup } from "@prisma/client"
import Multiselect from 'multiselect-react-dropdown';

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
import { AiOutlineConsoleSql } from "react-icons/ai"

const roles = ["USER", "ADMIN"] as const;
type Role = typeof roles[number];

const formSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(roles)
});

type UserFormValues = z.infer<typeof formSchema>

interface UserFormProps {
    initialdata: User | null;
    group: UserGroup[] | null;
}

const UserForm: React.FC<UserFormProps> = ({
    initialdata, group
}) => {

    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    let data = group ? group.map(item => ({ id: item.id, name: item.name })) : [];

    console.log(data)
    let array2 = initialdata?.userGroupName;
    let result = data.filter(obj => array2.includes(obj.name));
    console.log(result)

    const [selectedValue, setSelectedValue] = useState([]);

    useEffect(() => {


        setSelectedValue(result);
    }, [initialdata])

    const onSelect = (selectedList, selectedItem) => {
        console.log(selectedList)
        setSelectedValue(selectedList);
    }

    const onRemove = (selectedList, removedItem) => {
        setSelectedValue(selectedList);
    }

    const form = useForm<UserFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialdata
            ? {
                email: initialdata.email || '',
                name: initialdata.name || '',
                role: initialdata.role || 'USER', // You can choose 'USER' or 'ADMIN' as the default role
            }
            : {
                email: '',
                name: '',
                role: 'USER', // You can choose 'USER' or 'ADMIN' as the default role
            },
    })

    const onSubmit = async (values: UserFormValues) => {
        let userGroupName: any[] = []
        selectedValue.map((item) => { userGroupName.push(item.name) });
        values.userGroupName = userGroupName
        try {
            setLoading(true)
            const res = await axios.patch(`/api/users/${params.data}`, values)
            toast.success("User Updated")
            router.refresh()
        } catch (error) {
            toast.error("ONlY ADMIN CAN UPDATE USER!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="User"
                    description="Update User"
                />
                <Button
                    disabled={loading}
                    variant="outline"
                    size="icon"
                    onClick={() => router.push('/dashboard/administration')}
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={true} placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="UserName" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Multiselect
                            options={data}
                            selectedValues={selectedValue}
                            onSelect={onSelect}
                            onRemove={onRemove}
                            displayValue="name"
                        />
                        <FormField
                            control={form.control}
                            name="role"
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
                                                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                                                    <SelectItem value="USER">USER</SelectItem>
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