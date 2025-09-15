import { useState } from "react";
import { Heart, Activity, TrendingUp, FileText, Upload, User, Calendar, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Health = () => {
  const [medicalFile, setMedicalFile] = useState<File | null>(null);

  const healthMetrics = [
    { icon: Heart, title: "Heart Rate", value: "72 bpm", status: "normal", color: "text-success" },
    { icon: Activity, title: "Blood Pressure", value: "120/80", status: "optimal", color: "text-success" },
    { icon: TrendingUp, title: "BMI", value: "22.5", status: "healthy", color: "text-success" },
    { icon: FileText, title: "Health Score", value: "89/100", status: "excellent", color: "text-primary" }
  ];

  const weeklyInsights = [
    "Your fiber intake has increased by 23% this week - great job!",
    "Consider adding more omega-3 rich foods to your diet",
    "Your daily water intake is on track with your goals",
    "You've maintained a consistent meal timing pattern"
  ];

  const tipOfTheDay = "Start your day with a glass of warm water and lemon to boost metabolism and aid digestion.";

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMedicalFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-success to-secondary bg-clip-text text-transparent">
              Health Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your health metrics, get personalized insights, and monitor your wellness journey
            </p>
          </div>

          {/* Tip of the Day */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary-light/20 to-success/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Tip of the Day</h3>
                  <p className="text-muted-foreground">{tipOfTheDay}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Health Overview</TabsTrigger>
              <TabsTrigger value="insights">Weekly Insights</TabsTrigger>
              <TabsTrigger value="medical">Medical Evaluation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Health Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthMetrics.map((metric, index) => (
                  <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{metric.title}</p>
                          <p className="text-2xl font-bold">{metric.value}</p>
                          <Badge variant="secondary" className="mt-2 bg-success/10 text-success border-success/20">
                            {metric.status}
                          </Badge>
                        </div>
                        <metric.icon className={`w-8 h-8 ${metric.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Health Progress */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Health Progress This Month
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Daily Exercise Goal</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Nutrition Score</span>
                        <span>89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Hydration Target</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Sleep Quality</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Weekly Health Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">{insight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Personalized Recommendations */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Personalized Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-success/20 bg-success/5 rounded-lg">
                      <h4 className="font-semibold text-success mb-2">Recommended Foods</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Spinach and leafy greens</li>
                        <li>• Salmon and omega-3 rich fish</li>
                        <li>• Greek yogurt with probiotics</li>
                        <li>• Quinoa and whole grains</li>
                      </ul>
                    </div>
                    <div className="p-4 border border-warning/20 bg-warning/5 rounded-lg">
                      <h4 className="font-semibold text-warning mb-2">Foods to Limit</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Processed snacks</li>
                        <li>• Sugary beverages</li>
                        <li>• Refined white bread</li>
                        <li>• High-sodium packaged foods</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medical" className="space-y-6">
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Medical Evaluation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg border border-primary/10">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Upload Medical Reports</h4>
                        <p className="text-sm text-muted-foreground">
                          Upload your latest medical reports, lab results, or health assessments for personalized food recommendations based on your health profile.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="medical-file">Upload Medical Report</Label>
                      <div className="mt-2">
                        <Input
                          id="medical-file"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={handleFileUpload}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                      </div>
                      {medicalFile && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Selected: {medicalFile.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="conditions">Current Health Conditions</Label>
                        <Textarea
                          id="conditions"
                          placeholder="e.g., Diabetes, Hypertension, Food allergies..."
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="medications">Current Medications</Label>
                        <Textarea
                          id="medications"
                          placeholder="e.g., Metformin, Lisinopril..."
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <Button className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Submit for Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sample Medical Analysis Results */}
              <Card className="border-primary/10 bg-gradient-to-r from-success/5 to-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Your Health Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <h4 className="font-semibold text-success mb-2">Recommended Based on Your Profile</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on your health profile, we recommend increasing your intake of foods rich in magnesium and potassium to support your cardiovascular health.
                      </p>
                    </div>
                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <h4 className="font-semibold text-warning mb-2">Cautions</h4>
                      <p className="text-sm text-muted-foreground">
                        Due to your current medications, please limit foods high in vitamin K and consult your doctor before making significant dietary changes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Health;