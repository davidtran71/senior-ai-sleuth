import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Download, Home } from "lucide-react";

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
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-badge rounded-full mb-4">
            <Award className="h-16 w-16 text-secondary-foreground" />
          </div>
          <h1>Congratulations, Digital Detective!</h1>
          <p className="text-xl text-muted-foreground">
            You've completed your AI Forensics training
          </p>
        </div>

        {/* Certificate Card */}
        <Card className="p-12 shadow-card print:shadow-none" id="certificate">
          <div className="text-center space-y-8 border-8 border-accent/20 rounded-lg p-12">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wider text-muted-foreground">
                This certifies that
              </p>
              <div className="border-b-2 border-accent/50 py-4">
                <p className="text-3xl font-bold">Digital Detective</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg">
                has successfully completed the
              </p>
              <h2 className="text-gradient-detective">
                AI Forensics Taskforce Training
              </h2>
              <p className="text-lg">
                and is now equipped to identify AI-generated content including
                text, images, audio, and video to stay safe online
              </p>
            </div>

            <div className="flex items-center justify-center gap-12 pt-8">
              <div className="text-center">
                <div className="w-48 border-t-2 border-accent/50 mb-2"></div>
                <p className="text-sm text-muted-foreground">Date of Completion</p>
                <p className="font-semibold">{completionDate}</p>
              </div>
            </div>

            <div className="pt-8">
              <Award className="h-16 w-16 mx-auto text-accent" />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          <Button size="lg" onClick={handlePrint} className="gap-2">
            <Download className="h-5 w-5" />
            Download/Print Certificate
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/')} className="gap-2">
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
        </div>

        {/* Additional Resources */}
        <Card className="p-8 bg-gradient-evidence print:hidden">
          <h3 className="mb-4">Continue Your Learning</h3>
          <p className="text-lg mb-4">
            Stay vigilant and keep practicing these skills. Share what you've learned 
            with family and friends to help protect them too.
          </p>
          <ul className="space-y-2 text-lg">
            <li>• Review the training anytime to refresh your memory</li>
            <li>• Practice spotting AI content in your daily browsing</li>
            <li>• Help others by sharing these detection techniques</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
