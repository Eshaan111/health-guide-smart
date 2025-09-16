import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Camera,
  Target,
  Trophy,
  Settings, 
  Heart, 
  Calendar
} from "lucide-react";
import { useState } from "react";
import { DietaryPreferences } from "@/components/DietaryPreferences";
import { MedicalHistory } from "@/components/MedicalHistory";
import { LanguageSetup } from "@/components/LanguageSetup";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AIChatbot } from "@/components/AIChatbot";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { preferences, updatePreferences } = useUser();
  const { t, currentLanguage } = useLanguage();
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    age: "28",
    height: "165",
    weight: "62",
    dietType: preferences.dietaryPreferences.join(", ") || "Not specified",
    healthGoal: "Maintain Weight",
    allergies: preferences.allergies.join(", ") || "None",
    language: currentLanguage
  });

  const achievements = [
    { icon: Trophy, title: "Health Streak", value: "14 days", color: "text-primary" },
    { icon: Target, title: "Goals Met", value: "85%", color: "text-green-600" },
    { icon: Heart, title: "Healthy Choices", value: "156", color: "text-red-500" },
    { icon: Calendar, title: "Active Days", value: "42", color: "text-blue-600" }
  ];

  const recentScans = [
    { name: "Organic Quinoa", category: "Advisable", score: 92, time: "2 hours ago" },
    { name: "Greek Yogurt", category: "Advisable", score: 89, time: "5 hours ago" },
    { name: "Whole Grain Bread", category: "Acceptable", score: 75, time: "1 day ago" },
    { name: "Dark Chocolate", category: "Acceptable", score: 68, time: "2 days ago" }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Update user preferences in context
    updatePreferences({
      allergies: profile.allergies.split(",").map(a => a.trim()).filter(a => a)
    });
  };

  const handleDietaryPreferencesChange = (newPreferences: string[]) => {
    updatePreferences({ dietaryPreferences: newPreferences });
    setProfile({...profile, dietType: newPreferences.join(", ") || "Not specified"});
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-green-600 to-blue-600 bg-clip-text text-transparent">
              {t('profile')} 
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your health journey and manage your preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-primary/10 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <Button 
                    variant={isEditing ? "default" : "outline"}
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        value={profile.age}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, age: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        value={profile.height}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, height: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        value={profile.weight}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, weight: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dietType">Diet Type</Label>
                      <Input
                        id="dietType"
                        value={profile.dietType}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, dietType: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="healthGoal">Health Goal</Label>
                      <Input
                        id="healthGoal"
                        value={profile.healthGoal}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, healthGoal: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Input
                        id="allergies"
                        value={profile.allergies}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, allergies: e.target.value})}
                      />
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">{t('language')}</Label>
                      <Select value={profile.language} disabled={!isEditing} onValueChange={(value) => setProfile({...profile, language: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                          <SelectItem value="ja">日本語</SelectItem>
                          <SelectItem value="ar">العربية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Language Setup */}
              <div className="space-y-6">
                <LanguageSetup />
              </div>

              {/* Dietary Preferences */}
              <DietaryPreferences 
                selectedPreferences={preferences.dietaryPreferences}
                onPreferencesChange={handleDietaryPreferencesChange}
                isEditing={isEditing}
              />

              {/* Medical History */}
              <div className="space-y-6">
                <MedicalHistory isEditing={isEditing} />
              </div>

              {/* Recent Scans */}
              <Card className="border-primary/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    Recent Scans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentScans.map((scan, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div>
                            <p className="font-medium">{scan.name}</p>
                            <p className="text-sm text-muted-foreground">{scan.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={scan.category === "Advisable" ? "default" : "secondary"}
                            className={scan.category === "Advisable" ? "bg-green-100 text-green-700 border-green-200" : ""}
                          >
                            {scan.category}
                          </Badge>
                          <span className="text-sm font-medium">{scan.score}/100</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Picture */}
              <Card className="border-primary/10 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{profile.name}</h3>
                      <p className="text-muted-foreground">{profile.dietType}</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Camera className="w-4 h-4 mr-2" />
                      Update Photo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="border-primary/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                      <div>
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-lg font-bold">{achievement.value}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Settings */}
              <Card className="border-primary/10 shadow-lg">
                <CardContent className="pt-6">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings & Preferences
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;