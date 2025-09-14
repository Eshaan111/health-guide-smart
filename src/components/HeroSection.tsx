import { Button } from "@/components/ui/button";
import { Scan, Zap, Shield } from "lucide-react";
import heroImage from "@/assets/hero-nutrition.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 pb-8 px-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Fresh healthy nutrition ingredients"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto text-white">
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
            <Scan className="w-12 h-12" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Smart Nutrition,
          <br />
          <span className="text-white/90">Healthier You</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
          Scan any food, get instant health insights, and make smarter choices
          for your wellness journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
            <Scan className="w-5 h-5 mr-2" />
            Start Scanning
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
          >
            Learn More
          </Button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Analysis</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Shield className="w-4 h-4" />
            <span>Health Alerts</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Scan className="w-4 h-4" />
            <span>Barcode Scanner</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;