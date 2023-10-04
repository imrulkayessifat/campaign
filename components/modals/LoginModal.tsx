"use client";

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Facebook } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa6'
import { signIn } from 'next-auth/react'

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(8),
});

export const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal()
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        ...values,
        callbackUrl,
        redirect: false
      })
      if(res?.error){
        toast.error("Invalid Credentials")
        setLoading(false)
        return
      }
      loginModal.onClose();
      router.replace("dashboard")
    } catch (error) {
      toast.error("login error")
      setLoading(false);
    }


  };

  return (
    <Modal
      title="Wellcome Back!"
      description="Login To Your Account"
      isOpen={loginModal.isOpen}
      onClose={() => {
        form.reset();
        loginModal.onClose();
      }}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" disabled={loading} placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" disabled={loading} placeholder="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-6 pb-6 space-x-2 flex items-center justify-center w-full">
                  <Button variant="outline" disabled={loading} type="submit">Log In</Button>
                </div>
              </form>
            </Form>
            <Separator />
            <div className="flex justify-between m-4 gap-4">
              <Button variant="outline">
                <Facebook className="m-1" />
                Facebook
              </Button>
              <Button variant="outline">
                <FaGoogle className="m-1" />
                Google
              </Button>
            </div>
            <div className="
      text-neutral-500 text-center mt-4 font-light">
              <p>First time using Campaign?
                <span
                  onClick={() => { registerModal.onOpen(); loginModal.onClose() }}
                  className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
                > Create an account</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};