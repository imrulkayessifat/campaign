"use client"

import { useState, useRef, SetStateAction } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {
    Range
} from 'react-date-range';
import axios from 'axios';
import toast from 'react-hot-toast';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import DatePicker from '@/components/Calendar';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { UserGroup } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    name: z.string(),
    group: z.string(),
});

interface CampaignProps {
    usergroup: UserGroup[] | null;
}

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

type JSONType = {
    [key: string]: string | number | boolean | JSONType | JSONType[];
};

const CampaignForm: React.FC<CampaignProps> = ({ usergroup }) => {

    const [loading] = useState(false);
    
    const [emailHtml, setEmailHtml] = useState<JSONType>({});
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            group: '',

        }
    });

    interface objProps {
        name: string;
        group: string;
        startDate: Date;
        endDate: Date;
        design: JSONType;
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        let obj: objProps = {
            name: '',
            group: '',
            design: {},
            startDate: new Date(),
            endDate: new Date()
        }
        obj.name = values?.name;
        obj.group = values?.group;
        obj.startDate = dateRange?.startDate!;
        obj.endDate = dateRange?.endDate!;
        obj.design = emailHtml
        if (Object.keys(obj.design).length === 0) {
            toast.error('Please save the design!');
            return;
        }
        const unlayer = emailEditorRef.current?.editor;

        try {
            const response = await axios.post('/api/campaign', obj);
            toast.success("Campaign Created")
            form.reset();
            setDateRange(
                {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection'
                }
            )
            unlayer?.loadDesign({
                counters: {
                    u_column: 0,
                    u_row: 0,
                },
                body: {
                    id: undefined,
                    rows: [],
                    headers: [],
                    footers: [],
                    values: {}
                }
            });
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
        }

    };

    const emailEditorRef = useRef<EditorRef | null>(null);
    const [preview, setPreview] = useState(false);

    const saveDesign = () => {
        const unlayer = emailEditorRef.current?.editor;

        unlayer?.saveDesign((design: SetStateAction<JSONType>) => {
            setEmailHtml(design);

        });
    };

    const togglePreview = () => {
        const unlayer = emailEditorRef.current?.editor;

        if (preview) {
            unlayer?.hidePreview();
            setPreview(false);
        } else {
            unlayer?.showPreview('desktop');
            setPreview(true);
        }
    };

    const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid md:grid-cols-1 grid-cols-1 gap-8">

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

                    <FormField
                        control={form.control}
                        name="group"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Group</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} disabled={loading} {...field}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {usergroup?.map((v: UserGroup, k: number) => {
                                                    return (
                                                        <SelectItem key={k} value={v.name}>{v.name}</SelectItem>
                                                    )
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />

                    <DatePicker
                        value={dateRange}

                        onChange={(value) =>
                            setDateRange(value.selection)}
                    />

                    <EmailEditor ref={emailEditorRef} onReady={onReady} />

                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                    Submit
                </Button>
            </form>
            <div className='flex items-center justify-between'>
                <Button variant="outline" onClick={togglePreview}>
                    {preview ? 'Hide' : 'Show'} Preview
                </Button>
                <Button variant="outline" onClick={saveDesign}>Save Design</Button>
            </div>
        </Form>
    )
}

export default CampaignForm

