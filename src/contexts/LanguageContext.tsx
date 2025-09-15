import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    appName: 'Maखाना',
    scanner: 'Scanner',
    health: 'Health',
    profile: 'Profile',
    tipOfTheDay: 'Tip of the Day',
    healthDashboard: 'Health Dashboard',
    weeklyInsights: 'Weekly Health Insights',
    personalizedRecommendations: 'Personalized Recommendations',
    mealPlan: 'Your Personalized Meal Plan',
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snacks: 'Snacks',
    healthScore: 'Health Score',
    advisable: 'Advisable',
    acceptable: 'Acceptable',
    avoidable: 'Avoidable',
    medicalHistory: 'Medical History',
    dietaryPreferences: 'Dietary Preferences',
    language: 'Language'
  },
  hi: {
    appName: 'Maखाना',
    scanner: 'स्कैनर',
    health: 'स्वास्थ्य',
    profile: 'प्रोफ़ाइल',
    tipOfTheDay: 'आज का टिप',
    healthDashboard: 'स्वास्थ्य डैशबोर्ड',
    weeklyInsights: 'साप्ताहिक स्वास्थ्य अंतर्दृष्टि',
    personalizedRecommendations: 'व्यक्तिगत सिफारिशें',
    mealPlan: 'आपका व्यक्तिगत भोजन योजना',
    breakfast: 'नाश्ता',
    lunch: 'दोपहर का खाना',
    dinner: 'रात का खाना',
    snacks: 'नाश्ता',
    healthScore: 'स्वास्थ्य स्कोर',
    advisable: 'सलाह योग्य',
    acceptable: 'स्वीकार्य',
    avoidable: 'बचने योग्य',
    medicalHistory: 'चिकित्सा इतिहास',
    dietaryPreferences: 'आहारीय प्राथमिकताएं',
    language: 'भाषा'
  },
  es: {
    appName: 'Maखाना',
    scanner: 'Escáner',
    health: 'Salud',
    profile: 'Perfil',
    tipOfTheDay: 'Consejo del Día',
    healthDashboard: 'Panel de Salud',
    weeklyInsights: 'Perspectivas Semanales de Salud',
    personalizedRecommendations: 'Recomendaciones Personalizadas',
    mealPlan: 'Tu Plan de Comidas Personalizado',
    breakfast: 'Desayuno',
    lunch: 'Almuerzo',
    dinner: 'Cena',
    snacks: 'Bocadillos',
    healthScore: 'Puntuación de Salud',
    advisable: 'Recomendable',
    acceptable: 'Aceptable',
    avoidable: 'Evitable',
    medicalHistory: 'Historial Médico',
    dietaryPreferences: 'Preferencias Dietéticas',
    language: 'Idioma'
  }
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  availableLanguages: { code: string; name: string; nativeName: string }[];
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' }
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      t, 
      availableLanguages: languages 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};