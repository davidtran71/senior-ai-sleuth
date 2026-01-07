import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizQuestion, QuizQuestionRef } from "@/components/QuizQuestion";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, FileText, AlertTriangle, Search } from "lucide-react";
import { trainingSlides } from "@/data/trainingContent";
import { CareSideLogo } from "@/components/CareSideLogo";

export const Training = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [quizState, setQuizState] = useState({ canSubmit: false, hasSubmitted: false, isCorrect: false });
  const quizRef = useRef<QuizQuestionRef>(null);

  const slide = trainingSlides[currentSlide];
  const totalSlides = trainingSlides.length;
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
      setQuizState({ canSubmit: false, hasSubmitted: false, isCorrect: false });
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setQuizState({ canSubmit: false, hasSubmitted: false, isCorrect: false });
      window.scrollTo(0, 0);
    }
  };

  const handleQuizAnswer = (correct: boolean) => {
    setQuizAnswers(prev => ({ ...prev, [currentSlide]: correct }));
  };

  const handleQuizStateChange = useCallback((state: { canSubmit: boolean; hasSubmitted: boolean; isCorrect: boolean }) => {
    setQuizState(state);
  }, []);

  const handleNavButtonClick = () => {
    if (slide.type === 'quiz') {
      if (!quizState.hasSubmitted) {
        quizRef.current?.submit();
      } else if (quizState.isCorrect) {
        quizRef.current?.continue();
        handleNext();
      } else {
        quizRef.current?.tryAgain();
      }
    } else {
      handleNext();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('ai-forensics-completed', 'true');
    navigate('/certificate');
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* CareSide Logo - Top Left */}
        <div className="mb-8">
          <CareSideLogo />
        </div>
        
        {/* Header with Case Number */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={handleBackToDashboard}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Exit Training
            </Button>
            {slide.type !== 'intro' && currentSlide !== 1 && currentSlide !== 2 && currentSlide !== 11 && currentSlide !== 12 && currentSlide !== 13 && (
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg border border-accent/20">
                <FileText className="h-5 w-5 text-accent" />
                <span className="text-lg font-bold tracking-wider">
                  {currentSlide === 3 || currentSlide === 4 ? 'CASE #1/4' : currentSlide === 5 || currentSlide === 6 ? 'CASE #2/4' : currentSlide === 7 || currentSlide === 8 ? 'CASE #3/4' : currentSlide === 9 || currentSlide === 10 ? 'CASE #4/4' : `CASE #${String(currentSlide + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`}
                </span>
              </div>
            )}
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

              {/* Special layout for "The Good and Bad of AI" slide */}
              {currentSlide === 2 && slide.content && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 p-8 rounded-lg border-2 border-green-500/30 hover:border-green-500/50 transition-all">
                      <h3 className="text-3xl font-black text-green-600 dark:text-green-400 mb-4 tracking-tight">THE GOOD</h3>
                      <ul className="space-y-3">
                        {slide.content.split('THE BAD:')[0].replace('THE GOOD:', '').trim().split('|').map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-green-500 mt-1">✓</span>
                            <span className="text-lg leading-relaxed">{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 p-8 rounded-lg border-2 border-red-500/30 hover:border-red-500/50 transition-all">
                      <h3 className="text-3xl font-black text-red-600 dark:text-red-400 mb-4 tracking-tight">THE BAD</h3>
                      <ul className="space-y-3">
                        {slide.content.split('THE BAD:')[1]?.trim().split('|').map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-red-500 mt-1">✗</span>
                            <span className="text-lg leading-relaxed">{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Regular tips section for other slides */}
              {currentSlide !== 2 && slide.tips && slide.tips.length > 0 && (
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

              {/* Regular content section for other slides */}
              {currentSlide !== 2 && slide.content && (
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

              {slide.quiz.video && (
                <div className="bg-gradient-evidence/10 p-4 rounded-lg border-2 border-accent/30">
                  <div className="relative">
                    <div className="absolute top-2 right-2 bg-accent/90 text-accent-foreground px-3 py-1 rounded text-xs font-bold tracking-wider z-10">EVIDENCE VIDEO</div>
                    <video 
                      controls 
                      className="w-full rounded-lg shadow-dramatic"
                      src={slide.quiz.video}
                    >
                      Your browser does not support the video element.
                    </video>
                  </div>
                </div>
              )}
              
              <QuizQuestion
                ref={quizRef}
                {...slide.quiz}
                onAnswer={handleQuizAnswer}
                onStateChange={handleQuizStateChange}
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
              
              <div className="grid md:grid-cols-2 gap-6">
                {slide.tools && slide.tools.map((tool, index) => (
                  <div key={index} className="bg-gradient-case-file p-6 rounded-lg border-2 border-accent/20 hover:border-accent/40 transition-all space-y-4">
                    <h3 className="text-xl font-bold text-accent border-b border-accent/30 pb-3">{tool.category}</h3>
                    <ul className="space-y-3">
                      {tool.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-gradient-evidence rounded-full flex items-center justify-center shadow-evidence mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                          </div>
                          <span className="text-base leading-relaxed">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
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

              {slide.tips && slide.tips.length > 0 && (
                <div className="space-y-4 mb-8">
                  <div className="text-center mb-6">
                    <h3 className="text-accent font-bold tracking-wider">KEY DETECTION SIGNS</h3>
                    <div className="h-1 w-32 mx-auto mt-2 bg-gradient-to-r from-transparent via-accent to-transparent" />
                  </div>
                  {slide.tips.map((tip, index) => (
                    <div key={index} className="bg-gradient-evidence/10 p-4 rounded-lg border-2 border-accent/30 hover:border-accent/50 transition-all">
                      <p className="text-base leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              )}

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

              {currentSlide === totalSlides - 1 && (
                <div className="flex justify-center pt-6">
                  <Button
                    size="lg"
                    onClick={handleComplete}
                    className="gap-2 bg-gradient-badge text-secondary-foreground hover:shadow-badge transition-all badge-shine"
                  >
                    Claim Your Badge
                    <Award className="h-5 w-5" />
                  </Button>
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
            {currentSlide === 0 || currentSlide === 1 || currentSlide === 2 || currentSlide === 3 || currentSlide === 4 || currentSlide === 6 || currentSlide === 12 || currentSlide === 13 ? 'Back' : 'Previous Case'}
          </Button>

          {currentSlide !== totalSlides - 1 && (
            <Button
              size="lg"
              onClick={handleNavButtonClick}
              disabled={slide.type === 'quiz' && !quizState.canSubmit && !quizState.hasSubmitted}
              className="hover:shadow-dramatic transition-all"
            >
              {slide.type === 'quiz' 
                ? (quizState.hasSubmitted ? (quizState.isCorrect ? 'Continue' : 'Try Again') : 'Submit Answer')
                : slide.type === 'intro' ? 'AI Briefing' : currentSlide === 1 ? 'AI Uses' : currentSlide === 2 ? 'Case 1: AI Text' : currentSlide === 3 || currentSlide === 5 || currentSlide === 7 || currentSlide === 9 || currentSlide === 11 ? 'Next' : currentSlide === 12 ? 'Claim Your Badge!' : 'Next Case'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
