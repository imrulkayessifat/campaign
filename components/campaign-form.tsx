"use client"

import { useState, useRef, SetStateAction, useEffect } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form";
import {
    DateRange,
} from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import axios from 'axios';
import toast from 'react-hot-toast';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Campaign, UserGroup } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    name: z.string(),
    group: z.string(),

});

interface CampaignProps {

    usergroup: UserGroup[] | null;
}

const CampaignForm: React.FC<CampaignProps> = ({ usergroup }) => {

    const [loading, setLoading] = useState(false);
    const [emailHtml, setEmailHtml] = useState('');
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            group: '',
        }
    });


    const [dateRanges, setDateRanges] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: "selection"
        }
    ]);

    interface objProps {
        name: string;
        group: string;
        startDate: Date;
        endDate: null;
        html: string;
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        let obj: objProps = {
            name: '',
            group: '',
            html: '',
            startDate: new Date(),
            endDate: null
        }
        obj.name = values?.name;
        obj.group = values?.group;
        obj.startDate = dateRanges[0]?.startDate;
        obj.endDate = dateRanges[0]?.endDate;
        obj.html = emailHtml

        try {
            const response = await axios.post('/api/campaign', obj);
            toast.success("Campaign Created")
            form.reset();
            setDateRanges([
                {
                    startDate: new Date(),
                    endDate: null,
                    key: "selection"
                }
            ])
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
        }

    };

    const emailEditorRef = useRef<EditorRef | null>(null);
    const [preview, setPreview] = useState(false);

    const saveDesign = () => {
        const unlayer = emailEditorRef.current?.editor;

        unlayer?.saveDesign((design: SetStateAction<string>) => {
            setEmailHtml(design);

        });
    };

    const exportHtml = () => {
        const unlayer = emailEditorRef.current?.editor;

        unlayer?.exportHtml((data) => {
            const { design, html } = data;
            setEmailHtml(html);

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

    const onDesignLoad = (data: any) => {
        console.log('onDesignLoad', data);
    };

    // const onLoad: EmailEditorProps['onLoad'] = (unlayer) => {
    //     console.log('onLoad', unlayer);
    //     unlayer.addEventListener('design:loaded', onDesignLoad);
    //     unlayer.loadDesign(sample);
    // };

    const onReady: EmailEditorProps['onReady'] = (unlayer) => {
        console.log('onReady', unlayer);
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

                    <Controller
                        name="date-ranges"
                        control={form.control}
                        render={({ field }) => (
                            <DateRange
                                {...field}
                                editableDateInputs={true}
                                onChange={(item) => {
                                    setDateRanges([item.selection]);
                                    field.onChange(item);
                                }}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRanges}
                            />
                        )}
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
                <Button variant="outline" onClick={exportHtml}>Export HTML</Button>

            </div>
        </Form>
    )
}

export default CampaignForm

