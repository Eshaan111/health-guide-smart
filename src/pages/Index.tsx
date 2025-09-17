import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import { EnhancedScanner } from "@/components/EnhancedScanner";
import ProgressDashboard from "@/components/ProgressDashboard";
import { AIChatbot } from "@/components/AIChatbot";
import { PersonalizedInsights } from "@/components/PersonalizedInsights";
import { WorkoutGenerator } from "@/components/WorkoutGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      
      <FeaturesSection />
      <EnhancedScanner />
      <ProgressDashboard />
      
      {/* AI Chatbot - Always Available */}
      <AIChatbot />
    </div>
  );
};

export default Index;