"use client";

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter,useSearchParams } from "next/navigation";
import { useState } from "react";
import { Github } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa6'

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
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(4).max(8),
});

export const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name:"",
      password: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/auth/register', values);
      toast.success("User Created")
      form.reset()
      registerModal.onClose()
      setLoading(false);
      router.refresh()
      loginModal.onOpen();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit =async () => {
    try {
      const res = await signIn('github', {
        callbackUrl,
        redirect: false
      })
      if (res?.error) {
        toast.error("Something Wrong!")
        return
      }
      registerModal.onClose()
      router.replace("dashboard")
    } catch (error) {
      toast.error("login error")
      setLoading(false);
    }
  }

  const abide =async () => {
    try {
      const res = await signIn('google', {
        callbackUrl,
        redirect: false
      })
      if (res?.error) {
        toast.error("Something Wrong!")
        return
      }
      loginModal.onClose()
      router.replace("dashboard")
    } catch (error) {
      toast.error("login error")
      setLoading(false);
    }
  }

  return (
    <Modal
      title="Wellcome To Campaign"
      description="Create An Account!"
      isOpen={registerModal.isOpen}
      onClose={() => {
        form.reset();
        registerModal.onClose();
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
                <div className="pt-6 pb-2 space-x-2 flex items-center justify-center w-full">
                  <Button variant="outline" disabled={loading} type="submit">Create</Button>
                </div>
              </form>
            </Form>
            <Separator />
            <div className="flex justify-between m-4 gap-4">
              <Button onClick={handleSubmit} variant="outline">
                <Github className="m-1" />
                Github
              </Button>
              <Button onClick={abide} variant="outline">
                <FaGoogle className="m-1" />
                Google
              </Button>
            </div>
            <div className="
      text-neutral-500 text-center mt-4 font-light">
              <p>Already have an account?
                <span
                  onClick={() => {loginModal.onOpen();registerModal.onClose()}}
                  className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
                > Log in</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};