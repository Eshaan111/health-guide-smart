import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Scan, 
  Brain, 
  AlertTriangle, 
  BarChart3, 
  Users, 
  Dumbbell,
  TrendingUp,
  RefreshCw 
} from "lucide-react";
import scannerIcon from "@/assets/scanner-icon.jpg";

const FeaturesSection = () => {
  const features = [
    {
      icon: Scan,
      title: "Barcode & Food Scanning",
      description: "Instantly scan any food product to get detailed nutritional information, ingredients list, and health recommendations.",
      color: "primary",
      image: scannerIcon,
    },
    {
      icon: Brain,
      title: "AI Food Classification",
      description: "Smart AI automatically categorizes foods into Advisable, Acceptable, or Avoidable based on health criteria.",
      color: "secondary",
      badge: "Smart AI",
    },
    {
      icon: AlertTriangle,
      title: "Red-Flag Alerts",
      description: "Get instant warnings about harmful ingredients like preservatives, synthetic dyes, and unhealthy additives.",
      color: "danger",
      badge: "Health Alert",
    },
    {
      icon: BarChart3,
      title: "Calorie Tracking",
      description: "Effortlessly log and monitor your daily calorie intake with visual progress tracking and insights.",
      color: "success",
    },
    {
      icon: Users,
      title: "Personalized Recommendations",
      description: "Get tailored diet suggestions based on your age, dietary preferences, and specific health conditions.",
      color: "primary",
      badge: "Personalized",
    },
    {
      icon: Dumbbell,
      title: "Workout Suggestions",
      description: "Receive personalized workout recommendations and activity goals to balance your calorie intake.",
      color: "secondary",
    },
    {
      icon: TrendingUp,
      title: "Progress Dashboard",
      description: "Visual analytics showing your daily, weekly, and monthly health progress with detailed insights.",
      color: "success",
    },
    {
      icon: RefreshCw,
      title: "Healthy Alternatives",
      description: "Discover healthier food substitutes when scanning unhealthy items - like multigrain instead of white bread.",
      color: "primary",
    },
  ];

  return (
    <section id="features" className="py-16 px-4 bg-accent/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Everything You Need for Healthy Living
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools to help you make informed food choices and maintain a healthy lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-health transition-all duration-300 border-card-border gradient-card">
              <CardContent className="p-6">
                {feature.image ? (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className={`mb-4 w-12 h-12 rounded-lg flex items-center justify-center ${
                    feature.color === 'primary' ? 'bg-primary text-primary-foreground' :
                    feature.color === 'secondary' ? 'bg-secondary text-secondary-foreground' :
                    feature.color === 'success' ? 'bg-success text-success-foreground' :
                    feature.color === 'danger' ? 'bg-danger text-danger-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                )}

                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  {feature.badge && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;