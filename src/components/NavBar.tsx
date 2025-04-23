
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Terminal, LogOut, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import AuthModal from "@/components/AuthModal";
import { useChallengeStore } from "@/store/challengeStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

const NavBar = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuthStore();
  const { completedChallenges, resetProgress } = useChallengeStore();
  const { toast } = useToast();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Has tancat sessió",
      description: "La teva sessió s'ha tancat correctament",
    });
  };
  
  const handleResetProgress = () => {
    if (confirm("Estàs segur que vols reiniciar el teu progrés? S'eliminaran tots els reptes completats.")) {
      resetProgress();
      toast({
        title: "Progrés reiniciat",
        description: "S'ha eliminat tot el teu progrés de reptes",
      });
    }
  };
  
  return (
    <nav className="border-b border-cyber-green/20 bg-cyber-black/50 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Terminal className="h-6 w-6 text-cyber-green" />
          <span className="text-xl font-bold text-cyber-green animate-glow">
            CyberChallenge
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="/#reptes" className="text-foreground hover:text-cyber-green transition">
            Reptes
          </a>
          <Link to="/challenges" className="text-foreground hover:text-cyber-green transition">
            Tots els reptes
          </Link>
          <Link to="/leaderboard" className="text-foreground hover:text-cyber-green transition">
            Classificació
          </Link>
          <Link to="/about" className="text-foreground hover:text-cyber-green transition">
            Informació
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10">
                  <User className="h-4 w-4 mr-2" /> {currentUser}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="cyber-container bg-cyber-black border-cyber-green/30">
                <DropdownMenuLabel>El meu compte</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-cyber-green/20" />
                <DropdownMenuItem className="hover:bg-cyber-green/10 hover:text-cyber-green cursor-pointer">
                  <span>Reptes completats: {completedChallenges.length}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleResetProgress} className="hover:bg-cyber-green/10 hover:text-cyber-green cursor-pointer">
                  Reiniciar progrés
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-cyber-green/20" />
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Tancar sessió
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10"
                onClick={() => setAuthModalOpen(true)}
              >
                Iniciar Sessió
              </Button>
              <Button 
                className="bg-cyber-green text-cyber-black hover:bg-cyber-green/90"
                onClick={() => {
                  setAuthModalOpen(true);
                }}
              >
                Registrar-se
              </Button>
            </>
          )}
        </div>
      </div>
      
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
      />
    </nav>
  );
};

export default NavBar;
