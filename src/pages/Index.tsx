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
      <section className="bg-gradient-detective text-primary-foreground py-20 px-4 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-primary-foreground rounded-full" />
          <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-primary-foreground rotate-45" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-primary-foreground" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-3 bg-primary-foreground/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-primary-foreground/30">
                <Shield className="h-6 w-6" />
                <span className="text-lg font-black tracking-wider">AI FORENSICS TASKFORCE</span>
              </div>
              <h1 className="text-balance text-6xl leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                Welcome, Recruit! It's Training Day.
              </h1>
              <p className="text-2xl leading-relaxed opacity-95 font-medium">
                Join the digital detective academy and learn to spot AI-generated scams, 
                deepfakes, and misinformation. Protect yourself and your loved ones online.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={handleStartTraining}
                className="text-xl py-8 px-8 bg-gradient-badge text-secondary-foreground hover:shadow-badge transition-all badge-shine"
              >
                <Play className="mr-3 h-7 w-7" />
                {trainingCompleted ? "Retake Training" : "Begin Investigation"}
              </Button>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative animate-scale-in">
                <div className="w-72 h-72 bg-primary-foreground/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-primary-foreground/30 shadow-dramatic">
                  <Shield className="h-40 w-40 text-primary-foreground" style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' }} />
                </div>
                <div className="absolute -top-6 -right-6 bg-gradient-badge p-6 rounded-full shadow-badge badge-shine animate-pulse">
                  <Award className="h-16 w-16 text-secondary-foreground" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gradient-evidence p-4 rounded-lg shadow-evidence">
                  <p className="text-accent-foreground font-black text-sm tracking-wider">CLASSIFIED</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Critical Mission Info */}
          <Card className="p-10 bg-gradient-evidence text-accent-foreground shadow-evidence relative overflow-hidden">
            <div className="absolute top-4 right-4 text-xs font-black text-accent-foreground/10 tracking-widest rotate-12 text-6xl">
              URGENT
            </div>
            <div className="flex items-start gap-6 relative z-10">
              <div className="p-4 bg-accent-foreground/10 rounded-full backdrop-blur-sm">
                <Shield className="h-16 w-16 flex-shrink-0" />
              </div>
              <div>
                <div className="inline-block px-4 py-1 bg-accent-foreground/20 rounded-full mb-4">
                  <p className="text-sm font-black tracking-wider">CRITICAL MISSION</p>
                </div>
                <h3 className="mb-4">Why This Training Matters</h3>
                <p className="text-xl mb-6 leading-relaxed">
                  Criminals use AI to create convincing fake emails, voice calls, images, and videos targeting seniors. 
                  This training equips you with the skills to recognize digital threats and stay safe online.
                </p>
                <p className="text-xl font-bold">
                  Complete your training to earn an official Digital Detective Badge!
                </p>
              </div>
            </div>
          </Card>

          {/* Case File - Training Info */}
          <Card className="p-10 shadow-dramatic case-file-border">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-evidence rounded-lg shadow-evidence">
                <Shield className="h-10 w-10 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-bold text-accent tracking-wider mb-1">TRAINING BRIEFING</p>
                <h2 className="text-glow-accent">What You'll Investigate</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { num: 1, title: "Understanding AI", desc: "Learn what AI is and how criminals use it online" },
                { num: 2, title: "Spotting Fake Text", desc: "Identify AI-generated scams, phishing emails and messages" },
                { num: 3, title: "Detecting Fake Images", desc: "Recognize manipulated photos and AI-generated images" },
                { num: 4, title: "Voice Clones & Audio", desc: "Spot synthetic voices and deepfake audio scams" },
                { num: 5, title: "Deepfake Videos", desc: "Identify manipulated and AI-generated video content" },
                { num: 6, title: "Detection Tools", desc: "Use free tools to verify suspicious content" }
              ].map((item) => (
                <div key={item.num} className="p-6 bg-gradient-case-file rounded-lg border-l-4 border-accent hover:shadow-evidence transition-all">
                  <h3 className="mb-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-badge rounded-full flex items-center justify-center shadow-badge">
                      <span className="text-secondary-foreground font-black">{item.num}</span>
                    </div>
                    <span className="text-accent">{item.title}</span>
                  </h3>
                  <p className="text-muted-foreground text-base ml-13">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA Section */}
          <Card className="p-10 bg-gradient-badge text-secondary-foreground shadow-badge badge-shine">
            <div className="text-center space-y-6">
              <div className="inline-flex p-4 bg-secondary-foreground/10 rounded-full backdrop-blur-sm">
                <Award className="h-12 w-12" />
              </div>
              <h2 className="text-4xl font-black">Ready to Become a Digital Detective?</h2>
              <p className="text-xl max-w-2xl mx-auto opacity-95">
                Start your training now and learn to protect yourself and your loved ones from AI-powered scams and misinformation.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={handleStartTraining}
                className="text-xl py-8 px-10 bg-secondary text-secondary-foreground hover:shadow-dramatic transition-all"
              >
                <Play className="mr-3 h-7 w-7" />
                {trainingCompleted ? "Retake Training" : "Start Training Now"}
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
