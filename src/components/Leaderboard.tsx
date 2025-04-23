
import { Trophy } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useChallengeStore } from "@/store/challengeStore";
import { useEffect, useState } from "react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  challenges: number;
  hackathonTime?: string; // Time to complete hackathon in human readable format
}

const calculatePoints = (challenges: number[], completionTime?: number): number => {
  // Base points for each challenge
  const basePoints = challenges.reduce((total, challengeId) => {
    const points = {
      1: 100, // Repte Xarxes
      2: 200, // Repte SQL
      3: 300, // Repte Exploit
      4: 250, // Repte Defensa
      5: 350, // Repte Anàlisi Forense
      8: 1000, // Hackathon
    };
    return total + (points[challengeId as keyof typeof points] || 0);
  }, 0);

  // Bonus for hackathon completion speed
  if (completionTime && challenges.includes(8)) {
    const hours = completionTime / (1000 * 60 * 60); // Convert ms to hours
    if (hours <= 6) return basePoints + 500; // Super fast completion
    if (hours <= 12) return basePoints + 300; // Fast completion
    if (hours <= 24) return basePoints + 200; // Good completion
    if (hours <= 36) return basePoints + 100; // Decent completion
  }

  return basePoints;
};

const formatTime = (ms: number): string => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
};

const Leaderboard = () => {
  const { userProgress } = useChallengeStore();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const entries: LeaderboardEntry[] = Object.entries(userProgress).map(([username, progress]) => {
      const hackathonTime = progress.hackathonStartTime && progress.hackathonEndTime 
        ? progress.hackathonEndTime - progress.hackathonStartTime
        : undefined;
        
      return {
        username,
        challenges: progress.completedChallenges.length,
        points: calculatePoints(progress.completedChallenges, hackathonTime),
        hackathonTime: hackathonTime ? formatTime(hackathonTime) : undefined,
        rank: 0, // Will be calculated after sorting
      };
    });

    // Sort by points (highest first)
    const sorted = entries.sort((a, b) => b.points - a.points);
    
    // Assign ranks
    const ranked = sorted.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));

    setLeaderboardData(ranked);
  }, [userProgress]);

  return <section className="py-16 bg-cyber-darkgray">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center mb-8">
            <Trophy className="h-6 w-6 text-cyber-green mr-2" />
            <h2 className="text-3xl font-bold cyber-title">Classificació</h2>
          </div>
          
          <div className="cyber-container bg-cyber-black/80 border-cyber-green/40 p-4">
            {leaderboardData.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-cyber-green/20">
                    <TableHead className="w-24">#</TableHead>
                    <TableHead>Participant</TableHead>
                    <TableHead>Reptes completats</TableHead>
                    <TableHead>Temps Hackathon</TableHead>
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
                      <TableCell>{entry.hackathonTime || 'No completat'}</TableCell>
                      <TableCell className="text-right font-mono text-cyber-green">{entry.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No hi ha participants encara. Completa els reptes per aparèixer al rànquing!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>;
};

export default Leaderboard;
