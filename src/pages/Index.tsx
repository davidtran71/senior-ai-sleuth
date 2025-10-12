import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Play, Award } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [trainingCompleted, setTrainingCompleted] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const completed = localStorage.getItem('ai-forensics-completed');
    if (completed === 'true') {
      setTrainingCompleted(true);
    }
  }, []);

  const handleStartTraining = () => {
    navigate('/training');
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
                onClick={handleStartTraining}
                className="text-xl py-7"
              >
                <Play className="mr-2 h-6 w-6" />
                {trainingCompleted ? "Retake Training" : "Start Your Investigation"}
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
          {/* Training Overview */}
          {trainingCompleted && (
            <Card className="p-8 bg-gradient-badge shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <Award className="h-16 w-16 text-accent" />
                <div>
                  <h2 className="mb-2">Training Completed!</h2>
                  <p className="text-lg">You've earned your Digital Detective Certificate</p>
                </div>
              </div>
            </Card>
          )}

          {/* Training Info */}
          <Card className="p-8 shadow-card">
            <h2 className="mb-6">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">1</span>
                  </div>
                  Understanding AI
                </h3>
                <p className="text-muted-foreground">Learn what AI is and how it's used online</p>
              </div>
              <div>
                <h3 className="mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">2</span>
                  </div>
                  Spotting Fake Text
                </h3>
                <p className="text-muted-foreground">Identify AI-generated emails and messages</p>
              </div>
              <div>
                <h3 className="mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">3</span>
                  </div>
                  Detecting Fake Images
                </h3>
                <p className="text-muted-foreground">Recognize manipulated photos and AI images</p>
              </div>
              <div>
                <h3 className="mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">4</span>
                  </div>
                  Voice Clones & Audio
                </h3>
                <p className="text-muted-foreground">Spot synthetic voices and fake audio</p>
              </div>
              <div>
                <h3 className="mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">5</span>
                  </div>
                  Deepfake Videos
                </h3>
                <p className="text-muted-foreground">Identify manipulated video content</p>
              </div>
              <div>
                <h3 className="mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">6</span>
                  </div>
                  Detection Tools
                </h3>
                <p className="text-muted-foreground">Use free tools to verify suspicious content</p>
              </div>
            </div>
          </Card>

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
