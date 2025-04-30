
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { challengeApi, leaderboardApi } from '@/services/api';

export interface Challenge {
  id: number;
  title: string;
  completed: boolean;
  flag: string;
}

// Store user progress by username with completion timestamps
interface UserProgress {
  completedChallenges: number[];
  hackathonUnlocked: boolean;
  hackathonStartTime?: number; // Timestamp when hackathon was started
  hackathonEndTime?: number;   // Timestamp when hackathon was completed
  completionTimes: Record<number, number>; // Map of challenge ID to completion timestamp
}

interface ChallengeState {
  challenges: Challenge[];
  currentUser: string | null;
  userProgress: Record<string, UserProgress>;
  validateFlag: (flag: string) => Promise<{ isCorrect: boolean; challengeId: number | null }>;
  markChallengeCompleted: (challengeId: number) => Promise<void>;
  setCurrentUser: (username: string | null) => void;
  resetProgress: () => Promise<void>;
  getUserCompletedChallenges: () => number[];
  isHackathonUnlocked: () => boolean;
  getHackathonTimeLeft: () => number | null;
  getHackathonCompletionTime: () => number | null;
  getChallengeCompletionTime: (challengeId: number) => number | null;
  resetAllUserProgress: () => Promise<void>;
  loadUserProgress: () => Promise<void>;
}

const HACKATHON_DURATION = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

export const useChallengeStore = create<ChallengeState>()(
  persist(
    (set, get) => ({
      challenges: [
        { id: 1, title: "Repte de Xarxes", completed: false, flag: "" },
        { id: 2, title: "Atac SQL", completed: false, flag: "" },
        { id: 3, title: "Atac amb Exploit", completed: false, flag: "" },
        { id: 4, title: "Defensa de Sistemes", completed: false, flag: "" },
        { id: 5, title: "Anàlisi Forense", completed: false, flag: "" },
        { id: 8, title: "Hackaton Final", completed: false, flag: "" },
      ],
      currentUser: null,
      userProgress: {},

      loadUserProgress: async () => {
        const username = get().currentUser;
        if (!username) return;

        const response = await challengeApi.getUserProgress();
        if (response.success && response.data) {
          set(state => ({
            userProgress: {
              ...state.userProgress,
              [username]: response.data
            },
            challenges: state.challenges.map(challenge => ({
              ...challenge,
              completed: response.data.completedChallenges.includes(challenge.id)
            }))
          }));
        }
      },

      validateFlag: async (flag: string) => {
        const response = await challengeApi.validateFlag(flag);
        if (response.success && response.data) {
          return response.data;
        }
        return { isCorrect: false, challengeId: null };
      },

      markChallengeCompleted: async (challengeId: number) => {
        const username = get().currentUser;
        if (!username) return;

        const response = await challengeApi.markCompleted(challengeId);
        
        if (response.success) {
          // Re-fetch user progress to get up-to-date data from server
          await get().loadUserProgress();
        }
      },

      setCurrentUser: (username: string | null) => {
        set({ currentUser: username });
        
        if (username) {
          // Load user progress when user is set
          get().loadUserProgress();
        } else {
          // Reset challenges completion state when logging out
          set({
            challenges: get().challenges.map(challenge => ({
              ...challenge,
              completed: false
            }))
          });
        }
      },

      resetProgress: async () => {
        const response = await challengeApi.resetProgress();
        
        if (response.success) {
          const username = get().currentUser;
          if (!username) return;
          
          // Re-fetch user progress after reset
          await get().loadUserProgress();
        }
      },
      
      resetAllUserProgress: async () => {
        const response = await leaderboardApi.resetAllProgress();
        
        if (response.success) {
          set({
            userProgress: {},
            challenges: get().challenges.map(challenge => ({ ...challenge, completed: false }))
          });
        }
      },
      
      getUserCompletedChallenges: () => {
        const state = get();
        const username = state.currentUser;
        if (!username) return [];
        
        return state.userProgress[username]?.completedChallenges || [];
      },
      
      isHackathonUnlocked: () => {
        const state = get();
        const username = state.currentUser;
        if (!username) return false;
        
        return state.userProgress[username]?.hackathonUnlocked || false;
      },
      
      getHackathonTimeLeft: () => {
        const state = get();
        const username = state.currentUser;
        if (!username) return null;
        
        const userProgress = state.userProgress[username];
        if (!userProgress?.hackathonStartTime) return null;
        
        // If hackathon is already completed, return 0
        if (userProgress.hackathonEndTime) return 0;
        
        const endTime = userProgress.hackathonStartTime + HACKATHON_DURATION;
        const timeLeft = endTime - Date.now();
        
        // If time is up but not marked as completed
        if (timeLeft <= 0) return 0;
        
        return timeLeft;
      },
      
      getHackathonCompletionTime: () => {
        const state = get();
        const username = state.currentUser;
        if (!username) return null;
        
        const userProgress = state.userProgress[username];
        if (!userProgress?.hackathonStartTime || !userProgress?.hackathonEndTime) return null;
        
        return userProgress.hackathonEndTime - userProgress.hackathonStartTime;
      },
      
      getChallengeCompletionTime: (challengeId: number) => {
        const state = get();
        const username = state.currentUser;
        if (!username) return null;
        
        return state.userProgress[username]?.completionTimes[challengeId] || null;
      }
    }),
    {
      name: 'user-challenge-progress',
      partialize: (state) => ({
        challenges: state.challenges,
        userProgress: state.userProgress,
        currentUser: state.currentUser,
      }),
    }
  )
);

// Initialize user progress when the store is loaded
if (typeof window !== 'undefined') {
  setTimeout(() => {
    const { currentUser } = useChallengeStore.getState();
    if (currentUser) {
      useChallengeStore.getState().loadUserProgress();
    }
  }, 100);
}
