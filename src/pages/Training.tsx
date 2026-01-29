import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizQuestion, QuizQuestionRef } from "@/components/QuizQuestion";
import { ArrowLeft, ArrowRight, Award, FileText, AlertTriangle, Search } from "lucide-react";
import { trainingSlides } from "@/data/trainingContent";
import { CareSideLogo } from "@/components/CareSideLogo";
import { DecorativeShapes } from "@/components/DecorativeShapes";
import CheckIcon from "@/components/CheckIcon";
import robotArtist from "@/assets/robot-artist.png";
import robotGood from "@/assets/robot-good.png";
import robotBad from "@/assets/robot-bad.png";
import personGlasses from "@/assets/person-glasses.png";
import browserIllustration from "@/assets/browser-illustration.png";
export const Training = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [quizState, setQuizState] = useState({
    canSubmit: false,
    hasSubmitted: false,
    isCorrect: false
  });
  const quizRef = useRef<QuizQuestionRef>(null);
  const slide = trainingSlides[currentSlide];
  const totalSlides = trainingSlides.length;
  const progress = (currentSlide + 1) / totalSlides * 100;
  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
      setQuizState({
        canSubmit: false,
        hasSubmitted: false,
        isCorrect: false
      });
      window.scrollTo(0, 0);
    }
  };
  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setQuizState({
        canSubmit: false,
        hasSubmitted: false,
        isCorrect: false
      });
      window.scrollTo(0, 0);
    }
  };
  const handleQuizAnswer = (correct: boolean) => {
    setQuizAnswers(prev => ({
      ...prev,
      [currentSlide]: correct
    }));
  };
  const handleQuizStateChange = useCallback((state: {
    canSubmit: boolean;
    hasSubmitted: boolean;
    isCorrect: boolean;
  }) => {
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
  return <div className="min-h-screen bg-background py-8 px-6 relative overflow-hidden">
      {/* Decorative shapes - show on all slides except intro (first slide) */}
      {currentSlide > 0 && <DecorativeShapes />}
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* CareSide Logo - Top Left */}
        <div className="mb-8">
          <CareSideLogo />
        </div>
        
        {/* Header with Case Number */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handleBackToDashboard}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              Exit Training
            </Button>
            {slide.type !== 'intro' && currentSlide !== 1 && currentSlide !== 2 && currentSlide !== 11 && currentSlide !== 12 && currentSlide !== 13 && <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg border border-accent/20">
                <FileText className="h-5 w-5 text-accent" />
                <span className="text-lg font-bold tracking-wider">
                  {currentSlide === 3 || currentSlide === 4 ? 'CASE #1/4' : currentSlide === 5 || currentSlide === 6 ? 'CASE #2/4' : currentSlide === 7 || currentSlide === 8 ? 'CASE #3/4' : currentSlide === 9 || currentSlide === 10 ? 'CASE #4/4' : `CASE #${String(currentSlide + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`}
                </span>
              </div>}
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="flex justify-end mb-1">
              <span className="text-sm text-[#52525B]">{Math.round(progress)}% Investigation Complete</span>
            </div>
            <div className="h-2 bg-[#C5C0DB] rounded-full overflow-hidden">
              <div className="h-full bg-[#00A5FE] rounded-full transition-all duration-500" style={{
              width: `${progress}%`
            }} />
            </div>
          </div>
        </div>

        {/* Slide Content */}
        <Card className={`p-8 shadow-dramatic mb-6 animate-fade-in ${slide.type === 'intro' ? 'border-2 border-[#00BCD4]/30 rounded-2xl' : 'case-file-border'}`}>
          {slide.type === 'intro' && <div className="space-y-6 font-sans text-center">
              {/* Seniors with Tablet Illustration - Top */}
              <div className="flex justify-center">
                <img src="/src/assets/seniors-tablet.png" alt="Seniors learning on a tablet" className="max-w-[300px] lg:max-w-[380px] h-auto" />
              </div>
              
              {/* Eyebrow badge */}
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 bg-[#CCEDFF] text-black text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full">
                  <AlertTriangle className="h-4 w-4" />
                  ATTENTION RECRUIT
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-[#0A1628] text-3xl lg:text-4xl font-bold leading-tight font-serif">
                {slide.title}
              </h1>
              
              {/* Body text */}
              <p className="text-lg leading-relaxed text-[#52525B] max-w-2xl mx-auto">
                {slide.content}
              </p>
            </div>}

          {/* What is AI slide - special layout */}
          {slide.type === 'lesson' && currentSlide === 1 && <div className="space-y-8">
              {/* Top section: two columns */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left column: text content */}
                <div className="flex-1 space-y-4">
                  {/* Eyebrow badge */}
                  <span className="inline-flex items-center gap-2 bg-[#CCEDFF] text-[#002B60] text-sm font-semibold tracking-wider uppercase px-5 py-2.5 rounded">
                    <Search className="h-4 w-4" />
                    EVIDENCE BRIEFING
                  </span>
                  
                  <h1 className="text-[#0A1628] text-3xl lg:text-4xl font-bold leading-tight font-serif">
                    {slide.title}
                  </h1>
                  
                  {slide.introduction && <p className="text-lg leading-relaxed text-[#52525B]">
                      {slide.introduction}
                    </p>}
                </div>
                
                {/* Right column: robot image */}
                <div className="flex-shrink-0">
                  <img src={robotArtist} alt="Friendly AI robot" className="w-48 md:w-64 lg:w-72 h-auto" />
                </div>
              </div>
              
              {/* About AI section */}
              {slide.tips && slide.tips.length > 0 && <div className="bg-[#F6FEFC] p-8 rounded-2xl">
                  <h3 className="text-[#0A1628] text-xl font-bold font-serif mb-6">About AI</h3>
                  <ul className="space-y-4">
                    {slide.tips.map((tip, index) => <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="flex-shrink-0 mt-0.5" />
                        <span className="text-[#52525B] text-base leading-relaxed">{tip}</span>
                      </li>)}
                  </ul>
                </div>}
            </div>}

          {/* The Good and The Bad of AI slide - special layout */}
          {slide.type === 'lesson' && currentSlide === 2 && <div className="space-y-6">
              {/* Eyebrow badge */}
              <span className="inline-flex items-center gap-2 bg-[#CCEDFF] text-[#002B60] text-sm font-semibold tracking-wider uppercase px-5 py-2.5 rounded">
                <Search className="h-4 w-4" />
                EVIDENCE BRIEFING
              </span>
              
              <h1 className="text-[#0A1628] text-3xl lg:text-4xl font-bold leading-tight font-serif">
                {slide.title}
              </h1>
              
              {slide.introduction && <p className="text-lg leading-relaxed text-[#52525B]">
                  {slide.introduction}
                </p>}

              {/* Two column cards */}
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                {/* The Good card */}
                <div className="bg-[#F0FDF4] p-6 rounded-2xl border-2 border-[#d1faf0]">
                  <div className="flex justify-end mb-2">
                    <img src={robotGood} alt="Friendly robot" className="w-20 h-auto" />
                  </div>
                  <h3 className="text-[#0A1628] text-2xl font-bold font-serif mb-4">The Good</h3>
                  <ul className="space-y-3">
                    {slide.content?.split('THE BAD:')[0].replace('THE GOOD:', '').trim().split('|').map((item, index) => <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="flex-shrink-0 mt-0.5" />
                        <span className="text-[#52525B] text-base leading-relaxed">{item.trim()}</span>
                      </li>)}
                  </ul>
                </div>

                {/* The Bad card */}
                <div className="bg-[#FEF2F2] p-6 rounded-2xl border-2 border-[#DC2626]">
                  <div className="flex justify-end mb-2">
                    <img src={robotBad} alt="Malfunctioning robot" className="w-20 h-auto" />
                  </div>
                  <h3 className="text-[#0A1628] text-2xl font-bold font-serif mb-4">The Bad</h3>
                  <ul className="space-y-3">
                    {slide.content?.split('THE BAD:')[1]?.trim().split('|').map((item, index) => <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#DC2626] flex items-center justify-center mt-0.5">
                          <span className="text-white text-xs font-bold">✕</span>
                        </span>
                        <span className="text-[#52525B] text-base leading-relaxed">{item.trim()}</span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>}

          {/* Regular lesson slides */}
          {slide.type === 'lesson' && currentSlide !== 1 && currentSlide !== 2 && <div className="space-y-8">
              {/* Header section with two columns */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Left column: text content */}
                <div className="flex-1 space-y-4">
                  <span className="inline-flex items-center gap-2 bg-[#CCEDFF] text-[#002B60] text-sm font-semibold tracking-wider uppercase px-5 py-2.5 rounded">
                    <Search className="h-4 w-4" />
                    EVIDENCE BRIEFING
                  </span>
                  <h2 className="text-[#0A1628] text-3xl lg:text-4xl font-bold font-serif leading-tight">{slide.title}</h2>
                  {slide.introduction && <p className="text-[#52525B] text-lg leading-relaxed">{slide.introduction}</p>}
                </div>
                
                {/* Right column: illustration */}
                <div className="flex-shrink-0">
                  <img 
                    src={currentSlide === 3 ? browserIllustration : personGlasses} 
                    alt="Lesson illustration" 
                    className="w-40 md:w-52 lg:w-60 h-auto" 
                  />
                </div>
              </div>

              {/* Key Detection Signs card */}
              {slide.tips && slide.tips.length > 0 && <div className="bg-[#E6FAFF] p-8 rounded-2xl">
                  <h3 className="text-[#0A1628] text-xl font-bold font-serif mb-6">Key Detection Signs</h3>
                  <ul className="space-y-4">
                    {slide.tips.map((tip, index) => <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="flex-shrink-0 mt-0.5" />
                        <span className="text-[#52525B] text-base leading-relaxed">{tip}</span>
                      </li>)}
                  </ul>
                </div>}

              {/* Content section */}
              {slide.content && <div className="bg-[#F0F9FF] p-8 rounded-2xl">
                  <p className="text-[#52525B] text-lg leading-relaxed">{slide.content}</p>
                </div>}
            </div>}

          {slide.type === 'quiz' && slide.quiz && <div className="space-y-6">
              {/* Header section */}
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 bg-[#F8EDD1] text-[#002B60] text-sm font-semibold tracking-wider uppercase px-5 py-2.5 rounded">
                  DEMONSTRATE YOUR SKILLS
                </span>
                <h2 className="text-[#0A1628] text-3xl lg:text-4xl font-bold font-serif leading-tight">{slide.title}</h2>
              </div>
              
              {/* Quiz card */}
              <div className="bg-[#FFFFFF] p-8 rounded-2xl shadow-sm">
                {/* Question */}
                <div className="mb-6">
                  <p className="text-base">
                    <span className="text-[#00A5FE] font-semibold">Question: </span>
                    <span className="text-[#0A1628] font-semibold">{slide.quiz.question}</span>
                  </p>
                  {slide.quiz.correctAnswer && Array.isArray(slide.quiz.correctAnswer) && (
                    <p className="text-sm text-[#52525B] mt-2">
                      Select all that apply ({(slide.quiz.correctAnswer as number[]).length} correct answers)
                    </p>
                  )}
                </div>

                {/* Media content */}
                {slide.quiz.image && <div className="mb-6 rounded-xl overflow-hidden border border-[#E5E7EB]">
                    <img src={slide.quiz.image} alt="Evidence for analysis" className="w-full" />
                  </div>}

                {slide.quiz.audio && <div className="mb-6 bg-[#F9FAFB] p-4 rounded-xl border border-[#E5E7EB]">
                    <audio controls className="w-full" src={slide.quiz.audio}>
                      Your browser does not support the audio element.
                    </audio>
                  </div>}

                {slide.quiz.video && <div className="mb-6 rounded-xl overflow-hidden border border-[#E5E7EB]">
                    <video controls className="w-full" src={slide.quiz.video}>
                      Your browser does not support the video element.
                    </video>
                  </div>}
                
                <QuizQuestion ref={quizRef} {...slide.quiz} onAnswer={handleQuizAnswer} onStateChange={handleQuizStateChange} />
              </div>
            </div>}

          {slide.type === 'tools' && <div className="space-y-8">
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
                {slide.tools && slide.tools.map((tool, index) => <div key={index} className="bg-gradient-case-file p-6 rounded-lg border-2 border-accent/20 hover:border-accent/40 transition-all space-y-4">
                    <h3 className="text-xl font-bold text-accent border-b border-accent/30 pb-3">{tool.category}</h3>
                    <ul className="space-y-3">
                      {tool.examples.map((example, idx) => <li key={idx} className="flex items-start gap-3">
                          <CheckIcon className="flex-shrink-0 mt-0.5" />
                          <span className="text-base leading-relaxed">{example}</span>
                        </li>)}
                    </ul>
                  </div>)}
              </div>
            </div>}

          {slide.type === 'debrief' && <div className="space-y-8">
              <div className="text-center space-y-6 mb-8">
                <div className="inline-block p-6 bg-gradient-badge rounded-full shadow-badge badge-shine animate-scale-in">
                  <Award className="h-20 w-20 text-secondary-foreground" />
                </div>
                <h1 className="text-glow-badge">{slide.title}</h1>
                <p className="text-xl leading-relaxed max-w-3xl mx-auto">{slide.content}</p>
              </div>

              {slide.tips && slide.tips.length > 0 && <div className="space-y-4 mb-8">
                  <div className="text-center mb-6">
                    <h3 className="text-accent font-bold tracking-wider">KEY DETECTION SIGNS RECAP</h3>
                    <div className="h-1 w-32 mx-auto mt-2 bg-gradient-to-r from-transparent via-accent to-transparent" />
                  </div>
                  {slide.tips.map((tip, index) => <div key={index} className="bg-gradient-evidence/10 p-4 rounded-lg border-2 border-accent/30 hover:border-accent/50 transition-all">
                      <p className="text-base leading-relaxed">{tip}</p>
                    </div>)}
                </div>}

              {slide.finalTips && <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-accent font-bold tracking-wider">FINAL PROTOCOLS</h3>
                    <div className="h-1 w-32 mx-auto mt-2 bg-gradient-to-r from-transparent via-accent to-transparent" />
                  </div>
                  {slide.finalTips.map((tip, index) => <div key={index} className="bg-gradient-evidence/10 p-6 rounded-lg border-2 border-accent/30 hover:border-accent/50 transition-all hover:shadow-evidence">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-badge rounded-full flex items-center justify-center font-black text-secondary-foreground shadow-badge">
                          {index + 1}
                        </div>
                        <p className="text-lg font-semibold leading-relaxed">{tip}</p>
                      </div>
                    </div>)}
                </div>}

              {currentSlide === totalSlides - 1 && <div className="flex justify-center pt-6">
                  <Button size="lg" onClick={handleComplete} className="gap-2 bg-gradient-badge text-secondary-foreground hover:shadow-badge transition-all badge-shine">
                    Claim Your Badge
                    <Award className="h-5 w-5" />
                  </Button>
                </div>}
            </div>}

          {/* Navigation - Inside Card */}
          <div className="flex justify-between items-center gap-4 pt-8 mt-8 border-t border-accent/20">
            <Button variant="outline" onClick={handlePrevious} disabled={currentSlide === 0} size="lg" className="hover:shadow-card transition-shadow">
              <ArrowLeft className="mr-2 h-5 w-5" />
              {currentSlide === 0 || currentSlide === 1 || currentSlide === 2 || currentSlide === 3 || currentSlide === 4 || currentSlide === 6 || currentSlide === 12 || currentSlide === 13 ? 'Back' : 'Previous Case'}
            </Button>

            {currentSlide !== totalSlides - 1 && <Button size="lg" onClick={handleNavButtonClick} disabled={slide.type === 'quiz' && !quizState.canSubmit && !quizState.hasSubmitted} className="hover:shadow-dramatic transition-all">
                {slide.type === 'quiz' ? quizState.hasSubmitted ? quizState.isCorrect ? 'Next Case' : 'Try Again' : 'Submit Answer' : slide.type === 'intro' ? 'AI Briefing' : currentSlide === 1 ? 'AI Uses' : currentSlide === 2 ? 'Case 1: AI Text' : currentSlide === 3 || currentSlide === 5 || currentSlide === 7 || currentSlide === 9 || currentSlide === 11 ? 'Next' : currentSlide === 12 ? 'Claim Your Badge!' : 'Next Case'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>}
          </div>
        </Card>
      </div>
    </div>;
};