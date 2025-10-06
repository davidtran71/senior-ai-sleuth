import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizQuestion } from "@/components/QuizQuestion";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

interface ModuleProps {
  moduleId: number;
  title: string;
  content: {
    introduction: string;
    keyPoints: string[];
    example?: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  onComplete: () => void;
}

export const Module = ({ moduleId, title, content, quiz, onComplete }: ModuleProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'learn' | 'quiz'>('learn');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleQuizAnswer = (correct: boolean) => {
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
    }

    if (currentQuizIndex < quiz.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      // Module complete
      onComplete();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Module {moduleId}</p>
              <h1 className="text-balance">{title}</h1>
            </div>
          </div>
        </div>

        {currentStep === 'learn' ? (
          <Card className="p-8 shadow-card space-y-6">
            <div>
              <h2 className="mb-4">Introduction</h2>
              <p className="text-lg">{content.introduction}</p>
            </div>

            <div>
              <h3 className="mb-4">Key Points to Remember</h3>
              <ul className="space-y-3">
                {content.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center mt-1">
                      <span className="text-accent font-bold">{index + 1}</span>
                    </div>
                    <p className="text-lg flex-1">{point}</p>
                  </li>
                ))}
              </ul>
            </div>

            {content.example && (
              <div className="bg-muted p-6 rounded-lg border-l-4 border-accent">
                <h3 className="mb-3">Real-World Example</h3>
                <p className="text-lg">{content.example}</p>
              </div>
            )}

            <div className="pt-4">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => setCurrentStep('quiz')}
              >
                Ready for the Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2>Test Your Knowledge</h2>
              <span className="text-xl font-semibold">
                Question {currentQuizIndex + 1} of {quiz.length}
              </span>
            </div>

            <QuizQuestion
              {...quiz[currentQuizIndex]}
              onAnswer={handleQuizAnswer}
            />

            <div className="flex gap-2 justify-center">
              {quiz.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-12 rounded-full transition-colors ${
                    index <= currentQuizIndex ? 'bg-accent' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
