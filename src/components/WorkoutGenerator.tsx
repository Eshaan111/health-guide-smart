import { useState } from "react";
import { Dumbbell, Play, Clock, Target, Zap, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UserContext";

interface WorkoutPlan {
  type: string;
  duration: number;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    rest: string;
  }[];
  benefits: string[];
}

export const WorkoutGenerator = () => {
  const { preferences } = useUser();
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateWorkout = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const workoutPlans: WorkoutPlan[] = [
        {
          type: "Cardio & Strength",
          duration: 30,
          exercises: [
            { name: "Warm-up Walk", sets: 1, reps: "5 minutes", rest: "0" },
            { name: "Bodyweight Squats", sets: 3, reps: "12-15", rest: "60s" },
            { name: "Push-ups (Modified)", sets: 3, reps: "8-10", rest: "60s" },
            { name: "Plank Hold", sets: 3, reps: "30s", rest: "45s" },
            { name: "Cool-down Stretch", sets: 1, reps: "5 minutes", rest: "0" }
          ],
          benefits: [
            "Improves cardiovascular health",
            "Supports weight management",
            "Builds functional strength"
          ]
        },
        {
          type: "Low-Impact Recovery",
          duration: 25,
          exercises: [
            { name: "Gentle Yoga Flow", sets: 1, reps: "10 minutes", rest: "0" },
            { name: "Wall Push-ups", sets: 2, reps: "10", rest: "45s" },
            { name: "Seated Leg Extensions", sets: 2, reps: "12 each", rest: "45s" },
            { name: "Breathing Exercises", sets: 1, reps: "5 minutes", rest: "0" }
          ],
          benefits: [
            "Reduces stress and anxiety",
            "Improves flexibility",
            "Supports joint health"
          ]
        }
      ];

      // Select based on medical conditions
      let selectedWorkout = workoutPlans[0];
      if (preferences.medicalConditions.includes('Hypertension')) {
        selectedWorkout = workoutPlans[1]; // Low-impact for hypertension
      }

      setCurrentWorkout(selectedWorkout);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Card className="border-primary/20 shadow-health">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-primary" />
          AI Workout Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!currentWorkout ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Personalized Workout Plan</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Generate a custom workout based on your diet, health data, and medical conditions.
              </p>
              <Button
                onClick={generateWorkout}
                disabled={isGenerating}
                className="gradient-primary"
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Generate Workout
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Workout Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
              <div>
                <h4 className="font-semibold text-primary">{currentWorkout.type}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {currentWorkout.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {currentWorkout.exercises.length} exercises
                  </span>
                </div>
              </div>
              <Badge className="bg-success text-success-foreground">
                Personalized
              </Badge>
            </div>

            {/* Exercises */}
            <div className="space-y-2">
              <h5 className="font-medium text-sm">Exercises</h5>
              {currentWorkout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm">{exercise.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {exercise.sets > 1 ? `${exercise.sets} sets × ` : ''}{exercise.reps}
                      {exercise.rest !== "0" && ` • Rest: ${exercise.rest}`}
                    </p>
                  </div>
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <h5 className="font-medium text-sm flex items-center gap-2">
                <Heart className="w-4 h-4 text-success" />
                Health Benefits
              </h5>
              <div className="space-y-1">
                {currentWorkout.benefits.map((benefit, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    • {benefit}
                  </p>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Start Workout
              </Button>
              <Button size="sm" variant="outline" onClick={generateWorkout}>
                <Zap className="w-4 h-4 mr-2" />
                New Plan
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};