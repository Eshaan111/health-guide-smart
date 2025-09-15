import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
];

interface LanguageSetupProps {
  onComplete?: () => void;
}

export const LanguageSetup = ({ onComplete }: LanguageSetupProps) => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  return (
    <Card className="border-primary/20 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center">
          <Globe className="w-5 h-5 text-primary" />
          {t('language')} Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {languages.map((language) => (
            <div
              key={language.code}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                currentLanguage === language.code
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setLanguage(language.code)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <p className="font-medium">{language.name}</p>
                    <p className="text-sm text-muted-foreground">{language.nativeName}</p>
                  </div>
                </div>
                {currentLanguage === language.code && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        {onComplete && (
          <Button onClick={onComplete} className="w-full">
            Continue with {languages.find(l => l.code === currentLanguage)?.name || "Selected Language"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};