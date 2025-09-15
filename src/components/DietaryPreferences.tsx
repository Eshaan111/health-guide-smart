import { useState } from "react";
import { Check, Leaf, Wheat, Beef, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DietaryPreference {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const dietaryOptions: DietaryPreference[] = [
  {
    id: "vegan",
    name: "Vegan",
    description: "No animal products",
    icon: Leaf,
    color: "text-success"
  },
  {
    id: "vegetarian",
    name: "Vegetarian",
    description: "No meat, fish, or poultry",
    icon: Leaf,
    color: "text-primary"
  },
  {
    id: "gluten-free",
    name: "Gluten-Free",
    description: "No wheat, barley, rye",
    icon: Wheat,
    color: "text-warning"
  },
  {
    id: "keto",
    name: "Keto",
    description: "Low-carb, high-fat",
    icon: Zap,
    color: "text-secondary"
  }
];

interface DietaryPreferencesProps {
  selectedPreferences: string[];
  onPreferencesChange: (preferences: string[]) => void;
  isEditing?: boolean;
}

export const DietaryPreferences = ({ 
  selectedPreferences, 
  onPreferencesChange, 
  isEditing = false 
}: DietaryPreferencesProps) => {
  const togglePreference = (preferenceId: string) => {
    if (!isEditing) return;
    
    const newPreferences = selectedPreferences.includes(preferenceId)
      ? selectedPreferences.filter(id => id !== preferenceId)
      : [...selectedPreferences, preferenceId];
    
    onPreferencesChange(newPreferences);
  };

  return (
    <Card className="border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Beef className="w-5 h-5 text-primary" />
          Dietary Preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dietaryOptions.map((option) => {
            const isSelected = selectedPreferences.includes(option.id);
            const IconComponent = option.icon;
            
            return (
              <div
                key={option.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                } ${!isEditing ? "cursor-default" : ""}`}
                onClick={() => togglePreference(option.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-6 h-6 ${option.color}`} />
                    <div>
                      <h4 className="font-semibold">{option.name}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {selectedPreferences.length > 0 && !isEditing && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="font-medium mb-2">Selected Preferences:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedPreferences.map((prefId) => {
                const option = dietaryOptions.find(opt => opt.id === prefId);
                return option ? (
                  <Badge key={prefId} variant="secondary" className="bg-primary/10 text-primary">
                    {option.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};