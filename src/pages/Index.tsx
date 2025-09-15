import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import { EnhancedScanner } from "@/components/EnhancedScanner";
import ProgressDashboard from "@/components/ProgressDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <EnhancedScanner />
      <ProgressDashboard />
    </div>
  );
};

export default Index;