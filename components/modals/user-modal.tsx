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
import { useUserModal } from "@/hooks/use-user-modal";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(4).max(8),
  isAdmin: z.string(),
  status: z.string()
});

export const UserModal = () => {
  const userModal = useUserModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      isAdmin: "",
      status: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      const response = await axios.post('/api/users', values);
      toast.success("User Created")
      form.reset()
      userModal.onClose()
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
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={userModal.isOpen}
      onClose={() => {
        form.reset();
        userModal.onClose();
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
                        <FormLabel>TYPE</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} disabled={loading} {...field}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="admin">ADMIN</SelectItem>
                                <SelectItem value="user">USER</SelectItem>
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
                        <FormLabel>STATUS</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} disabled={loading} {...field}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="active">ACTIVE</SelectItem>
                                <SelectItem value="pending">PENDING</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
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
                    userModal.onClose();
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