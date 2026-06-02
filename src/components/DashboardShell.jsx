import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, Sun, Moon, Bell, Search, User, Globe, ChevronRight, LogOut, X } from 'lucide-react';
import { calculateVillageHealthMeter } from '../utils/calculations';
import { TRANSLATIONS } from '../utils/translations';

export default function DashboardShell({ 
  children, 
  activeTab, 
  setActiveTab, 
  villageStats, 
  darkMode, 
  setDarkMode,
  onLogout,
  user,
  language,
  setLanguage
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const healthScore = calculateVillageHealthMeter(villageStats);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className={`h-screen flex overflow-hidden font-sans select-none transition-colors duration-200 ${
      darkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Sidebar - Desktop Version */}
      <div className="hidden md:flex md:flex-shrink-0 h-full">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          villageStats={villageStats}
          darkMode={darkMode}
          onLogout={onLogout}
          language={language}
        />
      </div>

      {/* Sidebar - Mobile drawer slide out */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Overlay backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer body */}
          <div className={`relative flex-1 flex flex-col max-w-xs w-full transition-transform duration-300 animate-slideInLeft ${
            darkMode ? 'bg-[#1e293b]' : 'bg-white'
          }`}>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar 
              activeTab={activeTab} 
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setSidebarOpen(false);
              }} 
              villageStats={villageStats}
              darkMode={darkMode}
              onLogout={onLogout}
              language={language}
            />
          </div>
        </div>
      )}

      {/* Main content body wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        
        {/* Top Navbar */}
        <header className={`h-16 flex items-center justify-between px-6 border-b z-40 ${
          darkMode 
            ? 'bg-[#1e293b]/90 border-slate-800/80 backdrop-blur-xl' 
            : 'bg-white/95 border-slate-200 backdrop-blur-xl'
        }`}>
          {/* Left panel items */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Navigation Path Breadcrumbs */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent font-black">KisanSetu</span>
              <ChevronRight className="w-3 h-3" />
              <span className={darkMode ? 'text-white' : 'text-slate-700'}>
                {activeTab === 'community' 
                  ? t.nav.collab 
                  : activeTab === 'twin' 
                    ? t.nav.digitaltwin 
                    : (t.nav[activeTab] || 'Core Hub')}
              </span>
            </div>
          </div>

          {/* Right panel controls */}
          <div className="flex items-center gap-3 md:gap-4.5">
            {/* Quick stats indicator */}
            <div className={`hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
              darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{t.common.villageHealth}: {healthScore}%</span>
            </div>

            {/* Language / Region Selector Dropdown */}
            <div className="relative flex items-center">
              <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`text-xs font-semibold pl-7.5 pr-6 py-1 rounded-lg border outline-none cursor-pointer appearance-none transition-all ${
                  darkMode 
                    ? 'border-slate-800 bg-[#1e293b] text-slate-200 focus:border-emerald-500/50' 
                    : 'border-slate-200 bg-white text-slate-700 focus:border-emerald-600'
                }`}
                style={{ backgroundImage: 'radial-gradient(circle, transparent 1%, transparent 1%)' }}
              >
                <option value="en">English (EN)</option>
                <option value="kn">ಕನ್ನಡ (KN)</option>
                <option value="hi">हिन्दी (HI)</option>
                <option value="ta">தமிழ் (TA)</option>
                <option value="te">తెలుగు (TE)</option>
              </select>
              <div className="absolute right-2 pointer-events-none text-[8px] opacity-60">▼</div>
            </div>

            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-all duration-200 ${
                darkMode 
                  ? 'text-yellow-400 hover:bg-slate-800/80' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button className={`p-2 rounded-xl transition-colors ${
                darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
              </button>
            </div>

            {/* User Profile */}
            <div className={`flex items-center gap-2 border-l pl-3 ${
              darkMode ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold text-xs shadow-md">
                {user?.name?.charAt(0)?.toUpperCase() || 'K'}
              </div>
              <div className="hidden md:block text-left text-xs">
                <span className="block font-bold leading-tight">{user?.name || 'KisanSetu User'}</span>
                <span className={`block text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {user?.role || 'Premium Member'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport for specific page renders */}
        <main className={`flex-1 overflow-y-auto custom-scroll relative ${
          darkMode ? 'bg-[#0f172a] bg-mesh-dark' : 'bg-slate-50 bg-mesh-light'
        }`}>
          {children}
        </main>
      </div>

    </div>
  );
}
