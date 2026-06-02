import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, BookOpen, Lightbulb, Compass, Calendar, ArrowRight, Rocket, Users } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { getLocalizedMockData } from '../utils/translations';

export default function InnovationHub({ darkMode, language = 'en' }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const mockData = getLocalizedMockData(language);

  const [activeSubTab, setActiveSubTab] = useState('schemes');
  const [govSchemes, setGovSchemes] = useState(mockData.schemes);
  const [skillWorkshops, setSkillWorkshops] = useState(mockData.skills);
  const [startupPitches, setStartupPitches] = useState(mockData.startups);
  const [successStories, setSuccessStories] = useState(mockData.successStories);

  // Sync data when language changes
  useEffect(() => {
    setGovSchemes(mockData.schemes);
    setSkillWorkshops(mockData.skills);
    setStartupPitches(mockData.startups);
    setSuccessStories(mockData.successStories);
  }, [language]);

  const tabs = [
    { id: 'schemes', label: t.innovation.schemes, icon: ShieldCheck, emoji: '🏛️' },
    { id: 'skills', label: t.innovation.training || "Skills", icon: BookOpen, emoji: '📚' },
    { id: 'startups', label: t.innovation.startups, icon: Lightbulb, emoji: '💡' },
    { id: 'stories', label: t.landing?.successTitle || "Stories", icon: Award, emoji: '🏆' }
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 pb-20 text-left max-w-7xl mx-auto w-full">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">
            {t.innovation.title}
          </h2>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {t.innovation.desc}
          </p>
        </div>

        {/* Sub-tab selection */}
        <div className={`p-1 rounded-xl flex items-center border text-xs font-semibold overflow-x-auto no-scrollbar ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {tabs.map((tabItem) => {
            const Icon = tabItem.icon;
            return (
              <button
                key={tabItem.id}
                onClick={() => setActiveSubTab(tabItem.id)}
                className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all flex-shrink-0 ${
                  activeSubTab === tabItem.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{tabItem.emoji}</span> {tabItem.label}
              </button>
            );
          })}
        </div>
      </div>

      <hr className={darkMode ? 'border-slate-800/60' : 'border-slate-100'} />

      {/* 1. Government Schemes Grid */}
      {activeSubTab === 'schemes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {govSchemes.map((scheme, idx) => (
            <div key={scheme.id} className={`p-6 rounded-3xl border flex flex-col justify-between hover-lift animate-fadeInUp ${
              darkMode ? 'glass-card' : 'bg-white border-slate-150 shadow-sm'
            }`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {language === 'kn' ? 'ಸಬ್ಸಿಡಿ ಯೋಜನೆ' : language === 'hi' ? 'सब्सिडी कार्यक्रम' : language === 'ta' ? 'மானிய திட்டம்' : 'Subsidy Program'}
                  </span>
                </div>
                <h3 className={`text-base font-bold leading-snug ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {scheme.name}
                </h3>
                <div className="text-xs space-y-2">
                  <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
                    <strong className={`block mb-0.5 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{t.innovation.benefit || "Benefit"}:</strong>
                    {scheme.benefit}
                  </p>
                  <p className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
                    <strong className={`block mb-0.5 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{t.innovation.criteria || "Eligibility"}:</strong>
                    {scheme.criteria}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => alert(`Enrolling in ${scheme.name}...`)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all mt-6 shadow-md flex items-center justify-center gap-1 active:scale-95"
              >
                {t.innovation.applyBtn || "Apply Now"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 2. Skills Timeline Schedule */}
      {activeSubTab === 'skills' && (
        <div className={`p-6 rounded-3xl border ${
          darkMode ? 'glass-card timeline-line' : 'bg-white border-slate-100 shadow-sm timeline-line-light'
        } space-y-8 pl-12 animate-fadeIn`}>
          {skillWorkshops.map((prog, idx) => (
            <div key={idx} className="relative text-left animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
              <span className={`absolute -left-[30px] top-1.5 w-4.5 h-4.5 rounded-full border-4 flex items-center justify-center ${
                prog.status.includes('Open') || prog.status.includes('ಸಕ್ರಿಯ') || prog.status.includes('खुला') || prog.status.includes('சேரலாம்')
                  ? 'bg-emerald-500 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.4)]' 
                  : 'bg-sky-500 border-sky-500/30'
              }`} />
              
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                  {language === 'kn' ? 'ದಿನಾಂಕ' : language === 'hi' ? 'दिनांक' : language === 'ta' ? 'தேதி' : language === 'te' ? 'తేదీ' : 'Date'}: {prog.date}
                </span>
                <h3 className={`text-base font-bold mt-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {prog.title}
                </h3>
                <div className="flex flex-wrap gap-3 items-center text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                  <span>Provider: <strong className={darkMode ? 'text-slate-200' : 'text-slate-700'}>{prog.provider}</strong></span>
                  <span>{language === 'kn' ? 'ಅವಧಿ' : language === 'hi' ? 'अवधि' : language === 'ta' ? 'கால அளவு' : language === 'te' ? 'వ్యవధి' : 'Duration'}: <strong>{prog.duration}</strong></span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${
                    prog.status.includes('Open') || prog.status.includes('ಸಕ್ರಿಯ') || prog.status.includes('खुला') || prog.status.includes('சேரலாம்')
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                      : 'bg-slate-500/10 text-slate-400 border-slate-500/25'
                  }`}>
                    {prog.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Rural Startup Pitchboard */}
      {activeSubTab === 'startups' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {startupPitches.map((idea, idx) => (
            <div key={idx} className={`p-6 rounded-3xl border flex flex-col justify-between hover-lift animate-fadeInUp ${
              darkMode ? 'glass-card' : 'bg-white border-slate-150 shadow-sm'
            }`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    idea.stage.includes('Profit') || idea.stage.includes('ಲಾಭದಾಯಕ') || idea.stage.includes('लाभ') || idea.stage.includes('இலாபகரம்')
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : idea.stage.includes('Pilot') || idea.stage.includes('ಪ್ರಾಯೋಗಿಕ') || idea.stage.includes('पायलट') || idea.stage.includes('பரிசோதனை')
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-sky-500/10 text-sky-400'
                  }`}>
                    <Rocket className="w-3.5 h-3.5 inline mr-1" />{idea.stage}
                  </span>
                  <span className="text-emerald-500 font-bold">{idea.fundingRequired}</span>
                </div>
                <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {idea.title}
                </h3>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {idea.description}
                </p>
              </div>

              <button 
                onClick={() => alert(`Connecting with startup partners: ${idea.title}...`)}
                className="w-full bg-sky-500/15 hover:bg-sky-500 hover:text-white text-sky-400 font-bold py-2.5 rounded-xl text-xs transition-all mt-6 border border-sky-500/20 active:scale-95"
              >
                {language === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : language === 'hi' ? 'संपर्क करें' : language === 'ta' ? 'தொடர்பு கொள்ளவும்' : language === 'te' ? 'సంప్రదించండి' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 4. Stories Board */}
      {activeSubTab === 'stories' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map((story, idx) => (
            <div key={story.id} className={`p-6 rounded-3xl border flex flex-col justify-between hover-lift animate-fadeInUp ${
              darkMode ? 'glass-card' : 'bg-white border-slate-150 shadow-sm'
            }`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <strong className={`block text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>{story.name}</strong>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      {story.role}
                    </span>
                  </div>
                </div>
                <p className={`text-xs italic leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{story.text}"
                </p>
              </div>
              <div className={`mt-6 pt-4 border-t ${darkMode ? 'border-slate-800/80' : 'border-slate-100'}`}>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Users className="w-3 h-3" /> {story.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
