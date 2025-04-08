
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, Filter, Server, Shield, Terminal, Lock, Cpu, Award } from "lucide-react";

// Types
type Difficulty = "Fàcil" | "Mig" | "Difícil" | "Expert";
type Category = "Xarxes" | "Web" | "Sistemes" | "Forense" | "Criptografia" | "Defensa" | "Exploit" | "Hackaton";

interface ChallengeProps {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: Category;
  completions: number;
  points: number;
  locked?: boolean;
}

// Mock data
const challengesData: ChallengeProps[] = [
  {
    id: 1,
    title: "Repte de Xarxes",
    description: "Descobreix la contrasenya d'administrador explotant una vulnerabilitat en la configuració SSH.",
    difficulty: "Fàcil",
    category: "Xarxes",
    completions: 324,
    points: 100
  },
  {
    id: 2,
    title: "Atac SQL",
    description: "Accedeix a una base de dades protegida utilitzant tècniques d'injecció SQL.",
    difficulty: "Mig",
    category: "Web",
    completions: 187,
    points: 200
  },
  {
    id: 3,
    title: "Atac amb Exploit",
    description: "Eleva els teus privilegis d'usuari normal a root en un sistema Linux utilitzant un exploit de kernel.",
    difficulty: "Difícil",
    category: "Exploit",
    completions: 92,
    points: 300
  },
  {
    id: 4,
    title: "Anàlisi de Sistemes",
    description: "Analitza un sistema vulnerat i determina com es va produir la intrusió.",
    difficulty: "Expert",
    category: "Sistemes",
    completions: 45,
    points: 400
  },
  {
    id: 5,
    title: "Defensa Perimetral",
    description: "Configura una xarxa segura amb defenses perimetrals per evitar intrusions.",
    difficulty: "Difícil",
    category: "Defensa",
    completions: 73,
    points: 350
  },
  {
    id: 6,
    title: "Forense Digital",
    description: "Recupera informació eliminada d'un disc dur i identifica l'autor del delicte.",
    difficulty: "Mig",
    category: "Forense",
    completions: 146,
    points: 250
  },
  {
    id: 7,
    title: "Criptografia Avançada",
    description: "Desxifra un missatge encriptat amb diverses capes de xifratge.",
    difficulty: "Expert",
    category: "Criptografia",
    completions: 38,
    points: 450
  },
  {
    id: 8,
    title: "Hackaton Final",
    description: "Desafia totes les teves habilitats en aquest repte final que combina totes les categories anteriors.",
    difficulty: "Expert",
    category: "Hackaton",
    completions: 12,
    points: 1000,
    locked: true
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

const categoryIcons = {
  "Xarxes": <Server className="h-4 w-4" />,
  "Web": <Terminal className="h-4 w-4" />,
  "Sistemes": <Cpu className="h-4 w-4" />,
  "Forense": <Search className="h-4 w-4" />,
  "Criptografia": <Lock className="h-4 w-4" />,
  "Defensa": <Shield className="h-4 w-4" />,
  "Exploit": <Filter className="h-4 w-4" />,
  "Hackaton": <Award className="h-4 w-4" />
};

const Challenges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  
  const filteredChallenges = challengesData.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (currentTab === "all") return matchesSearch;
    if (currentTab === "easy") return matchesSearch && challenge.difficulty === "Fàcil";
    if (currentTab === "medium") return matchesSearch && challenge.difficulty === "Mig";
    if (currentTab === "hard") return matchesSearch && challenge.difficulty === "Difícil";
    if (currentTab === "expert") return matchesSearch && challenge.difficulty === "Expert";
    
    return matchesSearch;
  });
  
  return (
    <div className="min-h-screen bg-cyber-black">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 cyber-title">Reptes</h1>
            <p className="text-muted-foreground">Posa a prova les teves habilitats amb els nostres reptes de ciberseguretat</p>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search"
                placeholder="Cercar reptes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cyber-input pl-10 w-full md:w-64"
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="mb-8">
          <TabsList className="bg-cyber-darkgray border border-cyber-green/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-cyber-green/10 data-[state=active]:text-cyber-green">
              Tots
            </TabsTrigger>
            <TabsTrigger value="easy" className="data-[state=active]:bg-cyber-green/10 data-[state=active]:text-cyber-green">
              Fàcil
            </TabsTrigger>
            <TabsTrigger value="medium" className="data-[state=active]:bg-cyber-green/10 data-[state=active]:text-cyber-green">
              Mig
            </TabsTrigger>
            <TabsTrigger value="hard" className="data-[state=active]:bg-cyber-green/10 data-[state=active]:text-cyber-green">
              Difícil
            </TabsTrigger>
            <TabsTrigger value="expert" className="data-[state=active]:bg-cyber-green/10 data-[state=active]:text-cyber-green">
              Expert
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.filter(challenge => challenge.category !== "Hackaton").length > 0 ? (
            filteredChallenges
              .filter(challenge => challenge.category !== "Hackaton")
              .map((challenge) => (
                <Card key={challenge.id} className="cyber-container bg-cyber-black/80 border-cyber-green/40">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-cyber-green">{challenge.title}</CardTitle>
                    </div>
                    <Badge className={`${categoryColors[challenge.category]} hover:${categoryColors[challenge.category]} flex items-center w-fit gap-1 mt-2`}>
                      {categoryIcons[challenge.category]}
                      {challenge.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{challenge.description}</p>
                    <div className="mt-4">
                      <Badge variant="outline" className="border-cyber-green/30 text-cyber-green">
                        {challenge.points} punts
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/challenge/${challenge.id}`} className="w-full">
                      <Button 
                        className="w-full bg-cyber-green text-cyber-black hover:bg-cyber-green/90"
                      >
                        <Download className="h-4 w-4 mr-2" /> Veure repte
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No s'han trobat reptes que coincideixin amb la cerca.</p>
            </div>
          )}
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold cyber-title mb-8 text-center">Repte Final</h3>
          {filteredChallenges
            .filter(challenge => challenge.category === "Hackaton")
            .map((challenge) => (
              <Card key={challenge.id} className={`cyber-container bg-cyber-black/80 border-amber-500/40 max-w-2xl mx-auto ${challenge.locked ? 'relative overflow-hidden' : ''}`}>
                {challenge.locked && (
                  <div className="absolute inset-0 bg-cyber-black/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="text-center p-4">
                      <Lock className="h-12 w-12 text-cyber-green mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-cyber-green mb-1">Repte Bloquejat</h3>
                      <p className="text-sm text-muted-foreground">Completa tots els reptes anteriors per desbloquejar el Hackaton Final</p>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-amber-500">{challenge.title}</CardTitle>
                  </div>
                  <Badge className={`${categoryColors[challenge.category]} hover:${categoryColors[challenge.category]} flex items-center w-fit gap-1 mt-2`}>
                    {categoryIcons[challenge.category]}
                    {challenge.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{challenge.description}</p>
                  <div className="mt-4">
                    <Badge variant="outline" className="border-amber-500/30 text-amber-500">
                      {challenge.points} punts
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/challenge/${challenge.id}`} className="w-full">
                    <Button 
                      className="w-full bg-amber-500 text-cyber-black hover:bg-amber-500/90"
                      disabled={challenge.locked}
                    >
                      <Download className="h-4 w-4 mr-2" /> Veure repte
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;
