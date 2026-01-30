import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { QuizOption } from "@/data/trainingContent";

interface QuizQuestionProps {
  question: string;
  options: (string | QuizOption)[];
  correctAnswer: number | number[];
  explanation: string;
  onAnswer: (correct: boolean) => void;
  onStateChange?: (state: { canSubmit: boolean; hasSubmitted: boolean; isCorrect: boolean }) => void;
}

export interface QuizQuestionRef {
  submit: () => void;
  continue: () => void;
  tryAgain: () => void;
}

// Helper to get option text
const getOptionText = (option: string | QuizOption): string => {
  return typeof option === 'string' ? option : option.text;
};

// Helper to get whyWrong message
const getWhyWrong = (option: string | QuizOption): string | undefined => {
  return typeof option === 'string' ? undefined : option.whyWrong;
};

export const QuizQuestion = forwardRef<QuizQuestionRef, QuizQuestionProps>(({ 
  question, 
  options, 
  correctAnswer, 
  explanation,
  onAnswer,
  onStateChange
}, ref) => {
  const isMultipleChoice = Array.isArray(correctAnswer);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const canSubmit = isMultipleChoice ? selectedAnswers.length > 0 : selectedAnswer !== null;

  const checkIsCorrect = (): boolean => {
    if (isMultipleChoice) {
      const correctAnswers = correctAnswer as number[];
      return selectedAnswers.length === correctAnswers.length && 
             selectedAnswers.every(ans => correctAnswers.includes(ans));
    }
    return selectedAnswer === correctAnswer;
  };

  useEffect(() => {
    const isCorrect = showResult ? checkIsCorrect() : false;
    onStateChange?.({ canSubmit, hasSubmitted: showResult, isCorrect });
  }, [canSubmit, showResult, selectedAnswer, selectedAnswers, onStateChange]);

  const handleSingleSelect = (index: number) => {
    if (!showResult) setSelectedAnswer(index);
  };

  const handleMultipleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswers(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSubmit = () => {
    if (isMultipleChoice) {
      if (selectedAnswers.length === 0) return;
      setShowResult(true);
    } else {
      if (selectedAnswer === null) return;
      setShowResult(true);
    }
  };

  const handleContinue = () => {
    const isCorrect = checkIsCorrect();
    onAnswer(isCorrect);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setShowResult(false);
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setShowResult(false);
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
    continue: handleContinue,
    tryAgain: handleTryAgain
  }));

  const checkIfCorrect = (index: number): boolean => {
    if (isMultipleChoice) {
      return (correctAnswer as number[]).includes(index);
    }
    return index === correctAnswer;
  };

  const isAnswerCorrect = (): boolean => {
    return checkIsCorrect();
  };

  // Get feedback for incorrect selections
  const getIncorrectFeedback = (): string[] => {
    const selected = isMultipleChoice ? selectedAnswers : (selectedAnswer !== null ? [selectedAnswer] : []);
    const feedback: string[] = [];
    
    selected.forEach(index => {
      const isCorrectOption = checkIfCorrect(index);
      if (!isCorrectOption) {
        const whyWrong = getWhyWrong(options[index]);
        if (whyWrong) {
          feedback.push(whyWrong);
        }
      }
    });
    
    return feedback;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = isMultipleChoice ? selectedAnswers.includes(index) : selectedAnswer === index;
          const isCorrectOption = checkIfCorrect(index);
          const optionText = getOptionText(option);
          
          return (
            <button
              key={index}
              onClick={() => isMultipleChoice ? handleMultipleSelect(index) : handleSingleSelect(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-[12px] border transition-all text-base ${
                isSelected
                  ? showResult
                    ? isCorrectOption
                      ? 'border-2 border-[#00A5FE] bg-[#E6FAFF]'
                      : 'border-2 border-destructive bg-destructive/10'
                    : 'border-2 border-[#00A5FE] bg-[#E6FAFF]'
                  : 'border border-[#D1D5DB] hover:border-[#00A5FE]/50 bg-white'
              } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[#0A1628]">{optionText}</span>
                {showResult && isSelected && (
                  isCorrectOption ? (
                    <CheckCircle2 className="h-5 w-5 text-[#00A5FE]" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg ${
          isAnswerCorrect() 
            ? 'bg-[#E6FAFF] border-2 border-[#00A5FE]' 
            : 'bg-destructive/10 border-2 border-destructive'
        }`}>
          <p className="font-medium mb-2 text-[#0A1628]">
            {isAnswerCorrect() ? '✓ Correct!' : 'Not quite right — here\'s why:'}
          </p>
          {isAnswerCorrect() ? (
            <p className="text-base text-[#52525B]">{explanation}</p>
          ) : (
            <div className="space-y-2">
              {getIncorrectFeedback().map((feedback, index) => (
                <p key={index} className="text-base text-[#52525B]">{feedback}</p>
              ))}
              {getIncorrectFeedback().length === 0 && (
                <p className="text-base text-[#52525B]">Look more carefully at the content and try again.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

QuizQuestion.displayName = 'QuizQuestion';
