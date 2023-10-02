"use client";

import { useEffect, useState } from "react";

import { UserModal } from "@/components/modals/user-modal";

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
    </>
  );
}