import React, { useState, useEffect, useRef } from 'react';
import { Sprout, Compass, Shield, Award, Users, ChevronLeft, ChevronRight, Zap, ArrowRight, Cpu, Droplet, BarChart3, Satellite } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { getLocalizedMockData } from '../utils/translations';

// Animated counter hook
function useAnimatedCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const startTime = Date.now();
    const numericTarget = parseInt(target.replace(/[^0-9.]/g, ''));
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(numericTarget * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

export default function LandingPage({ setActiveTab, darkMode, language = 'en' }) {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const mockData = getLocalizedMockData(language);
  const successStories = mockData.successStories || [
    { id: 1, name: "Savita Kamble", role: "Millets Farmer", text: "Using GramVerse's Digital Twin simulations, I adjusted my irrigation times and saved 40% water while increasing my ragi yield by 25%.", location: "Khed, Pune" }
  ];

  // Auto-rotate stories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStoryIdx((prev) => (prev + 1) % successStories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [successStories.length]);

  const stats = [
    { value: '420', label: t.landing.statFarmers, desc: language === 'kn' ? 'ಪ್ರತಿದಿನ ನಿಖರವಾದ ಹೂಡಿಕೆಗಳನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸುವುದು' : language === 'hi' ? 'दैनिक सटीक इनपुट लागू करना' : language === 'ta' ? 'விவசாய உள்ளீடுகளை தினமும் பயன்படுத்துகிறார்கள்' : 'Implementing precise inputs daily', icon: Users, color: 'from-emerald-500 to-teal-500', prefix: '', suffix: '+' },
    { value: '40', label: t.landing.statAcres, desc: language === 'kn' ? 'ಮುನ್ಸೂಚಕ ನೀರಾವರಿ ಮಾದರಿಯ ಮೂಲಕ' : language === 'hi' ? 'पूर्वानुमानित सिंचाई मॉडलिंग के माध्यम से' : language === 'ta' ? 'நீர்ப்பாசன உருவகப்படுத்துதல் மூலம்' : 'Through predictive irrigation modeling', icon: Droplet, color: 'from-sky-500 to-blue-500', prefix: '', suffix: '%' },
    { value: '25', label: t.landing.statSensors, desc: language === 'kn' ? 'ಸರಾಸರಿ ಉತ್ಪಾದನೆ ಸುಧಾರಣೆ' : language === 'hi' ? 'औसत उत्पादन में सुधार' : language === 'ta' ? 'சராசரி உற்பத்தி மேம்பாடு' : 'Average output improvement', icon: BarChart3, color: 'from-amber-500 to-orange-500', prefix: '', suffix: '%' },
    { value: '48', label: t.landing.statMandi, desc: language === 'kn' ? 'ಪ್ರತಿ ಕ್ಲಸ್ಟರ್‌ಗೆ ಸರಾಸರಿ ವಾರ್ಷಿಕ ಆದಾಯ ಹೆಚ್ಚಳ' : language === 'hi' ? 'प्रति क्लस्टर औसत वार्षिक आय में वृद्धि' : language === 'ta' ? 'ஆண்டு வருமான அதிகரிப்பு' : 'Avg. annual increase per cluster', icon: Award, color: 'from-purple-500 to-pink-500', prefix: '₹', suffix: 'L' }
  ];

  const counter1 = useAnimatedCounter('420');
  const counter2 = useAnimatedCounter('40');
  const counter3 = useAnimatedCounter('25');
  const counter4 = useAnimatedCounter('48');
  const counters = [counter1, counter2, counter3, counter4];

  const corePillars = [
    { title: t.nav.advisor, icon: Sprout, text: t.landing.btnAdvisor, tab: 'advisor', color: 'from-emerald-500 to-teal-400', emoji: '🧠' },
    { title: t.nav.digitaltwin, icon: Compass, text: t.landing.btnTwin, tab: 'twin', color: 'from-sky-500 to-indigo-500', emoji: '🛰️' },
    { title: t.nav.marketplace, icon: Shield, text: t.marketplace.desc, tab: 'marketplace', color: 'from-amber-500 to-orange-500', emoji: '🏪' },
    { title: t.nav.impact, icon: BarChart3, text: t.impact.desc, tab: 'impact', color: 'from-purple-500 to-pink-500', emoji: '📊' }
  ];

  const handleNextStory = () => {
    setActiveStoryIdx((prev) => (prev + 1) % successStories.length);
  };

  const handlePrevStory = () => {
    setActiveStoryIdx((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  return (
    <div className="min-h-full flex flex-col justify-between pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-12 md:py-20 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Animated ambient dots in background */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="flex-1 space-y-6 text-left max-w-2xl z-10 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.landing.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] font-heading">
            {t.landing.title.includes('Empowering') ? 'Empowering Rural Villages with ' : ''}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              {language === 'kn' ? 'ಕೃಷಿ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ' : language === 'hi' ? 'कृषि एआई' : language === 'ta' ? 'விவசாய ஏஐ' : 'Agricultural AI'}
            </span>
            {!t.landing.title.includes('Empowering') && ` ${t.landing.title}`}
            {t.landing.title.includes('Empowering') && ' '}
          </h1>
          <p className={`text-base md:text-lg leading-relaxed max-w-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.landing.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => setActiveTab('twin')}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2 group text-sm"
            >
              {t.landing.btnTwin}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab('advisor')}
              className={`px-8 py-4 rounded-xl font-bold border transition-all text-center flex items-center justify-center gap-2 text-sm ${
                darkMode 
                  ? 'border-slate-700 bg-slate-800/40 hover:bg-slate-800 text-white' 
                  : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Cpu className="w-4 h-4" />
              {t.landing.btnAdvisor}
            </button>
          </div>
        </div>

        {/* Hero Interactive Illustration */}
        <div className="flex-1 w-full max-w-md lg:max-w-lg z-10 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className={`p-6 rounded-[32px] ${
            darkMode ? 'glass-card glow-green' : 'glass-card-light shadow-xl'
          } relative overflow-hidden`}>
            
            {/* Visual Node Grid showing Digital Village Concept */}
            <div className={`aspect-[4/3] rounded-2xl overflow-hidden relative flex items-center justify-center p-4 border ${
              darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
              
              {/* Spinning main satellite node */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-3xl z-15 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-float">
                🛰️
              </div>

              {/* Orbiting nodes */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="animate-orbit" style={{ animationDuration: '10s' }}>
                  <div className="p-2 bg-sky-500/20 border border-sky-500 rounded-xl text-lg shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                    🌦️
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="animate-orbit" style={{ animationDuration: '14s', animationDelay: '-4s' }}>
                  <div className="p-2 bg-amber-500/20 border border-amber-500 rounded-xl text-lg shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    📊
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="animate-orbit" style={{ animationDuration: '18s', animationDelay: '-9s' }}>
                  <div className="p-2 bg-emerald-500/20 border border-emerald-500 rounded-xl text-lg shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    🌾
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="animate-orbit" style={{ animationDuration: '22s', animationDelay: '-14s' }}>
                  <div className="p-2 bg-purple-500/20 border border-purple-500 rounded-xl text-lg shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    🚀
                  </div>
                </div>
              </div>

              {/* Connected node lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-emerald-500/20 stroke-1 fill-none">
                <circle cx="50%" cy="50%" r="60" strokeDasharray="4,4" className="animate-spin-slow" />
                <circle cx="50%" cy="50%" r="90" strokeDasharray="4,4" className="animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
              </svg>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>{language === 'kn' ? 'ಸಿಸ್ಟಮ್ ಸ್ಥಿತಿ' : language === 'hi' ? 'सिस्टम स्थिति' : language === 'ta' ? 'கணினி நிலை' : 'System Status'}</span>
              <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                {language === 'kn' ? 'ಲೈವ್ ಸಂಪರ್ಕ ಪರಿಶೀಲಿಸಲಾಗಿದೆ' : language === 'hi' ? 'लाइव कनेक्शन सत्यापित' : language === 'ta' ? 'நேரலை இணைப்பு சரிபார்க்கப்பட்டது' : 'Live Connection Verified'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const counter = counters[idx];
            return (
              <div 
                key={idx} 
                ref={counter.ref}
                className={`p-6 rounded-2xl hover-lift animate-fadeInUp ${
                  darkMode ? 'glass-card' : 'bg-white shadow-sm border border-slate-100'
                } text-left`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-emerald-500 tracking-tighter tabular-nums">
                  {stat.prefix}{counter.count}{stat.suffix}
                </div>
                <div className={`text-sm font-bold mt-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {stat.label}
                </div>
                <div className={`text-xs mt-1 leading-snug ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {stat.desc}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Technology Pillars */}
      <section className="px-6 py-12 max-w-7xl mx-auto w-full text-left space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading">
            {language === 'kn' ? 'ಗ್ರಾಮೀಣ ತಂತ್ರಜ್ಞಾನ ಕೇಂದ್ರ' : language === 'hi' ? 'ग्रामीण प्रौद्योगिकी केंद्र' : language === 'ta' ? 'கிராமப்புற தொழில்நுட்ப மையம்' : 'Village Technology Hub'}
          </h2>
          <p className={`text-sm mt-1 max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {language === 'kn' ? 'ಸ್ಥಳೀಯ ಉತ್ಪಾದನೆಯನ್ನು ವೇಗಗೊಳಿಸಲು, ಇಂಗಾಲದ ಹೊರಸೂಸುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ನೇರ ನ್ಯಾಯಯುತ ಬೆಲೆಗಳನ್ನು ಭದ್ರಪಡಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ನಮ್ಮ ಮೂಲಭೂತ ಮಾಡ್ಯೂಲ್ಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.' : language === 'hi' ? 'स्थानीय उत्पादन को गति देने, कार्बन उत्सर्जन को कम करने और सीधे उचित मूल्य सुरक्षित करने के लिए डिज़ाइन किए गए हमारे मुख्य मॉड्यूल का अन्वेषण करें।' : language === 'ta' ? 'உள்ளூர் உற்பத்தியை அதிகரிக்க, கார்பன் உமிழ்வைக் குறைக்க மற்றும் நியாயமான விலையைப் பெற வடிவமைக்கப்பட்ட எங்களது முக்கிய மாட்யூல்களை ஆராயுங்கள்.' : 'Explore our foundational modules engineered to accelerate local production, decrease carbon output, and secure direct fair pricing.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx} 
                onClick={() => setActiveTab(p.tab)}
                className={`p-6 rounded-3xl border cursor-pointer hover-lift group transition-all duration-300 animate-fadeInUp ${
                  darkMode 
                    ? 'glass-card border-slate-800 hover:border-emerald-500/30' 
                    : 'bg-white border-slate-100 hover:border-emerald-500 shadow-sm hover:shadow-md'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${p.color} flex items-center justify-center text-white shadow-inner`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl">{p.emoji}</span>
                </div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {p.title}
                </h3>
                <p className={`text-xs mt-3 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {p.text}
                </p>
                <div className={`mt-4 flex items-center gap-1.5 text-xs font-bold ${
                  darkMode ? 'text-emerald-400' : 'text-emerald-600'
                } group-hover:gap-2.5 transition-all`}>
                  <span>{t.common.viewDetails}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Success Stories Carousel */}
      <section className="px-6 py-10 max-w-5xl mx-auto w-full">
        <div className={`p-6 md:p-10 rounded-[32px] ${
          darkMode ? 'glass-card' : 'bg-white shadow-sm border border-slate-100'
        } relative text-left overflow-hidden`}>
          
          {/* Shimmer overlay */}
          <div className="absolute inset-0 animate-shimmer pointer-events-none" />
          
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-6 uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>{t.landing.successTitle}</span>
          </div>

          <div className="space-y-4 relative z-10">
            <blockquote className={`text-lg md:text-xl font-medium italic leading-relaxed ${
              darkMode ? 'text-slate-200' : 'text-slate-700'
            }`}>
              "{successStories[activeStoryIdx].text}"
            </blockquote>
            
            <div className={`flex items-center justify-between pt-4 border-t ${
              darkMode ? 'border-slate-800/80' : 'border-slate-100'
            }`}>
              <div>
                <cite className={`not-italic font-bold text-base block ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {successStories[activeStoryIdx].name}
                </cite>
                <span className="text-xs text-slate-400 block mt-0.5">
                  {successStories[activeStoryIdx].role} — {successStories[activeStoryIdx].location}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 mr-2">
                  {successStories.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStoryIdx(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === activeStoryIdx 
                          ? 'bg-emerald-500 w-6' 
                          : darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <button 
                  onClick={handlePrevStory}
                  className={`p-2.5 rounded-full border transition-all ${
                    darkMode ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleNextStory}
                  className={`p-2.5 rounded-full border transition-all ${
                    darkMode ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Navigation Bar */}
      <section className="px-6 py-6 max-w-7xl mx-auto w-full">
        <div className={`p-6 rounded-3xl ${
          darkMode ? 'glass-card' : 'bg-white shadow-sm border border-slate-100'
        }`}>
          <h3 className={`text-sm font-bold mb-4 uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {language === 'kn' ? 'ತ್ವರಿತ ಪ್ರವೇಶ' : language === 'hi' ? 'त्वरित पहुंच' : language === 'ta' ? 'விரைவான அணுகல்' : 'Quick Access'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { label: t.nav.dashboard, icon: '📊', tab: 'dashboard' },
              { label: t.nav.map, icon: '🗺️', tab: 'map' },
              { label: t.nav.irrigation, icon: '💧', tab: 'irrigation' },
              { label: t.nav.innovation, icon: '💡', tab: 'innovation' },
              { label: t.nav.collab || (language === 'kn' ? 'ಸಹಯೋಗ ವೇದಿಕೆ' : language === 'hi' ? 'सहयोग मंच' : language === 'ta' ? 'ஒத்துழைப்பு மன்றம்' : 'Community'), icon: '👥', tab: 'community' }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(item.tab)}
                className={`p-4 rounded-2xl border text-center transition-all duration-300 hover:scale-105 active:scale-95 ${
                  darkMode 
                    ? 'border-slate-800 hover:border-emerald-500/30 hover:bg-emerald-500/5' 
                    : 'border-slate-100 hover:border-emerald-500 hover:bg-emerald-50'
                }`}
              >
                <span className="text-2xl block mb-2">{item.icon}</span>
                <span className="text-xs font-bold block truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
