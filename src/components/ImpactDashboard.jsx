import React, { useState, useEffect, useRef } from 'react';
import { Award, Droplet, Users, Leaf, ArrowUpRight, ShieldCheck, Compass, TrendingUp, Zap } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

// Animated counter hook
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    const start = Date.now();
    const animate = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(parseFloat((num * eased).toFixed(1)));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

export default function ImpactDashboard({ darkMode, language = 'en' }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [hoveredMetric, setHoveredMetric] = useState(null);

  const c1 = useCounter('2.5');
  const c2 = useCounter('28');
  const c3 = useCounter('12.4');
  const c4 = useCounter('420');

  // Translations helper
  const getLocalizedMetrics = () => {
    if (language === 'kn') {
      return [
        { label: 'ಸಂರಕ್ಷಿಸಿದ ನೀರು', val: '೨.೫ ಮಿ ಲೀಟರ್', animVal: `${c1.count}M L`, ref: c1.ref, desc: '೪ ಪ್ರಮಾಣಿತ ಗ್ರಾಮದ ಕೆರೆಗಳಿಗೆ ಸಮಾನ', icon: Droplet, color: 'text-sky-500', bg: 'bg-sky-500/10', gradient: 'from-sky-500 to-blue-500' },
        { label: 'ಸರಾಸರಿ ಆದಾಯ ಹೆಚ್ಚಳ', val: '+೨೮%', animVal: `+${Math.round(c2.count)}%`, ref: c2.ref, desc: 'ಇ-ಮಾರುಕಟ್ಟೆ ನೇರ ಮಾರಾಟದ ಆಧಾರದ ಮೇಲೆ', icon: ArrowUpRight, color: 'text-emerald-500', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500 to-teal-500' },
        { label: 'ಕಾರ್ಬನ್ ಹೊರಸೂಸುವಿಕೆ ನಿಯಂತ್ರಣ', val: '೧೨.೪ ಟನ್', animVal: `${c3.count} Tons`, ref: c3.ref, desc: 'ನಿಖರ ಡ್ರೋನ್ ಉಳುಮೆಯಿಂದ', icon: Leaf, color: 'text-amber-500', bg: 'bg-amber-500/10', gradient: 'from-amber-500 to-orange-500' },
        { label: 'ಸಕ್ರಿಯ ರೈತರು', val: '೪೨೦+', animVal: `${Math.round(c4.count)}+`, ref: c4.ref, desc: '೩ ನೆರೆಯ ಜಿಲ್ಲೆಗಳಲ್ಲಿ', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10', gradient: 'from-purple-500 to-pink-500' }
      ];
    }
    if (language === 'hi') {
      return [
        { label: 'संरक्षित जल', val: '2.5M लीटर', animVal: `${c1.count}M L`, ref: c1.ref, desc: '4 मानक ग्राम झीलों के बराबर', icon: Droplet, color: 'text-sky-500', bg: 'bg-sky-500/10', gradient: 'from-sky-500 to-blue-500' },
        { label: 'औसत आय वृद्धि', val: '+28%', animVal: `+${Math.round(c2.count)}%`, ref: c2.ref, desc: 'ई-मार्केट सीधे बेचने के आधार पर', icon: ArrowUpRight, color: 'text-emerald-500', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500 to-teal-500' },
        { label: 'बचाया गया कार्बन', val: '12.4 टन', animVal: `${c3.count} Tons`, ref: c3.ref, desc: 'सटीक ड्रोन जुताई से', icon: Leaf, color: 'text-amber-500', bg: 'bg-amber-500/10', gradient: 'from-amber-500 to-orange-500' },
        { label: 'सक्रिय किसान सहायक', val: '420+', animVal: `${Math.round(c4.count)}+`, ref: c4.ref, desc: '3 पड़ोसी जिलों में', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10', gradient: 'from-purple-500 to-pink-500' }
      ];
    }
    if (language === 'ta') {
      return [
        { label: 'சேமிக்கப்பட்ட நீர்', val: '2.5M லிட்டர்', animVal: `${c1.count}M L`, ref: c1.ref, desc: '4 கிராம ஏரிகளுக்கு சமம்', icon: Droplet, color: 'text-sky-500', bg: 'bg-sky-500/10', gradient: 'from-sky-500 to-blue-500' },
        { label: 'சராசரி வருமான உயர்வு', val: '+28%', animVal: `+${Math.round(c2.count)}%`, ref: c2.ref, desc: 'மின்னணு சந்தை நேரடி விற்பனை மூலம்', icon: ArrowUpRight, color: 'text-emerald-500', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500 to-teal-500' },
        { label: 'தவிர்க்கப்பட்ட கார்பன்', val: '12.4 டன்கள்', animVal: `${c3.count} Tons`, ref: c3.ref, desc: 'துல்லிய ட்ரோன் உழவு மூலம்', icon: Leaf, color: 'text-amber-500', bg: 'bg-amber-500/10', gradient: 'from-amber-500 to-orange-500' },
        { label: 'உதவி பெற்ற விவசாயிகள்', val: '420+', animVal: `${Math.round(c4.count)}+`, ref: c4.ref, desc: '3 பக்கத்து மாவட்டங்களில்', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10', gradient: 'from-purple-500 to-pink-500' }
      ];
    }
    return [
      { label: 'Water Conserved', val: '2.5M Liters', animVal: `${c1.count}M L`, ref: c1.ref, desc: 'Equal to 4 standard village lakes', icon: Droplet, color: 'text-sky-500', bg: 'bg-sky-500/10', gradient: 'from-sky-500 to-blue-500' },
      { label: 'Average Income Offset', val: '+28%', animVal: `+${Math.round(c2.count)}%`, ref: c2.ref, desc: 'Based on e-market direct selling', icon: ArrowUpRight, color: 'text-emerald-500', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500 to-teal-500' },
      { label: 'Carbon Avoided', val: '12.4 Tons', animVal: `${c3.count} Tons`, ref: c3.ref, desc: 'From precision drone tilling', icon: Leaf, color: 'text-amber-500', bg: 'bg-amber-500/10', gradient: 'from-amber-500 to-orange-500' },
      { label: 'Active Farmers Assisted', val: '420+', animVal: `${Math.round(c4.count)}+`, ref: c4.ref, desc: 'Across 3 neighboring districts', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10', gradient: 'from-purple-500 to-pink-500' }
    ];
  };

  const metrics = getLocalizedMetrics();

  // Side-by-side comparison data
  const comparisonData = language === 'kn' ? [
    { metric: 'ನೀರಿನ ಅಪವ್ಯಯ (%)', conventional: 48, gramverse: 12 },
    { metric: 'ಬೆಳೆ ನಷ್ಟ (%)', conventional: 32, gramverse: 8 },
    { metric: 'ಕಾರ್ಬನ್ ವೆಚ್ಚ (ಕೆಜಿ/ಎಕರೆ)', conventional: 520, gramverse: 140 }
  ] : language === 'hi' ? [
    { metric: 'पानी की बर्बादी (%)', conventional: 48, gramverse: 12 },
    { metric: 'फसल का नुकसान (%)', conventional: 32, gramverse: 8 },
    { metric: 'कार्बन उत्सर्जन (किग्रा/एकड़)', conventional: 520, gramverse: 140 }
  ] : language === 'ta' ? [
    { metric: 'நீர் வீணாவது (%)', conventional: 48, gramverse: 12 },
    { metric: 'பயிர் இழப்பு (%)', conventional: 32, gramverse: 8 },
    { metric: 'கார்பன் உமிழ்வு (கிலோ/ஏக்கர்)', conventional: 520, gramverse: 140 }
  ] : [
    { metric: 'Water Waste (%)', conventional: 48, gramverse: 12 },
    { metric: 'Crop Loss (%)', conventional: 32, gramverse: 8 },
    { metric: 'Carbon Cost (kg/ac)', conventional: 520, gramverse: 140 }
  ];

  // Donut chart data
  const donutData = language === 'kn' ? [
    { label: 'ಕೃಷಿ', value: 40, color: '#10b981' },
    { label: 'ನೀರಿನ ನಿರ್ವಹಣೆ', value: 25, color: '#0ea5e9' },
    { label: 'ಉದ್ಯೋಗ', value: 20, color: '#8b5cf6' },
    { label: 'ಸುಸ್ಥಿರತೆ', value: 15, color: '#f59e0b' }
  ] : language === 'hi' ? [
    { label: 'कृषि', value: 40, color: '#10b981' },
    { label: 'जल प्रबंधन', value: 25, color: '#0ea5e9' },
    { label: 'रोजगार', value: 20, color: '#8b5cf6' },
    { label: 'सतत विकास', value: 15, color: '#f59e0b' }
  ] : language === 'ta' ? [
    { label: 'விவசாயம்', value: 40, color: '#10b981' },
    { label: 'நீர் மேலாண்மை', value: 25, color: '#0ea5e9' },
    { label: 'வேலைவாய்ப்பு', value: 20, color: '#8b5cf6' },
    { label: 'சுற்றுச்சூழல்', value: 15, color: '#f59e0b' }
  ] : [
    { label: 'Agriculture', value: 40, color: '#10b981' },
    { label: 'Water Mgmt', value: 25, color: '#0ea5e9' },
    { label: 'Employment', value: 20, color: '#8b5cf6' },
    { label: 'Sustainability', value: 15, color: '#f59e0b' }
  ];

  const getDonutSegments = (data, radius = 60, innerRadius = 40) => {
    let currentAngle = -90;
    const total = data.reduce((sum, d) => sum + d.value, 0);
    
    return data.map((d) => {
      const angle = (d.value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const startOuter = {
        x: 80 + radius * Math.cos((startAngle * Math.PI) / 180),
        y: 80 + radius * Math.sin((startAngle * Math.PI) / 180)
      };
      const endOuter = {
        x: 80 + radius * Math.cos((endAngle * Math.PI) / 180),
        y: 80 + radius * Math.sin((endAngle * Math.PI) / 180)
      };
      const startInner = {
        x: 80 + innerRadius * Math.cos((endAngle * Math.PI) / 180),
        y: 80 + innerRadius * Math.sin((endAngle * Math.PI) / 180)
      };
      const endInner = {
        x: 80 + innerRadius * Math.cos((startAngle * Math.PI) / 180),
        y: 80 + innerRadius * Math.sin((startAngle * Math.PI) / 180)
      };

      const largeArc = angle > 180 ? 1 : 0;

      const path = `
        M ${startOuter.x} ${startOuter.y}
        A ${radius} ${radius} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}
        L ${startInner.x} ${startInner.y}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}
        Z
      `;

      return { ...d, path };
    });
  };

  const segments = getDonutSegments(donutData);

  const getLocalizedMilestones = () => {
    if (language === 'kn') {
      return [
        { title: 'ಬ್ಲಾಕ್ B ನಲ್ಲಿ ಕಾರ್ಬನ್ ತಟಸ್ಥತೆ', desc: 'ಹಂಚಿಕೆಯ ಸೌರ ಪಂಪಿಂಗ್ ವ್ಯವಸ್ಥೆಗಳ ಮೂಲಕ.', date: 'ಮೇ ೨೦೨೬', icon: '🌿' },
        { title: 'ಡ್ರೋನ್ ಸಹಕಾರ ಸಂಘದ ಉದ್ಘಾಟನೆ', desc: 'ನಾವೀನ್ಯತೆ ಕೇಂದ್ರದ ಮೂಲಕ ರೂಪುಗೊಂಡಿದೆ.', date: 'ಏಪ್ರಿಲ್ ೨೦೨೬', icon: '🚁' },
        { title: 'ನೇರ ಸಗಟು ಮಾರುಕಟ್ಟೆ ಸಂಯೋಜನೆ', desc: '೩ ಪ್ರಮುಖ ಗಿರಣಿಗಳೊಂದಿಗೆ ಒಪ್ಪಂದ ಸಹಿ ಮಾಡಲಾಗಿದೆ.', date: 'ಮಾರ್ಚ್ ೨೦೨೬', icon: '🤝' }
      ];
    }
    if (language === 'hi') {
      return [
        { title: 'ब्लॉक B में कार्बन तटस्थता', desc: 'साझा सौर पंपिंग प्रणालियों के माध्यम से।', date: 'मई 2026', icon: '🌿' },
        { title: 'ड्रोन सहकारी समिति का शुभारंभ', desc: 'इनोवेशन हब के माध्यम से इनक्यूबेट किया गया।', date: 'अप्रैल 2026', icon: '🚁' },
        { title: 'प्रत्यक्ष थोक बाजार एकीकरण', desc: '3 प्रमुख मिलों के साथ अनुबंध हस्ताक्षरित।', date: 'मार्च 2026', icon: '🤝' }
      ];
    }
    if (language === 'ta') {
      return [
        { title: 'பிளாக் B-யில் கார்பன் நடுநிலைமை', desc: 'கூட்டு சூரிய மின்சக்தி நீர் இறைப்பான்கள் மூலம்.', date: 'மே 2026', icon: '🌿' },
        { title: 'ட்ரோன் கூட்டுறவு அமைப்பு தொடக்கம்', desc: 'பயிற்சி மையம் மூலம் உருவாக்கப்பட்டது.', date: 'ஏப்ரல் 2026', icon: '🚁' },
        { title: 'நேரடி மொத்த விற்பனை ஒருங்கிணைப்பு', desc: '3 முக்கிய ஆலைகளுடன் ஒப்பந்தம் கையெழுத்தானது.', date: 'மார்ச் 2026', icon: '🤝' }
      ];
    }
    return [
      { title: 'Carbon Neutrality in Block B', desc: 'Through shared solar pumping arrays.', date: 'May 2026', icon: '🌿' },
      { title: 'Drone Collective Launch', desc: 'Incubated through Innovation Hub.', date: 'April 2026', icon: '🚁' },
      { title: 'Direct Wholesale Integration', desc: 'Signed contracts with 3 major mills.', date: 'March 2026', icon: '🤝' }
    ];
  };

  const milestones = getLocalizedMilestones();

  return (
    <div className="p-6 md:p-8 space-y-6 pb-20 text-left max-w-7xl mx-auto w-full">
      {/* Title Header */}
      <div className="animate-fadeIn">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">
          {t.impact.title}
        </h2>
        <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {t.impact.desc}
        </p>
      </div>

      {/* Grid of Main Impact Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4.5">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div 
              key={idx} 
              ref={m.ref}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 hover-lift animate-fadeInUp ${
                darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
              onMouseEnter={() => setHoveredMetric(idx)}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${m.gradient} flex items-center justify-center text-white mb-5 shadow-lg ${
                  hoveredMetric === idx ? 'scale-110' : ''
                } transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  {m.label}
                </span>
                <span className="text-2xl md:text-3xl font-black mt-1.5 block tabular-nums">
                  {m.animVal}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-3 leading-snug">
                {m.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Side-by-side comparison layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Comparison Chart */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border flex flex-col justify-between animate-fadeInUp ${
          darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
        }`} style={{ animationDelay: '0.3s' }}>
          <div>
            <h3 className="font-bold text-base">{language === 'kn' ? 'ದಕ್ಷತೆ ಹೋಲಿಕೆಗಳು' : language === 'hi' ? 'दक्षता तुलना' : language === 'ta' ? 'செயல்திறன் ஒப்பீடுகள்' : 'Efficiency Comparisons'}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">{language === 'kn' ? 'ಕಿಸಾನ್‌ಸೇತು ಎಐ ಗ್ರಾಮಗಳು ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಕೃಷಿ ವಿಧಾನಗಳು' : language === 'hi' ? 'किसानसेतु एआई ग्राम बनाम पारंपरिक खेती के तरीके' : language === 'ta' ? 'கிசான்சேது ஏஐ கிராமங்கள் மற்றும் வழக்கமான விவசாய முறைகள்' : 'KisanSetu AI villages vs conventional farming methods'}</p>
          </div>

          <div className="space-y-6 my-6 text-sm font-semibold">
            {comparisonData.map((d, idx) => {
              const total = d.conventional + d.gramverse;
              const convWidth = (d.conventional / total) * 100;
              const gvWidth = (d.gramverse / total) * 100;
              const improvement = Math.round(((d.conventional - d.gramverse) / d.conventional) * 100);

              return (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <span className={darkMode ? 'text-slate-200' : 'text-slate-800'}>{d.metric}</span>
                    <div className="flex gap-3 text-xs items-center">
                      <span className="text-rose-500 font-bold">{language === 'kn' ? 'ಸಾಂಪ್ರದಾಯಿಕ' : language === 'hi' ? 'पारंपरिक' : language === 'ta' ? 'வழக்கமான' : 'Conventional'}: {d.conventional}</span>
                      <span className="text-emerald-500 font-bold">KisanSetu: {d.gramverse}</span>
                      <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px] font-black">
                        -{improvement}%
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress comparison bar */}
                  <div className={`w-full h-3 rounded-full overflow-hidden flex ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    <div 
                      className="bg-gradient-to-r from-rose-500 to-rose-600 h-full transition-all duration-1000 rounded-l-full" 
                      style={{ width: `${convWidth}%` }}
                    />
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-1000 rounded-r-full" 
                      style={{ width: `${gvWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`flex justify-between items-center text-xs border-t pt-4 ${
            darkMode ? 'border-slate-800/80' : 'border-slate-100'
          }`}>
            <div className="flex items-center gap-1 text-slate-400 font-semibold">
              <Compass className="w-4 h-4 text-emerald-500 animate-spin-slow" />
              <span>{language === 'kn' ? 'ಕೃಷಿ ಪರಿಶೀಲನೆಯ ಮೂಲಕ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ.' : language === 'hi' ? 'कृषि विज्ञान परीक्षण द्वारा सत्यापित मॉडल।' : language === 'ta' ? 'விவசாய சோதனை மூலம் சரிபார்க்கப்பட்டது.' : 'Yield and resource consumption models verified by agronomy testing.'}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Donut + Milestones */}
        <div className="space-y-6">
          
          {/* Donut Chart */}
          <div className={`p-6 rounded-3xl border animate-fadeInUp ${
            darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
          }`} style={{ animationDelay: '0.4s' }}>
            <h3 className="font-bold text-sm mb-4">{language === 'kn' ? 'ಪ್ರಭಾವದ ವಿತರಣೆ' : language === 'hi' ? 'प्रभाव वितरण' : language === 'ta' ? 'தாக்க விநியோகம்' : 'Impact Distribution'}</h3>
            <div className="flex items-center gap-4">
              <svg viewBox="0 0 160 160" className="w-32 h-32 flex-shrink-0">
                {segments.map((seg, idx) => (
                  <path
                    key={idx}
                    d={seg.path}
                    fill={seg.color}
                    opacity="0.85"
                    className="transition-all duration-300 hover:opacity-100"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.2))' }}
                  />
                ))}
                <text x="80" y="76" textAnchor="middle" className="text-[11px] font-black fill-current">100%</text>
                <text x="80" y="92" textAnchor="middle" className="text-[8px] fill-slate-400 font-semibold">{language === 'kn' ? 'ವ್ಯಾಪ್ತಿ' : language === 'hi' ? 'कवरेज' : language === 'ta' ? 'கவரேஜ்' : 'Coverage'}</text>
              </svg>
              <div className="space-y-2">
                {donutData.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[10px] font-bold">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{d.label}</span>
                    <span className="text-slate-400 ml-auto">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Milestones list */}
          <div className={`p-6 rounded-3xl border space-y-5 animate-fadeInUp ${
            darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
          }`} style={{ animationDelay: '0.5s' }}>
            <div>
              <h3 className="font-bold text-base flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                {language === 'kn' ? 'ಇತ್ತೀಚಿನ ಮೈಲಿಗಲ್ಲುಗಳು' : language === 'hi' ? 'हाल के मील के पत्थर' : language === 'ta' ? 'சமீபத்திய சாதனைகள்' : 'Recent Milestones'}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">{language === 'kn' ? 'ಪೂರ್ಣಗೊಂಡ ಗುರಿಗಳು' : language === 'hi' ? 'पूर्ण किए गए उद्देश्य' : language === 'ta' ? 'நிறைவேற்றப்பட்ட இலக்குகள்' : 'Completed objectives'}</p>
            </div>

            <hr className={darkMode ? 'border-slate-800/60' : 'border-slate-100'} />

            <div className="space-y-4 text-xs font-semibold">
              {milestones.map((milestoneItem, idx) => (
                <div key={idx} className={`pb-3.5 border-b last:border-0 last:pb-0 text-left ${
                  darkMode ? 'border-slate-800/60' : 'border-slate-100'
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{milestoneItem.icon}</span>
                      <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{milestoneItem.title}</h4>
                    </div>
                    <span className="text-[9px] text-slate-400 flex-shrink-0">{milestoneItem.date}</span>
                  </div>
                  <p className="text-slate-400 mt-1 leading-snug ml-8">{milestoneItem.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
