
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="border-b border-cyber-green/20 bg-cyber-black/50 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Terminal className="h-6 w-6 text-cyber-green" />
          <span className="text-xl font-bold text-cyber-green animate-glow">
            EthicalHackIsland
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/challenges" className="text-foreground hover:text-cyber-green transition">
            Reptes
          </Link>
          <Link to="/leaderboard" className="text-foreground hover:text-cyber-green transition">
            Classificació
          </Link>
          <Link to="/about" className="text-foreground hover:text-cyber-green transition">
            Informació
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10">
            Iniciar Sessió
          </Button>
          <Button className="bg-cyber-green text-cyber-black hover:bg-cyber-green/90">
            Registrar-se
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
