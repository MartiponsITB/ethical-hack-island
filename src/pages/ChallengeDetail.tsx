import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Download, Terminal, Flag, CheckCircle2, AlertCircle, Server, Shield, Clock, Check, Lock } from "lucide-react";
import { useChallengeStore } from "@/store/challengeStore";
import { useAuthStore } from "@/store/authStore";
import { useValidateFlag } from "@/hooks/useValidateFlag";

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [flag, setFlag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const { toast } = useToast();
  const { validateFlagSafely, isValidating } = useValidateFlag();
  
  const { 
    markChallengeCompleted, 
    getUserCompletedChallenges, 
    isHackathonUnlocked,
    getHackathonTimeLeft
  } = useChallengeStore();
  
  const { isAuthenticated } = useAuthStore();
  
  const challengeId = Number(id);
  const completedChallenges = getUserCompletedChallenges();
  const isCompleted = completedChallenges.includes(challengeId);
  const isHackathon = challengeId === 8;
  const hackathonUnlocked = isHackathonUnlocked();
  const isHackathonLocked = isHackathon && !hackathonUnlocked;
  
  useEffect(() => {
    if (!isHackathon || !hackathonUnlocked || isCompleted) return;
    
    const updateTimer = () => {
      const timeLeftMs = getHackathonTimeLeft();
      
      if (timeLeftMs === null) {
        setTimeLeft(null);
        return;
      }
      
      if (timeLeftMs <= 0) {
        setTimeLeft("Temps esgotat!");
        return;
      }
      
      const hours = Math.floor(timeLeftMs / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);
      
      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };
    
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    
    return () => clearInterval(timer);
  }, [isHackathon, hackathonUnlocked, isCompleted, getHackathonTimeLeft]);
  
  const handleSubmitFlag = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Inicia sessió primer",
        description: "Cal iniciar sessió per enviar flags i desar el progrés.",
        variant: "destructive",
      });
      return;
    }
    
    if (isHackathonLocked) {
      toast({
        title: "Repte bloquejat",
        description: "Has de completar tots els reptes anteriors per desbloquejar el hackaton final.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const isCorrect = await validateFlagSafely(flag);
      
      if (isCorrect) {
        setFlag("");
      }
    } catch (error) {
      console.error("Error validating flag:", error);
      toast({
        title: "Error",
        description: "Hi ha hagut un problema en validar la flag.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const challenges = {
    1: {
      id: 1,
      title: "Vulnerabilitat SSH",
      description: "En aquest repte, hauràs de trobar i explotar una vulnerabilitat en la configuració SSH d'un servidor Linux. El servidor té una configuració incorrecta que permet l'accés no autoritzat si s'utilitza el mètode adequat.",
      longDescription: "L'administrador del sistema ha configurat incorrectament el servei SSH, permetent l'accés amb claus febles i algoritmes obsolets. L'objectiu és aconseguir accés al sistema com a usuari admin i després escalar privilegis per obtenir accés root. La flag es troba a /root/flag.txt.",
      difficulty: "Fàcil",
      category: "Xarxes",
      points: 100,
      author: "EthicalHacker42",
      created: "2025-03-15",
      completions: 324,
      ovaSize: "1.2 GB",
      ovaUrl: "https://example.com/challenges/vulnerable-ssh.ova"
    },
    2: {
      id: 2,
      title: "Atac SQL",
      description: "Accedeix a una base de dades protegida utilitzant tècniques d'injecció SQL.",
      longDescription: "Aquest repte consisteix en explotar una vulnerabilitat d'injecció SQL en una aplicació web per accedir a informació confidencial a la base de dades. La flag es troba a la taula 'secrets'.",
      difficulty: "Mig",
      category: "Web",
      points: 200,
      author: "SQLMaster",
      created: "2025-03-10",
      completions: 187,
      ovaSize: "1.5 GB",
      ovaUrl: "https://example.com/challenges/sql-injection.ova"
    },
    3: {
      id: 3,
      title: "Atac amb Exploit",
      description: "Eleva els teus privilegis d'usuari normal a root en un sistema Linux utilitzant un exploit.",
      longDescription: "En aquest repte, tindràs accés com a usuari normal a un sistema Linux vulnerable. Hauràs d'identificar una vulnerabilitat al kernel i utilitzar un exploit per escalar privilegis fins a root.",
      difficulty: "Difícil",
      category: "Exploit",
      points: 300,
      author: "KernelHacker",
      created: "2025-02-25",
      completions: 92,
      ovaSize: "1.8 GB",
      ovaUrl: "https://example.com/challenges/kernel-exploit.ova"
    },
    4: {
      id: 4,
      title: "Defensa de Sistemes",
      description: "Configura un sistema segur i defensa'l contra diferents vectors d'atac.",
      longDescription: "En aquest repte, hauràs de configurar un sistema Linux per protegir-lo contra diferents vectors d'atac. Inclou la configuració de firewalls, hardening del sistema i detecció d'intrusions.",
      difficulty: "Mig",
      category: "Defensa",
      points: 250,
      author: "SecurityGuru",
      created: "2025-03-05",
      completions: 156,
      ovaSize: "1.6 GB",
      ovaUrl: "https://example.com/challenges/system-defense.ova"
    },
    5: {
      id: 5,
      title: "Anàlisi Forense",
      description: "Investiga un incident de seguretat i identifica com es va produir l'atac.",
      longDescription: "En aquest repte, rebràs un disc dur d'un sistema que ha estat compromès. Hauràs d'utilitzar tècniques d'anàlisi forense digital per determinar com es va produir l'atac, quines accions va realitzar l'atacant i recuperar la flag.",
      difficulty: "Difícil",
      category: "Forense",
      points: 350,
      author: "ForensicExpert",
      created: "2025-02-20",
      completions: 112,
      ovaSize: "2.0 GB",
      ovaUrl: "https://example.com/challenges/digital-forensics.ova"
    },
    8: {
      id: 8,
      title: "Hackaton Final",
      description: "Desafia totes les teves habilitats en aquest repte final que combina totes les categories anteriors.",
      longDescription: "El hackaton final és un escenari complex que combina elements de tots els reptes anteriors. Hauràs d'utilitzar habilitats de xarxes, web, exploits, defensa i anàlisi forense per completar aquest desafiament final.",
      difficulty: "Expert",
      category: "Hackaton",
      points: 1000,
      author: "CyberMaster",
      created: "2025-04-01",
      completions: 12,
      ovaSize: "3.5 GB",
      ovaUrl: "https://example.com/challenges/hackathon-final.ova"
    }
  };
  
  const challenge = challenges[challengeId as keyof typeof challenges] || challenges[1];
  
  return (
    <div className="min-h-screen bg-cyber-black">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold cyber-title">{challenge.title}</h1>
              {isCompleted && (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-green-600 hover:bg-green-600">{challenge.difficulty}</Badge>
              <Badge className="bg-blue-600 hover:bg-blue-600">{challenge.category}</Badge>
              <Badge variant="outline" className="border-cyber-green/30 text-cyber-green">
                <Shield className="h-3 w-3 mr-1" /> {challenge.points} punts
              </Badge>
              {isCompleted && (
                <Badge className="bg-green-500 hover:bg-green-500">Completat</Badge>
              )}
              
              {isHackathon && hackathonUnlocked && !isCompleted && timeLeft && (
                <Badge className="bg-amber-500 hover:bg-amber-500">
                  <Clock className="h-3 w-3 mr-1" /> Temps restant: {timeLeft}
                </Badge>
              )}
            </div>
            
            <Card className={`cyber-container bg-cyber-black mb-8 ${isCompleted ? 'border-green-500/30' : 'border-cyber-green/30'}`}>
              <CardHeader>
                <CardTitle>Descripció</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{challenge.description}</p>
                <p className="text-muted-foreground">{challenge.longDescription}</p>
              </CardContent>
            </Card>
            
            <Card className="cyber-container bg-cyber-black mb-8 border-cyber-green/30">
              <CardHeader>
                <CardTitle>Instruccions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside text-muted-foreground space-y-4 pl-2">
                  <li>Descarrega l'arxiu OVA utilitzant el botó de descàrrega.</li>
                  <li>Importa l'OVA al teu entorn de virtualització preferit (VirtualBox, VMware).</li>
                  <li>Configura la xarxa en mode host-only per aïllar la màquina.</li>
                  <li>Inicia la màquina virtual i comença el repte.</li>
                  <li>Busca vulnerabilitats i aconsegueix la flag.</li>
                  <li>Envia la flag en el format correcte per validar-la.</li>
                </ol>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="cyber-container bg-cyber-black mb-6 border-cyber-green/30">
              <CardHeader>
                <CardTitle>Descarregar OVA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Mida:</span>
                    <span>{challenge.ovaSize}</span>
                  </div>
                  
                  {isHackathon && hackathonUnlocked && !isCompleted && (
                    <div className="mb-4 p-3 bg-amber-500/20 border border-amber-500/30 rounded-md">
                      <div className="font-bold mb-1 text-amber-400 flex items-center">
                        <Clock className="h-4 w-4 mr-2" /> Compte enrere iniciat
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Tens 48 hores per completar el hackathon. Temps restant: {timeLeft || "Carregant..."}
                      </p>
                    </div>
                  )}
                  
                  <Button disabled={isHackathonLocked} className="w-full bg-cyber-green text-cyber-black hover:bg-cyber-green/90">
                    <Download className="h-4 w-4 mr-2" /> Descarregar OVA
                  </Button>
                  
                  <p className="text-xs text-muted-foreground">
                    Importa aquesta OVA a VirtualBox o VMware per iniciar el repte.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`cyber-container bg-cyber-black mb-6 ${isCompleted ? 'border-green-500/30' : 'border-cyber-green/30'}`}>
              <CardHeader>
                <CardTitle>
                  {isCompleted ? (
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      Repte Completat!
                    </div>
                  ) : (
                    "Validar Flag"
                  )}
                </CardTitle>
                {isCompleted ? (
                  <CardDescription>Aquest repte ja ha estat completat.</CardDescription>
                ) : (
                  <CardDescription>Has resolt el repte? Envia la flag!</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {isHackathonLocked ? (
                  <div className="p-4 text-center">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                    <p className="text-muted-foreground">Completa tots els reptes anteriors per desbloquejar aquest repte.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitFlag}>
                    <div className="space-y-4">
                      {!isCompleted && (
                        <Input
                          type="text"
                          placeholder="flag{...}"
                          value={flag}
                          onChange={(e) => setFlag(e.target.value)}
                          className="cyber-input font-mono"
                          disabled={!isAuthenticated || isCompleted}
                        />
                      )}
                      <Button 
                        type="submit" 
                        disabled={(!flag && !isCompleted) || isSubmitting || isCompleted || !isAuthenticated}
                        className={`w-full ${isCompleted ? 'bg-green-500 hover:bg-green-500/90' : 'bg-cyber-green hover:bg-cyber-green/90'}`}
                      >
                        {isCompleted ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Repte Completat
                          </>
                        ) : isSubmitting ? (
                          "Verificant..."
                        ) : !isAuthenticated ? (
                          "Inicia sessió per verificar"
                        ) : (
                          "Verificar Flag"
                        )}
                      </Button>
                      
                      {!isAuthenticated && (
                        <p className="text-xs text-amber-500 text-center">
                          Has d'iniciar sessió per enviar la flag i desar el progrés.
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
            
            <Card className="cyber-container bg-cyber-black border-cyber-green/30">
              <CardHeader>
                <CardTitle>Informació</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center">
                      <Server className="h-4 w-4 mr-1" /> Autor:
                    </span>
                    <span>{challenge.author}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> Creat:
                    </span>
                    <span>{challenge.created}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center">
                      <Terminal className="h-4 w-4 mr-1" /> Completat:
                    </span>
                    <span>{challenge.completions} vegades</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChallengeDetail;
