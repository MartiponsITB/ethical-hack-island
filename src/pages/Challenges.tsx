
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, Filter, Server, Shield, Terminal } from "lucide-react";

// Types
type Difficulty = "Fàcil" | "Mig" | "Difícil" | "Expert";
type Category = "Xarxes" | "Web" | "Sistemes" | "Forense" | "Criptografia";

interface ChallengeProps {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: Category;
  completions: number;
  points: number;
}

// Mock data
const challengesData: ChallengeProps[] = [
  {
    id: 1,
    title: "Vulnerabilitat SSH",
    description: "Descobreix la contrasenya d'administrador explotant una vulnerabilitat en la configuració SSH.",
    difficulty: "Fàcil",
    category: "Xarxes",
    completions: 324,
    points: 100
  },
  {
    id: 2,
    title: "Injeccions SQL",
    description: "Accedeix a una base de dades protegida utilitzant tècniques d'injecció SQL.",
    difficulty: "Mig",
    category: "Web",
    completions: 187,
    points: 200
  },
  {
    id: 3,
    title: "Escalada de privilegis",
    description: "Eleva els teus privilegis d'usuari normal a root en un sistema Linux.",
    difficulty: "Difícil",
    category: "Sistemes",
    completions: 92,
    points: 300
  },
  {
    id: 4,
    title: "Anàlisi de malware",
    description: "Analitza un executable maliciós i determina com funciona.",
    difficulty: "Expert",
    category: "Forense",
    completions: 45,
    points: 400
  },
  {
    id: 5,
    title: "Explotació buffer overflow",
    description: "Explota una vulnerabilitat de desbordament de buffer per aconseguir execució de codi.",
    difficulty: "Difícil",
    category: "Sistemes",
    completions: 73,
    points: 350
  },
  {
    id: 6,
    title: "XSS persistent",
    description: "Injecta codi JavaScript persistent en una aplicació web vulnerable.",
    difficulty: "Mig",
    category: "Web",
    completions: 146,
    points: 250
  },
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
  "Criptografia": "bg-emerald-600"
};

const categoryIcons = {
  "Xarxes": <Server className="h-4 w-4" />,
  "Web": <Terminal className="h-4 w-4" />,
  "Sistemes": <Shield className="h-4 w-4" />,
  "Forense": <Search className="h-4 w-4" />,
  "Criptografia": <Filter className="h-4 w-4" />
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
    if (currentTab === "hard") return matchesSearch && (challenge.difficulty === "Difícil" || challenge.difficulty === "Expert");
    
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
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.length > 0 ? (
            filteredChallenges.map((challenge) => (
              <Card key={challenge.id} className="cyber-container bg-cyber-black/80 border-cyber-green/40">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-cyber-green">{challenge.title}</CardTitle>
                    <Badge className={`${difficultyColors[challenge.difficulty]} hover:${difficultyColors[challenge.difficulty]}`}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <Badge className={`${categoryColors[challenge.category]} hover:${categoryColors[challenge.category]} flex items-center w-fit gap-1 mt-2`}>
                    {categoryIcons[challenge.category]}
                    {challenge.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{challenge.description}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="outline" className="border-cyber-green/30 text-cyber-green">
                      {challenge.points} punts
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {challenge.completions} completats
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/challenge/${challenge.id}`} className="w-full">
                    <Button className="w-full bg-cyber-green text-cyber-black hover:bg-cyber-green/90">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;
