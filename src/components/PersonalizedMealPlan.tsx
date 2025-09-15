import { Calendar, Clock, Utensils, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const PersonalizedMealPlan = () => {
  const { generatePersonalizedContent, preferences } = useUser();
  const { t } = useLanguage();
  const { mealPlan } = generatePersonalizedContent();

  const mealTimes = [
    { key: 'breakfast', icon: Calendar, time: '7:00 AM', color: 'text-primary' },
    { key: 'lunch', icon: Clock, time: '12:30 PM', color: 'text-secondary' },
    { key: 'dinner', icon: Utensils, time: '7:00 PM', color: 'text-success' },
    { key: 'snacks', icon: Star, time: 'Anytime', color: 'text-warning' }
  ];

  const getDietaryBadges = () => {
    return preferences.dietaryPreferences.map(pref => (
      <Badge key={pref} variant="outline" className="bg-primary/10 text-primary border-primary/30">
        {pref}
      </Badge>
    ));
  };

  return (
    <Card className="border-primary/20 shadow-health">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-primary" />
            {t('mealPlan')}
          </CardTitle>
          <div className="flex gap-2">
            {getDietaryBadges()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {mealTimes.map((meal) => {
          const MealIcon = meal.icon;
          const mealItems = mealPlan[meal.key as keyof typeof mealPlan];
          
          return (
            <div key={meal.key} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center`}>
                  <MealIcon className={`w-5 h-5 ${meal.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold capitalize">{t(meal.key)}</h4>
                  <p className="text-sm text-muted-foreground">{meal.time}</p>
                </div>
              </div>
              
              <div className="ml-13 space-y-2">
                {mealItems.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-muted/30 to-accent/30 rounded-lg border border-primary/10">
                    <span className="text-sm font-medium">{item}</span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-xs">
                      Recommended
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-border">
          <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Generate New Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};