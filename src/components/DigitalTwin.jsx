import React, { useState, useEffect } from 'react';
import { Layers, Sliders, Sprout, ShieldAlert, Award, ArrowUpRight, TrendingUp, TrendingDown, Leaf, Droplet, IndianRupee, Zap } from 'lucide-react';
import { simulateDigitalTwin } from '../utils/calculations';
import { TRANSLATIONS } from '../utils/translations';

export default function DigitalTwin({ villageStats, setVillageStats, darkMode, language = 'en' }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Inputs
  const [crop, setCrop] = useState('Wheat');
  const [rainfall, setRainfall] = useState(500);
  const [fertilizer, setFertilizer] = useState(90);
  const [irrigation, setIrrigation] = useState(7);

  const [simResults, setSimResults] = useState({});
  const [prevResults, setPrevResults] = useState({});

  // Recalculate simulation values dynamically
  useEffect(() => {
    setPrevResults(simResults);
    const data = simulateDigitalTwin({ crop, rainfall, fertilizer, irrigationFrequency: irrigation });
    setSimResults(data);

    if (setVillageStats) {
      setVillageStats((prev) => ({
        ...prev,
        soilHealth: data.soilHealth,
        sustainabilityScore: data.sustainabilityScore,
        cropPerformance: Math.min(100, Math.round(data.yield * 35)),
      }));
    }
  }, [crop, rainfall, fertilizer, irrigation, setVillageStats]);

  const getIrrigationLabel = (days) => {
    if (language === 'kn') {
      if (days === 1) return "ಪ್ರತಿದಿನ";
      if (days <= 3) return "ಪ್ರತಿ 3 ದಿನಕ್ಕೊಮ್ಮೆ";
      if (days <= 7) return "ವಾರಕ್ಕೊಮ್ಮೆ";
      if (days <= 10) return "ಪ್ರತಿ 10 ದಿನಕ್ಕೊಮ್ಮೆ";
      return "ದ್ವಿವಾರಕ್ಕೊಮ್ಮೆ";
    }
    if (language === 'hi') {
      if (days === 1) return "दैनिक";
      if (days <= 3) return "हर 3 दिन में";
      if (days <= 7) return "साप्ताहिक";
      if (days <= 10) return "हर 10 दिन में";
      return "द्वि-साप्ताहिक";
    }
    if (language === 'ta') {
      if (days === 1) return "தினசரி";
      if (days <= 3) return "3 நாட்களுக்கு ஒருமுறை";
      if (days <= 7) return "வாரம் ஒருமுறை";
      if (days <= 10) return "10 நாட்களுக்கு ஒருமுறை";
      return "இரு வாரங்களுக்கு ஒருமுறை";
    }
    if (days === 1) return "Daily";
    if (days <= 3) return "Every 3 days";
    if (days <= 7) return "Weekly";
    if (days <= 10) return "Every 10 days";
    return "Bi-weekly";
  };

  const getCropEmoji = (c) => {
    const map = { Wheat: '🌾', Rice: '🌿', Cotton: '🌼', Millets: '🌱' };
    return map[c] || '🌱';
  };

  const getCropLabel = (c) => {
    if (language === 'kn') {
      const map = { Wheat: 'ಗೋಧಿ (ರಬಿ)', Rice: 'ಭತ್ತ (ಖಾರಿಫ್)', Cotton: 'ಹತ್ತಿ (ನಗದು ಬೆಳೆ)', Millets: 'ಸಜ್ಜೆ (ಒಣ ಭೂಮಿ)' };
      return map[c] || c;
    }
    if (language === 'hi') {
      const map = { Wheat: 'गेहूं (रबी)', Rice: 'धान (खरीफ)', Cotton: 'कपास (नकदी फसल)', Millets: 'बाजरा (सूखा)' };
      return map[c] || c;
    }
    if (language === 'ta') {
      const map = { Wheat: 'கோதுமை (ரபி)', Rice: 'நெல் (காரிஃப்)', Cotton: 'பருத்தி (பணப்பயிர்)', Millets: 'கம்பு (வறண்ட நிலம்)' };
      return map[c] || c;
    }
    const map = { Wheat: 'Durum Wheat (Rabi)', Rice: 'Basmati Rice (Kharif)', Cotton: 'Hybrid Cotton (Cash)', Millets: 'Pearl Millet (Dry)' };
    return map[c] || c;
  };

  const getGradeColor = (grade) => {
    if (grade === 'A') return 'text-emerald-500 bg-emerald-500/10';
    if (grade === 'B') return 'text-sky-500 bg-sky-500/10';
    if (grade === 'C') return 'text-amber-500 bg-amber-500/10';
    return 'text-rose-500 bg-rose-500/10';
  };

  return (
    <div className="p-6 md:p-8 space-y-6 pb-20 text-left max-w-7xl mx-auto w-full">
      {/* Title Header */}
      <div className="animate-fadeIn">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] bg-purple-500/10 text-purple-400 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3" /> {language === 'kn' ? 'ಅತ್ಯಂತ ವಿಶಿಷ್ಟ ವೈಶಿಷ್ಟ್ಯ' : language === 'hi' ? 'सबसे अनूठी विशेषता' : language === 'ta' ? 'மிகவும் தனித்துவமான அம்சம்' : 'Most Unique Feature'}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">
          {t.digitaltwin.title}
        </h2>
        <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {t.digitaltwin.desc}
        </p>
      </div>

      {/* Grid: Sliders, Visual, Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Sliders Input */}
        <div className={`p-6 rounded-3xl border space-y-6 animate-fadeInUp ${
          darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
        }`} style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-2">
            <Sliders className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-base">{t.digitaltwin.paramsTitle}</h3>
          </div>

          {/* Crop select */}
          <div className="text-sm font-semibold">
            <label className="block text-xs font-bold text-slate-400 mb-1.5 ml-0.5">{t.digitaltwin.selectCrop}</label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border outline-none cursor-pointer transition-all ${
                darkMode ? 'glass-input focus:border-emerald-500/50' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500'
              }`}
            >
              <option value="Wheat">🌾 {getCropLabel('Wheat')}</option>
              <option value="Rice">🌿 {getCropLabel('Rice')}</option>
              <option value="Cotton">🌼 {getCropLabel('Cotton')}</option>
              <option value="Millets">🌱 {getCropLabel('Millets')}</option>
            </select>
          </div>

          {/* Rainfall Slider */}
          <div className="text-sm font-semibold">
            <div className="flex justify-between items-center mb-1.5 ml-0.5">
              <label className="text-xs font-bold text-slate-400">{t.digitaltwin.rainfall}</label>
              <span className="text-xs font-black text-sky-400 tabular-nums">{rainfall} mm</span>
            </div>
            <input
              type="range"
              min="100"
              max="1200"
              value={rainfall}
              onChange={(e) => setRainfall(parseInt(e.target.value))}
              className="w-full accent-sky-500 bg-slate-800"
            />
            <div className="flex justify-between text-[9px] text-slate-500 mt-1">
              <span>100mm ({language === 'kn' ? 'ಶುಷ್ಕ' : language === 'hi' ? 'शुष्क' : language === 'ta' ? 'வறண்ட' : 'Arid'})</span>
              <span>1200mm ({language === 'kn' ? 'ಮಳೆಗಾಲ' : language === 'hi' ? 'मानसून' : language === 'ta' ? 'மழைக்காலம்' : 'Monsoon'})</span>
            </div>
          </div>

          {/* Fertilizer Slider */}
          <div className="text-sm font-semibold">
            <div className="flex justify-between items-center mb-1.5 ml-0.5">
              <label className="text-xs font-bold text-slate-400">{t.digitaltwin.fertilizer}</label>
              <span className={`text-xs font-black tabular-nums ${fertilizer > 110 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {fertilizer} kg/acre
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={fertilizer}
              onChange={(e) => setFertilizer(parseInt(e.target.value))}
              className={`w-full ${fertilizer > 110 ? 'accent-rose-500' : 'accent-emerald-500'} bg-slate-800`}
            />
            <div className="flex justify-between text-[9px] text-slate-500 mt-1">
              <span>0 kg ({language === 'kn' ? 'ಶೂನ್ಯ' : language === 'hi' ? 'कुछ नहीं' : language === 'ta' ? 'இல்லை' : 'None'})</span>
              <span className={fertilizer > 110 ? 'text-rose-400 font-bold' : ''}>200 kg ({language === 'kn' ? 'ಹೆಚ್ಚು' : language === 'hi' ? 'अत्यधिक' : language === 'ta' ? 'அதிகம்' : 'Heavy'})</span>
            </div>
          </div>

          {/* Irrigation Frequency Slider */}
          <div className="text-sm font-semibold">
            <div className="flex justify-between items-center mb-1.5 ml-0.5">
              <label className="text-xs font-bold text-slate-400">{t.digitaltwin.irrigation}</label>
              <span className="text-xs font-black text-purple-400">{getIrrigationLabel(irrigation)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="14"
              value={irrigation}
              onChange={(e) => setIrrigation(parseInt(e.target.value))}
              className="w-full accent-purple-500 bg-slate-800"
            />
            <div className="flex justify-between text-[9px] text-slate-500 mt-1">
              <span>{language === 'kn' ? 'ಪ್ರತಿದಿನ' : language === 'hi' ? 'दैनिक' : language === 'ta' ? 'தினசரி' : 'Daily'}</span>
              <span>{language === 'kn' ? 'ದ್ವಿವಾರಕ್ಕೊಮ್ಮೆ' : language === 'hi' ? 'द्वि-साप्ताहिक' : language === 'ta' ? 'இரு வாரங்களுக்கு' : 'Bi-weekly'}</span>
            </div>
          </div>
        </div>

        {/* Center: Isometric Farm Visual */}
        <div className={`p-6 rounded-3xl border flex flex-col justify-between items-center animate-fadeInUp ${
          darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
        }`} style={{ animationDelay: '0.2s' }}>
          <div className="w-full text-left">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">{language === 'kn' ? 'ದೃಶ್ಯ ಅವಳಿ' : language === 'hi' ? 'दृश्य मॉडल' : language === 'ta' ? 'காட்சி மாதிரி' : 'Visual Twin'}</span>
            <h3 className={`text-sm font-bold mt-0.5 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              Plot Visual — {crop} {getCropEmoji(crop)}
            </h3>
          </div>

          {/* Custom SVG visual */}
          <div className="w-full aspect-square max-w-[220px] relative my-4">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              {/* Sun */}
              <circle cx="80" cy="15" r="8" fill="#fbbf24" opacity="0.3" />
              <circle cx="80" cy="15" r="5" fill="#f59e0b" opacity="0.6" />
              
              {/* Rain clouds if rain > 700 */}
              {rainfall > 700 && (
                <g className="animate-float" style={{ animationDuration: '3s' }}>
                  <path d="M 20 18 Q 30 8 40 18 Q 50 8 60 18 Q 70 18 65 28 Q 35 28 20 18" fill="#94a3b8" opacity="0.6" />
                  <line x1="30" y1="26" x2="28" y2="38" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2,3" opacity="0.7">
                    <animate attributeName="y1" values="26;28;26" dur="1s" repeatCount="indefinite" />
                  </line>
                  <line x1="42" y1="26" x2="40" y2="40" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2,3" opacity="0.7">
                    <animate attributeName="y1" values="26;30;26" dur="1.2s" repeatCount="indefinite" />
                  </line>
                  <line x1="55" y1="26" x2="53" y2="36" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="2,3" opacity="0.7">
                    <animate attributeName="y1" values="26;29;26" dur="0.8s" repeatCount="indefinite" />
                  </line>
                </g>
              )}

              {/* Isometric Soil Block */}
              <polygon points="50,45 85,62 50,80 15,62" fill={fertilizer > 130 ? '#52525b' : '#78350f'} stroke={darkMode ? "#1e293b" : "#e2e8f0"} strokeWidth="0.5">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
              </polygon>
              <polygon points="15,62 50,80 50,90 15,72" fill={fertilizer > 130 ? '#3f3f46' : '#451a03'} />
              <polygon points="50,80 85,62 85,72 50,90" fill={fertilizer > 130 ? '#27272a' : '#2d0f02'} />

              {/* Nutrient dots on soil surface */}
              {fertilizer > 50 && (
                <g fill={fertilizer > 110 ? '#ef4444' : '#10b981'} opacity="0.5">
                  <circle cx="35" cy="58" r="0.8"><animate attributeName="r" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" /></circle>
                  <circle cx="50" cy="55" r="0.8"><animate attributeName="r" values="0.8;1.2;0.8" dur="2.5s" repeatCount="indefinite" /></circle>
                  <circle cx="62" cy="60" r="0.8"><animate attributeName="r" values="0.6;0.9;0.6" dur="1.8s" repeatCount="indefinite" /></circle>
                </g>
              )}

              {/* Crop icons floating on soil surface */}
              <g>
                <text x="42" y="57" fontSize="12" className={simResults.yield < 0.8 ? 'opacity-30' : 'opacity-100'}>{getCropEmoji(crop)}</text>
                <text x="25" y="53" fontSize="9" className={simResults.yield < 0.8 ? 'opacity-30' : 'opacity-80'}>{getCropEmoji(crop)}</text>
                <text x="60" y="63" fontSize="10" className={simResults.yield < 0.8 ? 'opacity-30' : 'opacity-90'}>{getCropEmoji(crop)}</text>
                {simResults.yield >= 1.2 && (
                  <>
                    <text x="35" y="64" fontSize="8" className="opacity-70">{getCropEmoji(crop)}</text>
                    <text x="55" y="55" fontSize="8" className="opacity-70">{getCropEmoji(crop)}</text>
                  </>
                )}
              </g>

              {/* Water streams */}
              {irrigation <= 7 && (
                <g stroke="#0ea5e9" strokeWidth="1.2" fill="none" opacity="0.6">
                  <path d="M 12,61 C 25,68 40,68 49,60">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M 50,60 C 60,68 75,68 88,61">
                    <animate attributeName="opacity" values="0.6;0.4;0.6" dur="2.5s" repeatCount="indefinite" />
                  </path>
                </g>
              )}
            </svg>
          </div>

          <div className="text-center space-y-1 font-semibold text-xs">
            <span className="text-slate-400">Simulation Status</span>
            <span className="block text-emerald-400 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              {language === 'kn' ? 'ಸಕ್ರಿಯ — ಮಾಪನಾಂಕ ನಿರ್ಣಯಿಸಲಾಗಿದೆ' : language === 'hi' ? 'सक्रिय — कैलिब्रेटेड' : language === 'ta' ? 'செயலில் உள்ளது' : 'Active — Calibrated'}
            </span>
          </div>
        </div>

        {/* Right Side: Metrics Display */}
        <div className="space-y-6">
          
          {/* Main output numbers */}
          <div className={`p-6 rounded-3xl border space-y-6 animate-fadeInUp ${
            darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
          }`} style={{ animationDelay: '0.3s' }}>
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block text-left">{t.digitaltwin.predictedTitle}</span>
              <h3 className={`text-base font-bold text-left mt-0.5 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{language === 'kn' ? 'ಮಾದರಿ ಗಣನೆಗಳು' : language === 'hi' ? 'मॉडल गणना' : language === 'ta' ? 'மாதிரி கணிப்புகள்' : 'Model Calculations'}</h3>
            </div>

            <hr className={darkMode ? 'border-slate-800/60' : 'border-slate-100'} />

            <div className="grid grid-cols-2 gap-4 text-left font-semibold">
              {/* Yield */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <Sprout className="w-3 h-3" /> {t.digitaltwin.yield}
                </span>
                <span className="text-xl font-black block text-emerald-500 tabular-nums">
                  {simResults.yield} {language === 'kn' ? 'ಟನ್ / ಎಕರೆಗೆ' : language === 'hi' ? 'टन / एकड़' : language === 'ta' ? 'டன் / ஏக்கர்' : 't / acre'}
                </span>
              </div>

              {/* Sustainability Grade */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <Award className="w-3 h-3" /> {t.digitaltwin.sustainability}
                </span>
                <span className={`text-xl font-black block flex items-center gap-1.5`}>
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs ${getGradeColor(simResults.sustainabilityGrade)}`}>
                    {t.digitaltwin.grade} {simResults.sustainabilityGrade}
                  </span>
                </span>
              </div>

              {/* Soil Health */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <Leaf className="w-3 h-3" /> {t.digitaltwin.soilHealth}
                </span>
                <span className={`text-xl font-black block tabular-nums ${
                  simResults.soilHealth >= 70 ? 'text-emerald-500' : simResults.soilHealth >= 50 ? 'text-amber-500' : 'text-rose-500'
                }`}>
                  {simResults.soilHealth} %
                </span>
              </div>

              {/* Net Profit */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <IndianRupee className="w-3 h-3" /> {t.digitaltwin.profit}
                </span>
                <span className={`text-xl font-black block tabular-nums ${
                  simResults.netProfit >= 0 ? '' : 'text-rose-500'
                }`}>
                  ₹{simResults.netProfit?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Carbon footprint */}
            <div className={`p-3.5 rounded-xl text-xs flex items-center gap-3 border text-left font-semibold ${
              darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <Leaf className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <span className="font-bold">{t.digitaltwin.carbon}:</span>
                <span className="text-slate-400 ml-1.5 tabular-nums">{simResults.carbonFootprint} kg CO₂-eq/acre</span>
              </div>
            </div>

            {/* Warning alert if fertilizer is toxic */}
            {fertilizer > 110 && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-[11px] flex gap-2 text-left text-rose-400 animate-fadeIn font-semibold">
                <ShieldAlert className="w-5 h-5 flex-shrink-0 text-rose-500" />
                <span>
                  {language === 'kn' ? (
                    <><strong>ಮಣ್ಣಿನ ವಿಷತ್ವ ಎಚ್ಚರಿಕೆ!</strong> ರಸಗೊಬ್ಬರ ಪ್ರಮಾಣವು ಮಿತಿ ಮೀರಿದೆ, ಮಣ್ಣಿನ ಇಂಗಾಲವನ್ನು ಕುಗ್ಗಿಸುತ್ತದೆ.</>
                  ) : language === 'hi' ? (
                    <><strong>मिट्टी विषाक्तता चेतावनी!</strong> उर्वरक की मात्रा सीमा से अधिक है, जिससे मिट्टी के कार्बन में कमी आ रही है।</>
                  ) : language === 'ta' ? (
                    <><strong>மண் நச்சுத்தன்மை எச்சரிக்கை!</strong> உர அளவு வரம்பை தாண்டியுள்ளது, மண்ணின் கரிம கார்பனை குறைக்கிறது.</>
                  ) : (
                    <span><strong>Soil Toxicity Alert!</strong> Fertilizer dosage ({fertilizer} kg) exceeds organic absorption limits, depleting soil carbon and increasing carbon footprint.</span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
