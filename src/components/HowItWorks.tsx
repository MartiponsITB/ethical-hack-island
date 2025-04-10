import { ArrowRight, Download, Terminal, Flag } from "lucide-react";
const HowItWorks = () => {
  const steps = [{
    icon: <Download className="h-8 w-8 text-cyber-green" />,
    title: "Descarrega l'OVA",
    description: "Baixa la màquina virtual OVA amb el repte configurat."
  }, {
    icon: <Terminal className="h-8 w-8 text-cyber-blue" />,
    title: "Resol el repte",
    description: "Utilitza les teves habilitats per trobar vulnerabilitats i explotar-les."
  }, {
    icon: <Flag className="h-8 w-8 text-cyber-purple" />,
    title: "Aconsegueix la flag",
    description: "Troba la flag oculta que demostra que has superat el repte."
  }];
  return <section className="py-16 bg-cyber-darkgray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 cyber-title">Com funciona</h2>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 justify-between max-w-5xl mx-auto">
          {steps.map((step, index) => <div key={index} className="flex flex-1 flex-col items-center text-center">
              <div className="cyber-container p-6 bg-cyber-black border-cyber-green/30 h-28 w-28 flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 cyber-title">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {index < steps.length - 1 && <div className="hidden md:block absolute transform translate-x-20">
                  <ArrowRight className="h-8 w-8 text-cyber-green/50" />
                </div>}
            </div>)}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl text-cyber-green animate-glow font-mono mb-4">
            [ Completa el repte i puja la flag ]
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Després de trobar la flag oculta, envia-la a la plataforma per validar el repte i desbloquejar nous desafiaments.
            Cada repte superat t'aproparà més a convertir-te en un expert en ciberseguretat.
          </p>
        </div>
      </div>
    </section>;
};
export default HowItWorks;