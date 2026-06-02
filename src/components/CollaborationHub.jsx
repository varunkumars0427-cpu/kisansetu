import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Search, HelpCircle, User, Compass, Send, CheckCircle, ThumbsUp, Clock } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { getLocalizedMockData } from '../utils/translations';

export default function CollaborationHub({ darkMode, language = 'en' }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const mockData = getLocalizedMockData(language);

  const [threads, setThreads] = useState(mockData.threads);
  const [searchVal, setSearchVal] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [activeThreadDetail, setActiveThreadDetail] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Sync threads when language changes
  useEffect(() => {
    setThreads(mockData.threads);
  }, [language]);

  const categories = [
    { id: 'All', label: t.collab.allTopics, emoji: '📋' },
    { id: 'Pests & Disease', label: t.collab.pests, emoji: '🐛' },
    { id: 'Green Energy', label: t.collab.greenEnergy, emoji: '⚡' },
    { id: 'Mandi Rates', label: t.collab.mandiRates, emoji: '📊' },
    { id: 'Soil Experts', label: language === 'kn' ? 'ಮಣ್ಣಿನ ತಜ್ಞರು' : language === 'hi' ? 'मिट्टी विशेषज्ञ' : language === 'ta' ? 'மண் வல்லுநர்கள்' : 'Soil Experts', emoji: '🌱' }
  ];

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!questionTitle || !questionContent) return;

    const newThread = {
      id: Date.now(),
      title: questionTitle,
      category: activeCategory === 'All' ? 'Soil Experts' : activeCategory,
      author: language === 'kn' ? 'ಪಾಟೀಲ್ ಫಾರ್ಮ್ (ನೀವು)' : language === 'hi' ? 'पाटिल फार्म (आप)' : language === 'ta' ? 'பாட்டீல் பண்ணை (நீங்கள்)' : "Patil Farm (You)",
      replies: 2,
      likes: 1,
      lastActive: language === 'kn' ? 'ಈಗಷ್ಟೇ' : language === 'hi' ? 'अभी' : language === 'ta' ? 'இப்போது' : "Just now",
      content: questionContent,
      comments: [
        {
          author: language === 'kn' ? 'ಕಿಸಾನ್‌ಸೇತು ಎಐ ತಜ್ಞ' : language === 'hi' ? 'किसानसेतु एआई विशेषज्ञ' : language === 'ta' ? 'கிசான்சேது ஏஐ நிபுணர்' : "KisanSetu AI Expert",
          role: "AI Consultant",
          text: language === 'kn'
            ? "ಪ್ರಶ್ನೆಗೆ ಧನ್ಯವಾದಗಳು! ಸ್ಥಳೀಯ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ, ನೀವು ಮೊದಲು ಬೇರು ವ್ಯವಸ್ಥೆಯನ್ನು ಪರೀಕ್ಷಿಸಲು ನಾನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ."
            : language === 'hi'
              ? "पोस्ट करने के लिए धन्यवाद! स्थानीय परिस्थितियों के आधार पर, मैं पहले जड़ प्रणालियों की जांच करने की सलाह देता हूं।"
              : language === 'ta'
                ? "கேள்விக்கு நன்றி! உள்ளூர் நிலைமைகளின் அடிப்படையில், முதலில் வேர் அமைப்புகளை ஆராய பரிந்துரைக்கிறேன்."
                : `Thanks for posting! Based on local conditions, I recommend examining the root systems first.`,
          time: "1s ago",
          likes: 3
        }
      ]
    };

    setThreads((prev) => [newThread, ...prev]);
    setQuestionTitle('');
    setQuestionContent('');
    setShowQuestionForm(false);
    setActiveThreadDetail(newThread);
  };

  const handlePostReply = () => {
    if (!replyText.trim() || !activeThreadDetail) return;
    
    const updatedThread = {
      ...activeThreadDetail,
      replies: activeThreadDetail.replies + 1,
      comments: [
        ...(activeThreadDetail.comments || []),
        {
          author: language === 'kn' ? 'ಪಾಟೀಲ್ ಫಾರ್ಮ್ (ನೀವು)' : language === 'hi' ? 'पाटिल फार्म (आप)' : language === 'ta' ? 'பாட்டீல் பண்ணை (நீங்கள்)' : "Patil Farm (You)",
          role: language === 'kn' ? 'ಸದಸ್ಯರು' : language === 'hi' ? 'सदस्य' : language === 'ta' ? 'உறுப்பினர்' : "Member",
          text: replyText,
          time: language === 'kn' ? 'ಈಗಷ್ಟೇ' : language === 'hi' ? 'अभी' : language === 'ta' ? 'இப்போது' : "Just now",
          likes: 0
        }
      ]
    };
    
    setActiveThreadDetail(updatedThread);
    setThreads(prev => prev.map(t => t.id === updatedThread.id ? updatedThread : t));
    setReplyText('');
  };

  const filteredThreads = threads.filter((thread) => {
    const matchesSearch = thread.title.toLowerCase().includes(searchVal.toLowerCase()) || 
                          thread.content.toLowerCase().includes(searchVal.toLowerCase());
    const matchesCat = activeCategory === 'All' || thread.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 pb-20 text-left max-w-7xl mx-auto w-full">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">
            {t.collab.title}
          </h2>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {t.collab.desc}
          </p>
        </div>

        <button
          onClick={() => {
            setActiveThreadDetail(null);
            setShowQuestionForm(!showQuestionForm);
          }}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 active:scale-95 transition-all text-xs ml-auto md:ml-0"
        >
          <HelpCircle className="w-4.5 h-4.5" /> {t.collab.btnNew}
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Forums and Threads */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Question submission form */}
          {showQuestionForm && (
            <div className={`p-6 rounded-3xl border animate-fadeIn ${
              darkMode ? 'glass-card' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <h3 className="font-bold text-base mb-4 flex items-center gap-1.5">
                ❓ {language === 'kn' ? 'ಸಮುದಾಯವನ್ನು ಕೇಳಿ' : language === 'hi' ? 'समुदाय से पूछें' : language === 'ta' ? 'சமூகத்திடம் கேளுங்கள்' : 'Ask the Community'}
              </h3>
              <form onSubmit={handleAskQuestion} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-400 mb-1">{language === 'kn' ? 'ಪ್ರಶ್ನೆಯ ಶೀರ್ಷಿಕೆ' : language === 'hi' ? 'प्रश्न का शीर्षक' : language === 'ta' ? 'கேள்வி தலைப்பு' : 'Question Title'}</label>
                  <input
                    type="text"
                    placeholder="e.g. Best way to clean solar water pump tubes?"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border outline-none transition-all ${
                      darkMode ? 'glass-input focus:border-emerald-500/50' : 'bg-slate-50 focus:bg-white border-slate-200 text-slate-800'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">{language === 'kn' ? 'ವಿವರಣೆ / ಸಂದರ್ಭ' : language === 'hi' ? 'विवरण / संदर्भ' : language === 'ta' ? 'விளக்கம் / சூழல்' : 'Explanation / Context'}</label>
                  <textarea
                    placeholder="Explain the background. What crops are nearby? Any specific soils?"
                    value={questionContent}
                    onChange={(e) => setQuestionContent(e.target.value)}
                    rows="3"
                    className={`w-full px-3.5 py-2.5 rounded-xl border outline-none transition-all ${
                      darkMode ? 'glass-input focus:border-emerald-500/50' : 'bg-slate-50 focus:bg-white border-slate-200 text-slate-800'
                    }`}
                    required
                  />
                </div>

                <div className="flex gap-3 justify-end text-[10px]">
                  <button
                    type="button"
                    onClick={() => setShowQuestionForm(false)}
                    className={`px-4 py-2 rounded-xl border transition-all ${
                      darkMode ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    {t.common.cancel}
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-6 py-2 rounded-xl shadow-md active:scale-95 transition-all"
                  >
                    Post Question
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className={`flex items-center w-full px-3.5 py-2.5 rounded-xl border transition-all ${
              darkMode ? 'glass-card border-slate-800 focus-within:border-emerald-500/30' : 'bg-white border-slate-200 focus-within:border-emerald-500'
            }`}>
              <Search className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder={t.common.search}
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className={`w-full text-sm bg-transparent outline-none placeholder-slate-400 ${
                  darkMode ? 'text-slate-100' : 'text-slate-800'
                }`}
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(c.id)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 flex-shrink-0 ${
                  activeCategory === c.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : darkMode 
                      ? 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white' 
                      : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{c.emoji}</span> {c.label}
              </button>
            ))}
          </div>

          {/* Discussion List */}
          <div className="space-y-4">
            {filteredThreads.map((thread, idx) => {
              const matchedCat = categories.find((cat) => cat.id === thread.category);
              return (
                <div 
                  key={thread.id} 
                  onClick={() => {
                    setActiveThreadDetail(thread);
                    setShowQuestionForm(false);
                  }}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 hover-lift animate-fadeInUp ${
                    activeThreadDetail?.id === thread.id
                      ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_12px_rgba(16,185,129,0.08)]'
                      : darkMode 
                        ? 'glass-card hover:border-emerald-500/30' 
                        : 'bg-white shadow-sm border-slate-100 hover:border-emerald-500/30'
                  }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {matchedCat ? matchedCat.label : thread.category}
                    </span>
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {thread.lastActive}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold mt-3 text-left ${
                    darkMode ? 'text-white hover:text-emerald-400' : 'text-slate-800 hover:text-emerald-600'
                  } transition-colors`}>
                    {thread.title}
                  </h3>
                  <p className="text-xs text-left text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {thread.content}
                  </p>

                  <div className={`flex items-center gap-4.5 mt-5 text-xs text-slate-400 font-bold border-t pt-3 ${
                    darkMode ? 'border-slate-800/60' : 'border-slate-100'
                  }`}>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-emerald-500" /> {thread.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" /> {thread.replies} {t.collab.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-400" /> {thread.likes} {t.collab.likes}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Expanded Thread Details & Q&A replies */}
        <div className="space-y-6 text-sm">
          {activeThreadDetail ? (
            <div className={`p-6 rounded-3xl border space-y-6 animate-fadeIn ${
              darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
            }`}>
              <div className="space-y-2">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block text-left">Thread Inspector</span>
                <h3 className={`text-lg font-bold text-left leading-snug ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {activeThreadDetail.title}
                </h3>
                <p className={`text-xs text-left leading-relaxed pt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {activeThreadDetail.content}
                </p>
              </div>

              <hr className={darkMode ? 'border-slate-800' : 'border-slate-100'} />

              {/* Replies feed */}
              <div className="space-y-4 text-xs text-left font-semibold">
                <h4 className="font-bold text-slate-400 uppercase tracking-wide">
                  {t.collab.replies} ({activeThreadDetail.comments?.length || 0})
                </h4>
                
                {(activeThreadDetail.comments || []).map((comment, idx) => (
                  <div key={idx} className={`p-3.5 rounded-2xl border space-y-2 animate-fadeInUp ${
                    darkMode ? 'bg-slate-800/20 border-slate-800/40' : 'bg-slate-50 border-slate-100'
                  }`} style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                          comment.role === 'AI Consultant' 
                            ? 'bg-gradient-to-tr from-emerald-500 to-teal-400' 
                            : 'bg-gradient-to-tr from-sky-500 to-blue-500'
                        }`}>
                          {comment.author.charAt(0)}
                        </div>
                        <div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            {comment.author}
                          </span>
                          <span className="text-[9px] text-slate-400 font-semibold ml-1">({comment.role})</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-400">{comment.time}</span>
                    </div>
                    <p className={`leading-relaxed text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{comment.text}</p>
                    <div className="flex items-center gap-3 pt-1">
                      <button className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors">
                        <ThumbsUp className="w-3 h-3" /> {comment.likes || 0}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick comment box */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t.collab.placeholder}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePostReply()}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                      darkMode ? 'glass-input focus:border-emerald-500/50' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500'
                    }`}
                  />
                  <button 
                    onClick={handlePostReply}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold p-2.5 rounded-xl active:scale-95 transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className={`p-12 rounded-3xl border flex flex-col items-center justify-center text-center animate-fadeIn ${
              darkMode ? 'glass-card' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              <MessageCircle className="w-12 h-12 text-slate-500 mb-3 animate-float" />
              <h4 className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{language === 'kn' ? 'ಯಾವುದೇ ಥ್ರೆಡ್ ಆಯ್ಕೆ ಮಾಡಿಲ್ಲ' : language === 'hi' ? 'कोई थ्रेड चयनित नहीं' : language === 'ta' ? 'விவாதம் எதுவும் தேர்ந்தெடுக்கப்படவில்லை' : 'No Thread Selected'}</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                {language === 'kn' ? 'ಕಾಮೆಂಟ್ ಮಾಡಲು ಎಡಭಾಗದಲ್ಲಿರುವ ಯಾವುದೇ ಚರ್ಚೆಯ ಕಾರ್ಡ್ ಕ್ಲಿಕ್ ಮಾಡಿ.' :
                 language === 'hi' ? 'बाईं ओर किसी भी चर्चा कार्ड पर क्लिक करके समुदाय के उत्तर देखें।' :
                 language === 'ta' ? 'இடதுபுறமுள்ள விவாதத்தை கிளிக் செய்து கருத்துகளைப் பதிவு செய்யவும்.' :
                 'Click on any discussion card on the left to review community responses and post comments.'}
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
