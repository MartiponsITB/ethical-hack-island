
import { Trophy } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  challenges: number;
}

// Mock data for leaderboard
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
  }
];

const Leaderboard = () => {
  return (
    <section className="py-16 bg-cyber-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center mb-8">
            <Trophy className="h-6 w-6 text-cyber-green mr-2" />
            <h2 className="text-3xl font-bold cyber-title">Classificació</h2>
          </div>
          
          <div className="cyber-container bg-cyber-black/80 border-cyber-green/40 p-4">
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
                {leaderboardData.map((entry) => (
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
    </section>
  );
};

export default Leaderboard;
