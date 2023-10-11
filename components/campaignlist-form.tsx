"use client"

import { useState, useRef, SetStateAction, useEffect } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form";
import {
    DateRange, Range
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

import { Heading } from '@/components/ui/heading';
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
import { useParams, useRouter } from 'next/navigation';
import { MoveLeft } from 'lucide-react';
import { Separator } from './ui/separator';
import DatePicker from './Calendar';

const formSchema = z.object({
    name: z.string(),
    group: z.string(),

});

interface CampaignListFormProps {

    initaildata: Campaign | null;
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
const CampaignListForm: React.FC<CampaignListFormProps> = ({ initaildata, usergroup }) => {

    let matchedGroup = usergroup?.find(group => group.id === initaildata?.groupId);

    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const params = useParams()
    
    const [emailHtml, setEmailHtml] = useState<JSONType>({});
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initaildata ? {
            name: initaildata.name || '',
            group: matchedGroup?.name || '',
        } : {
            name: '',
            group: 'general'
        }
    });

    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [dateRanges, setDateRanges] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: "selection"
        }
    ]);

    useEffect(() => {
        setDateRange(
            {
                startDate: initaildata?.startDate,
                endDate: initaildata?.endDate,
                key: "selection"
            }
        )
    }, [initaildata])
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

        if (dateRange?.startDate !== undefined && dateRange?.endDate !== undefined) {
            obj.startDate = dateRange?.startDate;
            obj.endDate = dateRange?.endDate;
        }

        obj.design = emailHtml

        try {
            const response = await axios.patch(`/api/campaign/${params.data}`, obj);
            toast.success("Campaign Updated")
            form.reset();
            setDateRange(
                {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection'
                }
            )
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

    const onDesignLoad = (data: any) => {
        console.log('onDesignLoad', data);
    };

    // const onLoad: EmailEditorProps['onLoad'] = (unlayer) => {
    //     console.log('onLoad', unlayer);
    //     unlayer.addEventListener('design:loaded', onDesignLoad);
    //     unlayer.loadDesign(sample);
    // };
    type JSONTemplate = {
        counters: {
          u_column: number;
          u_row: number;
          u_content_divider: number;
          u_content_button: number;
        };
        body: {
          id: string;
          rows: {
            id: string;
            cells: number[];
            columns: {
              id: string;
              contents: {
                id: string;
                type: string;
                values: {
                  // Properties of the "divider" type
                  width: string;
                  border: {
                    borderTopWidth: string;
                    borderTopStyle: string;
                    borderTopColor: string;
                  };
                  textAlign: string;
                  containerPadding: string;
                  anchor: string;
                  hideDesktop: boolean;
                  displayCondition: null | any; // Replace 'any' with the correct type
                  _meta: {
                    htmlID: string;
                    htmlClassNames: string;
                  };
                  selectable: boolean;
                  draggable: boolean;
                  duplicatable: boolean;
                  deletable: boolean;
                  hideable: boolean;
                };
                // values: {
                //   // Add properties specific to 'columns' here
                // };
              }[];
              values: {
                // Add properties specific to 'columns' here
              };
            }[];
            values: {
              displayCondition: null | any; // Replace 'any' with the correct type
              columns: boolean;
              backgroundColor: string;
              columnsBackgroundColor: string;
              backgroundImage: {
                url: string;
                fullWidth: boolean;
                repeat: string;
                size: string;
                position: string;
              };
              padding: string;
              anchor: string;
              hideDesktop: boolean;
              _meta: {
                htmlID: string;
                htmlClassNames: string;
              };
              selectable: boolean;
              draggable: boolean;
              duplicatable: boolean;
              deletable: boolean;
              hideable: boolean;
            };
          }[];
          headers: any[]; // Replace 'any' with the correct type
          footers: any[]; // Replace 'any' with the correct type
          values: {
            popupPosition: string;
            popupWidth: string;
            popupHeight: string;
            borderRadius: string;
            contentAlign: string;
            contentVerticalAlign: string;
            contentWidth: string;
            fontFamily: {
              label: string;
              value: string;
            };
            textColor: string;
            popupBackgroundColor: string;
            popupBackgroundImage: {
              url: string;
              fullWidth: boolean;
              repeat: string;
              size: string;
              position: string;
            };
            popupOverlay_backgroundColor: string;
            popupCloseButton_position: string;
            popupCloseButton_backgroundColor: string;
            popupCloseButton_iconColor: string;
            popupCloseButton_borderRadius: string;
            popupCloseButton_margin: string;
            popupCloseButton_action: {
              name: string;
              attrs: {
                onClick: string;
              };
            };
            backgroundColor: string;
            backgroundImage: {
              url: string;
              fullWidth: boolean;
              repeat: string;
              size: string;
              position: string;
            };
            preheaderText: string;
            linkStyle: {
              body: boolean;
              linkColor: string;
              linkHoverColor: string;
              linkUnderline: boolean;
              linkHoverUnderline: boolean;
            };
            _meta: {
              htmlID: string;
              htmlClassNames: string;
            };
          };
        };
        schemaVersion: number;
      };
      
      
    const onReady: EmailEditorProps['onReady'] = (unlayer) => {
        console.log('onReady', unlayer);
        if (initaildata?.design !== undefined && initaildata?.design !== null) {
            const design = initaildata.design as JSONTemplate;
            unlayer.loadDesign(design);
          }
    };


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Campaign"
                    description="Update Campaign"
                />
                <Button
                    disabled={loading}
                    variant="outline"
                    size="icon"
                    onClick={() => router.push('/dashboard/campaignlist')}
                >
                    <MoveLeft className="h-5 w-5" />
                </Button>
            </div>
            <Separator />
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

                        {/* <Controller
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
                        /> */}

                        <DatePicker
                            value={dateRange}

                            onChange={(value) =>
                                setDateRange(value.selection)}
                        />

                        <EmailEditor ref={emailEditorRef} onReady={onReady} />
                        {/* <div dangerouslySetInnerHTML={{ __html: initaildata.html }} /> */}

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
                    {/* <Button variant="outline" onClick={exportHtml}>Export HTML</Button> */}

                </div>
            </Form>
        </>

    )
}

export default CampaignListForm

