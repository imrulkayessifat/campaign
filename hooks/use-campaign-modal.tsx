import { create } from 'zustand';

interface useCampaignModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCampaignModal = create<useCampaignModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));