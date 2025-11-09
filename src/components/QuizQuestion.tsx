import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  onAnswer: (correct: boolean) => void;
}

export const QuizQuestion = ({ 
  question, 
  options, 
  correctAnswer, 
  explanation,
  onAnswer 
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === correctAnswer;
    setShowResult(true);
  };

  const handleContinue = () => {
    const isCorrect = selectedAnswer === correctAnswer;
    onAnswer(isCorrect);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <Card className="p-8 shadow-card">
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <h3 className="text-2xl font-semibold">{question}</h3>
        </div>

        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all text-lg ${
                selectedAnswer === index
                  ? showResult
                    ? index === correctAnswer
                      ? 'border-accent bg-accent/10'
                      : 'border-destructive bg-destructive/10'
                    : 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && selectedAnswer === index && (
                  index === correctAnswer ? (
                    <CheckCircle2 className="h-6 w-6 text-accent" />
                  ) : (
                    <XCircle className="h-6 w-6 text-destructive" />
                  )
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg ${
            selectedAnswer === correctAnswer 
              ? 'bg-accent/10 border-2 border-accent' 
              : 'bg-destructive/10 border-2 border-destructive'
          }`}>
            <p className="font-medium mb-2">
              {selectedAnswer === correctAnswer ? '✓ Correct!' : '✗ Not quite right'}
            </p>
            <p className="text-base">{explanation}</p>
          </div>
        )}

        {showResult ? (
          <Button 
            onClick={handleContinue}
            size="lg"
            className="w-full text-lg py-6"
          >
            Continue
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            size="lg"
            className="w-full text-lg py-6"
          >
            Submit Answer
          </Button>
        )}
      </div>
    </Card>
  );
};
