import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressTracker } from "@/components/ProgressTracker";
import { Badge } from "@/components/Badge";
import { Shield, Play, Award } from "lucide-react";

interface ModuleStatus {
  id: number;
  title: string;
  completed: boolean;
}

const Index = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<ModuleStatus[]>([
    { id: 1, title: "What is AI?", completed: false },
    { id: 2, title: "Spotting AI Text", completed: false },
    { id: 3, title: "Spotting AI Images", completed: false },
    { id: 4, title: "Spotting AI Audio", completed: false },
    { id: 5, title: "Spotting AI Video", completed: false },
    { id: 6, title: "Detection Tools", completed: false },
    { id: 7, title: "Final Assessment", completed: false },
  ]);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ai-forensics-progress');
    if (saved) {
      setModules(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('ai-forensics-progress', JSON.stringify(modules));
  }, [modules]);

  const completedCount = modules.filter(m => m.completed).length;

  const badges = [
    {
      type: "starter" as const,
      earned: completedCount >= 1,
      title: "Rookie Detective",
      description: "Complete your first module"
    },
    {
      type: "detective" as const,
      earned: completedCount >= 3,
      title: "Lead Investigator",
      description: "Complete 3 modules"
    },
    {
      type: "expert" as const,
      earned: completedCount >= 7,
      title: "Chief of Digital Forensics",
      description: "Complete all modules"
    }
  ];

  const handleStartModule = (moduleId: number) => {
    if (moduleId === 1) {
      navigate('/module-1');
    } else if (moduleId === 2) {
      navigate('/module-2');
    }
    // Add more module routes as they're implemented
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-detective text-primary-foreground py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <Shield className="h-5 w-5" />
                <span className="text-base font-medium">AI Forensics Taskforce</span>
              </div>
              <h1 className="text-balance">Welcome, Recruit! It's Training Day.</h1>
              <p className="text-xl opacity-90">
                Join the digital detective academy and learn to spot AI-generated scams, 
                deepfakes, and misinformation. Protect yourself and your loved ones online.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => handleStartModule(1)}
                className="text-xl py-7"
              >
                <Play className="mr-2 h-6 w-6" />
                Start Your Investigation
              </Button>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-primary-foreground/10 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-primary-foreground/20">
                  <Shield className="h-32 w-32 text-primary-foreground" />
                </div>
                <div className="absolute -top-4 -right-4 bg-gradient-badge p-4 rounded-full shadow-badge">
                  <Award className="h-12 w-12 text-secondary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Progress Section */}
          <div>
            <h2 className="mb-6">Your Training Progress</h2>
            <ProgressTracker modules={modules} currentModule={0} />
          </div>

          {/* Modules Grid */}
          <div>
            <h2 className="mb-6">Training Modules</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module) => (
                <Card 
                  key={module.id}
                  className="p-6 shadow-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Module {module.id}</p>
                      <h3 className="text-2xl">{module.title}</h3>
                    </div>
                    {module.completed && (
                      <div className="bg-accent/10 p-2 rounded-full">
                        <Award className="h-6 w-6 text-accent" />
                      </div>
                    )}
                  </div>
                  <Button 
                    variant={module.completed ? "outline" : "default"}
                    onClick={() => handleStartModule(module.id)}
                    disabled={module.id > 2} // Only first 2 modules active
                    className="w-full"
                  >
                    {module.completed ? "Review Module" : module.id <= 2 ? "Start Module" : "Coming Soon"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Badges Section */}
          <div>
            <h2 className="mb-6">Digital Detective Badges</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {badges.map((badge, index) => (
                <Badge key={index} {...badge} />
              ))}
            </div>
          </div>

          {/* Info Card */}
          <Card className="p-8 bg-gradient-evidence text-accent-foreground">
            <div className="flex items-start gap-4">
              <Shield className="h-12 w-12 flex-shrink-0" />
              <div>
                <h3 className="mb-3">Why This Training Matters</h3>
                <p className="text-lg mb-4">
                  Scammers use AI to create convincing fake emails, voice calls, images, and videos. 
                  This training will help you recognize the signs and stay safe online.
                </p>
                <p className="text-lg">
                  Complete all modules to earn your certificate and become a certified Digital Detective!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
