import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CareSideLogo } from "@/components/CareSideLogo";


import seniorLaptop from "@/assets/senior-laptop.png";
import heroBackground from "@/assets/hero-background-new.png";
import ctaBackground from "@/assets/cta-background.png";
import robotShield from "@/assets/robot-shield.png";


const Index = () => {
  const navigate = useNavigate();
  const [trainingCompleted, setTrainingCompleted] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const completed = localStorage.getItem('ai-forensics-completed');
    if (completed === 'true') {
      setTrainingCompleted(true);
    }
  }, []);

  const handleStartTraining = () => {
    navigate('/training');
  };

  const modules = [
    { num: 1, title: "Understanding AI", desc: "Learn what AI is and how criminals use it online" },
    { num: 2, title: "Spotting Fake Text", desc: "Identify AI-generated scams, phishing emails and messages" },
    { num: 3, title: "Detecting Fake Images", desc: "Recognise manipulated photos and AI-generated images" },
    { num: 4, title: "Voice Clones & Audio", desc: "Spot synthetic voices and deepfake audio scams" },
    { num: 5, title: "Deepfake Videos", desc: "Identify manipulated and AI-generated video content" },
    { num: 6, title: "Detection Tips", desc: "Tips to verify suspicious content" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section 
        className="px-6 pb-16 pt-4 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        {/* Header - Inside Hero */}
        <header className="max-w-6xl mx-auto py-4 mb-4">
          <CareSideLogo />
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Hero Content - Card */}
            <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 relative z-10 shadow-sm">
              <span className="bg-[#CCEDFF] text-black text-sm font-semibold tracking-wider uppercase px-3 py-1 rounded mb-4 inline-block">
                AI FORENSICS TASKFORCE
              </span>
              <h1 className="text-[#0A1628] mb-4">
                AI Training Tool<br />for Seniors
              </h1>
              <p className="text-[#4A5568] text-base lg:text-lg mb-6 max-w-md">
                Join the digital detective academy and learn to spot AI-generated scams, deepfakes, and misinformation. Protect yourself and your loved ones online.
              </p>
              <Button 
                onClick={handleStartTraining}
                className="bg-[#0A1628] hover:bg-[#1a2840] text-white rounded-lg px-6 py-3 text-base font-medium inline-flex items-center gap-2"
              >
                {trainingCompleted ? "Retake Training" : "Begin Training"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Right - Robot Shield Illustration */}
            <div className="flex-1 flex justify-center relative">
              <img 
                src={robotShield} 
                alt="Robot with shield" 
                className="w-72 lg:w-96 h-auto relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why This Training Matters Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left - Image */}
            <div className="flex-1 relative">
              <img 
                src={seniorLaptop} 
                alt="Senior using laptop" 
                className="w-full h-auto object-cover"
              />
              {/* Decorative Plus */}
              <svg className="w-16 h-16 text-[#00BCD4] absolute -bottom-6 right-4 z-10" viewBox="0 0 40 40" fill="currentColor">
                <path d="M17 0h6v17h17v6H23v17h-6V23H0v-6h17V0z"/>
              </svg>
            </div>

            {/* Right - Content */}
            <div className="flex-1">
              <span className="inline-block bg-[#CCEDFF] text-black text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded mb-4">
                CRITICAL MISSION
              </span>
              <h2 className="text-[#0A1628] text-5xl font-bold mb-4 font-serif">
                Why This Training Matters
              </h2>
              <p className="text-[#4A5568] text-base lg:text-lg mb-4">
                Criminals use AI to create convincing fake emails, voice calls, images, and videos targeting seniors. This training equips you with the skills to recognize digital threats and stay safe online.
              </p>
              <p className="text-[#0A1628] font-semibold text-base lg:text-lg">
                Complete your training to earn an official Digital Detective Badge!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Investigate Section */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="border-2 border-[#00BCD4] rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#CCEDFF] text-black text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded mb-4">
                TRAINING BRIEFING
              </span>
              <h2 className="text-[#0A1628] text-5xl font-bold font-serif">
                What You'll Investigate
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {modules.map((item) => (
                <div key={item.num} className="text-left bg-[#F6FEFC] rounded-2xl p-6">
                  <span className="text-[#00BCD4] text-[110px] font-bold font-serif block mb-2 leading-none">
                    {item.num}
                  </span>
                  <h3 className="text-[#0A1628] font-bold text-lg mb-2 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-[#4A5568] text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-8 lg:p-12 flex justify-end bg-[#FBF6E8] relative overflow-hidden">
            <div 
              className="absolute inset-0 hidden lg:block bg-cover bg-center bg-no-repeat" 
              style={{ backgroundImage: `url(${ctaBackground})` }}
            />
            <div className="lg:w-1/2 text-center lg:text-left relative z-10">
              <h2 className="text-[#0A1628] text-5xl font-bold mb-4 font-serif">
                Ready to become a<br />Digital Detective?
              </h2>
              <p className="text-[#4A5568] text-base lg:text-lg mb-6">
                Start your training now and learn how to protect yourself and your loved ones from AI-powered scams and misinformation.
              </p>
              <Button 
                onClick={handleStartTraining}
                className="bg-[#0A1628] hover:bg-[#1a2840] text-white rounded-lg px-8 py-4 text-base font-medium"
              >
                Start Training
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
