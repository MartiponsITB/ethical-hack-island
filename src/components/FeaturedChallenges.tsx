import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
interface ChallengeProps {
  id: number;
  title: string;
  description: string;
  difficulty: "Fàcil" | "Mig" | "Difícil" | "Expert";
  category: "Xarxes" | "Web" | "Sistemes" | "Forense" | "Criptografia" | "Defensa" | "Exploit" | "Hackaton";
  completions: number;
}
const challenges: ChallengeProps[] = [{
  id: 1,
  title: "Repte de Xarxes",
  description: "Descobreix la contrasenya d'administrador explotant una vulnerabilitat en la configuració SSH.",
  difficulty: "Fàcil",
  category: "Xarxes",
  completions: 324
}, {
  id: 2,
  title: "Atac SQL",
  description: "Accedeix a una base de dades protegida utilitzant tècniques d'injecció SQL.",
  difficulty: "Mig",
  category: "Web",
  completions: 187
}, {
  id: 3,
  title: "Atac amb Exploit",
  description: "Eleva els teus privilegis d'usuari normal a root en un sistema Linux utilitzant un exploit.",
  difficulty: "Difícil",
  category: "Exploit",
  completions: 92
}];

// We're moving these two challenges to be displayed in the center
const centerChallenges: ChallengeProps[] = [{
  id: 4,
  title: "Defensa de Sistemes",
  description: "Configura un sistema segur i defensa'l contra diferents vectors d'atac.",
  difficulty: "Mig",
  category: "Defensa",
  completions: 156
}, {
  id: 5,
  title: "Anàlisi Forense",
  description: "Investiga un incident de seguretat i identifica com es va produir l'atac.",
  difficulty: "Difícil",
  category: "Forense",
  completions: 112
}];
const categoryColors = {
  "Xarxes": "bg-blue-600",
  "Web": "bg-purple-600",
  "Sistemes": "bg-cyan-600",
  "Forense": "bg-indigo-600",
  "Criptografia": "bg-emerald-600",
  "Defensa": "bg-teal-600",
  "Exploit": "bg-rose-600",
  "Hackaton": "bg-amber-600"
};
const hackatonChallenge = {
  id: 8,
  title: "Hackaton Final",
  description: "Desafia totes les teves habilitats en aquest repte final que combina totes les categories anteriors.",
  difficulty: "Expert",
  category: "Hackaton",
  completions: 12
};
const FeaturedChallenges = () => {
  return <section className="py-16 bg-cyber-darkgray">
      <div className="container mx-auto px-4 bg-cyber-black">
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-3xl font-bold cyber-title bg-cyber-black">Reptes</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {challenges.map(challenge => <div key={challenge.id} className="cyber-container bg-cyber-black/80 border-cyber-green/40">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl text-cyber-green">{challenge.title}</h3>
                </div>
                <div className={`${categoryColors[challenge.category]} hover:${categoryColors[challenge.category]} inline-flex items-center py-1 px-2 rounded-md text-xs font-medium mt-2`}>
                  {challenge.category}
                </div>
              </div>
              <div className="px-6 pb-4">
                <p className="text-muted-foreground">{challenge.description}</p>
              </div>
              <div className="px-6 py-4 border-t border-cyber-green/10">
                <a href={`/challenge/${challenge.id}`} className="block w-full">
                  <button className="w-full bg-cyber-green text-cyber-black hover:bg-cyber-green/90 py-2 px-4 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Descarregar OVA
                  </button>
                </a>
              </div>
            </div>)}
        </div>

        {/* Center challenges - placing them in their own container with flex justify-center */}
        <div className="mt-8 flex justify-center gap-6 max-w-5xl mx-auto">
          {centerChallenges.map(challenge => <div key={challenge.id} className="cyber-container bg-cyber-black/80 border-cyber-green/40 w-full md:w-80">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl text-cyber-green">{challenge.title}</h3>
                </div>
                <div className={`${categoryColors[challenge.category]} hover:${categoryColors[challenge.category]} inline-flex items-center py-1 px-2 rounded-md text-xs font-medium mt-2`}>
                  {challenge.category}
                </div>
              </div>
              <div className="px-6 pb-4">
                <p className="text-muted-foreground">{challenge.description}</p>
              </div>
              <div className="px-6 py-4 border-t border-cyber-green/10">
                <a href={`/challenge/${challenge.id}`} className="block w-full">
                  <button className="w-full bg-cyber-green text-cyber-black hover:bg-cyber-green/90 py-2 px-4 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Descarregar OVA
                  </button>
                </a>
              </div>
            </div>)}
        </div>

        <div className="mt-16 flex flex-col items-center">
          <h3 className="text-2xl font-bold cyber-title mb-8 text-center">Repte Final</h3>
          <div className="cyber-container bg-cyber-black/80 border-amber-500/40 relative overflow-hidden max-w-2xl">
            <div className="absolute inset-0 bg-cyber-black/80 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="text-center p-4">
                <Lock className="h-12 w-12 text-cyber-green mx-auto mb-3" />
                <h3 className="text-lg font-bold text-cyber-green mb-1">Repte Bloquejat</h3>
                <p className="text-sm text-muted-foreground">Completa tots els reptes anteriors per desbloquejar el Hackaton Final</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl text-amber-500">{hackatonChallenge.title}</h3>
              </div>
              <div className={`${categoryColors[hackatonChallenge.category]} hover:${categoryColors[hackatonChallenge.category]} inline-flex items-center py-1 px-2 rounded-md text-xs font-medium mt-2`}>
                {hackatonChallenge.category}
              </div>
            </div>
            <div className="px-6 pb-4">
              <p className="text-muted-foreground">{hackatonChallenge.description}</p>
            </div>
            <div className="px-6 py-4 border-t border-amber-500/10">
              <button disabled className="w-full bg-amber-500/50 text-cyber-black/50 py-2 px-4 rounded-md flex items-center justify-center cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Descarregar OVA
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default FeaturedChallenges;