
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useChallengeStore } from './challengeStore';

interface User {
  username: string;
  password: string;
}

interface AuthState {
  currentUser: string | null;
  users: User[];
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],
      isAuthenticated: false,
      
      login: (username: string, password: string) => {
        const user = get().users.find(
          u => u.username === username && u.password === password
        );
        
        if (user) {
          set({ currentUser: username, isAuthenticated: true });
          useChallengeStore.getState().setCurrentUser(username);
          return true;
        }
        
        return false;
      },
      
      register: (username: string, password: string) => {
        const userExists = get().users.some(u => u.username === username);
        
        if (userExists) {
          return false;
        }
        
        set(state => ({
          users: [...state.users, { username, password }],
          currentUser: username,
          isAuthenticated: true
        }));
        
        useChallengeStore.getState().setCurrentUser(username);
        return true;
      },
      
      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
        useChallengeStore.getState().setCurrentUser(null);
      }
    }),
    {
      name: 'user-auth-storage',
    }
  )
);
