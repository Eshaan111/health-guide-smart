import { Lightbulb, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const TipOfTheDay = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const healthTips = [
    "Drink water before meals to aid digestion and control portion sizes.",
    "Eat the rainbow - colorful fruits and vegetables provide diverse nutrients.",
    "Practice mindful eating by putting down your fork between bites.",
    "Include protein in every meal to maintain stable blood sugar levels.",
    "Take a 10-minute walk after eating to improve glucose metabolism.",
    "Store healthy snacks at eye level to make better choices easier.",
    "Read food labels - avoid items with more than 5 ingredients.",
    "Prep meals on weekends to avoid unhealthy last-minute decisions.",
  ];

  const getNewTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % healthTips.length);
  };

  return (
    <Card className="border-primary/20 shadow-health bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Tip of the Day
          </span>
          <Button 
            onClick={getNewTip}
            variant="ghost" 
            size="sm"
            className="text-primary hover:text-primary-dark"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed">
          {healthTips[currentTipIndex]}
        </p>
      </CardContent>
    </Card>
  );
};