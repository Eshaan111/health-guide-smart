import { useState } from "react";
import { Plus, X, FileHeart, AlertTriangle, Pill } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface MedicalCondition {
  id: string;
  name: string;
  diagnosedDate?: string;
  severity: "mild" | "moderate" | "severe";
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

interface Allergy {
  id: string;
  name: string;
  severity: "mild" | "moderate" | "severe";
}

interface MedicalHistoryProps {
  isEditing: boolean;
}

export const MedicalHistory = ({ isEditing }: MedicalHistoryProps) => {
  const [conditions, setConditions] = useState<MedicalCondition[]>([
    { id: "1", name: "Hypertension", diagnosedDate: "2022", severity: "mild" }
  ]);
  
  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "Lisinopril", dosage: "10mg", frequency: "Daily" }
  ]);
  
  const [allergies, setAllergies] = useState<Allergy[]>([
    { id: "1", name: "Nuts", severity: "severe" },
    { id: "2", name: "Dairy", severity: "mild" }
  ]);

  const [newCondition, setNewCondition] = useState("");
  const [newMedication, setNewMedication] = useState({ name: "", dosage: "", frequency: "" });
  const [newAllergy, setNewAllergy] = useState("");

  const addCondition = () => {
    if (newCondition.trim()) {
      const condition: MedicalCondition = {
        id: Date.now().toString(),
        name: newCondition.trim(),
        severity: "mild"
      };
      setConditions([...conditions, condition]);
      setNewCondition("");
    }
  };

  const addMedication = () => {
    if (newMedication.name.trim()) {
      const medication: Medication = {
        id: Date.now().toString(),
        ...newMedication
      };
      setMedications([...medications, medication]);
      setNewMedication({ name: "", dosage: "", frequency: "" });
    }
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      const allergy: Allergy = {
        id: Date.now().toString(),
        name: newAllergy.trim(),
        severity: "mild"
      };
      setAllergies([...allergies, allergy]);
      setNewAllergy("");
    }
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const removeAllergy = (id: string) => {
    setAllergies(allergies.filter(a => a.id !== id));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild": return "bg-success/10 text-success border-success/20";
      case "moderate": return "bg-warning/10 text-warning border-warning/20";
      case "severe": return "bg-danger/10 text-danger border-danger/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Medical Conditions */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileHeart className="w-5 h-5 text-primary" />
            Medical Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {conditions.map((condition) => (
              <div key={condition.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{condition.name}</p>
                    {condition.diagnosedDate && (
                      <p className="text-sm text-muted-foreground">Diagnosed: {condition.diagnosedDate}</p>
                    )}
                  </div>
                  <Badge variant="outline" className={getSeverityColor(condition.severity)}>
                    {condition.severity}
                  </Badge>
                </div>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCondition(condition.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add medical condition..."
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCondition()}
              />
              <Button onClick={addCondition}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Medications */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            Current Medications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {medications.map((medication) => (
              <div key={medication.id} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10">
                <div>
                  <p className="font-medium">{medication.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {medication.dosage} - {medication.frequency}
                  </p>
                </div>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMedication(medication.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          {isEditing && (
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="Medication name"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                />
                <Input
                  placeholder="Dosage"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                />
                <Input
                  placeholder="Frequency"
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                />
              </div>
              <Button onClick={addMedication} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Medication
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Allergies */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-danger" />
            Allergies & Food Restrictions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {allergies.map((allergy) => (
              <div key={allergy.id} className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={`${getSeverityColor(allergy.severity)} ${isEditing ? 'pr-1' : ''}`}
                >
                  {allergy.name}
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                      onClick={() => removeAllergy(allergy.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </Badge>
              </div>
            ))}
          </div>
          
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add allergy or food restriction..."
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addAllergy()}
              />
              <Button onClick={addAllergy}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};