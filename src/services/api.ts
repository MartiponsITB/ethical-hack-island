
// API service for connecting to the backend
const API_BASE_URL = '/api'; // Path to PHP API on the server

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Generic request handler
async function apiRequest<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Send cookies for session management
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.error || 'API request failed' };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('API request error:', error);
    return { success: false, error: 'Network error' };
  }
}

// Authentication API functions
export const authApi = {
  login: (username: string, password: string) => 
    apiRequest<{ username: string; isAdmin: boolean }>('/auth/login.php', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
    
  register: (username: string, password: string) => 
    apiRequest<{ username: string; isAdmin: boolean }>('/auth/register.php', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
    
  logout: () => 
    apiRequest('/auth/logout.php', {
      method: 'POST',
    }),
    
  checkSession: () => 
    apiRequest<{ username: string; isAdmin: boolean }>('/auth/check-session.php'),
};

// Challenge API functions
export const challengeApi = {
  getChallenges: () => 
    apiRequest<Challenge[]>('/challenges/get-challenges.php'),
    
  validateFlag: (flag: string) => 
    apiRequest<{ isCorrect: boolean; challengeId: number | null }>('/challenges/validate-flag.php', {
      method: 'POST',
      body: JSON.stringify({ flag }),
    }),
    
  markCompleted: (challengeId: number) => 
    apiRequest('/challenges/mark-completed.php', {
      method: 'POST',
      body: JSON.stringify({ challengeId }),
    }),
    
  getUserProgress: () => 
    apiRequest<UserProgress>('/challenges/get-progress.php'),
    
  resetProgress: () => 
    apiRequest('/challenges/reset-progress.php', {
      method: 'POST',
    }),
};

// Leaderboard API functions
export const leaderboardApi = {
  getLeaderboard: () => 
    apiRequest<LeaderboardEntry[]>('/leaderboard/get-leaderboard.php'),
    
  resetAllProgress: () => 
    apiRequest('/leaderboard/reset-all-progress.php', {
      method: 'POST',
    }),
};

// Type definitions
export interface Challenge {
  id: number;
  title: string;
  completed: boolean;
  flag: string;
}

export interface UserProgress {
  completedChallenges: number[];
  hackathonUnlocked: boolean;
  hackathonStartTime?: number;
  hackathonEndTime?: number;
  completionTimes: Record<number, number>;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  hackathonTime?: string;
  totalTimeMs?: number;
}
