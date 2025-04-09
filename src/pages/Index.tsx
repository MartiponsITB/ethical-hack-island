
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturedChallenges from "@/components/FeaturedChallenges";
import Leaderboard from "@/components/Leaderboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-black">
      <NavBar />
      <main className="pt-16">
        <Hero />
        <HowItWorks />
        <section id="reptes">
          <FeaturedChallenges />
        </section>
        <Leaderboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
