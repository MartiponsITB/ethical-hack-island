
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Users, Trophy } from "lucide-react";

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
  }
];

const difficultyColors = {
  "Fàcil": "bg-green-600",
  "Mig": "bg-yellow-600",
  "Difícil": "bg-orange-600",
  "Expert": "bg-red-600"
};

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
                  <Badge className={`${difficultyColors[challenge.difficulty]} hover:${difficultyColors[challenge.difficulty]}`}>
                    {challenge.difficulty}
                  </Badge>
                </div>
                <Badge className={`${categoryColors[challenge.category]} hover:${categoryColors[challenge.category]} mt-2`}>
                  {challenge.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{challenge.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Trophy className="h-4 w-4 mr-1" />
                  <span>{challenge.completions} <span className="hidden sm:inline">completats</span></span>
                </div>
                <Link to={`/challenge/${challenge.id}`}>
                  <Button className="bg-cyber-green text-cyber-black hover:bg-cyber-green/90">
                    <Download className="h-4 w-4 mr-2" /> Descarregar OVA
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedChallenges;
