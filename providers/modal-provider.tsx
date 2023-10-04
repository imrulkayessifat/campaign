"use client";

import { useEffect, useState } from "react";

import { UserModal } from "@/components/modals/user-modal";
import { LoginModal } from "@/components/modals/LoginModal";
import { RegisterModal } from "@/components/modals/RegisterModal";

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
      <UserModal />
      <LoginModal />
      <RegisterModal />
    </>
  );
}