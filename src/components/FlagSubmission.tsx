
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useChallengeStore } from "@/store/challengeStore";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useValidateFlag } from "@/hooks/useValidateFlag";

const FlagSubmission = () => {
  const [flag, setFlag] = useState("");
  const { toast } = useToast();
  const { validateFlagSafely, isValidating } = useValidateFlag();
  const { getUserCompletedChallenges } = useChallengeStore();
  const { isAuthenticated } = useAuthStore();
  const { id } = useParams<{ id?: string }>();
  
  const currentChallengeId = id ? parseInt(id) : undefined;
  const completedChallenges = getUserCompletedChallenges();
  const isCompleted = currentChallengeId ? completedChallenges.includes(currentChallengeId) : false;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Inicia sessió primer",
        description: "Cal iniciar sessió per enviar flags i desar el progrés.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Validate the flag using our hook which handles the Promise correctly
      const success = await validateFlagSafely(flag);
      
      if (success) {
        setFlag("");
      }
    } catch (error) {
      console.error("Error validating flag:", error);
    }
  };

  return (
    <section className="py-16 bg-cyber-black">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 cyber-title">
            {isCompleted ? (
              <>
                <CheckCircle2 className="inline-block mr-2 text-green-500" /> 
                Repte Completat!
              </>
            ) : (
              "Has resolt el repte?"
            )}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isCompleted 
              ? "Ja has validat correctament aquest repte. Pots provar un altre repte."
              : "Introdueix la flag que has trobat per validar la solució i avançar al següent nivell."}
          </p>
          
          <form onSubmit={handleSubmit} className={`cyber-container p-8 bg-cyber-black/80 border-${isCompleted ? 'green' : 'cyber-green'}/30`}>
            {!isCompleted && (
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="flag{...}"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  className="cyber-input font-mono"
                  disabled={isCompleted}
                />
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={(!flag && !isCompleted) || isValidating || isCompleted || !isAuthenticated}
              className={`w-full ${isCompleted ? 'bg-green-500' : 'bg-cyber-green'} text-cyber-black hover:${isCompleted ? 'bg-green-500/90' : 'bg-cyber-green/90'} font-mono py-6`}
            >
              {isCompleted 
                ? "Repte Completat" 
                : isValidating 
                  ? "Verificant..." 
                  : !isAuthenticated 
                    ? "Inicia sessió per verificar" 
                    : "Verificar Flag"}
            </Button>
            
            {!isCompleted && (
              <p className="mt-4 text-xs text-muted-foreground">
                Format de flag típic: <code className="text-cyber-green">flag&#123;text_secret_aquí&#125;</code>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default FlagSubmission;
