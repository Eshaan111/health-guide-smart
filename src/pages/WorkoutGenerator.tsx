import Navigation from "@/components/Navigation";
import { WorkoutGenerator as WorkoutGeneratorComponent } from "@/components/WorkoutGenerator";

const WorkoutGenerator = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Workout Generator
              </h1>
              <p className="text-lg text-muted-foreground">
                Get personalized workout plans based on your health data and dietary preferences
              </p>
            </div>
            <WorkoutGeneratorComponent />
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkoutGenerator;