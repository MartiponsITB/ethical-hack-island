
import { useParams } from "react-router-dom";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Download, Terminal, Flag, CheckCircle2, AlertCircle, Server, Shield, Clock } from "lucide-react";

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [flag, setFlag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // This would be an API call to fetch challenge details in a real app
  const challenge = {
    id: Number(id),
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
  };
  
  const handleSubmitFlag = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // This is a placeholder for flag validation
    setTimeout(() => {
      const isCorrect = Math.random() > 0.5; // Simulate random success/fail for demo
      
      if (isCorrect) {
        toast({
          title: (
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              Flag correcta!
            </div>
          ),
          description: "Has completat el repte amb èxit!",
          className: "border-green-500 bg-green-500/10",
        });
        setFlag("");
      } else {
        toast({
          title: (
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Flag incorrecta
            </div>
          ),
          description: "La flag introduïda no és vàlida. Torna a provar.",
          variant: "destructive",
        });
      }
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-cyber-black">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2 cyber-title">{challenge.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-green-600 hover:bg-green-600">{challenge.difficulty}</Badge>
              <Badge className="bg-blue-600 hover:bg-blue-600">{challenge.category}</Badge>
              <Badge variant="outline" className="border-cyber-green/30 text-cyber-green">
                <Shield className="h-3 w-3 mr-1" /> {challenge.points} punts
              </Badge>
            </div>
            
            <Card className="cyber-container bg-cyber-black mb-8 border-cyber-green/30">
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
          
          {/* Sidebar */}
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
                  
                  <Button className="w-full bg-cyber-green text-cyber-black hover:bg-cyber-green/90">
                    <Download className="h-4 w-4 mr-2" /> Descarregar OVA
                  </Button>
                  
                  <p className="text-xs text-muted-foreground">
                    Importa aquesta OVA a VirtualBox o VMware per iniciar el repte.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cyber-container bg-cyber-black mb-6 border-cyber-green/30">
              <CardHeader>
                <CardTitle>Validar Flag</CardTitle>
                <CardDescription>Has resolt el repte? Envia la flag!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitFlag}>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="flag{...}"
                      value={flag}
                      onChange={(e) => setFlag(e.target.value)}
                      className="cyber-input font-mono"
                    />
                    <Button 
                      type="submit" 
                      disabled={!flag || isSubmitting}
                      className="w-full bg-cyber-green text-cyber-black hover:bg-cyber-green/90"
                    >
                      {isSubmitting ? "Verificant..." : "Verificar Flag"}
                    </Button>
                  </div>
                </form>
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
