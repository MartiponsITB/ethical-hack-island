
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Trophy } from "lucide-react";
import Leaderboard from "@/components/Leaderboard";
import { Button } from "@/components/ui/button";
import { useChallengeStore } from "@/store/challengeStore";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/components/ui/use-toast";

const LeaderboardPage = () => {
  const { resetAllUserProgress } = useChallengeStore();
  const { isAdmin } = useAuthStore();
  const { toast } = useToast();

  const handleResetAllProgress = () => {
    if (confirm("Estàs segur que vols reiniciar tot el progrés dels usuaris? Això esborrarà totes les dades de la classificació.")) {
      resetAllUserProgress();
      toast({
        title: "Progrés reiniciat",
        description: "S'ha esborrat tot el progrés dels usuaris correctament",
        className: "border-cyber-green bg-cyber-green/10",
      });
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black">
      <NavBar />
      <main className="pt-24 pb-16 bg-cyber-darkgray">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center items-center mb-12">
              <Trophy className="h-8 w-8 text-cyber-green mr-3" />
              <h1 className="text-4xl font-bold cyber-title">Classificació Global</h1>
            </div>
            
            {isAdmin && (
              <div className="mb-8 flex justify-end">
                <Button 
                  variant="destructive" 
                  onClick={handleResetAllProgress}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Reiniciar tot el progrés
                </Button>
              </div>
            )}
            
            <div className="cyber-container bg-cyber-black/80 border-cyber-green/40 p-6 mb-8">
              <p className="text-muted-foreground text-center mb-8">
                Consulta la classificació global dels participants en els reptes de ciberseguretat. 
                Pots veure els punts aconseguits, el nombre de reptes completats i el temps que han 
                trigat en completar el hackathon.
              </p>
              
              <Leaderboard />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
