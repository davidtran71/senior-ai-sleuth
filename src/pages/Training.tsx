import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizQuestion } from "@/components/QuizQuestion";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, FileText, AlertTriangle, Search } from "lucide-react";
import { trainingSlides } from "@/data/trainingContent";

export const Training = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});

  const slide = trainingSlides[currentSlide];
  const totalSlides = trainingSlides.length;
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleQuizAnswer = (correct: boolean) => {
    setQuizAnswers(prev => ({ ...prev, [currentSlide]: correct }));
  };

  const handleComplete = () => {
    localStorage.setItem('ai-forensics-completed', 'true');
    navigate('/certificate');
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Case Number */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={handleBackToDashboard}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Exit Training
            </Button>
            <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg border border-accent/20">
              <FileText className="h-5 w-5 text-accent" />
              <span className="text-lg font-bold tracking-wider">
                CASE #{String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Progress Bar with Evidence Markers */}
          <div className="relative">
            <div className="h-4 bg-muted rounded-full overflow-hidden border-2 border-border">
              <div 
                className="h-full bg-gradient-detective transition-all duration-500 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs font-semibold text-muted-foreground tracking-wider">INVESTIGATION IN PROGRESS</span>
              <span className="text-xs font-bold text-accent">{Math.round(progress)}% COMPLETE</span>
            </div>
          </div>
        </div>

        {/* Slide Content */}
        <Card className="p-8 shadow-dramatic mb-6 case-file-border animate-fade-in">
          {slide.type === 'intro' && (
            <div className="space-y-8 evidence-stamp">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-3 bg-gradient-badge text-secondary-foreground px-6 py-3 rounded-full shadow-badge badge-shine">
                  <AlertTriangle className="h-8 w-8" />
                  <span className="text-lg font-black tracking-wider">ATTENTION RECRUIT</span>
                </div>
                <h1 className="text-balance text-glow-accent">{slide.title}</h1>
                <p className="text-xl leading-relaxed max-w-3xl mx-auto">{slide.content}</p>
                {slide.video && (
                  <div className="bg-gradient-evidence/10 p-6 rounded-lg border-2 border-accent/30 max-w-3xl mx-auto">
                    <video 
                      controls 
                      className="w-full rounded-lg shadow-dramatic"
                      src={slide.video}
                    >
                      Your browser does not support the video element.
                    </video>
                  </div>
                )}
                <div className="pt-4 border-t-2 border-accent/20">
                  <p className="text-sm font-semibold text-accent tracking-wider">BEGIN INVESTIGATION</p>
                </div>
              </div>
            </div>
          )}

          {slide.type === 'lesson' && (
            <div className="space-y-8">
              <div className="flex items-start gap-4 pb-4 border-b-2 border-accent/30">
                <div className="p-3 bg-gradient-evidence rounded-lg shadow-evidence">
                  <Search className="h-10 w-10 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-accent tracking-wider mb-1">EVIDENCE BRIEFING</p>
                  <h2 className="text-glow-accent">{slide.title}</h2>
                </div>
              </div>
              
              {slide.introduction && (
                <div className="bg-gradient-case-file p-6 rounded-lg border-2 border-accent/20">
                  <p className="text-lg font-semibold">{slide.introduction}</p>
                </div>
              )}

              {slide.tips && slide.tips.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                    <h3 className="text-accent font-bold tracking-wider">KEY DETECTION SIGNS</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-accent via-transparent to-transparent" />
                  </div>
                  <ul className="space-y-4">
                    {slide.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-4 p-4 bg-gradient-case-file rounded-lg border-l-4 border-accent/50">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="h-6 w-6 text-accent" />
                        </div>
                        <p className="text-lg flex-1 leading-relaxed">{tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {slide.content && (
                <div className="bg-gradient-evidence/10 p-8 rounded-lg border-2 border-accent/30 relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-xs font-black text-accent/20 tracking-widest rotate-12">EVIDENCE</div>
                  <p className="text-lg leading-relaxed relative z-10">{slide.content}</p>
                </div>
              )}
            </div>
          )}

          {slide.type === 'quiz' && slide.quiz && (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-block p-4 bg-gradient-badge rounded-full shadow-badge">
                  <AlertTriangle className="h-12 w-12 text-secondary-foreground" />
                </div>
                <h2 className="text-glow-badge">{slide.title}</h2>
                <p className="text-accent font-semibold tracking-wider">DEMONSTRATE YOUR SKILLS</p>
              </div>
              
              {slide.quiz.image && (
                <div className="bg-gradient-evidence/10 p-4 rounded-lg border-2 border-accent/30">
                  <div className="relative">
                    <div className="absolute top-2 right-2 bg-accent/90 text-accent-foreground px-3 py-1 rounded text-xs font-bold tracking-wider">EVIDENCE PHOTO</div>
                    <img 
                      src={slide.quiz.image} 
                      alt="Evidence for analysis" 
                      className="w-full rounded-lg shadow-dramatic"
                    />
                  </div>
                </div>
              )}

              {slide.quiz.audio && (
                <div className="bg-gradient-evidence/10 p-6 rounded-lg border-2 border-accent/30">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-accent/90 text-accent-foreground px-3 py-1 rounded text-xs font-bold tracking-wider">EVIDENCE AUDIO</div>
                    </div>
                    <audio 
                      controls 
                      className="w-full"
                      src={slide.quiz.audio}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              )}
              
              <QuizQuestion
                {...slide.quiz}
                onAnswer={handleQuizAnswer}
              />
            </div>
          )}

          {slide.type === 'tools' && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 pb-4 border-b-2 border-accent/30">
                <div className="p-3 bg-gradient-detective text-primary-foreground rounded-lg shadow-dramatic">
                  <Search className="h-10 w-10" />
                </div>
                <div>
                  <p className="text-sm font-bold text-accent tracking-wider mb-1">DETECTION TOOLKIT</p>
                  <h2 className="text-glow-accent">{slide.title}</h2>
                </div>
              </div>
              
              {slide.tools && slide.tools.map((tool, index) => (
                <div key={index} className="space-y-4">
                  <div className="bg-gradient-badge/10 p-4 rounded-lg border-l-4 border-accent">
                    <h3 className="text-accent font-bold">{tool.category}</h3>
                  </div>
                  <ul className="space-y-3 pl-4">
                    {tool.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-evidence rounded-full flex items-center justify-center shadow-evidence">
                          <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <span className="text-lg leading-relaxed">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {slide.type === 'debrief' && (
            <div className="space-y-8">
              <div className="text-center space-y-6 mb-8">
                <div className="inline-block p-6 bg-gradient-badge rounded-full shadow-badge badge-shine animate-scale-in">
                  <Award className="h-20 w-20 text-secondary-foreground" />
                </div>
                <h1 className="text-glow-badge">{slide.title}</h1>
                <p className="text-xl leading-relaxed max-w-3xl mx-auto">{slide.content}</p>
              </div>

              {slide.finalTips && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-accent font-bold tracking-wider">FINAL PROTOCOLS</h3>
                    <div className="h-1 w-32 mx-auto mt-2 bg-gradient-to-r from-transparent via-accent to-transparent" />
                  </div>
                  {slide.finalTips.map((tip, index) => (
                    <div key={index} className="bg-gradient-evidence/10 p-6 rounded-lg border-2 border-accent/30 hover:border-accent/50 transition-all hover:shadow-evidence">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-badge rounded-full flex items-center justify-center font-black text-secondary-foreground shadow-badge">
                          {index + 1}
                        </div>
                        <p className="text-lg font-semibold leading-relaxed">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            size="lg"
            className="hover:shadow-card transition-shadow"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Previous Case
          </Button>

          {currentSlide === totalSlides - 1 ? (
            <Button
              size="lg"
              onClick={handleComplete}
              className="gap-2 bg-gradient-badge text-secondary-foreground hover:shadow-badge transition-all badge-shine"
            >
              Claim Badge
              <Award className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleNext}
              className="hover:shadow-dramatic transition-all"
            >
              Next Case
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
