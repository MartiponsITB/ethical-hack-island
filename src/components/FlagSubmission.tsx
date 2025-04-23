
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useChallengeStore } from "@/store/challengeStore";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const FlagSubmission = () => {
  const [flag, setFlag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { validateFlag, markChallengeCompleted, completedChallenges } = useChallengeStore();
  const { isAuthenticated } = useAuthStore();
  const { id } = useParams<{ id?: string }>();
  
  const currentChallengeId = id ? parseInt(id) : undefined;
  const isCompleted = currentChallengeId ? completedChallenges.includes(currentChallengeId) : false;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Inicia sessió primer",
        description: "Cal iniciar sessió per enviar flags i desar el progrés.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Validate the flag against our challenge store
    const { isCorrect, challengeId } = validateFlag(flag);
    
    setTimeout(() => {
      if (isCorrect) {
        markChallengeCompleted(challengeId!);
        
        toast({
          title: "Flag correcta!",
          description: "Has completat el repte amb èxit!",
          className: "border-green-500 bg-green-500/10",
        });
        setFlag("");
      } else {
        toast({
          title: "Flag incorrecta",
          description: "La flag introduïda no és vàlida. Torna a provar.",
          variant: "destructive",
        });
      }
      
      setIsSubmitting(false);
    }, 1000);
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
              disabled={(!flag && !isCompleted) || isSubmitting || isCompleted || !isAuthenticated}
              className={`w-full ${isCompleted ? 'bg-green-500' : 'bg-cyber-green'} text-cyber-black hover:${isCompleted ? 'bg-green-500/90' : 'bg-cyber-green/90'} font-mono py-6`}
            >
              {isCompleted 
                ? "Repte Completat" 
                : isSubmitting 
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
