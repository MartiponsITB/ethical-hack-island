
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useChallengeStore } from './challengeStore';
import { authApi } from '@/services/api';

interface User {
  username: string;
  isAdmin: boolean;
}

interface AuthState {
  currentUser: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      isAdmin: false,
      
      login: async (username: string, password: string) => {
        const response = await authApi.login(username, password);
        
        if (response.success && response.data) {
          set({ 
            currentUser: response.data.username, 
            isAuthenticated: true,
            isAdmin: response.data.isAdmin
          });
          useChallengeStore.getState().setCurrentUser(response.data.username);
          return true;
        }
        
        return false;
      },
      
      register: async (username: string, password: string) => {
        const response = await authApi.register(username, password);
        
        if (response.success && response.data) {
          set({ 
            currentUser: response.data.username, 
            isAuthenticated: true,
            isAdmin: response.data.isAdmin
          });
          useChallengeStore.getState().setCurrentUser(response.data.username);
          return true;
        }
        
        return false;
      },
      
      logout: async () => {
        const response = await authApi.logout();
        
        if (response.success) {
          set({ currentUser: null, isAuthenticated: false, isAdmin: false });
          useChallengeStore.getState().setCurrentUser(null);
          return true;
        }
        
        return false;
      },
      
      checkSession: async () => {
        const response = await authApi.checkSession();
        
        if (response.success && response.data) {
          set({ 
            currentUser: response.data.username, 
            isAuthenticated: true,
            isAdmin: response.data.isAdmin
          });
          useChallengeStore.getState().setCurrentUser(response.data.username);
        }
      }
    }),
    {
      name: 'user-auth-storage',
    }
  )
);
