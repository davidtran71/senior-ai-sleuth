import { useRef } from "react";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Share2 } from "lucide-react";
import { CareSideLogo } from "@/components/CareSideLogo";
import CheckIcon from "@/components/CheckIcon";
import { DecorativeShapes } from "@/components/DecorativeShapes";
import { DecorativeTopCross } from "@/components/DecorativeTopCross";
import trophyIllustration from "@/assets/trophy-illustration.png";
import certificateBadge from "@/assets/certificate-badge.png";
import { FileText as FileTextIcon, Image as ImageIcon, Mic, Video } from "lucide-react";

export const Certificate = () => {
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownloadBadge = async () => {
    if (!certificateRef.current) return;
    const banner = certificateRef.current.querySelector('[data-banner]') as HTMLElement | null;
    if (banner) banner.style.marginTop = '-5px';
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
    } finally {
      if (banner) banner.style.marginTop = '';
    }
  };

  const shareUrl = 'https://senior-ai-sleuth.lovable.app';
  const shareText = "I just earned my Digital Detective badge from the AI Forensics Taskforce! 🕵️ Can you spot AI-generated content? Take the test and find out!";

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'X',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Threads',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.26 1.33-3.017.88-.724 2.107-1.127 3.553-1.166 1.076-.03 2.06.097 2.943.378.018-.96-.094-1.794-.332-2.47-.342-.972-.952-1.455-1.813-1.455h-.063c-.61.02-1.12.247-1.513.678l-1.45-1.41c.728-.75 1.672-1.16 2.81-1.22h.106c1.572 0 2.767.658 3.448 1.9.555 1.012.83 2.426.818 4.203v.05c.013.14.013.28 0 .42-.08 2.864-1.164 4.58-3.222 5.106v.02c.596.288 1.097.702 1.47 1.223.63.879.907 2.073.82 3.546-.034.578-.132 1.126-.294 1.638l.002-.003zM12.42 13.64c-1.548.043-2.457.546-2.392 1.652.033.6.36 1.622 2.195 1.622h.09c1.407-.075 2.121-.84 2.339-1.958-.633-.288-1.38-.467-2.232-.467v.15z"/></svg>
      ),
      url: `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-3 sm:px-6 relative overflow-hidden">
      <DecorativeShapes />
      <DecorativeTopCross />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <CareSideLogo />
        </div>

        <Card className="p-4 sm:p-8 shadow-dramatic mb-6 case-file-border">
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
              <h2 className="text-[#0A1628] font-serif text-3xl md:text-5xl">Congratulations, Digital Detective!</h2>
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
            <div ref={certificateRef} className="border-2 border-[#E5E7EB] rounded-2xl p-8 space-y-8 text-center bg-white">
              <span className="inline-block bg-[#CCEDFF] text-[#002B60] text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded">
                OFFICIAL CERTIFICATE
              </span>
              
              <img 
                src={certificateBadge} 
                alt="Certificate Badge" 
                className="w-32 h-auto mx-auto"
              />

              <div className="space-y-6">
                <p className="text-[#000000] text-lg max-w-none">This official document certifies that this</p>
                <h2 className="text-[#0A1628] text-4xl md:text-[64px] font-bold font-serif leading-none">Digital Detective</h2>
                <p className="text-[#000000] text-lg max-w-none">has successfully completed the comprehensive</p>
              </div>

              <span data-banner className="inline-flex items-center justify-center bg-[#80D2FE] text-[#000000] font-franklin font-bold text-base md:text-2xl px-4 md:px-[10px] py-[10px] rounded-lg w-full md:w-[530px] h-auto md:h-[65px]" style={{ lineHeight: '120%' }}>
                AI FORENSICS TASKFORCE TRAINING
              </span>

              <p className="text-[#000000] text-lg max-w-xl mx-auto leading-relaxed">
                and has demonstrated mastery in identifying AI-generated content including text, images, audio, and video to protect themselves and others from digital threats.
              </p>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:max-w-xl md:mx-auto">
                {[
                  { label: 'Text Analysis', icon: FileTextIcon },
                  { label: 'Image Detection', icon: ImageIcon },
                  { label: 'Audio Forensics', icon: Mic },
                  { label: 'Video Analysis', icon: Video }
                ].map((skill, index) => (
                  <div key={index} className="bg-[#E9FCF7] rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                    <img 
                      src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z' fill='%2300A5FE'/%3E%3Cpath d='M16 10L10.5 15L8 12.7273' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
                      alt="Completed"
                      width="24"
                      height="24"
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

            {/* Share Your Badge */}
            <div className="bg-[#F0F7FF] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Share2 className="h-5 w-5 text-[#002B60]" />
                <h3 className="text-[#0A1628] text-xl font-bold font-serif">Share Your Badge</h3>
              </div>
              <p className="text-[#000000] text-sm leading-relaxed text-center">
                Challenge your friends and family to test their AI detection skills!
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {socialPlatforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => window.open(platform.url, '_blank', 'noopener,noreferrer,width=600,height=400')}
                    className="flex items-center gap-2 px-5 py-3 rounded-full border-2 border-[#E5E7EB] hover:border-[#002B60] bg-white hover:bg-[#F0F7FF] transition-all text-sm font-semibold text-[#0A1628]"
                  >
                    {platform.icon}
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
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
                onClick={() => navigate('/')} 
                className="border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628]/5"
              >
                Return to HQ
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
