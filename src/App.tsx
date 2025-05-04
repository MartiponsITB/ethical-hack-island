import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Challenges from './pages/Challenges';
import ChallengeDetail from './pages/ChallengeDetail';
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';
import NotFound from './pages/NotFound';
import AdminPage from './pages/Admin';
import { useSession } from './hooks/useSession';

import './App.css';

function App() {
  // Initialize session check
  useSession();
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:id" element={<ChallengeDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
