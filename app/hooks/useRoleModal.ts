import { create } from 'zustand';

interface IRoleModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRoleModal = create<IRoleModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRoleModal;
