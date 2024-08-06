import { create } from 'zustand'
import { getUser } from '@/lib/getUser';
import { User } from '@/types';

interface UserState {
  user: User | null;
  setUser: (user: any) => void;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const userData = await getUser();
    set({ user: userData });
  },
}));
