import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  loginMethod: string | null;
  login: (email: string, method: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userEmail: null,
      loginMethod: null,
      login: (email, method) =>
        set({
          isAuthenticated: true,
          userEmail: email,
          loginMethod: method,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          userEmail: null,
          loginMethod: null,
        }),
    }),
    {
      name: 'thelearninghyena-auth',
    }
  )
);
