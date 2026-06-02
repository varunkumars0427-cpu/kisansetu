import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Sprout, Zap, Globe, CheckCircle, ArrowRight, Sun, Moon } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function LoginPage({ onLogin, darkMode, setDarkMode, language = 'en', setLanguage }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
      color: ['#10b981', '#0ea5e9', '#f59e0b'][Math.floor(Math.random() * 3)]
    }));
    setParticles(newParticles);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError(language === 'kn' ? 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ' : language === 'hi' ? 'कृपया सभी क्षेत्रों को भरें' : language === 'ta' ? 'அனைத்து விவரங்களையும் நிரப்பவும்' : 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      onLogin({
        name: email.split('@')[0] || 'Farmer',
        email,
        village: 'Patil Village',
        role: 'Premium Member'
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = () => {
    setEmail('demo@kisansetu.in');
    setPassword('kisansetu2026');
    setIsLoading(true);
    
    setTimeout(() => {
      onLogin({
        name: 'Patil Farm',
        email: 'demo@kisansetu.in',
        village: 'Patil Village',
        role: 'Premium Member'
      });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
      darkMode ? 'bg-[#0f172a]' : 'bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50'
    }`}>

      {/* Animated Background Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}

      {/* Ambient gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/8 rounded-full blur-[100px] pointer-events-none animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Language Selector + Dark Mode controls in top bar */}
      <div className="absolute top-6 right-6 flex items-center gap-3.5 z-50">
        
        {/* Language Picker Dropdown */}
        <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-800/80 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-md">
          <Globe className="w-4 h-4 text-emerald-500" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-xs font-bold outline-none cursor-pointer text-slate-700 dark:text-slate-200"
          >
            <option value="en" className="dark:bg-slate-800">English</option>
            <option value="kn" className="dark:bg-slate-800">ಕನ್ನಡ</option>
            <option value="hi" className="dark:bg-slate-800">हिन्दी</option>
            <option value="ta" className="dark:bg-slate-800">தமிழ்</option>
            <option value="te" className="dark:bg-slate-800">తెలుగు</option>
          </select>
        </div>

        {/* Dark Mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-2xl transition-all duration-300 ${
            darkMode 
              ? 'text-yellow-400 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50' 
              : 'text-slate-600 bg-white/80 hover:bg-white border border-slate-200'
          }`}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Login Card */}
      <div className={`w-full max-w-md mx-4 z-10 animate-fadeInUp ${
        darkMode 
          ? 'glass-card rounded-[32px] p-8 md:p-10' 
          : 'bg-white/90 backdrop-blur-xl rounded-[32px] p-8 md:p-10 shadow-2xl border border-white/50'
      }`}>
        
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-sky-500 mb-4 shadow-lg animate-float">
            <span className="text-3xl">🌾</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight font-heading bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">
            KisanSetu
          </h1>
          <p className={`text-xs mt-1.5 font-bold tracking-wider uppercase ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {t.login.sub}
          </p>
        </div>

        {/* Demo Credential Banner */}
        <button
          onClick={handleDemoLogin}
          className={`w-full mb-6 p-3.5 rounded-2xl text-left flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group ${
            darkMode 
              ? 'bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15' 
              : 'bg-emerald-50 border border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          <div className="p-2 rounded-xl bg-emerald-500/20">
            <Zap className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex-1">
            <span className={`text-xs font-bold block ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
              {t.login.demo}
            </span>
            <span className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.login.demoSub}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`flex-1 h-px ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
          <span className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {language === 'kn' ? 'ಅಥವಾ ಸೈನ್ ಇನ್ ಮಾಡಿ' : language === 'hi' ? 'या साइन इन करें' : language === 'ta' ? 'அல்லது உள்நுழையவும்' : 'or sign in'}
          </span>
          <div className={`flex-1 h-px ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ml-1 text-left ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.login.email}
            </label>
            <div className="relative">
              <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 ${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@kisansetu.in"
                className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 border ${
                  darkMode 
                    ? 'glass-input focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                    : 'bg-slate-50 border-slate-200 focus:bg-white focus:border-emerald-500 text-slate-800'
                }`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ml-1 text-left ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.login.password}
            </label>
            <div className="relative">
              <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 ${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-11 pr-11 py-3 rounded-xl text-sm outline-none transition-all duration-300 border ${
                  darkMode 
                    ? 'glass-input focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                    : 'bg-slate-50 border-slate-200 focus:bg-white focus:border-emerald-500 text-slate-800'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${
                  darkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-lg relative overflow-hidden ${
              isLoading 
                ? 'bg-emerald-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-500/25 active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{language === 'kn' ? 'ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...' : language === 'hi' ? 'कनेक्ट हो रहा है...' : language === 'ta' ? 'இணைக்கப்படுகிறது...' : 'Connecting...'}</span>
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                {t.login.btn} <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className={`mt-6 text-center text-[10px] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <Globe className="w-3 h-3 text-emerald-500" />
            <span>{t.login.serving}</span>
          </div>
          <p>
            {t.login.terms}
          </p>
        </div>
      </div>
    </div>
  );
}
