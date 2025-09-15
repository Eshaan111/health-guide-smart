import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserPreferences {
  language: string;
  dietaryPreferences: string[];
  medicalConditions: string[];
  medications: string[];
  allergies: string[];
}

interface UserContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  generatePersonalizedContent: () => {
    mealPlan: MealPlan;
    healthTips: string[];
    weeklyInsights: string[];
  };
}

interface MealPlan {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
}

const defaultPreferences: UserPreferences = {
  language: 'en',
  dietaryPreferences: [],
  medicalConditions: ['Hypertension'],
  medications: ['Lisinopril'],
  allergies: ['Nuts', 'Dairy']
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const generatePersonalizedContent = () => {
    const { dietaryPreferences, medicalConditions, allergies } = preferences;

    // Generate personalized meal plan
    const baseMeals = {
      breakfast: [
        'Oatmeal with fresh berries',
        'Greek yogurt parfait',
        'Avocado toast with eggs',
        'Smoothie bowl with spinach'
      ],
      lunch: [
        'Quinoa salad with vegetables',
        'Grilled chicken with brown rice',
        'Lentil soup with whole grain bread',
        'Mediterranean bowl with hummus'
      ],
      dinner: [
        'Baked salmon with sweet potato',
        'Tofu stir-fry with vegetables',
        'Turkey meatballs with zucchini noodles',
        'Chickpea curry with cauliflower rice'
      ],
      snacks: [
        'Apple slices with almond butter',
        'Mixed nuts and seeds',
        'Hummus with cucumber',
        'Berries with dark chocolate'
      ]
    };

    // Filter based on dietary preferences and allergies
    const filteredMeals = { ...baseMeals };
    
    if (dietaryPreferences.includes('vegan')) {
      filteredMeals.breakfast = filteredMeals.breakfast.filter(meal => 
        !meal.includes('yogurt') && !meal.includes('eggs')
      );
      filteredMeals.lunch = filteredMeals.lunch.filter(meal => 
        !meal.includes('chicken')
      );
      filteredMeals.dinner = filteredMeals.dinner.filter(meal => 
        !meal.includes('salmon') && !meal.includes('turkey')
      );
    }

    if (allergies.includes('Nuts')) {
      filteredMeals.snacks = filteredMeals.snacks.filter(meal => 
        !meal.includes('nuts') && !meal.includes('almond')
      );
    }

    if (allergies.includes('Dairy')) {
      filteredMeals.breakfast = filteredMeals.breakfast.filter(meal => 
        !meal.includes('yogurt')
      );
    }

    // Generate health tips based on conditions
    const healthTips = [];
    if (medicalConditions.includes('Hypertension')) {
      healthTips.push('Limit sodium intake to less than 2,300mg per day');
      healthTips.push('Include potassium-rich foods like bananas and spinach');
    }
    if (medicalConditions.includes('Diabetes')) {
      healthTips.push('Monitor carbohydrate intake and choose complex carbs');
      healthTips.push('Eat regular meals to maintain stable blood sugar');
    }
    
    // Add general tips
    healthTips.push('Stay hydrated with 8 glasses of water daily');
    healthTips.push('Include colorful vegetables in every meal');

    // Generate weekly insights
    const weeklyInsights = [
      `Based on your ${dietaryPreferences.length > 0 ? dietaryPreferences.join(', ') : 'current'} dietary preferences, you're doing great!`,
      'Your fiber intake has improved this week - keep it up!',
      medicalConditions.length > 0 
        ? `Managing ${medicalConditions[0]} through diet shows excellent progress`
        : 'Your consistent healthy choices are paying off',
      'Consider meal prepping to maintain your healthy eating pattern'
    ];

    return {
      mealPlan: filteredMeals,
      healthTips,
      weeklyInsights
    };
  };

  return (
    <UserContext.Provider value={{ preferences, updatePreferences, generatePersonalizedContent }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};