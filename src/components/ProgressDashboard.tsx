import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Zap,
  Apple,
  Activity,
  Award,
  BarChart3
} from "lucide-react";

const ProgressDashboard = () => {
  // Mock progress data
  const todayStats = {
    caloriesConsumed: 1450,
    caloriesGoal: 2000,
    healthyChoices: 8,
    scansToday: 12,
    weeklyStreak: 5,
    healthScore: 82
  };

  const weeklyProgress = [
    { day: "Mon", healthy: 70, total: 100 },
    { day: "Tue", healthy: 85, total: 100 },
    { day: "Wed", healthy: 60, total: 100 },
    { day: "Thu", healthy: 90, total: 100 },
    { day: "Fri", healthy: 75, total: 100 },
    { day: "Sat", healthy: 95, total: 100 },
    { day: "Sun", healthy: 82, total: 100 },
  ];

  return (
    <section id="progress" className="py-16 px-4 bg-accent/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Track Your Progress
          </h2>
          <p className="text-lg text-muted-foreground">
            Visual insights to keep you motivated on your health journey
          </p>
        </div>

        {/* Today's Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Calorie Progress */}
          <Card className="gradient-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base">
                <Zap className="w-5 h-5 mr-2 text-warning" />
                Calories Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold text-foreground">
                    {todayStats.caloriesConsumed}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / {todayStats.caloriesGoal}
                  </span>
                </div>
                <Progress 
                  value={(todayStats.caloriesConsumed / todayStats.caloriesGoal) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  {todayStats.caloriesGoal - todayStats.caloriesConsumed} calories remaining
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Health Score */}
          <Card className="gradient-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base">
                <Apple className="w-5 h-5 mr-2 text-success" />
                Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-success">
                    {todayStats.healthScore}
                  </span>
                  <Badge className="bg-success/10 text-success border-success/20">
                    Excellent
                  </Badge>
                </div>
                <Progress value={todayStats.healthScore} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Based on today's food choices
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Scans Today */}
          <Card className="gradient-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base">
                <BarChart3 className="w-5 h-5 mr-2 text-secondary" />
                Scans Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <span className="text-2xl font-bold text-foreground">
                  {todayStats.scansToday}
                </span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs border-success/30 text-success">
                    {todayStats.healthyChoices} Healthy
                  </Badge>
                  <Badge variant="outline" className="text-xs border-warning/30 text-warning">
                    {todayStats.scansToday - todayStats.healthyChoices} Others
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Streak */}
          <Card className="gradient-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base">
                <Award className="w-5 h-5 mr-2 text-primary" />
                Health Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary">
                    {todayStats.weeklyStreak}
                  </span>
                  <span className="text-sm text-muted-foreground">days</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${
                        i < todayStats.weeklyStreak ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Weekly Health Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-muted-foreground w-8">
                      {day.day}
                    </span>
                    <div className="flex-1">
                      <Progress value={day.healthy} className="h-3" />
                    </div>
                    <span className="text-sm font-medium text-foreground w-8">
                      {day.healthy}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                <p className="text-xs text-success font-medium">
                  🎉 Great progress this week! You're making consistently healthy choices.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Goals & Achievements */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-secondary" />
                Goals & Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Daily Goal */}
                <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Daily Health Goal</p>
                      <p className="text-xs text-muted-foreground">Score 80+ today</p>
                    </div>
                  </div>
                  <Badge className="bg-success text-success-foreground">
                    Achieved
                  </Badge>
                </div>

                {/* Weekly Goal */}
                <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="font-medium text-sm">Weekly Streak</p>
                      <p className="text-xs text-muted-foreground">5 days of healthy choices</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-secondary">5/7</p>
                    <p className="text-xs text-muted-foreground">71% complete</p>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div>
                  <p className="text-sm font-medium mb-2">Recent Achievements</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                      🥗 Healthy Week
                    </Badge>
                    <Badge variant="outline" className="border-secondary/30 text-secondary text-xs">
                      📱 Scanner Pro
                    </Badge>
                    <Badge variant="outline" className="border-success/30 text-success text-xs">
                      🎯 Goal Achiever
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProgressDashboard;