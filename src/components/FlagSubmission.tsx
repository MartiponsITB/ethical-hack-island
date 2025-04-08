
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const FlagSubmission = () => {
  const [flag, setFlag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // This is a placeholder for flag validation
    // In a real app, this would be an API call to the backend
    setTimeout(() => {
      const isCorrect = Math.random() > 0.5; // Simulate random success/fail for demo
      
      if (isCorrect) {
        toast({
          title: (
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              Flag correcta!
            </div>
          ),
          description: "Has completat el repte amb èxit!",
          className: "border-green-500 bg-green-500/10",
        });
        setFlag("");
      } else {
        toast({
          title: (
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Flag incorrecta
            </div>
          ),
          description: "La flag introduïda no és vàlida. Torna a provar.",
          variant: "destructive",
        });
      }
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-cyber-darkgray to-cyber-black">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 cyber-title">Has resolt el repte?</h2>
          <p className="text-muted-foreground mb-8">
            Introdueix la flag que has trobat per validar la solució i avançar al següent nivell.
          </p>
          
          <form onSubmit={handleSubmit} className="cyber-container p-8 bg-cyber-black/80 border-cyber-green/30">
            <div className="mb-6">
              <Input
                type="text"
                placeholder="flag{...}"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                className="cyber-input font-mono"
              />
            </div>
            <Button 
              type="submit" 
              disabled={!flag || isSubmitting}
              className="w-full bg-cyber-green text-cyber-black hover:bg-cyber-green/90 font-mono py-6"
            >
              {isSubmitting ? "Verificant..." : "Verificar Flag"}
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              Format de flag típic: <code className="text-cyber-green">flag&#123;text_secret_aquí&#125;</code>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FlagSubmission;
