import React, { useState } from 'react';
import { Compass, Droplet, IndianRupee, Tractor, ShieldAlert, Zap, TrendingUp } from 'lucide-react';
import { simulateIrrigation } from '../utils/calculations';
import { TRANSLATIONS } from '../utils/translations';

export default function IrrigationSimulator({ darkMode, language = 'en' }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [crop, setCrop] = useState('Wheat');
  const [size, setSize] = useState(5);
  const [waterLevel, setWaterLevel] = useState(70);
  const [result, setResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = (e) => {
    e.preventDefault();
    setIsSimulating(true);
    setResult(null);
    
    setTimeout(() => {
      const data = simulateIrrigation({ crop, size: parseFloat(size), waterLevel: parseFloat(waterLevel) });
      setResult(data);
      setIsSimulating(false);
    }, 1200);
  };

  const getCropEmoji = (c) => {
    const map = { Wheat: '🌾', Rice: '🌿', Cotton: '🌼', Millets: '🌱' };
    return map[c] || '🌱';
  };

  const getCropLabel = (c) => {
    if (language === 'kn') {
      const map = { Wheat: 'ಗೋಧಿ (ರಬಿ)', Rice: 'ಭತ್ತ (ಖಾರಿಫ್)', Cotton: 'ಹತ್ತಿ (ನಗದು ಬೆಳೆ)', Millets: 'ಸಜ್ಜೆ / ರಾಗಿ (ಒಣ ಭೂಮಿ)' };
      return map[c] || c;
    }
    if (language === 'hi') {
      const map = { Wheat: 'गेहूं (रबी)', Rice: 'धान (चावल) (खरीफ)', Cotton: 'कपास (नकदी फसल)', Millets: 'बाजरा (सूखा)' };
      return map[c] || c;
    }
    if (language === 'ta') {
      const map = { Wheat: 'கோதுமை (ரபி)', Rice: 'நெல் (காரிஃப்)', Cotton: 'பருத்தி (பணப்பயிர்)', Millets: 'கம்பு (வறண்ட நிலம்)' };
      return map[c] || c;
    }
    const map = { Wheat: 'Durum Wheat (Rabi)', Rice: 'Basmati Rice (Kharif)', Cotton: 'BT Hybrid Cotton (Cash)', Millets: 'Pearl Millet / Bajra (Dry)' };
    return map[c] || c;
  };

  return (
    <div className="p-6 md:p-8 space-y-6 pb-20 text-left max-w-7xl mx-auto w-full">
      {/* Title Header */}
      <div className="animate-fadeIn">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">
          {t.irrigation.title}
        </h2>
        <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {t.irrigation.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Simulation Input Form */}
        <div className={`p-6 rounded-3xl border flex flex-col justify-between animate-fadeInUp ${
          darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
        }`} style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleSimulate} className="space-y-5 text-sm">
            <h3 className="font-bold text-base mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500" />
              {t.irrigation.paramsTitle}
            </h3>

            {/* Crop Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 ml-0.5">{t.irrigation.selectCrop}</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border outline-none cursor-pointer transition-all ${
                  darkMode ? 'glass-input focus:border-emerald-500/50' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500'
                }`}
              >
                <option value="Wheat">{getCropEmoji('Wheat')} {getCropLabel('Wheat')}</option>
                <option value="Rice">{getCropEmoji('Rice')} {getCropLabel('Rice')}</option>
                <option value="Cotton">{getCropEmoji('Cotton')} {getCropLabel('Cotton')}</option>
                <option value="Millets">{getCropEmoji('Millets')} {getCropLabel('Millets')}</option>
              </select>
            </div>

            {/* Farm Size Slider */}
            <div>
              <div className="flex justify-between items-center mb-1 ml-0.5">
                <label className="text-xs font-bold text-slate-400">{t.irrigation.landSize}</label>
                <span className="text-sm font-black text-emerald-500 tabular-nums">{size} {language === 'kn' ? 'ಎಕರೆ' : language === 'hi' ? 'एकड़' : language === 'ta' ? 'ஏக்கர்' : 'Acres'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full accent-emerald-500 bg-slate-800"
              />
              <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                <span>1 {language === 'kn' ? 'ಎಕರೆ' : language === 'hi' ? 'एकड़' : language === 'ta' ? 'ஏக்கர்' : 'Acre'}</span>
                <span>30 {language === 'kn' ? 'ಎಕರೆಗಳು' : language === 'hi' ? 'एकड़' : language === 'ta' ? 'ஏக்கர்' : 'Acres'}</span>
              </div>
            </div>

            {/* Water Availability Slider */}
            <div>
              <div className="flex justify-between items-center mb-1 ml-0.5">
                <label className="text-xs font-bold text-slate-400">{t.irrigation.reservoirLevel}</label>
                <span className={`text-sm font-black tabular-nums ${
                  waterLevel >= 70 ? 'text-sky-400' : waterLevel >= 40 ? 'text-amber-400' : 'text-rose-400'
                }`}>{waterLevel}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={waterLevel}
                onChange={(e) => setWaterLevel(e.target.value)}
                className={`w-full bg-slate-800 ${
                  waterLevel >= 70 ? 'accent-sky-500' : waterLevel >= 40 ? 'accent-amber-500' : 'accent-rose-500'
                }`}
              />
              <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                <span>10% ({language === 'kn' ? 'ತೀವ್ರ ಕೊರತೆ' : language === 'hi' ? 'गंभीर कमी' : language === 'ta' ? 'கடுமையான பற்றாக்குறை' : 'Severe deficit'})</span>
                <span>100% ({language === 'kn' ? 'ಭರ್ತಿ' : language === 'hi' ? 'पूर्ण' : language === 'ta' ? 'முழுமை' : 'Full'})</span>
              </div>
            </div>

            {/* Visual Water Level Indicator */}
            <div className={`p-3 rounded-xl border text-center ${
              darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <div className="flex items-center justify-center gap-3">
                <div className="relative w-10 h-16 rounded-lg overflow-hidden border border-sky-500/30">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-500 to-sky-400 transition-all duration-500"
                    style={{ height: `${waterLevel}%` }}
                  />
                  <Droplet className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{language === 'kn' ? 'ಜಲಾಶಯದ ಮಟ್ಟ' : language === 'hi' ? 'जलाशय स्तर' : language === 'ta' ? 'தேக்க நிலை' : 'Tank Level'}</span>
                  <span className={`text-lg font-black tabular-nums ${
                    waterLevel >= 70 ? 'text-sky-400' : waterLevel >= 40 ? 'text-amber-400' : 'text-rose-400'
                  }`}>{waterLevel}%</span>
                </div>
              </div>
            </div>

            {/* Submit Simulation */}
            <button
              type="submit"
              disabled={isSimulating}
              className={`w-full font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 text-center text-white text-xs ${
                isSimulating 
                  ? 'bg-emerald-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98] shadow-emerald-500/20'
              }`}
            >
              {isSimulating ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {language === 'kn' ? 'ಸಿಮ್ಯುಲೇಶನ್ ಚಾಲನೆಯಲ್ಲಿದೆ...' : language === 'hi' ? 'सिमुलेशन चल रहा है...' : language === 'ta' ? 'உருவகப்படுத்துதல் இயங்குகிறது...' : 'Running Simulation...'}
                </span>
              ) : t.irrigation.btnRun}
            </button>
          </form>
        </div>

        {/* Right Side: Simulation Results Display */}
        <div className="lg:col-span-2">
          {result ? (
            <div className={`p-6 rounded-3xl border space-y-6 h-full flex flex-col justify-between animate-scaleIn ${
              darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
            }`}>
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {language === 'kn' ? 'ಸಿಮ್ಯುಲೇಶನ್ ಔಟ್‌ಪುಟ್' : language === 'hi' ? 'सिमुलेशन परिणाम' : language === 'ta' ? 'உருவகப்படுத்துதல் வெளியீடு' : 'Simulation Output'}
                </span>
                <h3 className={`text-xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {language === 'kn' ? `${size} ಎಕರೆ ${getCropLabel(crop)} ಗಾಗಿ ಮುನ್ಸೂಚಕ ವಿಶ್ಲೇಷಣೆ ${getCropEmoji(crop)}` :
                   language === 'hi' ? `${size} एकड़ ${getCropLabel(crop)} के लिए पूर्वानुमानित विश्लेषण ${getCropEmoji(crop)}` :
                   language === 'ta' ? `${size} ஏக்கர் ${getCropLabel(crop)} க்கான முன்கணிப்பு பகுப்பாய்வு ${getCropEmoji(crop)}` :
                   `Predictive Analysis for ${size} Acres of ${crop} ${getCropEmoji(crop)}`}
                </h3>
              </div>

              {/* Main numerical meters grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Water Volume Box */}
                <div className="bg-sky-500/5 border border-sky-500/20 rounded-2xl p-4.5 text-left flex items-start gap-4 hover-lift">
                  <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl">
                    <Droplet className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t.irrigation.requiredWater}</span>
                    <span className="text-2xl font-black text-sky-400 block mt-1 tabular-nums">
                      {result.waterRequired.toLocaleString()} m³
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ~{(result.waterRequired * 1000).toLocaleString()} {language === 'kn' ? 'ಲೀಟರ್‌ಗಳು ಒಟ್ಟು' : language === 'hi' ? 'लीटर कुल' : language === 'ta' ? 'லிட்டர் மொத்தம்' : 'Liters total'}
                    </span>
                  </div>
                </div>

                {/* Expected Yield Box */}
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4.5 text-left flex items-start gap-4 hover-lift">
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                    <Tractor className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t.irrigation.predictedYield}</span>
                    <span className="text-2xl font-black text-emerald-500 block mt-1 tabular-nums">
                      {result.predictedYield} {language === 'kn' ? 'ಟನ್‌ಗಳು' : language === 'hi' ? 'टन' : language === 'ta' ? 'டன்கள்' : 'Tonnes'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Average {parseFloat((result.predictedYield / size).toFixed(2))} {language === 'kn' ? 'ಟನ್/ಎಕರೆಗೆ' : language === 'hi' ? 'टन/एकड़' : language === 'ta' ? 'டன்/ஏக்கருக்கு' : 'tonnes/acre'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Financial forecasts box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Cost Box */}
                <div className={`border rounded-2xl p-4.5 text-left flex items-start gap-4 hover-lift ${
                  darkMode ? 'bg-slate-500/5 border-slate-500/10' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className={`p-3 rounded-xl ${darkMode ? 'bg-slate-500/10 text-slate-400' : 'bg-slate-200 text-slate-500'}`}>
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t.irrigation.costEstimate}</span>
                    <span className="text-xl font-bold block mt-1 tabular-nums">
                      ₹{result.costEstimate.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {language === 'kn' ? 'ಬೀಜಗಳು, ವಿದ್ಯುತ್ ಮತ್ತು ಕಾರ್ಮಿಕ ವೆಚ್ಚ ಸೇರಿವೆ' : language === 'hi' ? 'बीज, बिजली और श्रम शामिल हैं' : language === 'ta' ? 'விதை, மின்சாரம் மற்றும் கூலி உள்ளடக்கியது' : 'Includes seeds, electricity & labor'}
                    </span>
                  </div>
                </div>

                {/* Profit/Loss Box */}
                <div className={`border rounded-2xl p-4.5 text-left flex items-start gap-4 hover-lift ${
                  result.profitForecast >= 0 
                    ? 'bg-emerald-500/5 border-emerald-500/20' 
                    : 'bg-rose-500/5 border-rose-500/20'
                }`}>
                  <div className={`p-3 rounded-xl ${
                    result.profitForecast >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-500'
                  }`}>
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t.irrigation.profitForecast}</span>
                    <span className={`text-xl font-black block mt-1 tabular-nums ${
                      result.profitForecast >= 0 ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
                      ₹{result.profitForecast.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {language === 'kn' ? 'ಕಾರ್ಯಾಚರಣೆಯ ವೆಚ್ಚಗಳ ನಂತರ ನಿವ್ವಳ ಲಾಭ' : language === 'hi' ? 'परिचालन लागत के बाद मार्जिन' : language === 'ta' ? 'இயக்க செலவுகளுக்குப் பிந்தைய லாபம்' : 'Margin after operational costs'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Water constraint alert */}
              {waterLevel < 50 && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs flex gap-3 text-amber-300 animate-fadeIn">
                  <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-500" />
                  <span>
                    {language === 'kn' ? (
                      <><strong>ಎಚ್ಚರಿಕೆ: ನೀರಿನ ಕೊರತೆ ಕಂಡುಬಂದಿದೆ!</strong> ಕಡಿಮೆ ನೀರಿನ ಸೂಚ್ಯಂಕಗಳಿಂದಾಗಿ ಬೆಳೆ ಇಳುವರಿ ಕಡಿಮೆಯಾಗಬಹುದು. ಇದನ್ನು ತಗ್ಗಿಸಲು ಹನಿ ನೀರಾವರಿ ಬಳಸಿ.</>
                    ) : language === 'hi' ? (
                      <><strong>सावधानी: पानी की कमी का पता चला!</strong> कम पानी के सूचकांकों के कारण फसल की उपज प्रभावित हुई है। प्रभाव को कम करने के लिए ड्रिप सिंचाई अपनाएं.</>
                    ) : language === 'ta' ? (
                      <><strong>எச்சரிக்கை: நீர் பற்றாக்குறை கண்டறியப்பட்டது!</strong> குறைந்த நீர் அளவு காரணமாக பயிர் விளைச்சல் குறையலாம். சொட்டு நீர் பாசனத்தைப் பயன்படுத்தவும்.</>
                    ) : (
                      <span><strong>Caution: Water Deficit Detected!</strong> Plant yield has been throttled by 15-40% due to low water indexes. Switch to Drip mode and apply mulch to mitigate yield declines.</span>
                    )}
                  </span>
                </div>
              )}

            </div>
          ) : (
            <div className={`p-12 rounded-3xl border flex flex-col items-center justify-center text-center h-full animate-fadeInUp ${
              darkMode ? 'glass-card' : 'bg-white border-slate-100'
            }`} style={{ animationDelay: '0.2s' }}>
              {isSimulating ? (
                <>
                  <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
                  <h4 className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{language === 'kn' ? 'ಸಿಮ್ಯುಲೇಶನ್ ಚಾಲನೆಯಲ್ಲಿದೆ...' : language === 'hi' ? 'सिमुलेशन चल रहा है...' : language === 'ta' ? 'உருவகப்படுத்துதல் இயங்குகிறது...' : 'Running Simulation...'}</h4>
                  <p className="text-xs text-slate-500 mt-1">{language === 'kn' ? 'ಹೈಡ್ರೋಲಾಜಿಕಲ್ ಮಾದರಿಗಳನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ' : language === 'hi' ? 'हाइड्रोलॉजिकल मॉडल को संसाधित किया जा रहा है' : language === 'ta' ? 'மாதிரிகள் கணக்கிடப்படுகின்றன' : 'Processing hydrological models'}</p>
                </>
              ) : (
                <>
                  <Compass className="w-12 h-12 text-slate-500 mb-3 animate-spin-slow" />
                  <h4 className={`font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{language === 'kn' ? 'ಸಿಮ್ಯುಲೇಟರ್ ಐಡಲ್‌ನಲ್ಲಿದೆ' : language === 'hi' ? 'सिम्युलेटर निष्क्रिय है' : language === 'ta' ? 'உருவகப்படுத்தி இயங்கவில்லை' : 'Simulator Idle'}</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                    {language === 'kn' ? 'ಎಡಭಾಗದಲ್ಲಿ ನಿಯತಾಂಕಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ ಮತ್ತು "ಸಿಮ್ಯುಲೇಶನ್ ರನ್ ಮಾಡಿ" ಕ್ಲಿಕ್ ಮಾಡಿ.' :
                     language === 'hi' ? 'बाएं पैनल पर पैरामीटर कॉन्फ़िगर करें और "सिमुलेशन चलाएं" पर क्लिक करें।' :
                     language === 'ta' ? 'இடதுபுற பேனலில் அளவுருக்களை அமைத்து "சிமுலேஷனை இயக்கு" என்பதை அழுத்தவும்.' :
                     'Configure parameter values on the left panel and click "Run Simulation" to model the farm\'s irrigation output.'}
                  </p>
                </>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
