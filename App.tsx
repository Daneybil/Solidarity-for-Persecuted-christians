
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { 
  Heart, 
  Share2, 
  ExternalLink, 
  Twitter, 
  Instagram, 
  Facebook, 
  Youtube, 
  Target, 
  Globe,
  ChevronRight,
  PlayCircle,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const VideoSection = ({ url, title, isFeatured = false }: { url: string; title: string; isFeatured?: boolean }) => {
  const getEmbedUrl = (url: string) => {
    try {
      // Robust regex for YouTube IDs (supports watch?, shorts/, youtu.be/)
      const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
      const match = url.match(regExp);
      const videoId = (match && match[1].length === 11) ? match[1] : null;
      
      if (!videoId) return '';
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;
    } catch (e) {
      console.error("Video URL Error:", e);
      return '';
    }
  };

  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) return null;

  return (
    <div className={`w-full max-w-4xl mx-auto mb-20 group ${isFeatured ? 'relative' : ''}`}>
      {isFeatured && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-8 py-2 rounded-full text-xs font-black uppercase tracking-[0.4em] shadow-lg z-20 flex items-center gap-2">
          <PlayCircle size={16} strokeWidth={3} /> Featured Mission Video
        </div>
      )}
      <div 
        className={`relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] ${isFeatured ? 'border-emerald-500 shadow-emerald-200/50' : 'border-white'} transition-all duration-500 bg-stone-100`}
        style={{ paddingBottom: '56.25%', height: 0 }}
      >
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        ></iframe>
      </div>
      <p className={`mt-8 text-center ${isFeatured ? 'text-emerald-900 text-3xl' : 'text-stone-700 text-2xl'} font-black italic tracking-tight uppercase leading-tight`}>
        {title}
      </p>
    </div>
  );
};

const App: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState<string>('1000');
  const [referralLink, setReferralLink] = useState<string>('');
  const [showReferral, setShowReferral] = useState(false);

  const generateReferral = () => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}?ref=donated_${donationAmount}`;
    setReferralLink(link);
    setShowReferral(true);
  };

  const shareToSocial = async () => {
    const message = `I have donated $${Number(donationAmount).toLocaleString()} to Solidarity for Persecuted Christians – help the poor Worldwide. Please do the same or donate even more – let's help make the world a better place! Join here: ${referralLink || window.location.href}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Solidarity for Persecuted Christians',
          text: message,
          url: referralLink || window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(message);
      alert('Message and link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-950 font-sans selection:bg-orange-600 selection:text-white leading-relaxed">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-100/50 rounded-full blur-[140px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-100/50 rounded-full blur-[140px] opacity-40"></div>
      </div>

      <header className="relative z-10 pt-20 pb-12 px-6">
        <div className="container mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-8 py-3 bg-emerald-700 text-white rounded-full text-sm font-black uppercase tracking-[0.4em] mb-12 shadow-2xl"
          >
            <Globe size={20} strokeWidth={3} /> Global Solidarity 2026
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-black text-emerald-950 mb-12 leading-[0.9] tracking-tighter">
            Solidarity for <br className="hidden md:block"/> 
            <span className="text-orange-600">Persecuted Christians</span> <br/>
            <span className="text-amber-700 italic font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">— help the poor Worldwide.</span>
          </h1>
          
          <div className="max-w-5xl mx-auto mt-20 p-12 md:p-20 bg-white border-[4px] border-amber-200 rounded-[4rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full -mr-32 -mt-32 opacity-60"></div>
             
             <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-50 px-10 py-3 border-[4px] border-emerald-100 rounded-full flex items-center gap-3 text-emerald-800 shadow-lg">
               <Target className="animate-pulse" size={28} strokeWidth={4} />
               <span className="text-xl font-black uppercase tracking-[0.25em]">Global Objective</span>
             </div>

             <div className="mb-10 relative z-10">
               <p className="text-7xl md:text-9xl lg:text-[10rem] font-black text-stone-950 tracking-[ -0.05em] mb-6 leading-none">
                 $1 BILLION
               </p>
               <div className="h-4 w-64 bg-emerald-600 mx-auto rounded-full shadow-lg"></div>
             </div>

             <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-800 leading-tight mb-12 max-w-4xl mx-auto relative z-10">
               Our target is <span className="text-orange-600 font-black decoration-8 decoration-orange-100 underline underline-offset-[10px]">$1 Billion</span> to help achieve our goals worldwide. 
               We have <span className="font-black text-emerald-900 bg-emerald-50 px-4 py-1 rounded-xl">ONLY ONE YEAR</span> to raise this fund, so we can begin our projects next year. 
               <span className="block mt-8 text-orange-700 font-black text-5xl lg:text-6xl uppercase tracking-tighter">Please help us.</span>
             </p>
             
             <div className="mt-14 h-12 bg-stone-100 rounded-full overflow-hidden border-4 border-stone-200 shadow-2xl relative z-10">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '15%' }}
                 transition={{ duration: 3.5, ease: "easeOut" }}
                 className="h-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-400 relative"
               >
                 <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:30px_30px] animate-[stripe-move_2s_linear_infinite]"></div>
               </motion.div>
             </div>
             <div className="flex justify-between mt-6 text-xl font-black text-stone-500 tracking-[0.2em] relative z-10">
                <span>$0 RAISED</span>
                <span className="text-emerald-700">$1,000,000,000 GOAL</span>
             </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-24">
        <section className="mb-40">
          <div className="flex flex-col items-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black text-emerald-950 mb-24 text-center tracking-tighter">Global Impact & Evidence</h2>
            
            <VideoSection 
              url="https://youtu.be/4FupxAmYjjs?si=6Rt6pyDGmVcMN2kj" 
              title="Official Mission Briefing: Our 2026 Strategy" 
              isFeatured={true}
            />
            
            <VideoSection 
              url="https://youtube.com/shorts/9gCgncqj__c?si=tU6FkaqJX_ttZ17d" 
              title="Real Stories: Resilience Under Pressure" 
            />
            
            <VideoSection 
              url="https://youtube.com/shorts/SdKo-6PAaC4?si=zlCCaIeCvsCIHwu3" 
              title="Operational Reach: Reaching the Unreachable" 
            />
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-40">
          <div className="bg-gradient-to-br from-orange-950 via-stone-900 to-orange-900 text-white rounded-[5rem] p-12 md:p-24 shadow-2xl relative overflow-hidden border-[10px] border-emerald-900/10">
            <div className="absolute top-0 right-0 p-20 opacity-5">
              <Heart size={400} fill="white" />
            </div>

            <div className="relative z-10 text-center">
              <h2 className="text-5xl md:text-7xl font-serif font-black mb-10 tracking-tighter">Your Action Saves Lives</h2>
              <p className="text-orange-100 text-2xl md:text-3xl font-bold mb-16 max-w-4xl mx-auto leading-tight">
                Help support the persecuted Christians around the globe. Please donate any amount you can afford – from <span className="text-white font-black">$1</span> up to <span className="text-white font-black decoration-amber-500 underline decoration-4">$1 Million</span> or more. <br className="hidden md:block"/> <span className="text-amber-400 font-black uppercase mt-4 block text-4xl">Every contribution matters.</span>
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <div className="bg-white/5 backdrop-blur-3xl rounded-[4rem] p-10 md:p-14 border-4 border-white/10 shadow-2xl">
                  <label className="block text-sm font-black uppercase tracking-[0.4em] text-orange-400 mb-8">Secure Contribution (USD)</label>
                  <div className="relative mb-8">
                    <span className="absolute left-8 top-1/2 -translate-y-1/2 text-4xl font-black text-stone-500">$</span>
                    <input 
                      type="number" 
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="w-full bg-white text-stone-950 rounded-3xl pl-16 pr-8 py-8 text-5xl font-black focus:ring-[16px] focus:ring-emerald-500/20 outline-none transition-all shadow-inner border-4 border-transparent focus:border-emerald-500"
                      placeholder="0"
                    />
                  </div>
                  <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-8 rounded-3xl text-2xl transition-all shadow-2xl flex items-center justify-center gap-4 group active:scale-95 border-b-8 border-orange-800">
                    AUTHORIZE DONATION <ChevronRight className="group-hover:translate-x-3 transition-transform" strokeWidth={4} />
                  </button>
                </div>

                <div className="bg-white/5 backdrop-blur-3xl rounded-[4rem] p-10 md:p-14 border-4 border-white/10 flex flex-col justify-center text-left">
                  <label className="block text-sm font-black uppercase tracking-[0.4em] text-emerald-400 mb-8">Referral Influence Network</label>
                  <p className="text-2xl font-bold text-orange-200 mb-10 leading-snug">
                    Become an influencer for the cause. Generate your unique link and help us hit the <span className="text-white font-black">$1 Billion Goal</span>.
                  </p>
                  
                  {!showReferral ? (
                    <button 
                      onClick={generateReferral}
                      className="w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-white font-black py-8 rounded-3xl transition-all flex items-center justify-center gap-4 border-4 border-emerald-500/30 text-xl shadow-xl"
                    >
                      ACTIVATE YOUR LINK <Share2 size={28} strokeWidth={4} />
                    </button>
                  ) : (
                    <div className="space-y-8">
                      <div className="bg-emerald-950/40 p-7 rounded-3xl border-4 border-emerald-500/20 text-sm font-black truncate shadow-inner text-emerald-200">
                        {referralLink}
                      </div>
                      <button 
                        onClick={shareToSocial}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-8 rounded-3xl transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95 text-xl border-b-8 border-emerald-800"
                      >
                        BROADCAST TO WORLD <ExternalLink size={28} strokeWidth={4} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-emerald-200 text-sm font-black uppercase tracking-[0.5em]">
                <ShieldCheck size={24} strokeWidth={4} /> 100% Encrypted & Publicly Audited
              </div>
            </div>
          </div>
        </section>

        <section className="mt-40 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white p-12 md:p-16 rounded-[4.5rem] shadow-2xl border-[4px] border-emerald-50 flex flex-col justify-between group hover:border-emerald-200 transition-colors">
               <div>
                 <div className="flex items-center gap-6 mb-10">
                   <div className="p-6 bg-emerald-700 text-white rounded-[2rem] shadow-xl group-hover:rotate-12 transition-transform">
                     <Twitter size={44} strokeWidth={3} />
                   </div>
                   <h3 className="text-4xl font-black text-emerald-950 tracking-tighter">Mission Status</h3>
                 </div>
                 <p className="text-stone-700 text-2xl font-bold mb-12 leading-snug">
                   Connect with our central global command for daily mission status, logistics updates, and <span className="text-emerald-700">verified impact reports</span>.
                 </p>
               </div>
               <a 
                 href="https://x.com/helpthepoorr" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-4 px-12 py-7 bg-emerald-950 text-white rounded-3xl font-black text-2xl hover:bg-emerald-800 transition-all shadow-2xl group/btn"
               >
                 MISSION X FEED <ExternalLink size={24} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
               </a>
            </div>

            <div className="bg-white p-12 md:p-16 rounded-[4.5rem] shadow-2xl border-[4px] border-amber-50 group hover:border-amber-200 transition-colors">
               <div className="flex items-center gap-6 mb-12">
                 <div className="p-6 bg-amber-500 text-stone-950 rounded-[2rem] shadow-xl group-hover:-rotate-12 transition-transform">
                   <Globe size={44} strokeWidth={3} />
                 </div>
                 <h3 className="text-4xl font-black text-stone-950 tracking-tighter">Strategic Partners</h3>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <SocialIcon href="https://x.com/realDonaldTrump" icon={<Twitter />} label="Trump X" color="bg-orange-500" />
                  <SocialIcon href="https://www.facebook.com/DonaldTrump" icon={<Facebook />} label="Trump FB" color="bg-blue-600" />
                  <SocialIcon href="https://www.instagram.com/realdonaldtrump" icon={<Instagram />} label="Trump IG" color="bg-pink-600" />
                  <SocialIcon href="https://www.youtube.com/user/donaldjtrumpforpresident" icon={<Youtube />} label="Trump YT" color="bg-red-600" />
               </div>
               <p className="mt-12 text-stone-500 font-black text-center text-xs uppercase tracking-[0.4em] italic opacity-60">
                 Global Collaboration for Universal Good
               </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-20 pb-40">
           <a 
             href="https://x.com/realDonaldTrump" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center justify-center gap-4 px-14 py-8 bg-stone-950 text-white rounded-3xl font-black text-2xl hover:shadow-2xl hover:scale-105 transition-all shadow-xl active:scale-95 border-b-8 border-stone-800"
           >
             <Twitter fill="white" size={32} /> DONALD TRUMP X
           </a>
           <a 
             href="https://x.com/helpthepoorr" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center justify-center gap-4 px-14 py-8 bg-emerald-700 text-white rounded-3xl font-black text-2xl hover:bg-emerald-600 hover:scale-105 transition-all shadow-xl active:scale-95 border-b-8 border-emerald-900"
           >
             <Twitter fill="white" size={32} /> MISSION UPDATES
           </a>
        </div>
      </main>

      <footer className="relative z-10 bg-emerald-950 text-emerald-100 py-32 px-6 border-t-[16px] border-orange-600">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-24 border-b border-white/10 pb-24">
            <div>
              <h4 className="text-white font-serif text-4xl font-black mb-10 tracking-tighter uppercase">Solidarity Mission</h4>
              <p className="text-2xl font-bold leading-relaxed opacity-80">
                The world's premier unified effort to protect faith and eradicate poverty. High-transparency, direct-action projects across 120 nations.
              </p>
            </div>
            <div>
              <h4 className="text-orange-500 font-serif text-2xl font-black mb-10 uppercase tracking-[0.25em]">Global Directives</h4>
              <ul className="space-y-6 text-xl font-bold">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-3">Financial Verification Reports <ExternalLink size={18} /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-3">2026 Strategic Roadmap <ExternalLink size={18} /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-3">Project Locations Map <ExternalLink size={18} /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-3">Request Humanitarian Aid <ExternalLink size={18} /></a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-serif text-2xl font-black mb-10 uppercase tracking-[0.25em]">Connect Globally</h4>
              <div className="flex gap-6 mb-12">
                <a href="https://x.com/helpthepoorr" className="p-5 bg-white/10 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-lg"><Twitter size={32} strokeWidth={4} /></a>
                <a href="#" className="p-5 bg-white/10 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-lg"><Facebook size={32} strokeWidth={4} /></a>
                <a href="#" className="p-5 bg-white/10 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-lg"><Instagram size={32} strokeWidth={4} /></a>
                <a href="#" className="p-5 bg-white/10 rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-lg"><Youtube size={32} strokeWidth={4} /></a>
              </div>
              <p className="text-sm font-black opacity-40 uppercase tracking-[0.5em]">Global Headquarters: Solidarity Plaza</p>
            </div>
          </div>
          <div className="text-center text-sm font-black tracking-[0.8em] uppercase opacity-40">
            &copy; {new Date().getFullYear()} Solidarity for Persecuted Christians. <br className="md:hidden"/> Unity. Dignity. Restoration.
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes stripe-move {
          0% { background-position: 0 0; }
          100% { background-position: 60px 0; }
        }
      `}</style>
    </div>
  );
};

// Fixed SocialIcon component to satisfy TypeScript constraints on Vercel
const SocialIcon = ({ href, icon, label, color }: { href: string; icon: React.ReactElement; label: string; color: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex flex-col items-center gap-4 group"
  >
    <div className={`p-6 bg-stone-100 text-stone-700 rounded-[1.75rem] group-hover:${color} group-hover:text-white transition-all shadow-md group-hover:shadow-2xl group-hover:-translate-y-3`}>
      {React.cloneElement(icon, { size: 32, strokeWidth: 4 } as any)}
    </div>
    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-500 group-hover:text-stone-950 transition-colors">{label}</span>
  </a>
);

export default App;
