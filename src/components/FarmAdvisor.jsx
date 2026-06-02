import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  BookOpen, 
  CheckSquare, 
  Trash2,
  CornerDownLeft,
  ChevronRight,
  Bot,
  User
} from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function FarmAdvisor({ darkMode, language = 'en' }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const chatPresets = language === 'kn' ? [
    "ಕಡಿಮೆ ಮಳೆಯಲ್ಲಿ ಯಾವ ಬೆಳೆಯನ್ನು ಬೆಳೆಯಬೇಕು?",
    "ಮಣ್ಣಿನ ಸಾವಯವ ಇಂಗಾಲವನ್ನು ಹೇಗೆ ಸುಧಾರಿಸುವುದು?",
    "ಟೊಮೆಟೊ ರೋಗಕ್ಕೆ ಉತ್ತಮ ಕೀಟ ನಿಯಂತ್ರಣ ಯಾವುದು?",
    "ಸೌರ ನೀರಾವರಿ ಪಂಪ್ ಸಬ್ಸಿಡಿಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ.",
    "ಹತ್ತಿ ಹೊಲಗಳಿಗೆ ಬೆಳೆ ಸರದಿಯನ್ನು ಸೂಚಿಸಿ."
  ] : language === 'hi' ? [
    "कम वर्षा में मुझे कौन सी फसल उगानी चाहिए?",
    "मैं मिट्टी के कार्बन को कैसे सुधार सकता हूं?",
    "टमाटर के रोग के लिए सबसे अच्छा कीट नियंत्रण क्या है?",
    "सौर जल पंप सब्सिडी के बारे में बताएं।",
    "कपास के खेतों के लिए फसल चक्र का सुझाव दें।"
  ] : language === 'ta' ? [
    "குறைந்த மழையில் என்ன பயிர் வளர்க்கலாம்?",
    "மண்ணின் கரிம கார்பனை எவ்வாறு மேம்படுத்துவது?",
    "தக்காளி நோய்க்கு சிறந்த பூச்சி கட்டுப்பாடு எது?",
    "சோலார் வாட்டர் பம்ப் மானியம் பற்றி கூறவும்.",
    "பருத்தி வயல்களுக்கான பயிர் சுழற்சியை பரிந்துரைக்கவும்."
  ] : [
    "Which crop should I grow in low rainfall?",
    "How can I improve my soil organic carbon?",
    "What is the best pest control for tomato blight?",
    "Tell me about solar water pump subsidies.",
    "Suggest a rotation plan for cotton farms."
  ];

  const initialWelcome = t.advisor.welcome || 'Hello! I am your KisanSetu AI agricultural consultant. How can I help you today?';

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: initialWelcome,
      actionPlan: null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Effect to reset initial welcome message when language changes
  useEffect(() => {
    setMessages([{
      id: 1,
      sender: 'ai',
      text: initialWelcome,
      actionPlan: null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  }, [language, initialWelcome]);

  const [inputVal, setInputVal] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeSession, setActiveSession] = useState('New Advisory Session');
  
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isRecording, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = { 
      id: Date.now(), 
      sender: 'user', 
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiReply = generateAIResponse(text);
      setMessages((prev) => [...prev, aiReply]);
    }, 1500 + Math.random() * 1000);
  };

  const handlePresetClick = (presetText) => {
    handleSend(presetText);
  };

  const handleVoiceRecordToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setInputVal(chatPresets[0]);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();
    const isKn = language === 'kn';
    const isHi = language === 'hi';
    const isTa = language === 'ta';
    
    let text = isKn 
      ? "ನಾನು ನಿಮ್ಮ ನಿಯತಾಂಕಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿದ್ದೇನೆ. ಕೃಷಿ ವೈವಿಧ್ಯೀಕರಣ ಮತ್ತು ಸಾವಯವ ಕಾಂಪೋಸ್ಟ್ ತಯಾರಿಕೆಯ ಬಗ್ಗೆ ಗಮನಹರಿಸಲು ನಾನು ಸೂಚಿಸುತ್ತೇನೆ."
      : isHi
        ? "मैंने आपके मापदंडों का विश्लेषण किया है। मैं फसल विविधीकरण और जैविक खाद पर ध्यान केंद्रित करने का सुझाव देता हूं।"
        : isTa
          ? "நான் உங்கள் அளவுருக்களை பகுப்பாய்வு செய்துள்ளேன். பயிர் பன்முகத்தன்மை மற்றும் இயற்கை உரம் தயாரிப்பில் கவனம் செலுத்த பரிந்துரைக்கிறேன்."
          : "I've analyzed your parameters. Based on typical semi-arid soil characteristics, I suggest focusing on crop diversification and precision composting.";

    let actionPlan = isKn ? [
      { id: 1, text: "ಮಣ್ಣಿನ ಸಾವಯವ ಇಂಗಾಲದ ಪರೀಕ್ಷೆಯನ್ನು ಮಾಡಿ", done: false },
      { id: 2, text: "ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಉಳಿಸಿಕೊಳ್ಳಲು ಸಾವಯವ ಹೊದಿಕೆಯನ್ನು ಅನ್ವಯಿಸಿ", done: false },
      { id: 3, text: "ಉಪ-ಮೇಲ್ಮೈ ಹನಿ ನೀರಾವರಿ ನಿಯತಾಂಕಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ", done: false }
    ] : isHi ? [
      { id: 1, text: "मृदा जैविक कार्बन (SOC) परीक्षण करें", done: false },
      { id: 2, text: "मिट्टी की नमी बनाए रखने के लिए जैविक गीली घास का उपयोग करें", done: false },
      { id: 3, text: "उप-सतह ड्रिप सिंचाई मापदंडों को कॉन्फ़िगर करें", done: false }
    ] : isTa ? [
      { id: 1, text: "மண் கரிம கார்பன் (SOC) சோதனை செய்யவும்", done: false },
      { id: 2, text: "மண் ஈரப்பதத்தை தக்கவைக்க இயற்கை மூடாக்கு பயன்படுத்தவும்", done: false },
      { id: 3, text: "சொட்டு நீர் பாசன அளவுருக்களை உள்ளமைக்கவும்", done: false }
    ] : [
      { id: 1, text: "Perform Soil Organic Carbon (SOC) testing", done: false },
      { id: 2, text: "Apply organic mulch (straw/husks) to retain soil moisture", done: false },
      { id: 3, text: "Configure sub-surface drip irrigation parameters", done: false }
    ];

    if (q.includes('rainfall') || q.includes('grow') || q.includes('water-saving') || q.includes('ಮಳೆ') || q.includes('वर्षा') || q.includes('மழை')) {
      text = isKn
        ? "ಕಡಿಮೆ ಮಳೆ ಬೀಳುವ ಪ್ರದೇಶಗಳಿಗೆ ಜೋಳ, ಸಜ್ಜೆ ಮತ್ತು ಶೇಂಗಾ ಬೆಳೆಗಳನ್ನು ಹೆಚ್ಚು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಇವು ಬರ ನಿರೋಧಕವಾಗಿವೆ."
        : isHi
          ? "कम वर्षा वाले क्षेत्रों के लिए ज्वार, बाजरा और मूंगफली की फसलों की सिफारिश की जाती है। ये सूखा-प्रतिरोधी हैं।"
          : isTa
            ? "குறைந்த மழைப்பொழிவு உள்ள பகுதிகளுக்கு சோளம், கம்பு மற்றும் நிலக்கடலை பரிந்துரைக்கப்படுகின்றன. இவை வறட்சியைத் தாங்கக்கூடியவை."
            : "For regions with low precipitation (under 500mm annually), sorghum, pearl millet (bajra), and select oilseeds (safflower/groundnut) are highly recommended. These crops possess deep root structures and low stomatal transpiration, making them highly drought-resilient.";
      actionPlan = isKn ? [
        { id: 1, text: "ನೀರಿನ ಉಳಿತಾಯಕ್ಕಾಗಿ ಮಣ್ಣಿನ ತೇವಾಂಶ ಸಂರಕ್ಷಿಸಿ", done: false },
        { id: 2, text: "ಬರ ನಿರೋಧಕ ಪ್ರಮಾಣೀಕೃತ ಬೀಜ ಪ್ರಭೇದಗಳನ್ನು ಬಳಸಿ", done: false },
        { id: 3, text: "ಸಂವೇದಕಗಳನ್ನು ನಿಯೋಜಿಸಿ ಮತ್ತು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ", done: false }
      ] : isHi ? [
        { id: 1, text: "जल प्रतिधारण बढ़ाने के लिए मानसून से पहले गहरी जुताई करें", done: false },
        { id: 2, text: "प्रमाणित सूखा-सहिष्णु बीज किस्मों का उपयोग करें", done: false },
        { id: 3, text: "मिट्टी के तनाव पर नजर रखने के लिए सेंसर तैनात करें", done: false }
      ] : isTa ? [
        { id: 1, text: "மண் ஈரப்பதத்தை அதிகரிக்க கோடைகால உழவு செய்யவும்", done: false },
        { id: 2, text: "வறட்சியைத் தாங்கும் சான்றளிக்கப்பட்ட விதை வகைகளைப் பயன்படுத்தவும்", done: false },
        { id: 3, text: "பாசனத்தைக் கண்காணிக்க ஈரப்பத சென்சார்களைப் பொருத்தவும்", done: false }
      ] : [
        { id: 1, text: "Deep-plough the field during pre-monsoon to increase water retention", done: false },
        { id: 2, text: "Use certified drought-tolerant seed varieties (e.g. MH-179 Pearl Millet)", done: false },
        { id: 3, text: "Deploy scheduling sensors to irrigate only when soil tension exceeds 60cb", done: false }
      ];
    } else if (q.includes('carbon') || q.includes('soil') || q.includes('improve') || q.includes('ಇಂಗಾಲ') || q.includes('ಮಣ್ಣು') || q.includes('मिट्टी') || q.includes('கார்பன்')) {
      text = isKn
        ? "ಮಣ್ಣಿನ ಸಾವಯವ ಇಂಗಾಲವನ್ನು (SOC) ಉತ್ತಮಗೊಳಿಸಲು ಹಸಿರು ಗೊಬ್ಬರ ಬಳಕೆ ಮತ್ತು ಕಾಂಪೋಸ್ಟ್ ಅನ್ವಯಿಸುವುದು ಅತ್ಯಗತ್ಯ."
        : isHi
          ? "मिट्टी के जैविक कार्बन को बढ़ाने के लिए हरी खाद और वर्मीकम्पोस्ट का उपयोग करना अत्यंत आवश्यक है।"
          : isTa
            ? "மண்ணின் கரிம கார்பனை அதிகரிக்க பசுந்தாள் உரம் மற்றும் மண்புழு உரம் பயன்பாடு மிகவும் அவசியம்."
            : "To boost soil organic carbon (SOC) levels from average (0.4%) to healthy (0.8%+), you should implement green manuring, conservation tillage, and regular organic composting. Adding 5 tonnes/acre of quality vermicompost provides stable humus.";
      actionPlan = isKn ? [
        { id: 1, text: "ಹಸಿರು ಗೊಬ್ಬರದ ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯಿರಿ", done: false },
        { id: 2, text: "ಪ್ರತಿ ಎಕರೆಗೆ ವರ್ಮಿಕಾಂಪೋಸ್ಟ್ ಅನ್ವಯಿಸಿ", done: false }
      ] : isHi ? [
        { id: 1, text: "हरी खाद की फसलें उगाएं", done: false },
        { id: 2, text: "प्रति एकड़ वर्मीकम्पोस्ट का प्रयोग करें", done: false }
      ] : isTa ? [
        { id: 1, text: "பசுந்தாள் உரப் பயிர்களை வளர்க்கவும்", done: false },
        { id: 2, text: "ஏக்கருக்கு மண்புழு உரத்தை இடவும்", done: false }
      ] : [
        { id: 1, text: "Grow Sesbania (Dhaincha) during fallow and till it back into the soil", done: false },
        { id: 2, text: "Apply vermicompost alongside seed sowing slots", done: false }
      ];
    }

    return {
      id: Date.now(),
      sender: 'ai',
      text,
      actionPlan,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const handleToggleActionItem = (msgId, itemId) => {
    setMessages((prev) => 
      prev.map((m) => {
        if (m.id === msgId && m.actionPlan) {
          return {
            ...m,
            actionPlan: m.actionPlan.map((item) => 
              item.id === itemId ? { ...item, done: !item.done } : item
            )
          };
        }
        return m;
      })
    );
  };

  return (
    <div className="h-full flex overflow-hidden">
      
      {/* Left panel: Session History list */}
      <div className={`hidden md:flex flex-col w-64 border-r flex-shrink-0 ${
        darkMode ? 'bg-[#1e293b]/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className={`p-4 border-b flex items-center justify-between ${
          darkMode ? 'border-slate-800/60' : 'border-slate-200'
        }`}>
          <span className="text-xs font-bold uppercase tracking-wider opacity-60">{t.advisor.consultations}</span>
          <button 
            onClick={() => setMessages([messages[0]])}
            className={`p-1.5 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-500'
            }`}
            title={t.advisor.clearChat}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 no-scrollbar">
          {(language === 'kn' ? [
            'ಮಣ್ಣಿನ ಪೋಷಕಾಂಶಗಳ ಆಪ್ಟಿಮೈಸೇಶನ್',
            'ಜೋಳದ ಬರ ತಂತ್ರ',
            'ಟೊಮೆಟೊ ಶಿಲೀಂಧ್ರ ಚಿಕಿತ್ಸೆ',
            'ಸೌರ ಪಂಪ್ ಸಬ್ಸಿಡಿ ಮಾರ್ಗದರ್ಶಿ'
          ] : language === 'hi' ? [
            'मिट्टी के पोषक तत्वों का अनुकूलन',
            'ज्वार सूखा रणनीति',
            'टमाटर कवक उपचार',
            'सौर पंप सब्सिडी गाइड'
          ] : language === 'ta' ? [
            'மண் ஊட்டச்சத்து உகந்ததாக்கல்',
            'சோளம் வறட்சி உத்தி',
            'தக்காளி பூஞ்சை சிகிச்சை',
            'சோலார் பம்ப் மானிய வழிகாட்டி'
          ] : [
            'Soil Nutrition Optimization',
            'Sorghum Drought Strategy',
            'Tomato Fungal Treatment',
            'Solar Pump Subsidies Guide'
          ]).map((session, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSession(session);
                // Map to corresponding preset query
                const mappedQueries = chatPresets;
                handlePresetClick(mappedQueries[idx % mappedQueries.length]);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-3.5 rounded-xl text-xs font-semibold tracking-wide transition-all text-left ${
                activeSession === session
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold'
                  : darkMode 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/35' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="truncate">{session}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right panel: Main Chat View */}
      <div className={`flex-1 flex flex-col h-full ${darkMode ? 'bg-slate-900/10' : ''}`}>
        
        {/* Chat Bubbles Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex gap-3.5 max-w-[85%] animate-fadeIn ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Profile Avatar bubble */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-gradient-to-tr from-sky-500 to-blue-600 text-white' 
                  : 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-white'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message content block */}
              <div className="space-y-3.5">
                <div className={`p-4.5 rounded-2xl text-sm text-left leading-relaxed border ${
                  msg.sender === 'user'
                    ? darkMode
                      ? 'bg-sky-950/80 border-sky-800/50 text-sky-100 shadow-[0_0_15px_rgba(14,165,233,0.05)]'
                      : 'bg-sky-50 border-sky-100 text-sky-950 font-medium'
                    : darkMode
                      ? 'glass-card text-slate-100 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                      : 'bg-white border-slate-150 text-slate-800 shadow-sm'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`text-[9px] mt-2 block ${
                    darkMode ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    {msg.time}
                  </span>
                </div>

                {/* AI Action Plan checklist card */}
                {msg.sender === 'ai' && msg.actionPlan && (
                  <div className={`p-4.5 rounded-2xl border text-left space-y-3 animate-fadeIn ${
                    darkMode ? 'glass-card' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      <CheckSquare className="w-4 h-4" />
                      <span>{t.advisor.actionPlan}</span>
                    </div>

                    <div className="space-y-2">
                      {msg.actionPlan.map((item) => (
                        <label 
                          key={item.id}
                          className={`flex items-start gap-2.5 text-xs cursor-pointer select-none py-1.5 px-2 rounded-lg transition-colors ${
                            darkMode ? 'hover:bg-slate-800/30' : 'hover:bg-slate-100'
                          }`}
                        >
                          <input 
                            type="checkbox"
                            checked={item.done}
                            onChange={() => handleToggleActionItem(msg.id, item.id)}
                            className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500 mt-0.5 accent-emerald-500"
                          />
                          <span className={`${item.done ? 'line-through text-slate-500' : darkMode ? 'text-slate-200 font-medium' : 'text-slate-800 font-medium'}`}>
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3.5 max-w-[85%] mr-auto animate-fadeIn">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
                darkMode ? 'glass-card' : 'bg-white border-slate-100'
              }`}>
                <span className="text-xs text-slate-400 font-bold">{t.advisor.thinking}</span>
                <div className="flex gap-1.5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            </div>
          )}

          {/* Voice Input Active Overlay Waveform */}
          {isRecording && (
            <div className="flex items-center gap-3.5 max-w-[85%] mr-auto animate-fadeIn">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm shadow-md animate-pulse">
                🎤
              </div>
              <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
                darkMode ? 'glass-card' : 'bg-white border-slate-100'
              }`}>
                <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">{t.advisor.recording}</span>
                <div className="flex gap-1 items-end h-5 w-20">
                  {[3, 5, 2, 4, 3, 5, 2, 4, 3].map((h, i) => (
                    <div 
                      key={i}
                      className="w-1 bg-rose-500 rounded animate-pulse" 
                      style={{ height: `${h * 4}px`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Preset suggestions drawer */}
        <div className={`px-6 py-3 border-t flex gap-2.5 overflow-x-auto no-scrollbar ${
          darkMode ? 'border-slate-800/60 bg-slate-900/10' : 'border-slate-150 bg-slate-50'
        }`}>
          {chatPresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetClick(p)}
              className={`flex-shrink-0 text-xs font-semibold px-3.5 py-2 rounded-full border transition-all hover:scale-105 active:scale-95 ${
                darkMode 
                  ? 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white hover:border-emerald-500/30' 
                  : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-emerald-500'
              }`}
            >
              ✨ {p}
            </button>
          ))}
        </div>

        {/* Input Bar Form */}
        <div className={`p-4 border-t ${
          darkMode ? 'border-slate-800/80 bg-[#0f172a]' : 'border-slate-200 bg-white'
        }`}>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="flex items-center gap-3"
          >
            {/* Voice Input Mic Button */}
            <button
              type="button"
              onClick={handleVoiceRecordToggle}
              className={`p-3.5 rounded-xl transition-all shadow ${
                isRecording 
                  ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/20' 
                  : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
              }`}
              title={isRecording ? "Stop Recording" : "Voice Input"}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Input field */}
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t.advisor.placeholder}
              className={`w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all border ${
                darkMode 
                  ? 'glass-input focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.08)]' 
                  : 'bg-slate-50 border-slate-200 focus:bg-white focus:border-emerald-600 text-slate-800'
              }`}
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className={`p-3.5 rounded-xl text-white font-bold transition-all shadow ${
                inputVal.trim() && !isTyping
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 cursor-pointer active:scale-95 shadow-emerald-500/20' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-55'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
