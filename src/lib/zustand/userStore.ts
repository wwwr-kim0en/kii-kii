import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
const useUserStore = create((set) => ({
	userData: null as User | null,
	setUserData: (userData: User) => set({ userData }),
}));

export default useUserStore;
