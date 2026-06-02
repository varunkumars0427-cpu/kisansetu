import React, { useState } from 'react';
import { MapPin, Info, Layers, RefreshCw, AlertTriangle, CheckCircle, Droplet, Thermometer, Sprout, X, User, Calendar, Sliders } from 'lucide-react';
import { getLocalizedMockData, TRANSLATIONS } from '../utils/translations';

export default function FarmMap({ darkMode, language = 'en' }) {
  const [selectedZoneId, setSelectedZoneId] = useState(1);
  const [activeLayer, setActiveLayer] = useState('moisture');
  const [modalZone, setModalZone] = useState(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const mockData = getLocalizedMockData(language);
  const zones = mockData.mapZones;

  const selectedZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  const getZoneColor = (zone) => {
    if (activeLayer === 'moisture') {
      if (zone.moisture >= 75) return 'bg-blue-600/10 border-blue-500/50 hover:bg-blue-600/20';
      if (zone.moisture >= 50) return 'bg-blue-500/5 border-blue-400/30 hover:bg-blue-500/15';
      return 'bg-amber-600/5 border-amber-500/30 hover:bg-amber-600/15';
    }
    
    if (activeLayer === 'nutrient') {
      if (zone.pH >= 6.2 && zone.pH <= 7.0) return 'bg-emerald-600/10 border-emerald-500/50 hover:bg-emerald-600/20';
      if (zone.pH >= 5.8 && zone.pH <= 7.4) return 'bg-emerald-500/5 border-emerald-400/30 hover:bg-emerald-500/15';
      return 'bg-rose-600/5 border-rose-500/30 hover:bg-rose-600/15';
    }

    if (activeLayer === 'heat') {
      if (zone.soilType.includes('Sandy') || zone.soilType.includes('Gravelly') || zone.soilType.includes('बलुई') || zone.soilType.includes('ಮರಳು') || zone.soilType.includes('மணல்')) {
        return 'bg-orange-600/15 border-orange-500/50 hover:bg-orange-600/25';
      }
      if (zone.soilType.includes('Clay') || zone.soilType.includes('ಜೇಡಿ') || zone.soilType.includes('களிமண்')) {
        return 'bg-sky-500/5 border-sky-400/30 hover:bg-sky-500/15';
      }
      return 'bg-amber-500/5 border-amber-400/30 hover:bg-amber-500/15';
    }

    return 'bg-slate-800/40 border-slate-700';
  };

  const getMoistureGradient = (moisture) => {
    if (moisture >= 75) return 'from-blue-500 to-cyan-400';
    if (moisture >= 50) return 'from-sky-500 to-blue-400';
    if (moisture >= 35) return 'from-amber-500 to-yellow-400';
    return 'from-red-500 to-orange-400';
  };

  // Helper to determine status ring classes
  const getStatusRingStyle = (healthStatus) => {
    switch (healthStatus) {
      case 'Healthy':
        return 'border-2 border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]';
      case 'Moderate':
        return 'border-2 border-amber-500 bg-amber-500/10 text-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]';
      case 'Poor':
      default:
        return 'border-2 border-rose-500 bg-rose-500/10 text-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)] animate-pulse';
    }
  };

  const getStatusDot = (healthStatus) => {
    switch (healthStatus) {
      case 'Healthy':
        return '🟢 ' + t.common.healthy;
      case 'Moderate':
        return '🟡 ' + t.common.moderate;
      case 'Poor':
      default:
        return '🔴 ' + t.common.poor;
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 pb-20 text-left max-w-7xl mx-auto w-full">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">
            {t.map.title}
          </h2>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {t.map.desc}
          </p>
        </div>

        {/* Map Layer Controls */}
        <div className={`p-1 rounded-xl flex items-center border text-xs font-semibold ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {[
            { id: 'moisture', label: t.map.layers.moisture, activeColor: 'bg-emerald-600' },
            { id: 'nutrient', label: t.map.layers.nutrient, activeColor: 'bg-emerald-600' },
            { id: 'heat', label: t.map.layers.heat, activeColor: 'bg-emerald-600' }
          ].map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeLayer === layer.id
                  ? `${layer.activeColor} text-white shadow-sm`
                  : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Map, Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Interactive 2D Map Grid */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border relative overflow-hidden flex flex-col justify-between animate-fadeInUp ${
          darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
        }`} style={{ animationDelay: '0.1s' }}>
          {/* Water source marker indicators overlay */}
          <div className={`absolute top-4 left-4 flex gap-3 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border z-20 ${
            darkMode ? 'bg-black/40 backdrop-blur border-white/5' : 'bg-white/80 backdrop-blur border-slate-200'
          }`}>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" /> {language === 'kn' ? 'ಬೋರ್ವೆಲ್' : language === 'hi' ? 'बोरवेल' : language === 'ta' ? 'ஆழ்துளைக் கிணறு' : 'Borewell'}</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }} /> {language === 'kn' ? 'ನದಿ' : language === 'hi' ? 'नदी' : language === 'ta' ? 'ஆறு' : 'River'}</span>
          </div>

          {/* Interactive Plot Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 aspect-[2/1] items-center justify-center my-6 relative">
            
            {/* Visual Borewell intake icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-300/30 flex items-center justify-center text-xs z-10 pointer-events-none">
              <div className="w-4 h-4 rounded-full bg-cyan-500/60 animate-ping" />
            </div>

            {zones.map((zone, idx) => {
              const isSelected = zone.id === selectedZoneId;
              const borderStyles = isSelected 
                ? 'border-emerald-500 scale-[1.03] ring-2 ring-emerald-500/50' 
                : 'border-slate-200/60 dark:border-slate-800/80';
              
              return (
                <button
                  key={zone.id}
                  onClick={() => {
                    setSelectedZoneId(zone.id);
                    setModalZone(zone);
                  }}
                  className={`h-36 rounded-2xl flex flex-col justify-between p-3.5 transition-all duration-300 hover:scale-[1.02] border ${borderStyles} ${getZoneColor(zone)} ${
                    darkMode ? 'ring-offset-[#0f172a]' : 'ring-offset-white'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] font-black opacity-85 leading-none">
                      {zone.name.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <MapPin className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-emerald-400' : 'text-slate-400 opacity-60'
                    }`} />
                  </div>

                  {/* Visual Crop Emoji and Status Ring */}
                  <div className="my-2 flex justify-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getStatusRingStyle(zone.healthStatus)}`}>
                      {zone.cropEmoji}
                    </div>
                  </div>

                  <div className="text-center w-full">
                    <span className="text-xs font-black block truncate">
                      {zone.activeCrop}
                    </span>
                    <span className="text-[9px] opacity-75 font-semibold block mt-0.5">
                      Moisture: {zone.moisture}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className={`flex items-center justify-between text-xs border-t pt-4 ${
            darkMode ? 'border-slate-800/80' : 'border-slate-100'
          }`}>
            <div className="flex items-center gap-1 text-slate-400">
              <Info className="w-4 h-4" />
              <span>{t.map.legend}</span>
            </div>
            <button 
              className="flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              onClick={() => {}}
            >
              <RefreshCw className="w-3.5 h-3.5" /> {t.map.refreshBtn}
            </button>
          </div>
        </div>

        {/* Right Side: Selected Zone Info Panel */}
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border text-left space-y-5 animate-fadeInUp ${
            darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
          }`} style={{ animationDelay: '0.2s' }}>
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{t.map.inspectorTitle}</span>
              <h3 className={`text-xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                {selectedZone.name}
              </h3>
            </div>

            <hr className={darkMode ? 'border-slate-800/60' : 'border-slate-100'} />

            <div className="space-y-4 text-sm">
              {[
                { label: t.map.cropName, value: `${selectedZone.cropEmoji} ${selectedZone.activeCrop}` },
                { label: language === 'kn' ? 'ಮಣ್ಣಿನ ವರ್ಗೀಕರಣ' : language === 'hi' ? 'मिट्टी का वर्गीकरण' : language === 'ta' ? 'மண் வகைப்பாடு' : 'Soil Classification', value: selectedZone.soilType },
                { label: t.map.acidity, value: `${selectedZone.pH} pH` },
                { label: t.map.moistureLevel, value: `${selectedZone.moisture}%` }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-slate-400">{item.label}</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="text-slate-400">{t.map.sensorStatus}</span>
                <span className={`font-bold flex items-center gap-1 ${
                  selectedZone.status.includes('Optimal') || selectedZone.status.includes('Excellent') || selectedZone.status.includes('ಸೂಕ್ತವಾಗಿದೆ') || selectedZone.status.includes('ಇಷ್ಟतम') || selectedZone.status.includes('உகந்தது')
                    ? 'text-emerald-500'
                    : 'text-amber-500'
                }`}>
                  {selectedZone.status.includes('Optimal') || selectedZone.status.includes('Excellent') || selectedZone.status.includes('ಸೂಕ್ತವಾಗಿದೆ') || selectedZone.status.includes('ಇಷ್ಟतम') || selectedZone.status.includes('உகந்தது')
                    ? <CheckCircle className="w-4 h-4" /> 
                    : <AlertTriangle className="w-4 h-4" />
                  }
                  {selectedZone.status}
                </span>
              </div>
            </div>

            {/* Moisture progress bar */}
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span>{t.map.moistureLevel}</span>
                <span>{selectedZone.moisture}%</span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <div 
                  className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${getMoistureGradient(selectedZone.moisture)}`}
                  style={{ width: `${selectedZone.moisture}%` }}
                />
              </div>
            </div>

            <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
              selectedZone.moisture < 40 
                ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' 
                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
            }`}>
              {selectedZone.moisture < 40 
                ? t.map.alertLow 
                : t.map.alertOptimal
              }
            </div>
          </div>
        </div>

      </div>

      {/* Popup Modal Detail Overlay */}
      {modalZone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl relative transition-all animate-scaleIn ${
              darkMode ? 'bg-[#1e293b] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            {/* Close Button */}
            <button 
              onClick={() => setModalZone(null)}
              className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${
                darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-800'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${getStatusRingStyle(modalZone.healthStatus)}`}>
                  {modalZone.cropEmoji}
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">KisanSetu Plot Details</span>
                  <h3 className="text-lg font-black leading-tight">{modalZone.name}</h3>
                </div>
              </div>

              <hr className={darkMode ? 'border-slate-800' : 'border-slate-100'} />

              <div className="space-y-3.5 text-xs font-medium">
                {/* Crop Name */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5"><Sprout className="w-4 h-4 text-slate-400" /> {t.map.cropName}</span>
                  <span className="font-bold text-sm">{modalZone.activeCrop}</span>
                </div>
                {/* Area Covered */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5"><Sliders className="w-4 h-4 text-slate-400" /> {t.map.areaCovered}</span>
                  <span className="font-bold">{modalZone.areaCovered || "2.5 Acres"}</span>
                </div>
                {/* Health Status */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-slate-400" /> Sensor Status / Health</span>
                  <span className="font-bold text-xs">{getStatusDot(modalZone.healthStatus)}</span>
                </div>
                {/* Last Updated Date */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {t.map.lastUpdated}</span>
                  <span className="font-bold font-mono">{modalZone.lastUpdated || "2026-06-02"}</span>
                </div>
                {/* Farmer Details */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400 flex items-center gap-1.5"><User className="w-4 h-4 text-slate-400" /> {t.map.farmerDetails}</span>
                  <span className="font-bold text-emerald-500">{modalZone.farmerDetails || "Patil S. (Lead Cultivator)"}</span>
                </div>
              </div>

              {/* Action Button inside modal */}
              <div className="pt-2">
                <button 
                  onClick={() => setModalZone(null)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold text-xs transition-all shadow-md"
                >
                  {t.common.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
