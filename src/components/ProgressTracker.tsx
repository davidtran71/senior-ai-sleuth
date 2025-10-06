import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Module {
  id: number;
  title: string;
  completed: boolean;
}

interface ProgressTrackerProps {
  modules: Module[];
  currentModule: number;
}

export const ProgressTracker = ({ modules, currentModule }: ProgressTrackerProps) => {
  const completedCount = modules.filter(m => m.completed).length;
  const progressPercentage = (completedCount / modules.length) * 100;

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Your Investigation Progress</h3>
          <span className="text-2xl font-bold bg-gradient-badge bg-clip-text text-transparent">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-badge transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="space-y-2 pt-2">
          {modules.map((module) => (
            <div 
              key={module.id}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                module.id === currentModule ? 'bg-muted' : ''
              }`}
            >
              {module.completed ? (
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground flex-shrink-0" />
              )}
              <span className={`text-base ${module.completed ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {module.title}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Case Files Solved: <span className="font-bold text-foreground">{completedCount}</span> / {modules.length}
          </p>
        </div>
      </div>
    </Card>
  );
};
