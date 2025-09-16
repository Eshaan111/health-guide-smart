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
      
      {/* New Insights & Workout Sections */}
      <section className="py-16 px-4 bg-accent/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PersonalizedInsights />
            <WorkoutGenerator />
          </div>
        </div>
      </section>
      
      <FeaturesSection />
      <EnhancedScanner />
      <ProgressDashboard />
      
      {/* AI Chatbot - Always Available */}
      <AIChatbot />
    </div>
  );
};

export default Index;