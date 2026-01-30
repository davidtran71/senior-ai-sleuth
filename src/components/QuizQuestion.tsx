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
  // Track which answers have been confirmed correct (locked in)
  const [lockedCorrectAnswers, setLockedCorrectAnswers] = useState<number[]>([]);

  // For multi-select: user can submit if they have new selections beyond locked ones
  const hasNewSelections = isMultipleChoice 
    ? selectedAnswers.some(ans => !lockedCorrectAnswers.includes(ans))
    : selectedAnswer !== null;
  const canSubmit = isMultipleChoice 
    ? (selectedAnswers.length > 0 && hasNewSelections) 
    : selectedAnswer !== null;

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
    // Don't allow toggling locked correct answers
    if (lockedCorrectAnswers.includes(index)) return;
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
      
      // Lock in the correct selections
      const correctAnswers = correctAnswer as number[];
      const newlyCorrect = selectedAnswers.filter(ans => correctAnswers.includes(ans));
      setLockedCorrectAnswers(prev => {
        const combined = [...prev, ...newlyCorrect];
        return [...new Set(combined)]; // Remove duplicates
      });
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
    setLockedCorrectAnswers([]);
    setShowResult(false);
  };

  const handleTryAgain = () => {
    // Keep locked correct answers selected, only clear incorrect ones
    if (isMultipleChoice) {
      const correctAnswers = correctAnswer as number[];
      // Keep only the selections that were correct
      const correctSelections = selectedAnswers.filter(ans => correctAnswers.includes(ans));
      setSelectedAnswers(correctSelections);
    } else {
      setSelectedAnswer(null);
    }
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

  // Count how many correct answers the user has locked in
  const correctAnswersArray = isMultipleChoice ? (correctAnswer as number[]) : [];
  const totalCorrectNeeded = correctAnswersArray.length;
  const correctFoundCount = lockedCorrectAnswers.length;

  return (
    <div className="space-y-4">
      {/* Progress indicator for multi-select */}
      {isMultipleChoice && lockedCorrectAnswers.length > 0 && !isAnswerCorrect() && (
        <div className="bg-[#E6FAFF] border border-[#00A5FE]/30 rounded-lg p-3">
          <p className="text-sm text-[#0A1628]">
            <span className="font-semibold text-[#439F6E]">{correctFoundCount}</span> of{' '}
            <span className="font-semibold">{totalCorrectNeeded}</span> correct answers found. 
            Keep going!
          </p>
        </div>
      )}

      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = isMultipleChoice ? selectedAnswers.includes(index) : selectedAnswer === index;
          const isCorrectOption = checkIfCorrect(index);
          const isLocked = lockedCorrectAnswers.includes(index);
          const optionText = getOptionText(option);
          
          // Determine the styling
          let buttonClasses = 'w-full p-4 text-left rounded-[12px] border transition-all text-base ';
          
          if (isLocked) {
            // Locked correct answer - always show green, not clickable
            buttonClasses += 'border-2 border-[#439F6E] bg-[#439F6E1A] cursor-default';
          } else if (isSelected) {
            if (showResult) {
              if (isCorrectOption) {
                buttonClasses += 'border-2 border-[#439F6E] bg-[#439F6E1A] cursor-not-allowed';
              } else {
                buttonClasses += 'border-2 border-destructive bg-destructive/10 cursor-not-allowed';
              }
            } else {
              buttonClasses += 'border-2 border-[#00A5FE] bg-[#E6FAFF] cursor-pointer';
            }
          } else {
            if (showResult) {
              buttonClasses += 'border border-[#A7A7A7] bg-white cursor-not-allowed';
            } else {
              buttonClasses += 'border border-[#A7A7A7] hover:border-[#00A5FE]/50 bg-white cursor-pointer';
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => isMultipleChoice ? handleMultipleSelect(index) : handleSingleSelect(index)}
              disabled={showResult || isLocked}
              className={buttonClasses}
            >
              <div className="flex items-center justify-between">
                <span className="text-[#0A1628]">{optionText}</span>
                <div className="flex items-center gap-2">
                  {isLocked && (
                    <CheckCircle2 className="h-5 w-5 text-[#439F6E]" />
                  )}
                  {showResult && isSelected && !isCorrectOption && !isLocked && (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg ${
          isAnswerCorrect() 
            ? 'bg-[#439F6E1A] border-2 border-[#439F6E]' 
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
                <p className="text-base text-[#52525B]">
                  {isMultipleChoice && lockedCorrectAnswers.length > 0 
                    ? `You've found ${lockedCorrectAnswers.length} correct answer${lockedCorrectAnswers.length > 1 ? 's' : ''}. Look more carefully to find the remaining ones.`
                    : 'Look more carefully at the content and try again.'}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

QuizQuestion.displayName = 'QuizQuestion';
