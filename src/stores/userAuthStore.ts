import { create } from "zustand";

interface authState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useUserAuthStore = create<authState>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false })
}))