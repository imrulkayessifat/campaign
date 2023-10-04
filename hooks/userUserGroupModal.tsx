import { create } from 'zustand';

interface useUserGroupModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUserGroupModal = create<useUserGroupModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));