import React, { useState, useEffect } from 'react';
import DashboardShell from './components/DashboardShell';
import LandingPage from './components/LandingPage';
import VillageDashboard from './components/VillageDashboard';
import FarmAdvisor from './components/FarmAdvisor';
import FarmMap from './components/FarmMap';
import Marketplace from './components/Marketplace';
import IrrigationSimulator from './components/IrrigationSimulator';
import InnovationHub from './components/InnovationHub';
import CollaborationHub from './components/CollaborationHub';
import DigitalTwin from './components/DigitalTwin';
import ImpactDashboard from './components/ImpactDashboard';
import LoginPage from './components/LoginPage';

import { DEFAULT_VILLAGE_STATS } from './utils/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguageState] = useState(localStorage.getItem('kissa_language') || 'en');
  const [villageStats, setVillageStats] = useState(DEFAULT_VILLAGE_STATS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('kissa_language', lang);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('landing');
  };

  if (!isLoggedIn) {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <DashboardShell
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      villageStats={villageStats}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      onLogout={handleLogout}
      user={user}
      language={language}
      setLanguage={setLanguage}
    >
      <div 
        key={`${activeTab}-${language}`}
        className={`h-full overflow-y-auto no-scrollbar transition-all duration-300 animate-fadeIn ${
          darkMode ? 'dark bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}
      >
        {activeTab === 'landing' && (
          <LandingPage setActiveTab={setActiveTab} darkMode={darkMode} language={language} />
        )}
        {activeTab === 'dashboard' && (
          <VillageDashboard 
            villageStats={villageStats} 
            setVillageStats={setVillageStats} 
            darkMode={darkMode} 
            language={language} 
          />
        )}
        {activeTab === 'advisor' && (
          <FarmAdvisor darkMode={darkMode} language={language} />
        )}
        {activeTab === 'map' && (
          <FarmMap darkMode={darkMode} language={language} />
        )}
        {activeTab === 'marketplace' && (
          <Marketplace darkMode={darkMode} language={language} />
        )}
        {activeTab === 'irrigation' && (
          <IrrigationSimulator darkMode={darkMode} language={language} />
        )}
        {activeTab === 'innovation' && (
          <InnovationHub darkMode={darkMode} language={language} />
        )}
        {activeTab === 'community' && (
          <CollaborationHub darkMode={darkMode} language={language} />
        )}
        {activeTab === 'twin' && (
          <DigitalTwin 
            villageStats={villageStats} 
            setVillageStats={setVillageStats} 
            darkMode={darkMode} 
            language={language}
          />
        )}
        {activeTab === 'impact' && (
          <ImpactDashboard darkMode={darkMode} language={language} />
        )}
      </div>
    </DashboardShell>
  );
}
