"use client";

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUserGroupModal } from "@/hooks/useUserGroupModal";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(4),
});

export const UserGroupModal = () => {
  const userGroupModal = useUserGroupModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      const response = await axios.post('/api/usergroup', values);
      toast.success("User Group Created")
      form.reset()
      userGroupModal.onClose()
      setLoading(false);
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create User Group"
      description="Make User Group to manage users."
      isOpen={userGroupModal.isOpen}
      onClose={() => {
        form.reset();
        userGroupModal.onClose();
      }}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button disabled={loading} variant="outline" onClick={() => {
                    form.clearErrors();
                    form.reset();
                    userGroupModal.onClose();
                  }}>
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">Continue</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};