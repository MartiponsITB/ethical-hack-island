
import { Link } from "react-router-dom";
import { Terminal, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-cyber-green/20 bg-cyber-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Terminal className="h-6 w-6 text-cyber-green" />
              <span className="text-xl font-bold text-cyber-green">EthicalHackIsland</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Plataforma de reptes de ciberseguretat dissenyada per millorar les habilitats en hacking ètic i administració de sistemes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-cyber-green">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyber-green">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyber-green">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 cyber-title">Navegació</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/challenges" className="text-muted-foreground hover:text-cyber-green transition">
                  Reptes
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-muted-foreground hover:text-cyber-green transition">
                  Classificació
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-cyber-green transition">
                  Informació
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 cyber-title">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-cyber-green transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-muted-foreground hover:text-cyber-green transition">
                  Guies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-cyber-green transition">
                  Contacte
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cyber-green/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EthicalHackIsland. Tots els drets reservats.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-cyber-green transition">
              Privacitat
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-cyber-green transition">
              Termes
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
