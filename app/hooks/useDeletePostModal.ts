import { create } from 'zustand';

interface IDeletePostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeletePostModal = create<IDeletePostModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeletePostModal;
