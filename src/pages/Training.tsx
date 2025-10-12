import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizQuestion } from "@/components/QuizQuestion";
import { ArrowLeft, ArrowRight, Award, CheckCircle2 } from "lucide-react";
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
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={handleBackToDashboard}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Exit Training
          </Button>
          <span className="text-lg font-semibold">
            Slide {currentSlide + 1} of {totalSlides}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-detective transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Slide Content */}
        <Card className="p-8 shadow-card mb-6">
          {slide.type === 'intro' && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h1 className="text-balance">{slide.title}</h1>
                <p className="text-xl">{slide.content}</p>
              </div>
            </div>
          )}

          {slide.type === 'lesson' && (
            <div className="space-y-6">
              <h2 className="mb-4">{slide.title}</h2>
              
              {slide.introduction && (
                <p className="text-lg">{slide.introduction}</p>
              )}

              {slide.tips && slide.tips.length > 0 && (
                <div>
                  <h3 className="mb-4">Key Detection Signs</h3>
                  <ul className="space-y-3">
                    {slide.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                        <p className="text-lg flex-1">{tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {slide.content && (
                <div className="bg-muted p-6 rounded-lg border-l-4 border-accent">
                  <p className="text-lg">{slide.content}</p>
                </div>
              )}
            </div>
          )}

          {slide.type === 'quiz' && slide.quiz && (
            <div className="space-y-6">
              <h2 className="mb-4">{slide.title}</h2>
              <QuizQuestion
                {...slide.quiz}
                onAnswer={handleQuizAnswer}
              />
            </div>
          )}

          {slide.type === 'tools' && (
            <div className="space-y-6">
              <h2 className="mb-4">{slide.title}</h2>
              
              {slide.tools && slide.tools.map((tool, index) => (
                <div key={index} className="space-y-3">
                  <h3>{tool.category}</h3>
                  <ul className="space-y-2">
                    {tool.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-lg">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {slide.type === 'debrief' && (
            <div className="space-y-6">
              <div className="text-center space-y-4 mb-6">
                <h1>{slide.title}</h1>
                <p className="text-xl">{slide.content}</p>
              </div>

              {slide.finalTips && (
                <div className="space-y-4">
                  {slide.finalTips.map((tip, index) => (
                    <div key={index} className="bg-muted p-6 rounded-lg">
                      <p className="text-lg font-semibold mb-2">{tip}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            size="lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Previous
          </Button>

          {currentSlide === totalSlides - 1 ? (
            <Button
              size="lg"
              onClick={handleComplete}
              className="gap-2"
            >
              Get Certificate
              <Award className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleNext}
            >
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
