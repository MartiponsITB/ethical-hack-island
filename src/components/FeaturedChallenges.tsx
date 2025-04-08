
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ChallengeProps {
  id: number;
  title: string;
  description: string;
  difficulty: "Fàcil" | "Mig" | "Difícil" | "Expert";
  category: "Xarxes" | "Web" | "Sistemes" | "Forense" | "Criptografia" | "Defensa" | "Exploit" | "Hackaton";
  completions: number;
}

const challenges: ChallengeProps[] = [
  {
    id: 1,
    title: "Repte de Xarxes",
    description: "Descobreix la contrasenya d'administrador explotant una vulnerabilitat en la configuració SSH.",
    difficulty: "Fàcil",
    category: "Xarxes",
    completions: 324
  },
  {
    id: 2,
    title: "Atac SQL",
    description: "Accedeix a una base de dades protegida utilitzant tècniques d'injecció SQL.",
    difficulty: "Mig",
    category: "Web",
    completions: 187
  },
  {
    id: 3,
    title: "Atac amb Exploit",
    description: "Eleva els teus privilegis d'usuari normal a root en un sistema Linux utilitzant un exploit.",
    difficulty: "Difícil",
    category: "Exploit",
    completions: 92
  },
  {
    id: 4,
    title: "Defensa de Sistemes",
    description: "Configura un sistema segur i defensa'l contra diferents vectors d'atac.",
    difficulty: "Mig",
    category: "Defensa",
    completions: 156
  },
  {
    id: 5,
    title: "Anàlisi Forense",
    description: "Investiga un incident de seguretat i identifica com es va produir l'atac.",
    difficulty: "Difícil",
    category: "Forense",
    completions: 112
  }
];

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
  return (
    <section className="py-16 bg-cyber-darkgray">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold cyber-title">Reptes destacats</h2>
          <Link to="/challenges">
            <Button variant="link" className="text-cyber-green hover:text-cyber-blue">
              Veure tots els reptes
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="cyber-container bg-cyber-black/80 border-cyber-green/40">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-cyber-green">{challenge.title}</CardTitle>
                </div>
                <Badge className={`${categoryColors[challenge.category]} hover:${categoryColors[challenge.category]} mt-2`}>
                  {challenge.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{challenge.description}</p>
              </CardContent>
              <CardFooter>
                <Link to={`/challenge/${challenge.id}`} className="w-full">
                  <Button className="w-full bg-cyber-green text-cyber-black hover:bg-cyber-green/90">
                    <Download className="h-4 w-4 mr-2" /> Descarregar OVA
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold cyber-title mb-8 text-center">Repte Final</h3>
          <Card className="cyber-container bg-cyber-black/80 border-amber-500/40 max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl text-amber-500">{hackatonChallenge.title}</CardTitle>
              </div>
              <Badge className={`${categoryColors[hackatonChallenge.category]} hover:${categoryColors[hackatonChallenge.category]} mt-2`}>
                {hackatonChallenge.category}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{hackatonChallenge.description}</p>
            </CardContent>
            <CardFooter>
              <Link to={`/challenge/${hackatonChallenge.id}`} className="w-full">
                <Button className="w-full bg-amber-500 text-cyber-black hover:bg-amber-500/90">
                  <Download className="h-4 w-4 mr-2" /> Descarregar OVA
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedChallenges;
