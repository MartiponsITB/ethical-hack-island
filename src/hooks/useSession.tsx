
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export const useSession = () => {
  const { checkSession, isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    // Check session status on page load
    if (!isAuthenticated) {
      checkSession();
    }
    
    // Set up interval to periodically check session status (every 5 minutes)
    const interval = setInterval(() => {
      checkSession();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [checkSession, isAuthenticated]);
  
  return null;
};
