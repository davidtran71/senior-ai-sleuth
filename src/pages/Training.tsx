import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizQuestion, QuizQuestionRef } from "@/components/QuizQuestion";
import { AlertTriangle, Search, Download, Check } from "lucide-react";
import { NavigationArrow } from "@/components/NavigationArrow";
import { CaseFileIcon } from "@/components/CaseFileIcon";
import { trainingSlides } from "@/data/trainingContent";
import { CareSideLogo } from "@/components/CareSideLogo";
import { DecorativeShapes } from "@/components/DecorativeShapes";
import { DecorativeTopCross } from "@/components/DecorativeTopCross";
import CheckIcon from "@/components/CheckIcon";
import robotArtist from "@/assets/robot-artist.png";
import robotGood from "@/assets/robot-good.png";
import robotBad from "@/assets/robot-bad.png";
import personGlasses from "@/assets/person-glasses.png";
import browserIllustration from "@/assets/browser-illustration.png";
import audioPlayerIllustration from "@/assets/audio-player-illustration.png";
import videoPlayerIllustration from "@/assets/video-player-illustration.png";

import trophyIllustration from "@/assets/trophy-illustration.png";
import certificateBadge from "@/assets/certificate-badge.png";
import { FileText as FileTextIcon, Image as ImageIcon, Mic, Video } from "lucide-react";
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
      <DecorativeShapes />
      <DecorativeTopCross />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* CareSide Logo - Top Left */}
        <div className="mb-8">
          <CareSideLogo />
        </div>
        
        {/* Header with Case Number */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handleBackToDashboard}>
              <NavigationArrow direction="left" className="mr-2" />
              Exit Training
            </Button>
            {slide.type !== 'intro' && currentSlide !== 1 && currentSlide !== 2 && currentSlide !== 11 && currentSlide !== 12 && <div className="flex items-center gap-[6px] bg-[#F6FEFC] px-3 py-1.5 rounded-[6px] border border-[#D3FAF0]">
                <CaseFileIcon className="h-5 w-5 text-[#002B60]" />
                <span className="font-sans font-semibold text-[18px] leading-[140%] text-[#002B60]">
                  {currentSlide === 3 || currentSlide === 4 ? 'Case 1 / 4' : currentSlide === 5 || currentSlide === 6 ? 'Case 2 / 4' : currentSlide === 7 || currentSlide === 8 ? 'Case 3 / 4' : currentSlide === 9 || currentSlide === 10 ? 'Case 4 / 4' : `Case ${currentSlide + 1} / ${totalSlides}`}
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
              <h2 className="text-[#0A1628] text-5xl font-bold leading-tight font-serif">
                {slide.title}
              </h2>
              
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
                  
                  <h2 className="text-[#0A1628] text-5xl font-bold leading-tight font-serif">
                    {slide.title}
                  </h2>
                  
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
              
              <h2 className="text-[#0A1628] text-5xl font-bold leading-tight font-serif">
                {slide.title}
              </h2>
              
              {slide.introduction && <p className="text-lg leading-relaxed text-[#52525B]">
                  {slide.introduction}
                </p>}

              {/* Two column cards */}
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                {/* The Good card */}
                <div className="bg-[#F0FDF4] p-6 rounded-2xl border-2 border-[#d1faf0]">
                  <div className="flex items-end justify-between mb-4">
                    <h3 className="text-[#0A1628] text-2xl font-bold font-serif">The Good</h3>
                    <img src={robotGood} alt="Friendly robot" className="w-16 h-auto" />
                  </div>
                  <ul className="space-y-3">
                    {slide.content?.split('THE BAD:')[0].replace('THE GOOD:', '').trim().split('|').map((item, index) => <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="flex-shrink-0 mt-0.5" />
                        <span className="text-[#52525B] text-base leading-relaxed">{item.trim()}</span>
                      </li>)}
                  </ul>
                </div>

                {/* The Bad card */}
                <div className="bg-[#FEF2F2] p-6 rounded-2xl border-2 border-[#DC2626]">
                  <div className="flex items-end justify-between mb-4">
                    <h3 className="text-[#0A1628] text-2xl font-bold font-serif">The Bad</h3>
                    <img src={robotBad} alt="Malfunctioning robot" className="w-16 h-auto" />
                  </div>
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
                  <h2 className="text-[#0A1628] text-5xl font-bold font-serif leading-tight">{slide.title}</h2>
                  {slide.introduction && <p className="text-[#52525B] text-lg leading-relaxed">{slide.introduction}</p>}
                </div>
                
                {/* Right column: illustration */}
                <div className="flex-shrink-0">
                  <img 
                    src={currentSlide === 3 ? browserIllustration : currentSlide === 7 ? audioPlayerIllustration : currentSlide === 9 ? videoPlayerIllustration : personGlasses} 
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

          {slide.type === 'quiz' && slide.quiz && <div className="space-y-6 bg-[#E6FAFF] p-8 rounded-2xl">
              {/* Header section */}
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 bg-[#F8EDD1] text-[#002B60] text-sm font-semibold tracking-wider uppercase px-5 py-2.5 rounded">
                  DEMONSTRATE YOUR SKILLS
                </span>
                <h2 className="text-[#0A1628] text-5xl font-bold font-serif leading-tight">{slide.title}</h2>
              </div>

              {/* Audio player - separate container above quiz */}
              {slide.quiz.audio && <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow-sm">
                  <p className="text-[#0A1628] font-semibold mb-3">Evidence Audio</p>
                  <audio controls className="w-full" src={slide.quiz.audio}>
                    Your browser does not support the audio element.
                  </audio>
                </div>}

              {/* Video player - separate container above quiz */}
              {slide.quiz.video && <div className="bg-[#FFFFFF] rounded-2xl shadow-sm overflow-hidden relative">
                  <span className="absolute top-3 left-3 bg-[#B5D2FF] text-[#0A1628] text-sm font-semibold px-3 py-1.5 rounded z-10">
                    Evidence Video
                  </span>
                  <video controls className="w-full" src={slide.quiz.video}>
                    Your browser does not support the video element.
                  </video>
                </div>}
              
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

                {/* Image media content */}
                {slide.quiz.image && <div className="mb-6 rounded-xl overflow-hidden border border-[#E5E7EB] relative">
                    <span className="absolute top-3 left-3 bg-[#B5D2FF] text-[#0A1628] text-sm font-semibold px-3 py-1.5 rounded z-10">
                      Evidence Image
                    </span>
                    <img src={slide.quiz.image} alt="Evidence for analysis" className="w-full" />
                  </div>}

                
                <QuizQuestion ref={quizRef} {...slide.quiz} onAnswer={handleQuizAnswer} onStateChange={handleQuizStateChange} />
              </div>
            </div>}

          {slide.type === 'tools' && <div className="space-y-8">
              {/* Header section */}
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 bg-[#CCEDFF] text-[#002B60] text-sm font-semibold tracking-wider uppercase px-5 py-2.5 rounded">
                  <Search className="h-4 w-4" />
                  DETECTION TOOLKIT
                </span>
                <h2 className="text-[#0A1628] text-5xl font-bold font-serif leading-tight">{slide.title}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {slide.tools && slide.tools.map((tool, index) => {
                  // Define background colors for each category
                  const bgColors: Record<string, string> = {
                    'For Text': '#E9FCF7',
                    'For Images': '#CCEDFF',
                    'For Audio': '#FBF6E8',
                    'For Videos': '#DAE9FF'
                  };
                  const bgColor = bgColors[tool.category] || '#DAE9FF';
                  
                  return (
                    <div 
                      key={index} 
                      className="p-6 rounded-2xl space-y-4"
                      style={{ backgroundColor: bgColor }}
                    >
                      <h3 className="text-[#0A1628] text-2xl font-bold font-serif">{tool.category}</h3>
                      <ul className="space-y-4">
                        {tool.examples.map((example, idx) => <li key={idx} className="flex items-start gap-3">
                            <CheckIcon className="flex-shrink-0 mt-0.5" />
                            <span className="text-[#52525B] text-base leading-relaxed">{example}</span>
                          </li>)}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>}

          {/* Digital Detective Recap Slide */}
          {slide.type === 'recap' && (
            <div className="space-y-8">
              {/* Header section */}
              <div className="text-center space-y-4">
                <span className="inline-block bg-[#CCEDFF] text-[#002B60] text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded">
                  TRAINING COMPLETE
                </span>
                <h2 className="text-[#0A1628] text-5xl font-bold font-serif leading-tight">{slide.title}</h2>
                {slide.introduction && (
                  <p className="text-[#52525B] text-lg leading-relaxed max-w-2xl mx-auto">{slide.introduction}</p>
                )}
              </div>

              {/* Key Detection Signs Recap */}
              {slide.tips && slide.tips.length > 0 && (
                <div className="bg-[#E6FAFF] p-8 rounded-2xl">
                  <h3 className="text-[#0A1628] text-xl font-bold font-serif mb-6">Key Detection Signs Recap</h3>
                  <ul className="space-y-4">
                    {slide.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="flex-shrink-0 mt-0.5" />
                        <span className="text-[#52525B] text-base leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Final Tips */}
              {slide.finalTips && slide.finalTips.length > 0 && (
                <div className="bg-[#F8EDD1] p-8 rounded-2xl">
                  <h3 className="text-[#0A1628] text-xl font-bold font-serif mb-6">Stay Safe Online</h3>
                  <ul className="space-y-4">
                    {slide.finalTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="flex-shrink-0 mt-0.5" />
                        <span className="text-[#52525B] text-base leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {slide.type === 'debrief' && currentSlide === totalSlides - 1 && (
            <div className="space-y-8">
              {/* Trophy and Title Section */}
              <div className="text-center space-y-4">
                <img 
                  src={trophyIllustration} 
                  alt="Trophy" 
                  className="w-48 h-auto mx-auto"
                />
                <span className="inline-block bg-[#F8EDD1] text-[#002B60] text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded">
                  MISSION COMPLETE
                </span>
                <h2 className="text-[#0A1628] font-serif">{slide.title}</h2>
                <p className="text-[#52525B]">You've completed your AI Forensics training</p>
              </div>

              {/* Continue Your Mission Card */}
              <div className="bg-[#E6FAFF] rounded-2xl p-6 space-y-4">
                <h3 className="text-[#0A1628] text-xl font-bold font-serif">Continue Your Mission</h3>
                <p className="text-[#52525B] text-sm leading-relaxed">
                  Your training is complete, but your mission continues. Stay vigilant and keep practicing these skills. Share what you've learned with family and friends to help protect them from digital threats.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-[#0A1628] text-sm">Review the training anytime to refresh your investigative skills</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-[#0A1628] text-sm">Practice spotting AI content during your daily online activities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-[#0A1628] text-sm">Recruit others by sharing these critical detection techniques</span>
                  </li>
                </ul>
              </div>

              {/* Official Certificate Section */}
              <div className="border-2 border-[#E5E7EB] rounded-2xl p-8 space-y-6 text-center">
                <span className="inline-block bg-[#CCEDFF] text-[#002B60] text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded">
                  OFFICIAL CERTIFICATE
                </span>
                
                <img 
                  src={certificateBadge} 
                  alt="Certificate Badge" 
                  className="w-32 h-auto mx-auto"
                />

                <div className="space-y-2">
                  <p className="text-[#52525B] text-sm">This official document certifies that this</p>
                  <h2 className="text-[#0A1628] text-4xl font-bold font-serif">Digital Detective</h2>
                  <p className="text-[#52525B] text-sm">has successfully completed the comprehensive</p>
                </div>

                <span className="inline-block bg-[#00BCD4] text-white text-sm font-semibold tracking-wider uppercase px-6 py-2 rounded">
                  AI FORENSICS TASKFORCE TRAINING
                </span>

                <p className="text-[#52525B] text-sm max-w-md mx-auto leading-relaxed">
                  and has demonstrated mastery in identifying AI-generated content including text, images, audio, and video to protect themselves and others from digital threats.
                </p>

                {/* Skills Grid */}
                <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
                  {[
                    { label: 'Text Analysis', icon: FileTextIcon },
                    { label: 'Image Detection', icon: ImageIcon },
                    { label: 'Audio Forensics', icon: Mic },
                    { label: 'Video Analysis', icon: Video }
                  ].map((skill, index) => (
                    <div key={index} className="bg-[#E6FAFF] rounded-xl p-4 space-y-2">
                      <div className="w-6 h-6 rounded-full bg-[#00BCD4] flex items-center justify-center mx-auto">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-[#0A1628] text-xs font-medium leading-tight">{skill.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[#0A1628] text-sm">
                  <span className="font-semibold">Date of Completion:</span> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <p className="text-[#00BCD4] text-xs font-semibold tracking-wider uppercase">
                  AI FORENSICS TASKFORCE • CERTIFIED INVESTIGATOR
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                <Button 
                  size="lg" 
                  onClick={handleComplete} 
                  className="gap-2 bg-[#0A1628] hover:bg-[#1a2840] text-white"
                >
                  <Download className="h-5 w-5" />
                  Download Badge
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleBackToDashboard} 
                  className="border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628]/5"
                >
                  Return to HQ
                </Button>
              </div>
            </div>
          )}

          {/* Navigation - Inside Card (hidden on final slide which has its own buttons) */}
          {currentSlide !== totalSlides - 1 && (
            <div className="flex justify-between items-center gap-4 pt-8 mt-8 border-t border-accent/20">
              <button 
                onClick={handlePrevious} 
                disabled={currentSlide === 0} 
                className="w-[190px] h-[60px] flex items-center justify-center gap-[10px] bg-white border-2 border-[#00D0FF] rounded-[39px] px-[30px] py-[13px] font-sans font-bold text-[24px] leading-[24px] text-[#0A1628] hover:bg-[#00D0FF]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <NavigationArrow direction="left" />
                Back
              </button>

              <button 
                onClick={handleNavButtonClick} 
                disabled={slide.type === 'quiz' && !quizState.canSubmit && !quizState.hasSubmitted} 
                className="h-[60px] flex items-center justify-center gap-[10px] bg-[#002B60] rounded-[39px] px-[30px] py-[13px] font-sans font-bold text-[24px] leading-[24px] text-white hover:bg-[#001a3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {slide.type === 'quiz' ? quizState.hasSubmitted ? quizState.isCorrect ? 'Next Case' : 'Try Again' : 'Submit Answer' : slide.type === 'intro' ? 'AI Briefing' : currentSlide === 1 ? 'AI Uses' : currentSlide === 2 ? 'Case 1: AI Text' : currentSlide === 3 || currentSlide === 5 || currentSlide === 7 || currentSlide === 9 || currentSlide === 11 ? 'Next' : 'Next Case'}
                  <NavigationArrow direction="right" />
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>;
};