
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  validateFlag: (flag: string) => { isCorrect: boolean; challengeId: number | null };
  markChallengeCompleted: (challengeId: number) => void;
  setCurrentUser: (username: string | null) => void;
  resetProgress: () => void;
  getUserCompletedChallenges: () => number[];
  isHackathonUnlocked: () => boolean;
  getHackathonTimeLeft: () => number | null;
  getHackathonCompletionTime: () => number | null;
  getChallengeCompletionTime: (challengeId: number) => number | null;
  resetAllUserProgress: () => void;
}

const CORRECT_FLAGS: Record<number, string> = {
  1: "853212745123:)", // Repte Xarxes
  2: "849351789513",   // Repte SQL
  3: "697425642756476", // Repte Exploit
  4: "98234582137",    // Repte Defensa
  5: "55573655862",    // Repte Escalada
  8: "Gràcies_Per_Participar<3" // Hackathon
};

const HACKATHON_DURATION = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

export const useChallengeStore = create<ChallengeState>()(
  persist(
    (set, get) => ({
      challenges: [
        { id: 1, title: "Repte de Xarxes", completed: false, flag: CORRECT_FLAGS[1] },
        { id: 2, title: "Atac SQL", completed: false, flag: CORRECT_FLAGS[2] },
        { id: 3, title: "Atac amb Exploit", completed: false, flag: CORRECT_FLAGS[3] },
        { id: 4, title: "Defensa de Sistemes", completed: false, flag: CORRECT_FLAGS[4] },
        { id: 5, title: "Anàlisi Forense", completed: false, flag: CORRECT_FLAGS[5] },
        { id: 8, title: "Hackaton Final", completed: false, flag: CORRECT_FLAGS[8] },
      ],
      currentUser: null,
      userProgress: {},

      validateFlag: (flag: string) => {
        // Check against all challenges
        for (const [idStr, correctFlag] of Object.entries(CORRECT_FLAGS)) {
          const id = parseInt(idStr);
          if (correctFlag === flag) {
            return { isCorrect: true, challengeId: id };
          }
        }
        return { isCorrect: false, challengeId: null };
      },

      markChallengeCompleted: (challengeId: number) => {
        const state = get();
        const username = state.currentUser;
        
        if (!username) return; // Don't mark if no user is logged in
        
        const currentTime = Date.now();
        
        // Initialize user progress if needed
        const currentUserProgress = state.userProgress[username] || {
          completedChallenges: [],
          hackathonUnlocked: false,
          completionTimes: {}
        };
        
        // Don't mark as completed if already completed by this user
        if (currentUserProgress.completedChallenges.includes(challengeId)) {
          return;
        }

        // Update completed challenges
        const updatedCompletedChallenges = [...currentUserProgress.completedChallenges, challengeId];
        
        // Check if all 5 main challenges are completed to unlock hackathon
        const mainChallengesCompleted = [1, 2, 3, 4, 5].every(id => 
          updatedCompletedChallenges.includes(id)
        );

        // If this is the hackathon challenge being completed
        let hackathonEndTime = currentUserProgress.hackathonEndTime;
        if (challengeId === 8) {
          hackathonEndTime = currentTime;
        }
        
        // If this is the first time unlocking hackathon, set the start time
        let hackathonStartTime = currentUserProgress.hackathonStartTime;
        if (mainChallengesCompleted && !currentUserProgress.hackathonUnlocked) {
          hackathonStartTime = currentTime;
        }

        // Update completion times
        const updatedCompletionTimes = {
          ...currentUserProgress.completionTimes,
          [challengeId]: currentTime
        };

        // Update the challenges UI state
        const updatedChallenges = state.challenges.map(challenge => 
          challenge.id === challengeId 
            ? { ...challenge, completed: true } 
            : challenge
        );

        // Update the store with the new user progress
        set({
          challenges: updatedChallenges,
          userProgress: {
            ...state.userProgress,
            [username]: {
              completedChallenges: updatedCompletedChallenges,
              hackathonUnlocked: mainChallengesCompleted,
              hackathonStartTime,
              hackathonEndTime,
              completionTimes: updatedCompletionTimes
            }
          }
        });
      },

      setCurrentUser: (username: string | null) => {
        set({ currentUser: username });
        
        // When user changes, update the challenge completion state
        if (username) {
          const userProgress = get().userProgress[username] || { 
            completedChallenges: [],
            hackathonUnlocked: false,
            completionTimes: {}
          };
          
          set({
            challenges: get().challenges.map(challenge => ({
              ...challenge,
              completed: userProgress.completedChallenges.includes(challenge.id)
            }))
          });
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

      resetProgress: () => {
        const username = get().currentUser;
        if (!username) return;
        
        set({
          challenges: get().challenges.map(challenge => ({ ...challenge, completed: false })),
          userProgress: {
            ...get().userProgress,
            [username]: {
              completedChallenges: [],
              hackathonUnlocked: false,
              completionTimes: {}
            }
          }
        });
      },
      
      resetAllUserProgress: () => {
        set({
          userProgress: {},
          challenges: get().challenges.map(challenge => ({ ...challenge, completed: false }))
        });
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
