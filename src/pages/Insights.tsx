import Navigation from "@/components/Navigation";
import { PersonalizedInsights } from "@/components/PersonalizedInsights";
import HealthAnalytics from "@/components/HealthAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Insights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Health Insights & Analytics
              </h1>
              <p className="text-lg text-muted-foreground">
                Comprehensive health analytics with personalized insights and meal recommendations
              </p>
            </div>
            
            <Tabs defaultValue="analytics" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="analytics">Health Analytics</TabsTrigger>
                <TabsTrigger value="personalized">Personalized Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analytics" className="space-y-6">
                <HealthAnalytics />
              </TabsContent>
              
              <TabsContent value="personalized" className="space-y-6">
                <div className="max-w-4xl mx-auto">
                  <PersonalizedInsights />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Insights;