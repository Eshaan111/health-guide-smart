import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ScannerDemo from "@/components/ScannerDemo";
import ProgressDashboard from "@/components/ProgressDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ScannerDemo />
      <ProgressDashboard />
    </div>
  );
};

export default Index;