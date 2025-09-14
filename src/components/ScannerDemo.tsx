import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Scan, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Zap,
  Camera,
  BarChart,
  Upload,
  Image as ImageIcon
} from "lucide-react";

const ScannerDemo = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage(e.target?.result as string);
          simulateScanning();
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateScanning();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateScanning = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  const resetScanner = () => {
    setUploadedImage(null);
    setIsScanning(false);
  };
  // Mock food data
  const scannedFood = {
    name: "Organic Whole Grain Bread",
    brand: "Nature's Best",
    category: "advisable",
    score: 85,
    calories: 120,
    servingSize: "2 slices (50g)",
    nutrients: {
      protein: "4g",
      fiber: "3g", 
      sodium: "150mg",
      sugar: "2g",
    },
    ingredients: [
      "Whole wheat flour",
      "Water", 
      "Organic honey",
      "Sea salt",
      "Yeast"
    ],
    healthAlerts: [],
    alternatives: []
  };

  const unhealthyFood = {
    name: "Processed White Bread",
    brand: "Quick Bake",
    category: "avoidable",
    score: 35,
    calories: 150,
    servingSize: "2 slices (50g)",
    healthAlerts: [
      "High in refined sugars",
      "Contains artificial preservatives", 
      "Low fiber content"
    ],
    alternatives: [
      "Whole grain bread",
      "Sprouted grain bread",
      "Sourdough bread"
    ]
  };

  return (
    <section id="scanner" className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            See It In Action
          </h2>
          <p className="text-lg text-muted-foreground">
            Watch how our AI analyzes food products in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scanner Interface */}
          <Card className={`border-2 border-dashed relative overflow-hidden transition-all duration-300 ${
            dragActive 
              ? 'border-primary bg-primary/10 scale-105' 
              : uploadedImage 
                ? 'border-success bg-success/5' 
                : 'border-primary/30'
          }`}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
                {uploadedImage ? <ImageIcon className="w-8 h-8 text-white" /> : <Camera className="w-8 h-8 text-white" />}
              </div>
              <CardTitle className="text-xl">Food Scanner</CardTitle>
              <p className="text-sm text-muted-foreground">
                {uploadedImage ? 'Image uploaded successfully!' : 'Drop an image or use your camera'}
              </p>
            </CardHeader>
            <CardContent>
              <div 
                className={`aspect-square bg-accent/50 rounded-lg mb-4 flex items-center justify-center relative cursor-pointer transition-all duration-300 ${
                  dragActive ? 'bg-primary/20 scale-105' : ''
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                {uploadedImage ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded food" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {isScanning && (
                      <div className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Scan className="w-8 h-8 text-primary mx-auto mb-2 animate-pulse" />
                          <p className="text-sm font-medium text-primary">Analyzing...</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-4 border-2 border-primary rounded-lg opacity-70 animate-pulse"></div>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-4 border-2 border-primary rounded-lg opacity-50"></div>
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Drop image here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG, WebP supported
                      </p>
                    </div>
                  </>
                )}
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
              
              <div className="space-y-2">
                <Button className="w-full" size="lg" disabled={isScanning}>
                  <Zap className="w-4 h-4 mr-2" />
                  {isScanning ? 'Analyzing...' : 'Start Scanning'}
                </Button>
                
                {uploadedImage && (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm" 
                    onClick={resetScanner}
                  >
                    Upload New Image
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Healthy Food Result */}
          <Card className="gradient-card shadow-health">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{scannedFood.name}</CardTitle>
                <Badge className="bg-success text-success-foreground">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Advisable
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{scannedFood.brand}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Health Score */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Health Score</span>
                  <span className="text-lg font-bold text-success">{scannedFood.score}/100</span>
                </div>
                <Progress value={scannedFood.score} className="h-2" />
              </div>

              {/* Nutrition Info */}
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <BarChart className="w-4 h-4 mr-1" />
                  Nutrition ({scannedFood.servingSize})
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Calories:</span>
                    <span className="font-medium">{scannedFood.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Protein:</span>
                    <span className="font-medium">{scannedFood.nutrients.protein}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fiber:</span>
                    <span className="font-medium text-success">{scannedFood.nutrients.fiber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sugar:</span>
                    <span className="font-medium">{scannedFood.nutrients.sugar}</span>
                  </div>
                </div>
              </div>

              {/* Positive Highlights */}
              <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                <p className="text-xs font-medium text-success mb-1">✓ Health Benefits</p>
                <p className="text-xs text-success/80">High fiber, whole grains, no artificial additives</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Unhealthy Food Example */}
        <div className="mt-8">
          <Card className="border-danger/30 bg-danger/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{unhealthyFood.name}</CardTitle>
                <Badge variant="destructive">
                  <XCircle className="w-3 h-3 mr-1" />
                  Avoidable
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{unhealthyFood.brand}</p>
                <span className="text-lg font-bold text-danger">{unhealthyFood.score}/100</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Health Alerts */}
              <div>
                <h4 className="font-medium mb-2 flex items-center text-danger">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Health Alerts
                </h4>
                <div className="space-y-2">
                  {unhealthyFood.healthAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <XCircle className="w-4 h-4 text-danger mt-0.5 flex-shrink-0" />
                      <span className="text-danger">{alert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Healthy Alternatives */}
              <div>
                <h4 className="font-medium mb-2 flex items-center text-success">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Healthier Alternatives
                </h4>
                <div className="flex flex-wrap gap-2">
                  {unhealthyFood.alternatives.map((alternative, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-success/30 text-success">
                      {alternative}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ScannerDemo;