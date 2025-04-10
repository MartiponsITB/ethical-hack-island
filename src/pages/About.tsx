
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Shield, Book, Code, Cpu } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-cyber-black">
      <NavBar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-6 cyber-title">Qui Som</h1>
              <p className="text-xl text-muted-foreground">
                CyberChallenge és una plataforma de desafiaments de ciberseguretat dissenyada per a professionals i aficionats.
              </p>
            </div>
            
            <div className="cyber-container bg-cyber-black/80 border-cyber-green/40 p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6 cyber-title flex items-center">
                <Shield className="mr-2 h-6 w-6 text-cyber-green" />
                La nostra missió
              </h2>
              <p className="text-muted-foreground mb-6">
                El nostre objectiu és proporcionar una plataforma on professionals, estudiants i aficionats a la ciberseguretat puguin posar a prova les seves habilitats, aprendre noves tècniques i compartir coneixements en un entorn segur i controlat.
              </p>
              <p className="text-muted-foreground mb-6">
                A través dels nostres reptes, els participants poden explorar diferents àrees de la ciberseguretat, des de l'hacking ètic fins a la defensa de sistemes i l'anàlisi forense, millorant les seves habilitats tècniques i desenvolupant un pensament crític davant les amenaces cibernètiques.
              </p>
              <p className="text-muted-foreground">
                Creiem fermament que la millor manera d'aprendre ciberseguretat és practicant en entorns reals però controlats, on els errors són oportunitats d'aprenentatge i no vulnerabilitats exploitables en sistemes crítics.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="cyber-container bg-cyber-black/80 border-cyber-green/40 p-6">
                <h2 className="text-xl font-bold mb-4 cyber-title flex items-center">
                  <Book className="mr-2 h-5 w-5 text-cyber-green" />
                  Aprendre fent
                </h2>
                <p className="text-muted-foreground">
                  La nostra filosofia es basa en l'aprenentatge pràctic. Oferim reptes que simulen escenaris reals on els participants poden aplicar els seus coneixements teòrics i descobrir noves tècniques de ciberseguretat.
                </p>
              </div>
              
              <div className="cyber-container bg-cyber-black/80 border-cyber-green/40 p-6">
                <h2 className="text-xl font-bold mb-4 cyber-title flex items-center">
                  <Code className="mr-2 h-5 w-5 text-cyber-green" />
                  Comunitat activa
                </h2>
                <p className="text-muted-foreground">
                  Fomentem una comunitat col·laborativa on els participants poden compartir solucions, discutir enfocaments diferents i aprendre els uns dels altres, creant un ecosistema ric en coneixement i experiències.
                </p>
              </div>
            </div>
            
            <div className="cyber-container bg-cyber-black/80 border-cyber-green/40 p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6 cyber-title flex items-center">
                <Cpu className="mr-2 h-6 w-6 text-cyber-green" />
                Els nostres reptes
              </h2>
              <p className="text-muted-foreground mb-6">
                Els reptes de CyberChallenge estan classificats en diferents categories:
              </p>
              
              <ul className="list-disc list-inside space-y-4 text-muted-foreground ml-4">
                <li>
                  <span className="font-semibold text-cyber-green">Hacking Ètic</span> - Desafiaments que impliquen trobar vulnerabilitats i explotar-les de manera ètica per millorar la seguretat.
                </li>
                <li>
                  <span className="font-semibold text-cyber-green">Defensa de Sistemes</span> - Reptes centrats en la protecció de sistemes i xarxes contra atacs cibernètics.
                </li>
                <li>
                  <span className="font-semibold text-cyber-green">Anàlisi Forense</span> - Investigacions post-incident per identificar la causa, l'abast i l'impacte de les violacions de seguretat.
                </li>
                <li>
                  <span className="font-semibold text-cyber-green">Criptografia</span> - Desafiaments relacionats amb l'encriptació, desxifrat i seguretat de la informació.
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6 cyber-title">Uneix-te a la nostra comunitat</h2>
              <p className="text-muted-foreground mb-8">
                Forma part de la comunitat de CyberChallenge i millora les teves habilitats en ciberseguretat mentre competeixes amb altres entusiastes.
              </p>
              <div className="flex justify-center">
                <button className="bg-cyber-green text-cyber-black px-8 py-3 rounded hover:bg-cyber-green/90 font-bold transition-colors">
                  Registra't ara
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
