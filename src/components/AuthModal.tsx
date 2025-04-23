
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/authStore";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const { login, register } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Si us plau, omple tots els camps",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let success = false;
      
      if (activeTab === "login") {
        success = login(username, password);
        
        if (success) {
          toast({
            title: "Benvingut de nou!",
            description: `Has iniciat sessió com a ${username}`,
            className: "border-green-500 bg-green-500/10",
          });
          onOpenChange(false);
        } else {
          toast({
            title: "Error d'inici de sessió",
            description: "Nom d'usuari o contrasenya incorrectes",
            variant: "destructive",
          });
        }
      } else {
        success = register(username, password);
        
        if (success) {
          toast({
            title: "Compte creat amb èxit!",
            description: `T'has registrat com a ${username}`,
            className: "border-green-500 bg-green-500/10",
          });
          onOpenChange(false);
        } else {
          toast({
            title: "Error de registre",
            description: "Aquest nom d'usuari ja existeix",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hi ha hagut un problema. Si us plau, torna-ho a provar.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md cyber-container bg-cyber-black border-cyber-green/30">
        <DialogHeader>
          <DialogTitle className="text-xl cyber-title text-center">
            {activeTab === "login" ? "Iniciar Sessió" : "Crear Compte"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === "login" 
              ? "Accedeix al teu compte per desar el teu progrés" 
              : "Crea un compte nou per començar a resoldre reptes"}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login" className="data-[state=active]:bg-cyber-green/10 data-[state=active]:text-cyber-green">
              Iniciar Sessió
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-cyber-green/10 data-[state=active]:text-cyber-green">
              Registrar-se
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="login" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nom d'usuari</Label>
                <Input 
                  id="username" 
                  placeholder="El teu nom d'usuari" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="cyber-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contrasenya</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="La teva contrasenya" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="cyber-input"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-cyber-green text-cyber-black hover:bg-cyber-green/90"
              >
                {isSubmitting ? "Iniciant sessió..." : "Iniciar Sessió"}
              </Button>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="new-username">Nom d'usuari</Label>
                <Input 
                  id="new-username" 
                  placeholder="Tria un nom d'usuari" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="cyber-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Contrasenya</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  placeholder="Crea una contrasenya" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="cyber-input"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-cyber-green text-cyber-black hover:bg-cyber-green/90"
              >
                {isSubmitting ? "Creant compte..." : "Crear Compte"}
              </Button>
            </TabsContent>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
