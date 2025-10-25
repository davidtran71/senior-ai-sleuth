import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Download, Home, Shield, CheckCircle2 } from "lucide-react";

export const Certificate = () => {
  const navigate = useNavigate();
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-badge rounded-full mb-4 shadow-badge badge-shine">
            <Shield className="h-20 w-20 text-secondary-foreground" />
          </div>
          <div className="inline-block px-8 py-3 bg-gradient-detective text-primary-foreground rounded-full shadow-dramatic">
            <p className="text-lg font-black tracking-widest">MISSION COMPLETE</p>
          </div>
          <h1>Congratulations, Digital Detective!</h1>
          <p className="text-xl font-semibold">
            You've completed your AI Forensics training
          </p>
        </div>

        {/* Continue Your Mission */}
        <Card className="p-8 bg-gradient-evidence text-accent-foreground shadow-evidence print:hidden">
          <div className="flex items-start gap-4">
            <Shield className="h-16 w-16 flex-shrink-0" />
            <div>
              <h3 className="mb-4">Continue Your Mission</h3>
              <p className="text-lg mb-4 leading-relaxed">
                Your training is complete, but your mission continues. Stay vigilant and keep practicing these skills. 
                Share what you've learned with family and friends to help protect them from digital threats.
              </p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Review the training anytime to refresh your investigative skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Practice spotting AI content during your daily online activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Recruit others by sharing these critical detection techniques</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Certificate Card */}
        <Card className="p-12 shadow-dramatic print:shadow-none relative overflow-hidden" id="certificate">
          {/* Badge watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Shield className="h-96 w-96" />
          </div>
          
          <div className="relative z-10 text-center space-y-10 border-8 border-double border-accent/30 rounded-lg p-12 bg-gradient-case-file">
            {/* Header Badge */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-6 bg-gradient-badge rounded-full shadow-badge">
                  <Award className="h-16 w-16 text-secondary-foreground" />
                </div>
              </div>
              <div className="inline-block px-6 py-2 bg-gradient-detective text-primary-foreground rounded-full">
                <p className="text-sm font-black tracking-widest">OFFICIAL CERTIFICATE</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold">
                This official document certifies that
              </p>
              <div className="border-b-4 border-accent py-6">
                <p className="text-4xl font-black tracking-wide">DIGITAL DETECTIVE</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl font-semibold">
                has successfully completed the comprehensive
              </p>
              <div className="py-6 px-8 bg-gradient-detective text-primary-foreground rounded-lg shadow-dramatic">
                <h2 className="text-4xl font-black tracking-wide">
                  AI FORENSICS TASKFORCE TRAINING
                </h2>
              </div>
              <p className="text-lg leading-relaxed max-w-2xl mx-auto">
                and has demonstrated mastery in identifying AI-generated content including
                <span className="font-bold text-accent"> text, images, audio, and video</span> to protect themselves and others from digital threats
              </p>
            </div>

            {/* Skills Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              {['Text Analysis', 'Image Detection', 'Audio Forensics', 'Video Analysis'].map((skill, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-3 bg-muted/50 rounded-lg border border-accent/20">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                  <p className="text-xs font-bold text-center">{skill}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-12 pt-8">
              <div className="text-center">
                <div className="w-56 border-t-4 border-accent mb-3"></div>
                <p className="text-sm text-muted-foreground font-bold tracking-wider">DATE OF COMPLETION</p>
                <p className="text-xl font-black">{completionDate}</p>
              </div>
            </div>

            {/* Bottom Badge */}
            <div className="pt-8 border-t-2 border-accent/30">
              <div className="inline-block p-4 bg-gradient-evidence rounded-full shadow-evidence">
                <Shield className="h-12 w-12 text-accent-foreground" />
              </div>
              <p className="text-xs font-bold text-muted-foreground tracking-widest mt-4">
                AI FORENSICS TASKFORCE • CERTIFIED INVESTIGATOR
              </p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <Button size="lg" onClick={handlePrint} className="gap-2 bg-gradient-badge text-secondary-foreground hover:shadow-badge transition-all">
            <Download className="h-5 w-5" />
            Download/Print Badge
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/')} className="gap-2 hover:shadow-card transition-all">
            <Home className="h-5 w-5" />
            Return to HQ
          </Button>
        </div>
      </div>
    </div>
  );
};
