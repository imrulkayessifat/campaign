"use client";

import { useEffect, useState } from "react";

import { LoginModal } from "@/components/modals/LoginModal";
import { RegisterModal } from "@/components/modals/RegisterModal";
import { UserGroupModal } from "@/components/modals/usergroup-modal";


export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <UserGroupModal />
    </>
  );
}