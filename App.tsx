
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
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
  ShieldCheck,
  Mail,
  RefreshCcw,
  CheckCircle2,
  Phone,
  Coins,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const GOAL_AMOUNT = 1000000000;

const VideoSection = ({ url, title, isFeatured = false }: { url: string; title: string; isFeatured?: boolean }) => {
  const getEmbedUrl = (url: string) => {
    try {
      const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
      const match = url.match(regExp);
      const videoId = (match && match[1].length === 11) ? match[1] : null;
      if (!videoId) return '';
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;
    } catch (e) {
      return '';
    }
  };
  const embedUrl = getEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className={`w-full max-w-4xl mx-auto mb-10 md:mb-20 group ${isFeatured ? 'relative' : ''}`}>
      {isFeatured && (
        <div className="absolute -top-6 md:-top-10 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 md:px-8 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-lg z-20 flex items-center gap-2 whitespace-nowrap">
          <PlayCircle size={16} strokeWidth={3} /> Featured Mission Video
        </div>
      )}
      <div 
        className={`relative w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-[4px] md:border-[6px] ${isFeatured ? 'border-emerald-500 shadow-emerald-200/50' : 'border-white'} transition-all duration-500 bg-stone-100`}
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
      <p className={`mt-4 mt-8 text-center ${isFeatured ? 'text-emerald-900 text-xl md:text-3xl' : 'text-stone-700 text-lg md:text-2xl'} font-black italic tracking-tight uppercase leading-tight px-4`}>
        {title}
      </p>
    </div>
  );
};

const App: React.FC = () => {
  // We initialize with a mock amount that could be fetched from a server in a real implementation
  // To allow it to "update" in this frontend demo, we persist it to local storage
  const [totalRaised, setTotalRaised] = useState<number>(() => {
    const saved = localStorage.getItem('solidarity_total_raised');
    return saved ? parseInt(saved, 10) : 0;
  }); 
  
  const [referralLink, setReferralLink] = useState<string>('');
  const [showReferral, setShowReferral] = useState(false);

  const donationRef = useRef<HTMLDivElement>(null);

  // Effect to sync totalRaised with storage
  useEffect(() => {
    localStorage.setItem('solidarity_total_raised', totalRaised.toString());
  }, [totalRaised]);

  // Simulated live update logic: In a real app, this would use Stripe Webhooks.
  // Here, we check if the user just returned from a successful checkout (if the URL had success params)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout_success')) {
      // Simulation: Add a random amount to the visual counter for demo purposes
      setTotalRaised(prev => prev + 1000);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const scrollToDonate = () => {
    donationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateReferral = () => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}?ref=solidarity_mission_2026`;
    setReferralLink(link);
    setShowReferral(true);
  };

  const shareToSocial = async () => {
    const message = `I just supported the Solidarity for Persecuted Christians mission. Join the $1 Billion goal here: ${referralLink || window.location.href}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Solidarity for Persecuted Christians',
          text: message,
          url: referralLink || window.location.href,
        });
      } catch (err) { console.error(err); }
    } else {
      navigator.clipboard.writeText(message);
      alert('Message and link copied to clipboard!');
    }
  };

  const progressPercent = Math.min((totalRaised / GOAL_AMOUNT) * 100, 100);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-950 font-sans selection:bg-orange-600 selection:text-white leading-relaxed overflow-x-hidden">
      
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 py-3 md:py-4 px-4 md:px-8 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
             <Globe className="text-emerald-700 w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
             <span className="font-serif font-black text-xs md:text-xl tracking-tighter text-emerald-950 uppercase leading-[0.85]">Solidarity<br/>Mission</span>
          </div>
          <button 
            onClick={scrollToDonate}
            className="bg-orange-600 hover:bg-orange-500 text-white font-black px-4 md:px-12 py-3 md:py-5 rounded-full text-[10px] md:text-base tracking-[0.2em] md:tracking-[0.4em] uppercase shadow-xl transition-all active:scale-95 flex items-center gap-2 border-b-4 border-orange-800"
          >
            DONATE <Heart size={16} fill="white" className="hidden sm:block" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 md:pt-56 pb-12 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-700 text-white rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-8 md:mb-16 shadow-xl"
          >
            <Globe size={16} strokeWidth={3} /> Global Solidarity 2026
          </motion.div>
          
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-serif font-black text-emerald-950 mb-8 md:mb-16 leading-[1.05] md:leading-[0.9] tracking-tighter">
            Solidarity for <br className="hidden md:block"/> 
            <span className="text-orange-600">Persecuted Christians</span> <br/>
            <span className="text-amber-700 italic font-bold text-2xl md:text-5xl lg:text-6xl tracking-tight">— help the poor Worldwide.</span>
          </h1>
          
          <div className="max-w-6xl mx-auto mt-12 md:mt-24 p-6 md:p-20 bg-white border-[2px] md:border-[4px] border-amber-200 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-amber-50 rounded-full -mr-16 -mt-16 md:-mr-32 md:-mt-32 opacity-60"></div>
             
             <div className="absolute -top-4 md:-top-7 left-1/2 -translate-x-1/2 bg-emerald-50 px-6 md:px-10 py-2 md:py-4 border-[2px] md:border-[4px] border-emerald-100 rounded-full flex items-center gap-2 md:gap-4 text-emerald-800 shadow-lg z-20">
               <Target className="animate-pulse w-5 h-5 md:w-8 md:h-8" strokeWidth={4} />
               <span className="text-[10px] md:text-xl font-black uppercase tracking-[0.15em] md:tracking-[0.25em]">Live Progress Monitor</span>
             </div>

             <div className="mb-6 md:mb-12 relative z-10 pt-6">
               <p className="text-4xl md:text-[8rem] lg:text-[10rem] font-black text-stone-950 tracking-[-0.05em] mb-4 md:mb-8 leading-none">
                 $1 BILLION
               </p>
               <div className="h-2 md:h-4 w-32 md:w-64 bg-emerald-600 mx-auto rounded-full shadow-lg"></div>
             </div>

             <div className="max-w-5xl mx-auto relative z-10 mb-8 md:mb-16">
               <p className="text-lg md:text-3xl lg:text-4xl font-bold text-stone-800 leading-tight mb-8 md:mb-12">
                 Target Objective: <span className="text-orange-600 font-black decoration-4 md:decoration-8 decoration-orange-100 underline underline-offset-[4px] md:underline-offset-[10px]">$1 Billion</span>. 
                 Raised in 2026: <span className="font-black text-emerald-900 bg-emerald-50 px-3 md:px-4 py-1 rounded-lg">${totalRaised.toLocaleString()}</span>.
               </p>
               
               {/* NEW MISSION WRITE-UP INTEGRATION */}
               <p className="text-lg md:text-3xl lg:text-4xl font-bold text-stone-700 leading-relaxed px-4 text-center italic">
                 Help bring hope to persecuted Christians and poor families worldwide 🌎. Your support brings comfort, food, and shelter to those suffering. Every donation, big or small, makes a difference 💖. Join us in standing with the vulnerable and oppressed. Let's show God's love in action 🙏. Give today and be part of a global movement of kindness 🌟. God Almighty will reward your generosity, impacting lives now and forever.
               </p>
               
               <span className="block mt-8 md:mt-12 text-orange-700 font-black text-3xl md:text-7xl uppercase tracking-tighter">Support the Mission</span>
             </div>
             
             <div className="mt-8 md:mt-16 h-8 md:h-14 bg-stone-100 rounded-full overflow-hidden border-2 md:border-4 border-stone-200 shadow-2xl relative z-10">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progressPercent}%` }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 className="h-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-400 relative"
               >
                 <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:30px_30px] animate-[stripe-move_2s_linear_infinite]"></div>
               </motion.div>
             </div>
             <div className="flex justify-between mt-4 md:mt-8 text-[10px] md:text-2xl font-black text-stone-500 tracking-[0.1em] md:tracking-[0.2em] relative z-10">
                <span>${totalRaised.toLocaleString()} RAISED</span>
                <span className="text-emerald-700">MISSION TARGET</span>
             </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 container mx-auto px-4 md:px-6 py-16 md:py-32">
        
        {/* Videos Section */}
        <section className="mb-24 md:mb-48">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl md:text-8xl font-serif font-black text-emerald-950 mb-16 md:mb-32 text-center tracking-tighter px-4">Global Impact & Evidence</h2>
            <VideoSection url="https://youtu.be/4FupxAmYjjs" title="Official Mission Briefing: Our 2026 Strategy" isFeatured={true} />
            <VideoSection url="https://youtube.com/shorts/9gCgncqj__c" title="Real Stories: Resilience Under Pressure" />
            <VideoSection url="https://youtube.com/shorts/SdKo-6PAaC4" title="Operational Reach: Reaching the Unreachable" />
          </div>
        </section>

        {/* Donation Section - SINGULAR TERMINAL UPDATED */}
        <section ref={donationRef} className="max-w-[1200px] mx-auto mb-24 md:mb-48 px-2 md:px-6">
          <div className="bg-gradient-to-br from-orange-950 via-stone-900 to-orange-900 text-white rounded-[3rem] md:rounded-[6rem] p-6 md:p-16 lg:p-24 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden border-[8px] md:border-[16px] border-emerald-900/10">
            <div className="absolute top-0 right-0 p-10 md:p-40 opacity-5 pointer-events-none">
              <Heart size={600} fill="white" className="w-96 h-96 md:w-[600px] md:h-[600px]" />
            </div>

            <div className="relative z-10 text-center">
              <div className="inline-block px-8 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] md:text-sm font-black uppercase tracking-[0.4em] mb-12">
                 Impact Directive 2026
              </div>
              
              <h2 className="text-5xl md:text-[10rem] font-serif font-black mb-10 md:mb-20 tracking-tighter uppercase leading-[0.8] md:leading-[0.8]">Save a <br className="hidden md:block"/><span className="text-orange-600">Life Today</span></h2>
              
              <p className="text-orange-100 text-xl md:text-4xl font-bold mb-16 md:mb-32 max-w-5xl mx-auto leading-tight italic px-4">
                Your direct contribution fuels our operations. <br className="hidden md:block"/> Real-time impact on every transaction towards our <span className="text-white font-black">$1 Billion Mission Target</span>.
              </p>

              {/* Singular Unified Terminal Card */}
              <div className="max-w-4xl mx-auto bg-white rounded-[3rem] md:rounded-[5rem] p-10 md:p-20 shadow-2xl text-stone-950 border-[6px] border-emerald-500/10 flex flex-col items-center">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-50 rounded-3xl flex items-center justify-center">
                    <Zap className="text-orange-600 w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
                  </div>
                  <div className="text-left">
                    <label className="text-xs md:text-xl font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-orange-600 leading-none block mb-2">OFFICIAL PAYMENT TERMINAL</label>
                    <span className="text-stone-400 text-[10px] md:text-sm font-bold uppercase tracking-widest">Secured Unified Gateway 2026</span>
                  </div>
                </div>

                <div className="w-full mb-12 flex flex-col items-center">
                  {/* Enlarged Stripe Buy Button - Updated ID */}
                  <div className="w-full max-w-2xl mb-12 scale-[1.3] md:scale-[1.65] transform origin-center transition-all duration-500 hover:scale-[1.75] py-14 px-4">
                    {React.createElement('stripe-buy-button', {
                      'buy-button-id': "buy_btn_1Sliw1R9BXg7OkPIFGSTTTzJ",
                      'publishable-key': "pk_live_51Shj32R9BXg7OkPIiVP5DmN2mO3POiP6VCrvr8gjoMHclRhy8uX2WPqi6lBhp8Q23fNxHkTfuxRjL7PC5GOwzWbw000O6aaC5p",
                      style: { width: '100%' }
                    } as any)}
                  </div>
                  
                  {/* High Visibility "DONATE" Label */}
                  <div className="mt-20 md:mt-32 flex items-center gap-4 text-emerald-600 font-black text-2xl md:text-5xl uppercase tracking-[0.3em] animate-pulse">
                    <ChevronRight size={40} className="md:w-16 md:h-16" strokeWidth={4} /> CLICK TO DONATE NOW <ChevronRight size={40} className="md:w-16 md:h-16 rotate-180" strokeWidth={4} />
                  </div>
                </div>

                {/* Secondary Social Action */}
                <div className="w-full pt-10 border-t-4 border-stone-50">
                  {!showReferral ? (
                    <button 
                      onClick={generateReferral}
                      className="text-stone-400 hover:text-emerald-600 font-black text-xs md:text-lg uppercase tracking-[0.3em] flex items-center gap-3 mx-auto transition-colors"
                    >
                      <Share2 size={20} /> OR ACTIVATE YOUR INFLUENCE NETWORK LINK
                    </button>
                  ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="bg-emerald-50 p-6 rounded-[2rem] border-2 border-emerald-100 text-xs md:text-xl font-black truncate text-emerald-700 flex items-center gap-4">
                        <CheckCircle2 className="text-emerald-500" size={24} />
                        {referralLink}
                      </div>
                      <button 
                        onClick={shareToSocial}
                        className="w-full bg-emerald-600 text-white font-black py-6 rounded-3xl transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95 text-lg md:text-2xl uppercase tracking-widest"
                      >
                        BROADCAST MISSION <ExternalLink />
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-12 p-6 bg-stone-50 rounded-3xl border-2 border-stone-100 text-center w-full">
                  <p className="text-[10px] md:text-sm text-stone-400 font-bold uppercase tracking-widest mb-1">OFFICIAL STRATEGIC SUPPORT</p>
                  <p className="text-sm md:text-lg text-stone-900 font-black break-all">solidarityforchristian@helpthepoor.space</p>
                </div>
              </div>
              
              <div className="mt-20 md:mt-32 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 text-emerald-200 text-xs md:text-lg font-black uppercase tracking-[0.4em] md:tracking-[0.8em] opacity-80">
                <div className="flex items-center gap-4">
                  <ShieldCheck size={32} strokeWidth={4} className="text-emerald-400" /> AES-256 SECURE
                </div>
                <div className="flex items-center gap-4">
                  <ShieldAlert size={32} strokeWidth={4} className="text-orange-500" /> FIELD IMPACT AUDIT
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Standalone BOLD Crypto Section */}
        <section className="max-w-6xl mx-auto mb-24 md:mb-48 px-4">
          <div className="bg-white rounded-[4rem] md:rounded-[6rem] p-8 md:p-24 shadow-[0_60px_120px_rgba(16,185,129,0.4)] border-[10px] md:border-[20px] border-emerald-600 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400"></div>
            
            <div className="relative z-10 text-center mb-16">
              <div className="inline-flex p-6 md:p-10 bg-emerald-50 text-emerald-600 rounded-[3rem] mb-8 md:mb-12 shadow-inner border-2 border-emerald-100 group-hover:scale-110 transition-transform duration-700">
                <Coins size={60} className="w-16 h-16 md:w-24 md:h-24" strokeWidth={3} />
              </div>
              <h3 className="text-4xl md:text-[8rem] font-serif font-black text-emerald-950 mb-6 md:mb-10 tracking-tighter uppercase leading-[0.8]">CRYPTO <br className="md:hidden"/>COMMAND</h3>
              <p className="text-stone-500 text-sm md:text-3xl font-black uppercase tracking-[0.3em] md:tracking-[0.6em] mb-12 italic">Secure Blockchain Gateway</p>
            </div>

            <div className="bg-stone-50 rounded-[3rem] md:rounded-[4.5rem] p-2 md:p-16 border-[4px] md:border-[6px] border-stone-200 shadow-[inset_0_20px_60px_rgba(0,0,0,0.12)] flex justify-center items-center overflow-visible relative min-h-[500px] md:min-h-[850px]">
              <div className="relative transform origin-center scale-[0.8] sm:scale-[0.9] md:scale-[1.2] lg:scale-[1.4] transition-transform duration-500 py-10">
                <iframe 
                  src="https://nowpayments.io/embeds/donation-widget?api_key=add76091-41b8-416e-8a79-d2f46c83658b" 
                  width="346" 
                  height="623" 
                  frameBorder="0" 
                  scrolling="no" 
                  className="mx-auto block"
                  style={{ 
                    overflowY: 'hidden', 
                    maxWidth: '100%',
                    backgroundColor: 'transparent'
                  }}
                >
                    Can't load widget
                </iframe>
              </div>
            </div>

            <div className="mt-16 md:mt-24 flex flex-col items-center gap-6">
              <div className="flex items-center gap-4 text-emerald-600 font-black text-sm md:text-2xl uppercase tracking-[0.3em] text-center px-4">
                 <ShieldCheck size={40} className="hidden sm:block" /> VERIFIED BLOCKCHAIN PROTOCOL
              </div>
              <p className="text-stone-400 text-xs md:text-xl font-bold max-w-2xl text-center leading-relaxed px-4">
                 All cryptocurrency donations are automatically verified and integrated into the global progress monitor. <br className="hidden md:block"/>
                 Official audit channel: <span className="text-emerald-700">solidarityforchristian@helpthepoor.space</span>
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="max-w-5xl mx-auto mb-24 md:mb-48 px-4">
           <div className="bg-white border-[4px] border-emerald-900/10 rounded-[2.5rem] md:rounded-[4.5rem] p-10 md:p-24 text-center shadow-2xl relative overflow-hidden">
             <div className="absolute -left-20 -bottom-20 opacity-5">
               <Mail size={300} className="text-emerald-900" />
             </div>
             <div className="relative z-10">
               <h3 className="text-3xl md:text-6xl font-serif font-black text-emerald-950 mb-6 md:mb-10 tracking-tight uppercase">Mission News Network</h3>
               <p className="text-lg md:text-3xl font-bold text-stone-600 mb-10 md:mb-16 leading-tight">Subscribe to receive field reports and mission update notifications.</p>
               
               <form 
                  action="https://space.us3.list-manage.com/subscribe/post?u=799da859e9754bdec60f12f44&amp;id=a8fb066b78&amp;f_id=007cf2e0f0" 
                  method="post" 
                  id="mc-embedded-subscribe-form" 
                  name="mc-embedded-subscribe-form" 
                  target="_blank" 
                  className="space-y-6 max-w-2xl mx-auto text-left"
               >
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="mce-FNAME" className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 ml-4">First Name</label>
                      <input type="text" name="FNAME" id="mce-FNAME" className="w-full bg-stone-100 border-2 border-stone-200 px-6 py-5 rounded-2xl text-lg font-bold outline-none focus:border-emerald-500 transition-all shadow-inner" placeholder="Optional" />
                    </div>
                    <div>
                      <label htmlFor="mce-LNAME" className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 ml-4">Last Name</label>
                      <input type="text" name="LNAME" id="mce-LNAME" className="w-full bg-stone-100 border-2 border-stone-200 px-6 py-5 rounded-2xl text-lg font-bold outline-none focus:border-emerald-500 transition-all shadow-inner" placeholder="Optional" />
                    </div>
                 </div>
                 
                 <div>
                    <label htmlFor="mce-EMAIL" className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 ml-4">Email Address *</label>
                    <input type="email" name="EMAIL" id="mce-EMAIL" required className="w-full bg-stone-100 border-2 border-stone-200 px-6 py-5 rounded-2xl text-lg font-bold outline-none focus:border-emerald-500 transition-all shadow-inner" placeholder="required@example.com" />
                 </div>

                 <div className="hidden" aria-hidden="true">
                   <input type="text" name="b_799da859e9754bdec60f12f44_a8fb066b78" tabIndex={-1} defaultValue="" readOnly />
                 </div>

                 <button type="submit" name="subscribe" id="mc-embedded-subscribe" className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-black py-6 md:py-8 rounded-2xl md:rounded-3xl text-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 border-b-8 border-emerald-900 uppercase tracking-widest">
                   JOIN THE NEWS NETWORK <CheckCircle2 />
                 </button>
               </form>
               
               <p className="mt-10 text-[10px] md:text-xs text-stone-400 font-black uppercase tracking-[0.4em] opacity-60">
                 Encrypted Subscription via MailChimp Direct Link
               </p>
             </div>
           </div>
        </section>

        {/* Social Network Section */}
        <section className="mb-24 md:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            <div className="bg-white p-10 md:p-20 rounded-[3rem] md:rounded-[4.5rem] shadow-2xl border-[4px] border-emerald-50 flex flex-col justify-between group">
               <div>
                 <div className="flex items-center gap-6 mb-10">
                   <div className="p-5 md:p-8 bg-emerald-700 text-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl group-hover:rotate-6 transition-transform">
                     <Twitter className="w-8 h-8 md:w-12 md:h-12" strokeWidth={3} />
                   </div>
                   <h3 className="text-3xl md:text-5xl font-black text-emerald-950 tracking-tighter uppercase">Mission X Status</h3>
                 </div>
                 <p className="text-stone-700 text-xl md:text-3xl font-bold mb-12 leading-tight">
                   Connect with our central global command for live status updates and <span className="text-emerald-700 underline decoration-4">verified mission progress</span>.
                 </p>
               </div>
               <a href="https://x.com/helpthepoorr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-4 px-10 md:px-14 py-6 md:py-9 bg-emerald-950 text-white rounded-2xl md:rounded-3xl font-black text-xl md:text-3xl hover:bg-emerald-800 transition-all shadow-2xl group/btn uppercase">
                 Follow Mission X <ExternalLink />
               </a>
            </div>

            <div className="bg-white p-10 md:p-20 rounded-[3rem] md:rounded-[4.5rem] shadow-2xl border-[4px] border-amber-50 group">
               <div className="flex items-center gap-6 mb-12">
                 <div className="p-5 md:p-8 bg-amber-500 text-stone-950 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl group-hover:-rotate-6 transition-transform">
                   <Globe className="w-8 h-8 md:w-12 md:h-12" strokeWidth={3} />
                 </div>
                 <h3 className="text-3xl md:text-5xl font-black text-stone-950 tracking-tighter uppercase">Strategic Partners</h3>
               </div>
               <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <SocialIcon href="https://x.com/realDonaldTrump" icon={<Twitter />} label="Trump X" color="bg-stone-950" />
                  <SocialIcon href="https://www.facebook.com/DonaldTrump" icon={<Facebook />} label="Trump FB" color="bg-blue-600" />
                  <SocialIcon href="https://www.instagram.com/realdonaldtrump" icon={<Instagram />} label="Trump IG" color="bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600" />
                  <SocialIcon href="https://www.youtube.com/user/donaldjtrumpforpresident" icon={<Youtube />} label="Trump YT" color="bg-red-600" />
               </div>
            </div>
          </div>
        </section>

        {/* Global Action Footer Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mt-12 pb-32 px-4">
           <a href="https://x.com/realDonaldTrump" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 px-10 py-7 md:py-10 bg-stone-950 text-white rounded-2xl md:rounded-[2.5rem] font-black text-xl md:text-3xl hover:shadow-2xl hover:scale-105 transition-all shadow-xl active:scale-95 border-b-8 border-stone-800 flex-1 max-w-sm uppercase">
             <Twitter fill="white" size={32} /> Donald Trump X
           </a>
           <a href="https://x.com/helpthepoorr" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 px-10 py-7 md:py-10 bg-emerald-700 text-white rounded-2xl md:rounded-[2.5rem] font-black text-xl md:text-3xl hover:bg-emerald-600 hover:scale-105 transition-all shadow-xl active:scale-95 border-b-8 border-emerald-900 flex-1 max-w-sm uppercase">
             <Twitter fill="white" size={32} /> Mission Updates
           </a>
        </div>
      </main>

      <footer className="relative z-10 bg-emerald-950 text-emerald-100 py-20 md:py-40 px-6 border-t-[10px] md:border-t-[20px] border-orange-600">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 mb-16 md:mb-32 border-b border-white/10 pb-16 md:pb-32">
            <div>
              <h4 className="text-white font-serif text-3xl md:text-5xl font-black mb-8 md:mb-12 tracking-tighter uppercase">Solidarity Mission</h4>
              <p className="text-lg md:text-3xl font-bold leading-relaxed opacity-80">
                A premier global unified effort to protect faith and eradicate poverty. Professional direct-action projects across 120 nations.
              </p>
              <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10">
                <h5 className="text-orange-500 font-black text-xs uppercase tracking-widest mb-2">OFFICIAL SUPPORT CHANNEL</h5>
                <a href="mailto:solidarityforchristian@helpthepoor.space" className="text-white font-bold text-lg md:text-xl break-all hover:text-orange-400 transition-colors">
                  solidarityforchristian@helpthepoor.space
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-orange-500 font-serif text-xl md:text-2xl font-black mb-8 md:mb-12 uppercase tracking-[0.3em]">Directives</h4>
              <ul className="space-y-6 md:space-y-10 text-lg md:text-2xl font-bold">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-4">Verified Impact Map <ExternalLink size={20} /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-4">2026 Strategic Plan <ExternalLink size={20} /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-4">Transparency Reports <ExternalLink size={20} /></a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-serif text-xl md:text-2xl font-black mb-8 md:mb-12 uppercase tracking-[0.3em]">Official Channels</h4>
              <div className="flex gap-4 md:gap-8 mb-10 md:mb-16">
                <a href="https://x.com/helpthepoorr" className="p-5 bg-white/10 rounded-[1.25rem] hover:bg-orange-600 hover:text-white transition-all"><Twitter size={28} /></a>
                <a href="https://www.facebook.com/DonaldTrump" className="p-5 bg-white/10 rounded-[1.25rem] hover:bg-orange-600 hover:text-white transition-all"><Facebook size={28} /></a>
                <a href="https://www.instagram.com/realdonaldtrump" className="p-5 bg-white/10 rounded-[1.25rem] hover:bg-orange-600 hover:text-white transition-all"><Instagram size={28} /></a>
                <a href="https://www.youtube.com/user/donaldjtrumpforpresident" className="p-5 bg-white/10 rounded-[1.25rem] hover:bg-orange-600 hover:text-white transition-all"><Youtube size={28} /></a>
              </div>
              <p className="text-[10px] md:text-sm font-black opacity-40 uppercase tracking-[0.6em]">Solidarity Plaza Global HQ</p>
            </div>
          </div>
          <div className="text-center text-[10px] md:text-sm font-black tracking-[0.4em] md:tracking-[1em] uppercase opacity-40">
            &copy; {new Date().getFullYear()} Solidarity for Persecuted Christians. <br className="md:hidden"/> Unity. Restoration. Dignity.
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes stripe-move {
          0% { background-position: 0 0; }
          100% { background-position: 60px 0; }
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const SocialIcon = ({ href, icon, label, color }: { href: string; icon: React.ReactElement; label: string; color: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex flex-col items-center gap-2 md:gap-4 group"
  >
    <div className={`p-5 md:p-8 bg-stone-100 text-stone-700 rounded-2xl md:rounded-[2.5rem] group-hover:${color} group-hover:text-white transition-all shadow-md group-hover:shadow-2xl group-hover:-translate-y-2 md:group-hover:-translate-y-4`}>
      {React.cloneElement(icon, { size: 28, strokeWidth: 4 } as any)}
    </div>
    <span className="text-[9px] md:text-[13px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-stone-500 group-hover:text-stone-950 transition-colors text-center">{label}</span>
  </a>
);

export default App;
