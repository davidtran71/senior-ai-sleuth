import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import seniorDetectiveMagnifying from "@/assets/senior-detective-magnifying.png";
import seniorsTabletImage from "@/assets/seniors-tablet.png";
import { FileText as FileTextIcon, Image as ImageIcon, Mic, Video } from "lucide-react";

// Animation variants for slide transitions
const slideVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
};

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
  const certificateRef = useRef<HTMLDivElement>(null);
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
  const handleDownloadBadge = async () => {
    if (!certificateRef.current) return;
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = 'digital-detective-certificate.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate certificate image:', error);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('ai-forensics-completed', 'true');
    navigate('/certificate');
  };
  const handleBackToDashboard = () => {
    navigate('/');
  };
  return <div className="min-h-screen bg-background py-8 px-3 sm:px-6 relative overflow-hidden">
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
            <div className="h-2 bg-[#C5C0DB] rounded-full overflow-hidden">
              <div className="h-full bg-[#00A5FE] rounded-full transition-all duration-500" style={{
              width: `${progress}%`
            }} />
            </div>
            <div className="flex justify-end mt-2">
              <span className="font-sans font-normal text-[16px] leading-[140%] text-[#52525B]">{Math.round(progress)}% Investigation Complete</span>
            </div>
          </div>
        </div>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Card className={`p-4 sm:p-8 shadow-dramatic mb-6 ${slide.type === 'intro' ? 'border-2 border-[#00BCD4]/30 rounded-2xl' : 'case-file-border'}`}>
              {slide.type === 'intro' && (
                <motion.div 
                  className="space-y-6 font-sans text-center"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Seniors with Tablet Illustration - Top */}
                  <motion.div variants={staggerItem} className="flex justify-center">
                    <img src={seniorsTabletImage} alt="Seniors learning on a tablet" className="max-w-[300px] lg:max-w-[380px] h-auto" />
                  </motion.div>
                  
                  {/* Eyebrow badge */}
                  <motion.div variants={staggerItem} className="flex justify-center">
                    <span className="inline-flex items-center gap-2 bg-[#CCEDFF] text-black text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full">
                      <AlertTriangle className="h-4 w-4" />
                      ATTENTION RECRUIT
                    </span>
                  </motion.div>
                  
                  {/* Title */}
                  <motion.div variants={staggerItem}>
                    <h2 className="text-[#0A1628] text-5xl font-bold leading-tight font-serif">
                      {slide.title}
                    </h2>
                  </motion.div>
                  
                  {/* Body text */}
                  <motion.div variants={staggerItem}>
                    <p className="text-lg leading-relaxed text-[#000000] max-w-2xl mx-auto">
                      {slide.content}
                    </p>
                  </motion.div>
                </motion.div>
              )}

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
                  
                  {slide.introduction && <p className="text-lg leading-relaxed text-[#000000]">
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
                        <span className="text-[#000000] text-base leading-relaxed">{tip}</span>
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
              
              {slide.introduction && <p className="text-lg leading-relaxed text-[#000000]">
                  {slide.introduction}
                </p>}

              {/* Two column cards */}
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                {/* The Good card */}
                <div className="bg-[#F0FDF4] p-6 rounded-2xl border-2 border-[#d1faf0]">
                  <div className="flex items-end justify-between mb-4">
                    <h3 className="text-[#0A1628] text-2xl font-bold font-serif">The Good</h3>
                    <img src={robotGood} alt="Friendly robot" className="w-20 h-20 object-contain" />
                  </div>
                  <ul className="space-y-3">
                    {slide.content?.split('THE BAD:')[0].replace('THE GOOD:', '').trim().split('|').map((item, index) => <li key={index} className="flex items-start gap-3">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-1">
                          <path d="M13.3332 7L5.99984 14.3333L2.6665 11" stroke="#00D0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-[#000000] text-base leading-relaxed">{item.trim()}</span>
                      </li>)}
                  </ul>
                </div>

                {/* The Bad card */}
                <div className="bg-[#FEF2F2] p-6 rounded-2xl border-2 border-[#DC2626]">
                  <div className="flex items-end justify-between mb-4">
                    <h3 className="text-[#0A1628] text-2xl font-bold font-serif">The Bad</h3>
                    <img src={robotBad} alt="Malfunctioning robot" className="w-20 h-20 object-contain" />
                  </div>
                  <ul className="space-y-3">
                    {slide.content?.split('THE BAD:')[1]?.trim().split('|').map((item, index) => <li key={index} className="flex items-start gap-3">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
                          <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#D70000" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.25 6.75L6.75 11.25" stroke="#D70000" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6.75 6.75L11.25 11.25" stroke="#D70000" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-[#000000] text-base leading-relaxed">{item.trim()}</span>
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
                  {slide.introduction && <p className="text-[#000000] text-lg leading-relaxed">{slide.introduction}</p>}
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
                  <h3 className="font-sans font-bold text-[24px] leading-[120%] text-[#000000] mb-6">Key Detection Signs</h3>
                  <ul className="space-y-4">
                    {slide.tips.map((tip, index) => <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="flex-shrink-0 mt-0.5" />
                        <span className="text-[#000000] text-base leading-relaxed">{tip}</span>
                      </li>)}
                  </ul>
                </div>}

              {/* Content section */}
              {slide.content && <div className="bg-[#F0F9FF] p-8 rounded-2xl">
                  <p className="text-[#000000] text-lg leading-relaxed">{slide.content}</p>
                </div>}
            </div>}

          {slide.type === 'quiz' && slide.quiz && <div className="space-y-6 bg-[#E6FAFF] p-4 sm:p-8 rounded-2xl">
              {/* Header section */}
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 bg-[#F8EDD1] text-[#002B60] text-sm font-semibold tracking-wider uppercase px-5 py-2.5 rounded">
                  DEMONSTRATE YOUR SKILLS
                </span>
                <h2 className="text-[#0A1628] text-5xl font-bold font-serif leading-tight">{slide.title}</h2>
              </div>

              {/* Image media content - separate container above quiz */}
              {slide.quiz.image && <div className="rounded-2xl overflow-hidden relative">
                  <span className="absolute top-3 left-3 bg-[#0A1628] text-white text-sm font-semibold px-3 py-1.5 rounded z-10">
                    Evidence Image
                  </span>
                  <img src={slide.quiz.image} alt="Evidence for analysis" className="w-full rounded-2xl" />
                </div>}

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
              
              {/* Quiz card - Question and answers */}
              <div className="bg-[#FFFFFF] p-3 sm:p-8 rounded-2xl shadow-sm">
                {/* Question */}
                <div className="mb-6">
                  <p className="text-base">
                    <span className="text-[#00A5FE] font-semibold">Question: </span>
                    <span className="text-[#0A1628] font-semibold">{slide.quiz.question}</span>
                  </p>
                  {slide.quiz.correctAnswer && Array.isArray(slide.quiz.correctAnswer) && (
                    <p className="text-sm text-[#657694] mt-2">
                      Select all that apply ({(slide.quiz.correctAnswer as number[]).length} correct answers)
                    </p>
                  )}
                </div>

                
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
                            <span className="text-[#000000] text-base leading-relaxed">{example}</span>
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
              {/* Hero Image */}
              <div className="flex justify-center">
                <img 
                  src={seniorDetectiveMagnifying} 
                  alt="Digital Detective with magnifying glass" 
                  className="max-w-[320px] h-auto"
                />
              </div>

              {/* Header section */}
              <div className="text-center space-y-4">
                <h2 className="text-[#0A1628] text-5xl font-bold font-serif leading-tight">{slide.title}</h2>
                <p className="text-[#000000] text-lg leading-relaxed max-w-xl mx-auto">
                  You've learned how to spot AI-generated text, images, audio, and video. Remember these final tips to stay safe online:
                </p>
              </div>

              {/* Key Detection Signs Recap - 2x2 Grid */}
              <div className="bg-[#E6FAFF] p-8 rounded-2xl">
                <h3 className="font-sans font-bold text-[24px] leading-[120%] text-[#000000] mb-6">Key Detection Signs Recap</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* AI Text */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileTextIcon className="w-5 h-5 text-[#0A1628]" />
                      <span className="font-sans font-bold text-[16px] text-[#0A1628]">AI text</span>
                    </div>
                    <p className="text-[#000000] text-base leading-relaxed">
                      Look for generic language, urgency tactics, unusual sender addresses, and requests for personal information
                    </p>
                  </div>
                  
                  {/* AI Images */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-[#0A1628]" />
                      <span className="font-sans font-bold text-[16px] text-[#0A1628]">AI Images</span>
                    </div>
                    <p className="text-[#000000] text-base leading-relaxed">
                      Check hands, eyes, text, backgrounds, and symmetry for distortions and inconsistencies
                    </p>
                  </div>
                  
                  {/* AI Audio */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mic className="w-5 h-5 text-[#0A1628]" />
                      <span className="font-sans font-bold text-[16px] text-[#0A1628]">AI Audio</span>
                    </div>
                    <p className="text-[#000000] text-base leading-relaxed">
                      Listen for robotic tone, unnatural pauses, lack of emotion, and breathing patterns
                    </p>
                  </div>
                  
                  {/* AI Videos */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Video className="w-5 h-5 text-[#0A1628]" />
                      <span className="font-sans font-bold text-[16px] text-[#0A1628]">AI Videos</span>
                    </div>
                    <p className="text-[#000000] text-base leading-relaxed">
                      Watch for facial movement mismatches, lighting inconsistencies, lip-sync issues, and unnatural blinking
                    </p>
                  </div>
                </div>
              </div>

              {/* Final Protocols - 3x2 Grid */}
              <div className="space-y-6">
                <h3 className="font-sans font-bold text-[24px] leading-[120%] text-[#000000] text-center">Final Protocols</h3>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { num: '1', text: 'Slow down and examine content carefully before believing or sharing' },
                    { num: '2', text: 'Verify information from multiple trusted sources' },
                    { num: '3', text: 'When in doubt, ask a trusted family member or friend' },
                    { num: '4', text: 'Never share personal information or send money based on urgent requests' },
                    { num: '5', text: 'Trust your instincts—if something feels off, it probably is' },
                    { num: '6', text: 'Think before you share to avoid spreading misinformation' },
                  ].map((item, index) => (
                    <div key={index} className="text-left bg-[#F6FEFC] rounded-2xl p-6">
                      <span className="text-[#00D0FF] text-[110px] font-bold font-serif block mb-2 leading-none">
                        {item.num}
                      </span>
                      <p className="font-sans font-normal text-[18px] leading-[100%] text-[#0A1628]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
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
                <span className="inline-flex items-center justify-center h-[32px] bg-[#CCEDFF] rounded-[4px] px-[16px] py-[2px] gap-[6px] font-sans font-bold text-[16px] leading-[20px] tracking-[1.2px] uppercase text-[#002B60]">
                  MISSION COMPLETE
                </span>
                <h2 className="text-[#0A1628] font-serif">{slide.title}</h2>
                <p className="text-[#000000]">You've completed your AI Forensics training</p>
              </div>

              {/* Continue Your Mission Card */}
              <div className="bg-[#E6FAFF] rounded-2xl p-6 space-y-4">
                <h3 className="text-[#0A1628] text-xl font-bold font-serif">Continue Your Mission</h3>
                <p className="text-[#000000] text-sm leading-relaxed">
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
              <div ref={certificateRef} className="border-2 border-[#E5E7EB] rounded-2xl p-8 space-y-6 text-center bg-white">
                <span className="inline-block bg-[#CCEDFF] text-[#002B60] text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded">
                  OFFICIAL CERTIFICATE
                </span>
                
                <img 
                  src={certificateBadge} 
                  alt="Certificate Badge" 
                  className="w-32 h-auto mx-auto"
                />

                <div className="space-y-4">
                  <p className="text-[#000000] text-lg max-w-none mb-0">This official document certifies that this</p>
                  <h2 className="text-[#0A1628] text-[64px] font-bold font-serif leading-none my-4">Digital Detective</h2>
                  <p className="text-[#000000] text-lg max-w-none mt-0">has successfully completed the comprehensive</p>
                </div>

                <span className="inline-flex items-center justify-center bg-[#80D2FE] text-[#000000] font-franklin font-bold text-2xl px-[10px] py-[10px] rounded-lg" style={{ width: '530px', height: '65px', lineHeight: '120%' }}>
                  AI FORENSICS TASKFORCE TRAINING
                </span>

                <p className="text-[#000000] text-lg max-w-xl mx-auto leading-relaxed">
                  and has demonstrated mastery in identifying AI-generated content including text, images, audio, and video to protect themselves and others from digital threats.
                </p>

                {/* Skills Grid */}
                <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
                  {[
                    { label: 'Text Analysis', icon: FileTextIcon },
                    { label: 'Image Detection', icon: ImageIcon },
                    { label: 'Audio Forensics', icon: Mic },
                    { label: 'Video Analysis', icon: Video }
                  ].map((skill, index) => (
                    <div key={index} className="bg-[#E9FCF7] rounded-xl p-4 space-y-2 text-center">
                      <img 
                        src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z' fill='%2300A5FE'/%3E%3Cpath d='M16 10L10.5 15L8 12.7273' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
                        alt="Completed"
                        width="24"
                        height="24"
                        className="mx-auto"
                      />
                      <p className="text-[#0A1628] text-xs font-medium leading-tight text-center">{skill.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[#0A1628] text-lg max-w-none">
                  <span className="font-semibold">Date of Completion:</span> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <p className="text-[#8095AF] text-lg font-franklin font-bold max-w-none" style={{ lineHeight: '120%' }}>
                  AI FORENSICS TASKFORCE • CERTIFIED INVESTIGATOR
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                <Button 
                  size="lg" 
                  onClick={handleDownloadBadge} 
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
            <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-8 mt-8 border-t border-accent/20">
              <button 
                onClick={handlePrevious} 
                disabled={currentSlide === 0} 
                className="w-full sm:w-[190px] h-[60px] flex items-center justify-center gap-[10px] bg-white border-2 border-[#00D0FF] rounded-[39px] px-[30px] py-[13px] font-sans font-bold text-[24px] leading-[24px] text-[#0A1628] hover:bg-[#00D0FF]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <NavigationArrow direction="left" />
                Back
              </button>

              <button 
                onClick={handleNavButtonClick} 
                disabled={slide.type === 'quiz' && !quizState.canSubmit && !quizState.hasSubmitted} 
                className="w-full sm:w-auto h-[60px] flex items-center justify-center gap-[10px] bg-[#002B60] rounded-[39px] px-[30px] py-[13px] font-sans font-bold text-[24px] leading-[24px] text-white hover:bg-[#001a3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {slide.type === 'quiz' ? quizState.hasSubmitted ? quizState.isCorrect ? 'Next Case' : 'Try Again' : 'Submit Answer' : slide.type === 'intro' ? 'AI Briefing' : currentSlide === 1 ? 'AI Uses' : currentSlide === 2 ? 'Case 1: AI Text' : currentSlide === 3 || currentSlide === 5 || currentSlide === 7 || currentSlide === 9 || currentSlide === 11 ? 'Next' : 'Next Case'}
                  <NavigationArrow direction="right" />
              </button>
            </div>
          )}
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>;
};