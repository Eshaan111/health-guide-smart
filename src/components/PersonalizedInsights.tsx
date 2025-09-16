import { Brain, Lightbulb, TrendingUp, Calendar, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const PersonalizedInsights = () => {
  const { generatePersonalizedContent, preferences } = useUser();
  const { t } = useLanguage();
  const { mealPlan, healthTips, weeklyInsights } = generatePersonalizedContent();

  const insightCategories = [
    {
      icon: Brain,
      title: "AI Recommendations",
      items: healthTips.slice(0, 2),
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Weekly Progress",
      items: weeklyInsights.slice(0, 2),
      color: "text-secondary"
    }
  ];

  return (
    <Card className="border-primary/20 shadow-health">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Personalized Health Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Meal Suggestions */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Utensils className="w-4 h-4 text-success" />
            Today's Meal Suggestions
          </h4>
          <div className="grid gap-2">
            {Object.entries(mealPlan).slice(0, 2).map(([mealType, items]) => (
              <div
                key={mealType}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg border border-success/20"
              >
                <div>
                  <p className="font-medium capitalize text-sm">{mealType}</p>
                  <p className="text-xs text-muted-foreground">{items[0]}</p>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-xs">
                  Recommended
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        {insightCategories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <div key={category.title} className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <CategoryIcon className={`w-4 h-4 ${category.color}`} />
                {category.title}
              </h4>
              <div className="space-y-2">
                {category.items.map((insight, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gradient-to-r from-muted/30 to-accent/30 rounded-lg border border-primary/10"
                  >
                    <p className="text-sm text-foreground">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Dietary Preferences Display */}
        {preferences.dietaryPreferences.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Your Preferences</h4>
            <div className="flex flex-wrap gap-2">
              {preferences.dietaryPreferences.map((pref) => (
                <Badge
                  key={pref}
                  variant="outline"
                  className="bg-secondary/10 text-secondary border-secondary/30"
                >
                  {pref}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-secondary">
            <Calendar className="w-4 h-4 mr-2" />
            View Full Meal Plan
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Brain className="w-4 h-4 mr-2" />
            More Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};