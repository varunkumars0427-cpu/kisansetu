import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  MessageSquare, 
  Map, 
  Store, 
  Droplet, 
  Lightbulb, 
  Users, 
  Layers, 
  Award,
  LogOut
} from 'lucide-react';
import { calculateVillageHealthMeter } from '../utils/calculations';
import { TRANSLATIONS } from '../utils/translations';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  villageStats, 
  darkMode,
  onLogout,
  language = 'en'
}) {
  const healthScore = calculateVillageHealthMeter(villageStats);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const menuItems = [
    { id: 'landing', label: t.nav.landing, icon: Home },
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'advisor', label: t.nav.advisor, icon: MessageSquare },
    { id: 'map', label: t.nav.map, icon: Map },
    { id: 'marketplace', label: t.nav.marketplace, icon: Store },
    { id: 'irrigation', label: t.nav.irrigation, icon: Droplet },
    { id: 'innovation', label: t.nav.innovation, icon: Lightbulb },
    { id: 'community', label: t.nav.collab, icon: Users },
    { id: 'twin', label: t.nav.digitaltwin, icon: Layers },
    { id: 'impact', label: t.nav.impact, icon: Award },
  ];

  // Circle path math for Health Meter circular gauge
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  // Determine health color/status
  const getHealthStatus = (score) => {
    if (score >= 82) return { label: t.common.excellent, color: 'text-emerald-500', stroke: 'stroke-emerald-500', bg: 'bg-emerald-500/10' };
    if (score >= 70) return { label: t.common.optimal, color: 'text-primary-blue', stroke: 'stroke-sky-500', bg: 'bg-sky-500/10' };
    if (score >= 50) return { label: t.common.moderate, color: 'text-earth-amber', stroke: 'stroke-amber-500', bg: 'bg-amber-500/10' };
    return { label: t.common.poor, color: 'text-rose-500', stroke: 'stroke-rose-500', bg: 'bg-rose-500/10' };
  };

  const status = getHealthStatus(healthScore);

  return (
    <div className={`w-64 flex-shrink-0 flex flex-col h-full border-r ${
      darkMode 
        ? 'bg-[#1e293b] border-slate-800/80 text-slate-300' 
        : 'bg-white border-slate-200 text-slate-700'
    }`}>
      {/* Title / Logo Header */}
      <div className={`p-6 border-b flex items-center gap-3 ${
        darkMode ? 'border-slate-800/60' : 'border-slate-200'
      }`}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-sky-500 flex items-center justify-center text-white font-bold shadow-lg animate-float-slow">
          🌾
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight leading-none bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent font-heading">
            {t.common.appName}
          </h1>
          <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
            {language === 'kn' ? 'ಡಿಜಿಟಲ್ ಗ್ರಾಮ' : language === 'hi' ? 'डिजिटल विलेज' : language === 'ta' ? 'டிஜிட்டல் கிராமம்' : 'Digital Village'}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 custom-scroll no-scrollbar">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 text-left animate-fadeIn ${
                isActive 
                  ? darkMode 
                    ? 'bg-emerald-500/15 text-white border-l-4 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.1)]' 
                    : 'bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600 font-bold'
                  : darkMode 
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/40' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              style={{ animationDelay: `${idx * 0.03}s` }}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${
                isActive ? 'text-emerald-500' : 'text-slate-400 group-hover:text-white'
              }`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Village Health Meter Section */}
      <div className={`p-4 border-t ${
        darkMode ? 'border-slate-800/80 bg-[#0f172a]/50' : 'border-slate-200 bg-slate-50'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider opacity-75">
            {t.common.villageHealth}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status.color} ${status.bg} border border-current/10 animate-pulse`}>
            {status.label}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Radial Circular Progress Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={radius}
                className={darkMode ? 'stroke-slate-800' : 'stroke-slate-200'}
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                className={`transition-all duration-500 ${status.stroke}`}
                strokeWidth="5"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-sm font-black tracking-tighter">
              {healthScore}%
            </span>
          </div>

          {/* Breakdown Mini Progress Bars */}
          <div className="flex-1 space-y-1.5 text-[10px]">
            <div>
              <div className="flex justify-between font-semibold opacity-80">
                <span>{t.dashboard.soilHealth.split(' ')[0]}</span>
                <span>{villageStats.soilQuality}%</span>
              </div>
              <div className={`w-full h-1 rounded-full overflow-hidden mt-0.5 ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500 rounded-full" 
                  style={{ width: `${villageStats.soilQuality}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold opacity-80">
                <span>{t.dashboard.waterIndex.split(' ')[0]}</span>
                <span>{villageStats.waterAvailability}%</span>
              </div>
              <div className={`w-full h-1 rounded-full overflow-hidden mt-0.5 ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div 
                  className="bg-sky-500 h-full transition-all duration-500 rounded-full" 
                  style={{ width: `${villageStats.waterAvailability}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      {onLogout && (
        <div className={`p-3 border-t ${darkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              darkMode
                ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'
                : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50'
            }`}
          >
            <LogOut className="w-4 h-4" />
            <span>{t.common.exit}</span>
          </button>
        </div>
      )}

    </div>
  );
}
