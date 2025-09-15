import React, { useState, useRef } from "react";
import { Camera, Upload, Zap, Search, X, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScanResult {
  name: string;
  category: "Advisable" | "Acceptable" | "Avoidable";
  healthScore: number;
  calories: number;
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
  alerts: string[];
  alternatives?: string[];
  barcode?: string;
  ingredients?: string[];
}

export const EnhancedScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { preferences } = useUser();
  const { t } = useLanguage();

  // Mock scan results for demonstration
  const mockResults: { [key: string]: ScanResult } = {
    healthy: {
      name: "Organic Quinoa Bowl",
      category: "Advisable",
      healthScore: 92,
      calories: 180,
      nutrition: {
        protein: 8,
        carbs: 32,
        fat: 3,
        fiber: 5,
        sugar: 2,
        sodium: 120
      },
      alerts: [],
      alternatives: [],
      ingredients: ["Organic Quinoa", "Water", "Sea Salt"]
    },
    unhealthy: {
      name: "Processed Instant Noodles",
      category: "Avoidable",
      healthScore: 35,
      calories: 350,
      nutrition: {
        protein: 8,
        carbs: 50,
        fat: 14,
        fiber: 2,
        sugar: 3,
        sodium: 1200
      },
      alerts: [
        "High in sodium (>1000mg per serving)",
        "Contains trans fats",
        "High in preservatives",
        "Low nutritional value"
      ],
      alternatives: [
        "Brown rice noodles with vegetables",
        "Whole wheat pasta with tomato sauce",
        "Quinoa salad with fresh herbs"
      ],
      ingredients: ["Wheat flour", "Palm oil", "Salt", "MSG", "Preservatives"]
    }
  };

  const simulateScan = (type: "healthy" | "unhealthy" = "healthy") => {
    setIsScanning(true);
    setScanResult(null);
    
    setTimeout(() => {
      const result = { ...mockResults[type] };
      
      // Cross-reference with medical history for personalized alerts
      if (preferences.medicalConditions.includes('Hypertension') && result.nutrition.sodium > 300) {
        result.alerts.push('⚠️ High sodium - not recommended for hypertension management');
        if (result.category === 'Advisable') result.category = 'Acceptable';
        result.healthScore = Math.max(result.healthScore - 20, 0);
      }
      
      if (preferences.allergies.some(allergy => 
        result.ingredients?.some(ingredient => 
          ingredient.toLowerCase().includes(allergy.toLowerCase())
        )
      )) {
        result.alerts.push('🚨 Contains allergens from your profile');
        result.category = 'Avoidable';
        result.healthScore = Math.max(result.healthScore - 30, 0);
      }
      
      setScanResult(result);
      setIsScanning(false);
    }, 2000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        simulateScan("healthy"); // Simulate scanning the dropped image
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      simulateScan("healthy"); // Simulate scanning the uploaded image
    }
  };

  const handleBarcodeSearch = () => {
    if (barcodeInput.trim()) {
      // Simulate barcode lookup
      simulateScan(Math.random() > 0.5 ? "healthy" : "unhealthy");
      setBarcodeInput("");
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-danger";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Advisable": return "bg-success/10 text-success border-success/20";
      case "Acceptable": return "bg-warning/10 text-warning border-warning/20"; 
      case "Avoidable": return "bg-danger/10 text-danger border-danger/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Advisable": return CheckCircle;
      case "Acceptable": return AlertTriangle;
      case "Avoidable": return XCircle;
      default: return AlertTriangle;
    }
  };

  return (
    <section id="scanner" className="py-16 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Smart Food Scanner
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload a photo, scan a barcode, or search by name to get instant health insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scanner Interface */}
          <Card className="border-primary/20 shadow-health">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Food Scanner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drag & Drop Area */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                  dragActive 
                    ? "border-primary bg-primary/5 scale-105" 
                    : "border-border hover:border-primary/50 hover:bg-muted/30"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {isScanning ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-primary font-medium">Analyzing food...</p>
                    <Progress value={Math.random() * 100} className="w-full" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-primary" />
                    <div>
                      <p className="text-lg font-medium">Drop your food image here</p>
                      <p className="text-muted-foreground">or click to browse</p>
                    </div>
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-primary hover:bg-primary-dark"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Choose Image
                    </Button>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Barcode Scanner */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter barcode number..."
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleBarcodeSearch()}
                  />
                  <Button onClick={handleBarcodeSearch} disabled={!barcodeInput.trim()}>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Test Buttons */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => simulateScan("healthy")}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Test Healthy
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => simulateScan("unhealthy")}
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Test Unhealthy
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="border-primary/20 shadow-health">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scanResult ? (
                <div className="space-y-6">
                  {/* Food Name & Category */}
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold">{scanResult.name}</h3>
                    <div className="flex justify-center">
                      <Badge variant="outline" className={`${getCategoryColor(scanResult.category)} text-sm px-3 py-1`}>
                        {React.createElement(getCategoryIcon(scanResult.category), { className: "w-4 h-4 mr-1" })}
                        {scanResult.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Health Score - Prominent Display */}
                  <Card className={`border-2 ${
                    scanResult.healthScore >= 80 ? 'border-success/30 bg-success/5' :
                    scanResult.healthScore >= 60 ? 'border-warning/30 bg-warning/5' :
                    'border-danger/30 bg-danger/5'
                  }`}>
                    <CardContent className="pt-6 text-center">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Health Score</p>
                        <div className={`text-4xl font-bold ${getScoreColor(scanResult.healthScore)}`}>
                          {scanResult.healthScore}/100
                        </div>
                        <Progress 
                          value={scanResult.healthScore} 
                          className="w-full h-3"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Nutrition Facts */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Nutrition per serving ({scanResult.calories} cal)</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <p className="font-medium">Protein</p>
                        <p className="text-primary">{scanResult.nutrition.protein}g</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <p className="font-medium">Carbs</p>
                        <p className="text-primary">{scanResult.nutrition.carbs}g</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <p className="font-medium">Fat</p>
                        <p className="text-primary">{scanResult.nutrition.fat}g</p>
                      </div>
                    </div>
                  </div>

                  {/* Health Alerts */}
                  {scanResult.alerts.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-danger flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Health Alerts
                      </h4>
                      <ul className="space-y-1">
                        {scanResult.alerts.map((alert, index) => (
                          <li key={index} className="text-sm text-danger bg-danger/10 p-2 rounded border-l-4 border-danger">
                            {alert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Healthy Alternatives */}
                  {scanResult.alternatives && scanResult.alternatives.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-success flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Healthier Alternatives
                      </h4>
                      <ul className="space-y-1">
                        {scanResult.alternatives.map((alt, index) => (
                          <li key={index} className="text-sm text-success bg-success/10 p-2 rounded border-l-4 border-success">
                            {alt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Upload an image or scan a barcode to see detailed analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};