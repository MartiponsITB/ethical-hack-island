
import { useState } from 'react';
import { useChallengeStore } from '@/store/challengeStore';
import { useToast } from '@/components/ui/use-toast';

export const useValidateFlag = () => {
  const [isValidating, setIsValidating] = useState(false);
  const { validateFlag, markChallengeCompleted } = useChallengeStore();
  const { toast } = useToast();

  const validateFlagSafely = async (flag: string): Promise<boolean> => {
    setIsValidating(true);
    try {
      const result = await validateFlag(flag);
      const { isCorrect, challengeId } = result;
      
      if (isCorrect && challengeId) {
        await markChallengeCompleted(challengeId);
        toast({
          title: "Flag correcta!",
          description: "Has completat el repte amb èxit!",
          className: "border-green-500 bg-green-500/10",
        });
        return true;
      } else {
        toast({
          title: "Flag incorrecta",
          description: "La flag introduïda no és vàlida. Torna a provar.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Error validating flag:", error);
      toast({
        title: "Error",
        description: "Hi ha hagut un problema en validar la flag.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  return {
    isValidating,
    validateFlagSafely
  };
};
