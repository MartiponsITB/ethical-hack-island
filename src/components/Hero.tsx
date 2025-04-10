import { Shield, Terminal, Server } from "lucide-react";
const Hero = () => {
  return <div className="relative overflow-hidden py-24">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-cyber-green/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyber-green/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyber-green/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(12,252,131,0.05),transparent_70%)] bg-cyber-black"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="text-cyber-green cyber-glow">Cyber</span>Challenge
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16">
          Desafia les teves habilitats en ciberseguretat, hacking ètic i administració de sistemes
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="cyber-container p-6 bg-cyber-black/50 backdrop-blur-sm">
            <Shield className="mx-auto h-10 w-10 text-cyber-green mb-4" />
            <h3 className="text-xl font-bold mb-2 cyber-title">Seguretat de xarxa</h3>
            <p className="text-muted-foreground">Descobreix vulnerabilitats en xarxes i aprèn a protegir-les.</p>
          </div>
          
          <div className="cyber-container p-6 bg-cyber-black/50 backdrop-blur-sm">
            <Terminal className="mx-auto h-10 w-10 text-cyber-blue mb-4" />
            <h3 className="text-xl font-bold mb-2 cyber-title">Hacking ètic</h3>
            <p className="text-muted-foreground">Practica tècniques de penetració en entorns segurs i controlats.</p>
          </div>
          
          <div className="cyber-container p-6 bg-cyber-black/50 backdrop-blur-sm">
            <Server className="mx-auto h-10 w-10 text-cyber-purple mb-4" />
            <h3 className="text-xl font-bold mb-2 cyber-title">Administració de sistemes</h3>
            <p className="text-muted-foreground">Millora les teves habilitats en configuració i protecció de servidors.</p>
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;