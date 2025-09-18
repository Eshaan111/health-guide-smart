import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, Activity, Target, Heart, Apple } from "lucide-react";

const HealthAnalytics = () => {
  // Nutrition Distribution Data
  const nutritionData = [
    { name: "Carbohydrates", value: 45, fill: "hsl(var(--chart-1))" },
    { name: "Proteins", value: 25, fill: "hsl(var(--chart-2))" },
    { name: "Fats", value: 20, fill: "hsl(var(--chart-3))" },
    { name: "Fiber", value: 10, fill: "hsl(var(--chart-4))" },
  ];

  // Weekly Health Trend Data
  const weeklyTrendData = [
    { day: "Mon", healthScore: 78, calories: 1850, steps: 8500 },
    { day: "Tue", healthScore: 82, calories: 1920, steps: 9200 },
    { day: "Wed", healthScore: 85, calories: 1780, steps: 7800 },
    { day: "Thu", healthScore: 88, calories: 1650, steps: 10200 },
    { day: "Fri", healthScore: 79, calories: 2100, steps: 6500 },
    { day: "Sat", healthScore: 91, calories: 1950, steps: 12000 },
    { day: "Sun", healthScore: 86, calories: 1820, steps: 9800 },
  ];

  // Monthly Progress Data
  const monthlyProgressData = [
    { month: "Jan", weight: 65, bmi: 24.2, bloodPressure: 125 },
    { month: "Feb", weight: 64.5, bmi: 24.0, bloodPressure: 122 },
    { month: "Mar", weight: 64, bmi: 23.8, bloodPressure: 120 },
    { month: "Apr", weight: 63.5, bmi: 23.6, bloodPressure: 118 },
    { month: "May", weight: 63, bmi: 23.4, bloodPressure: 116 },
    { month: "Jun", weight: 62.5, bmi: 23.2, bloodPressure: 115 },
  ];

  // Food Categories Data
  const foodCategoriesData = [
    { category: "Vegetables", count: 28, fill: "hsl(var(--chart-6))" },
    { category: "Fruits", count: 15, fill: "hsl(var(--chart-3))" },
    { category: "Grains", count: 12, fill: "hsl(var(--chart-9))" },
    { category: "Proteins", count: 18, fill: "hsl(var(--chart-7))" },
    { category: "Dairy", count: 8, fill: "hsl(var(--chart-8))" },
  ];

  // Daily Activity Data
  const dailyActivityData = [
    { time: "6AM", calories: 50, heartRate: 68 },
    { time: "9AM", calories: 120, heartRate: 85 },
    { time: "12PM", calories: 280, heartRate: 78 },
    { time: "3PM", calories: 450, heartRate: 92 },
    { time: "6PM", calories: 680, heartRate: 105 },
    { time: "9PM", calories: 820, heartRate: 72 },
  ];

  const chartConfig = {
    healthScore: {
      label: "Health Score",
      color: "hsl(var(--chart-6))",
    },
    calories: {
      label: "Calories",
      color: "hsl(var(--chart-3))",
    },
    steps: {
      label: "Steps",
      color: "hsl(var(--chart-8))",
    },
    weight: {
      label: "Weight (kg)",
      color: "hsl(var(--chart-7))",
    },
    bmi: {
      label: "BMI",
      color: "hsl(var(--chart-4))",
    },
    bloodPressure: {
      label: "Blood Pressure",
      color: "hsl(var(--chart-5))",
    },
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Health Score</p>
                <p className="text-2xl font-bold text-primary">84</p>
              </div>
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <Badge variant="outline" className="mt-2 text-success border-success">
              ↑ 8% from last week
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-secondary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Steps</p>
                <p className="text-2xl font-bold text-secondary">64.8K</p>
              </div>
              <Activity className="w-8 h-8 text-secondary" />
            </div>
            <Badge variant="outline" className="mt-2 text-success border-success">
              Goal: 70K
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Calories</p>
                <p className="text-2xl font-bold text-foreground">1,881</p>
              </div>
              <Apple className="w-8 h-8 text-foreground" />
            </div>
            <Badge variant="outline" className="mt-2 text-warning border-warning">
              Target: 1,800
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-muted/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weight Goal</p>
                <p className="text-2xl font-bold text-foreground">-2.5kg</p>
              </div>
              <Target className="w-8 h-8 text-muted-foreground" />
            </div>
            <Badge variant="outline" className="mt-2 text-success border-success">
              On track
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nutrition Distribution Pie Chart */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="w-5 h-5 text-primary" />
              Daily Nutrition Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                carbohydrates: { label: "Carbohydrates", color: "hsl(var(--chart-1))" },
                proteins: { label: "Proteins", color: "hsl(var(--chart-2))" },
                fats: { label: "Fats", color: "hsl(var(--chart-3))" },
                fiber: { label: "Fiber", color: "hsl(var(--chart-4))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nutritionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      innerRadius={50}
                      outerRadius={90}
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      {nutritionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend 
                      content={<ChartLegendContent />} 
                      verticalAlign="bottom" 
                      height={40}
                    />
                  </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Health Trend Line Chart */}
        <Card className="border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              Weekly Health Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                   <Line
                    type="monotone"
                    dataKey="healthScore"
                    stroke="hsl(var(--chart-6))"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "hsl(var(--chart-6))" }}
                    activeDot={{ r: 6, fill: "hsl(var(--chart-6))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Progress Area Chart */}
        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              6-Month Progress Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                   <Area
                    type="monotone"
                    dataKey="weight"
                    stroke="hsl(var(--chart-7))"
                    fill="hsl(var(--chart-7))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Food Categories Bar Chart */}
        <Card className="border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="w-5 h-5 text-success" />
              Food Categories This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Items Consumed", color: "hsl(var(--chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={foodCategoriesData} layout="horizontal">
                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                   <XAxis 
                     type="number" 
                     axisLine={false}
                     tickLine={false}
                     tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                   />
                   <YAxis 
                     type="category" 
                     dataKey="category" 
                     axisLine={false}
                     tickLine={false}
                     tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                     width={80}
                   />
                   <ChartTooltip content={<ChartTooltipContent />} />
                   <Bar 
                     dataKey="count" 
                     radius={[0, 4, 4, 0]}
                   >
                     {foodCategoriesData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.fill} />
                     ))}
                   </Bar>
                 </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity Pattern Chart */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Today's Activity & Heart Rate Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer
              config={{
                calories: { label: "Calories Burned", color: "hsl(var(--chart-6))" },
                heartRate: { label: "Heart Rate", color: "hsl(var(--chart-7))" },
              }}
              className="h-[300px]"
            >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="calories"
                  stroke="hsl(var(--chart-6))"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "hsl(var(--chart-6))" }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="heartRate"
                  stroke="hsl(var(--chart-7))"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "hsl(var(--chart-7))" }}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAnalytics;