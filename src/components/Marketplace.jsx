import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, DollarSign, TrendingUp, TrendingDown, Compass, CheckCircle, X, Star } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { getLocalizedMockData } from '../utils/translations';

export default function Marketplace({ darkMode, language = 'en' }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const mockData = getLocalizedMockData(language);

  const [items, setItems] = useState(mockData.marketItems);
  const [searchVal, setSearchVal] = useState('');
  
  // Track selected category (we store the english category name to filter cleanly)
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCat, setNewProductCat] = useState('Grains');
  const [newProductQty, setNewProductQty] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductLoc, setNewProductLoc] = useState('Central Mandi');
  const [successMsg, setSuccessMsg] = useState(false);

  // Sync market items when language changes
  useEffect(() => {
    setItems(mockData.marketItems);
  }, [language]);

  const categories = [
    { id: 'All', label: t.marketplace.categories.all, emoji: '🏪' },
    { id: 'Grains', label: t.marketplace.categories.grains, emoji: '🌾' },
    { id: 'Vegetables', label: t.marketplace.categories.vegetables, emoji: '🥬' },
    { id: 'Seeds', label: t.marketplace.categories.seeds, emoji: '🌱' },
    { id: 'Organic', label: t.marketplace.categories.organic, emoji: '🌿' },
    { id: 'Fruits', label: t.marketplace.categories.fruits, emoji: '🍊' },
    { id: 'Processed', label: t.marketplace.categories.processed, emoji: '🫒' }
  ];

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductName || !newProductQty || !newProductPrice) return;

    const newItem = {
      id: Date.now(),
      name: newProductName,
      category: newProductCat,
      quantity: newProductQty,
      price: parseFloat(newProductPrice),
      location: newProductLoc,
      seller: language === 'kn' ? 'ಪಾಟೀಲ್ ಫಾರ್ಮ್ (ನೀವು)' : language === 'hi' ? 'पाटिल फार्म (आप)' : language === 'ta' ? 'பாட்டீல் பண்ணை (நீங்கள்)' : "Patil Farm (You)",
      rating: 5.0
    };

    setItems((prev) => [newItem, ...prev]);
    
    setNewProductName('');
    setNewProductQty('');
    setNewProductPrice('');
    setSuccessMsg(true);

    setTimeout(() => {
      setSuccessMsg(false);
      setShowAddForm(false);
    }, 2000);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchVal.toLowerCase()) || 
                          item.seller.toLowerCase().includes(searchVal.toLowerCase());
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const priceData = language === 'kn' ? [
    { crop: 'ಸೋಯಾಬೀನ್', price: 4650, change: '+5.4%', trendUp: true, demand: 'ಹೆಚ್ಚು' },
    { crop: 'ಹತ್ತಿ', price: 6800, change: '+1.2%', trendUp: true, demand: 'ಹೆಚ್ಚು' },
    { crop: 'ಈರುಳ್ಳಿ (ಕೆಂಪು)', price: 1850, change: '-2.1%', trendUp: false, demand: 'ಮಧ್ಯಮ' },
    { crop: 'ಗೋಧಿ (ಡುರಮ್)', price: 2150, change: '0.0%', trendUp: true, demand: 'ಮಧ್ಯಮ' },
    { crop: 'ಭತ್ತ', price: 2200, change: '-0.8%', trendUp: false, demand: 'ಕಡಿಮೆ' }
  ] : language === 'hi' ? [
    { crop: 'सोयाबीन', price: 4650, change: '+5.4%', trendUp: true, demand: 'उच्च' },
    { crop: 'कपास', price: 6800, change: '+1.2%', trendUp: true, demand: 'उच्च' },
    { crop: 'प्याज (लाल)', price: 1850, change: '-2.1%', trendUp: false, demand: 'मध्यम' },
    { crop: 'गेहूं (दुरम)', price: 2150, change: '0.0%', trendUp: true, demand: 'मध्यम' },
    { crop: 'धान (चावल)', price: 2200, change: '-0.8%', trendUp: false, demand: 'कम' }
  ] : language === 'ta' ? [
    { crop: 'சோயாபீன்ಸ್', price: 4650, change: '+5.4%', trendUp: true, demand: 'அதிகம்' },
    { crop: 'பருத்தி', price: 6800, change: '+1.2%', trendUp: true, demand: 'அதிகம்' },
    { crop: 'வெங்காயம் (சிவப்பு)', price: 1850, change: '-2.1%', trendUp: false, demand: 'மிதமான' },
    { crop: 'கோதுமை (டுரம்)', price: 2150, change: '0.0%', trendUp: true, demand: 'மிதமான' },
    { crop: 'நெல்', price: 2200, change: '-0.8%', trendUp: false, demand: 'குறைவு' }
  ] : [
    { crop: 'Soybean', price: 4650, change: '+5.4%', trendUp: true, demand: 'High' },
    { crop: 'Cotton', price: 6800, change: '+1.2%', trendUp: true, demand: 'High' },
    { crop: 'Onion (Red)', price: 1850, change: '-2.1%', trendUp: false, demand: 'Medium' },
    { crop: 'Wheat (Durum)', price: 2150, change: '0.0%', trendUp: true, demand: 'Medium' },
    { crop: 'Paddy Rice', price: 2200, change: '-0.8%', trendUp: false, demand: 'Low' }
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 pb-20 text-left max-w-7xl mx-auto w-full">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">
            {t.marketplace.title}
          </h2>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {t.marketplace.desc}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 active:scale-95 transition-all text-xs ml-auto md:ml-0"
        >
          {showAddForm ? <X className="w-4.5 h-4.5" /> : <Plus className="w-4.5 h-4.5" />}
          {showAddForm ? t.common.cancel : t.marketplace.addBtn}
        </button>
      </div>

      {/* Listing Form Slide Down */}
      {showAddForm && (
        <div className={`p-6 rounded-3xl border animate-fadeIn ${
          darkMode ? 'glass-card' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <h3 className="font-bold text-base mb-4 flex items-center gap-1.5">
            🌾 {t.marketplace.addSubmit}
          </h3>
          {successMsg ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold rounded-xl flex items-center gap-2 text-sm animate-scaleIn">
              <CheckCircle className="w-5 h-5" /> Listing created successfully!
            </div>
          ) : (
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-400 mb-1">{t.marketplace.productName}</label>
                <input
                  type="text"
                  placeholder="e.g. Premium Sonalika Wheat"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border outline-none transition-all ${
                    darkMode ? 'glass-input focus:border-emerald-500/50' : 'bg-slate-50 focus:bg-white border-slate-200 text-slate-800'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">{t.marketplace.category}</label>
                <select
                  value={newProductCat}
                  onChange={(e) => setNewProductCat(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border outline-none ${
                    darkMode ? 'glass-input' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {categories.slice(1).map((c, idx) => (
                    <option key={idx} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">{t.marketplace.quantity}</label>
                <input
                  type="text"
                  placeholder="e.g. 50 Quintals"
                  value={newProductQty}
                  onChange={(e) => setNewProductQty(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border outline-none transition-all ${
                    darkMode ? 'glass-input focus:border-emerald-500/50' : 'bg-slate-50 focus:bg-white border-slate-200 text-slate-800'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">{t.marketplace.price}</label>
                <input
                  type="number"
                  placeholder="e.g. 4500"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border outline-none transition-all ${
                    darkMode ? 'glass-input focus:border-emerald-500/50' : 'bg-slate-50 focus:bg-white border-slate-200 text-slate-800'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">{t.marketplace.mandiLocation}</label>
                <input
                  type="text"
                  placeholder="e.g. East Mandi"
                  value={newProductLoc}
                  onChange={(e) => setNewProductLoc(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border outline-none transition-all ${
                    darkMode ? 'glass-input focus:border-emerald-500/50' : 'bg-slate-50 focus:bg-white border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-2.5 rounded-xl shadow-md active:scale-95 transition-all text-xs"
                >
                  {t.marketplace.addSubmit}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Main Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Product Grid, Filters, Search */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Search Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className={`flex items-center w-full px-3.5 py-2.5 rounded-xl border transition-all ${
              darkMode ? 'glass-card border-slate-800 focus-within:border-emerald-500/30' : 'bg-white border-slate-200 focus-within:border-emerald-500'
            }`}>
              <Search className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder={t.marketplace.searchPlaceholder}
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

          {/* Product Count */}
          <p className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Showing {filteredItems.length} product{filteredItems.length !== 1 ? 's' : ''}
          </p>

          {/* Product Listing Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item, idx) => {
              const matchedCat = categories.find((cat) => cat.id === item.category);
              return (
                <div key={item.id} className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover-lift animate-fadeInUp ${
                  darkMode ? 'glass-card hover:border-emerald-500/30' : 'bg-white shadow-sm border-slate-100 hover:border-emerald-500/50'
                }`} style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {matchedCat ? matchedCat.label : item.category}
                      </span>
                      <span className={`font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.location}</span>
                    </div>
                    <h3 className={`text-base font-bold mt-2.5 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{item.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`text-xs font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                        Seller: <strong className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{item.seller}</strong>
                      </span>
                      <span className="text-[10px] text-yellow-400 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-yellow-400" /> {item.rating}
                      </span>
                    </div>
                  </div>

                  <hr className={`my-4 ${darkMode ? 'border-slate-800/60' : 'border-slate-100'}`} />

                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{t.marketplace.quantity}</span>
                      <span className={`text-xs font-bold block mt-0.5 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item.quantity}</span>
                    </div>

                    <div className="text-right">
                      <span className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">per quintal</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Connect request sent to: ${item.seller}`)}
                    className="w-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-all mt-4.5 border border-emerald-500/20 active:scale-95"
                  >
                    Contact Seller
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Dynamic Price & Demand Dashboard */}
        <div className="space-y-6 text-sm">
          <div className={`p-6 rounded-3xl border space-y-5 animate-fadeInUp ${
            darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
          }`} style={{ animationDelay: '0.2s' }}>
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                {t.marketplace.priceTrends}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">{t.marketplace.priceTrendsSub}</p>
            </div>

            <hr className={darkMode ? 'border-slate-800/60' : 'border-slate-100'} />

            <div className="space-y-4.5">
              {priceData.map((trend, idx) => (
                <div key={idx} className={`flex justify-between items-center pb-3 border-b last:border-0 last:pb-0 ${
                  darkMode ? 'border-slate-800/80' : 'border-slate-100'
                }`}>
                  <div>
                    <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{trend.crop}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${
                      trend.demand.includes('High') || trend.demand.includes('ಹೆಚ್ಚು') || trend.demand.includes('उच्च') || trend.demand.includes('அதிகம்') ? 'bg-emerald-500/10 text-emerald-400' :
                      trend.demand.includes('Medium') || trend.demand.includes('ಮಧ್ಯಮ') || trend.demand.includes('मध्यम') || trend.demand.includes('மிதமான') ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-500/10 text-slate-400'
                    }`}>
                      Demand: {trend.demand}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className={`font-bold block ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>₹{trend.price}/qtl</span>
                    <span className={`text-[10px] font-bold mt-0.5 inline-flex items-center gap-0.5 ${
                      trend.trendUp ? 'text-emerald-400' : 'text-rose-500'
                    }`}>
                      {trend.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {trend.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
