
import { create } from 'zustand';
import { AuthState } from '@/types';
import { mockUsers } from '@/data/mockData';

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    // Mock authentication - find user by email
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      set({ isAuthenticated: true, user });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
  register: async (name: string, email: string, password: string) => {
    // Mock registration - create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff`
    };
    set({ isAuthenticated: true, user: newUser });
  },
}));
