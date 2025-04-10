
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Trophy } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  challenges: number;
}

// Extended mock data for full leaderboard
const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "H4ck3rM4st3r",
    points: 2450,
    challenges: 8
  },
  {
    rank: 2,
    username: "CyberNinja",
    points: 2320,
    challenges: 7
  },
  {
    rank: 3,
    username: "SecureShield",
    points: 2100,
    challenges: 7
  },
  {
    rank: 4,
    username: "SyntaxWizard",
    points: 1850,
    challenges: 6
  },
  {
    rank: 5,
    username: "ByteDefender",
    points: 1740,
    challenges: 6
  },
  {
    rank: 6,
    username: "FirewallFury",
    points: 1650,
    challenges: 5
  },
  {
    rank: 7,
    username: "DataDragon",
    points: 1580,
    challenges: 5
  },
  {
    rank: 8,
    username: "CipherSage",
    points: 1490,
    challenges: 5
  },
  {
    rank: 9,
    username: "BitBlitzer",
    points: 1420,
    challenges: 4
  },
  {
    rank: 10,
    username: "CodeCrusader",
    points: 1380,
    challenges: 4
  },
  {
    rank: 11,
    username: "HashHunter",
    points: 1320,
    challenges: 4
  },
  {
    rank: 12,
    username: "VulnVigilante",
    points: 1240,
    challenges: 4
  },
  {
    rank: 13,
    username: "NetNavigator",
    points: 1180,
    challenges: 3
  },
  {
    rank: 14,
    username: "PayloadPioneer",
    points: 1090,
    challenges: 3
  },
  {
    rank: 15,
    username: "CryptoKeeper",
    points: 980,
    challenges: 3
  }
];

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-cyber-black">
      <NavBar />
      <main className="pt-24 pb-16 bg-cyber-darkgray">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center items-center mb-12">
              <Trophy className="h-8 w-8 text-cyber-green mr-3" />
              <h1 className="text-4xl font-bold cyber-title">Classificació Global</h1>
            </div>
            
            <div className="cyber-container bg-cyber-black/80 border-cyber-green/40 p-6 mb-8">
              <p className="text-muted-foreground text-center mb-8">
                Consulta la classificació global dels participants en els reptes de ciberseguretat. Pots veure els punts aconseguits i el nombre de reptes completats per cada usuari.
              </p>
              
              <Table>
                <TableHeader>
                  <TableRow className="border-cyber-green/20">
                    <TableHead className="w-24">#</TableHead>
                    <TableHead>Participant</TableHead>
                    <TableHead>Reptes completats</TableHead>
                    <TableHead className="text-right">Punts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map(entry => (
                    <TableRow key={entry.rank} className="border-cyber-green/10 hover:bg-cyber-green/5">
                      <TableCell className="font-medium">
                        {entry.rank === 1 && <span className="text-yellow-500 font-bold">🏆 {entry.rank}</span>}
                        {entry.rank === 2 && <span className="text-gray-400 font-bold">🥈 {entry.rank}</span>}
                        {entry.rank === 3 && <span className="text-amber-700 font-bold">🥉 {entry.rank}</span>}
                        {entry.rank > 3 && <span className="text-muted-foreground">{entry.rank}</span>}
                      </TableCell>
                      <TableCell className="terminal-text">{entry.username}</TableCell>
                      <TableCell>{entry.challenges}</TableCell>
                      <TableCell className="text-right font-mono text-cyber-green">{entry.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
