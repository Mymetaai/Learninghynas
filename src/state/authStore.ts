import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  isAnonymous: boolean;
  userEmail: string | null;
  loginMethod: string | null;
  userId: string | null;
  setUserId: (userId: string | null) => void;
  setIsAnonymous: (isAnonymous: boolean) => void;
  login: (email: string, method: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAnonymous: true,
      userEmail: null,
      loginMethod: null,
      userId: null,
      setUserId: (userId) => set({ userId }),
      setIsAnonymous: (isAnonymous) => set({ isAnonymous }),
      login: (email, method) =>
        set({
          isAuthenticated: true,
          isAnonymous: false,
          userEmail: email,
          loginMethod: method,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          isAnonymous: true,
          userEmail: null,
          loginMethod: null,
          userId: null,
        }),
    }),
    {
      name: 'thelearninghyena-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        isAnonymous: state.isAnonymous,
        userEmail: state.userEmail,
        loginMethod: state.loginMethod,
        userId: state.userId,
      }),
    }
  )
);

