import { create } from 'zustand';

interface IPostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePostModal = create<IPostModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePostModal;
