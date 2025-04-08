
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import FeaturedChallenges from "@/components/FeaturedChallenges";
import HowItWorks from "@/components/HowItWorks";
import FlagSubmission from "@/components/FlagSubmission";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-black">
      <NavBar />
      <main className="pt-16">
        <Hero />
        <FeaturedChallenges />
        <HowItWorks />
        <FlagSubmission />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
