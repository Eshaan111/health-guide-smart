import Navigation from "@/components/Navigation";
import { PersonalizedInsights } from "@/components/PersonalizedInsights";

const Insights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Personalized Insights
              </h1>
              <p className="text-lg text-muted-foreground">
                Get personalized health insights and meal recommendations based on your profile
              </p>
            </div>
            <PersonalizedInsights />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Insights;