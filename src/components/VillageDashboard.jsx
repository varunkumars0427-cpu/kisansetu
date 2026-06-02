import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Droplet, 
  TrendingUp, 
  Briefcase, 
  Leaf, 
  Activity, 
  ChevronRight,
  TrendingDown,
  RefreshCw,
  Info,
  HelpCircle,
  CloudRain,
  Users,
  AlertTriangle
} from 'lucide-react';
import { calculateVillageHealthMeter } from '../utils/calculations';
import { TRANSLATIONS } from '../utils/translations';

const localT = {
  en: {
    panelTitle: "District & Village Datasets",
    panelDesc: "Switch or add datasets to analyze environmental health indexes.",
    active: "Active",
    analyze: "Analyze",
    formTitle: "Add Local Dataset",
    nameLabel: "District / Village Name",
    namePlaceholder: "e.g., Shimoga District",
    soilLabel: "Soil Quality",
    waterLabel: "Water Availability",
    cropLabel: "Crop Health",
    rainLabel: "Rainfall Index",
    partLabel: "Farmer Participation",
    pestLabel: "Pest Incidents",
    btnSubmit: "Add & Analyze Dataset",
    errorName: "Please enter a valid district or village name."
  },
  kn: {
    panelTitle: "ಜಿಲ್ಲೆ ಮತ್ತು ಗ್ರಾಮ ದತ್ತಾಂಶಗಳು",
    panelDesc: "ಪರಿಸರ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲು ದತ್ತಾಂಶಗಳನ್ನು ಬದಲಾಯಿಸಿ ಅಥವಾ ಸೇರಿಸಿ.",
    active: "ಸಕ್ರಿಯ",
    analyze: "ವಿಶ್ಲೇಷಿಸು",
    formTitle: "ಸ್ಥಳೀಯ ದತ್ತಾಂಶ ಸೇರಿಸಿ",
    nameLabel: "ಜಿಲ್ಲೆ / ಗ್ರಾಮದ ಹೆಸರು",
    namePlaceholder: "ಉದಾ: ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆ",
    soilLabel: "ಮಣ್ಣಿನ ಗುಣಮಟ್ಟ",
    waterLabel: "ನೀರಿನ ಲಭ್ಯತೆ",
    cropLabel: "ಬೆಳೆ ಆರೋಗ್ಯ",
    rainLabel: "ಮಳೆ ಸೂಚ್ಯಂಕ",
    partLabel: "ರೈತರ ಭಾಗವಹಿಸುವಿಕೆ",
    pestLabel: "ಕೀಟ ಬಾಧೆ",
    btnSubmit: "ಸೇರಿಸಿ ಮತ್ತು ವಿಶ್ಲೇಷಿಸು",
    errorName: "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಹೆಸರು ನಮೂದಿಸಿ."
  },
  hi: {
    panelTitle: "जिला और ग्राम डेटासेट",
    panelDesc: "पर्यावरणीय स्वास्थ्य सूचकांकों का विश्लेषण करने के लिए डेटासेट बदलें या जोड़ें।",
    active: "सक्रिय",
    analyze: "विश्लेषण करें",
    formTitle: "स्थानीय डेटासेट जोड़ें",
    nameLabel: "जिला / ग्राम का नाम",
    namePlaceholder: "जैसे, शिमला जिला",
    soilLabel: "मिट्टी की गुणवत्ता",
    waterLabel: "पानी की उपलब्धता",
    cropLabel: "फसल स्वास्थ्य",
    rainLabel: "वर्षा सूचकांक",
    partLabel: "किसनों की भागीदारी",
    pestLabel: "कीटों का प्रकोप",
    btnSubmit: "जोड़ें और विश्लेषण करें",
    errorName: "कृपया एक वैध नाम दर्ज करें।"
  },
  ta: {
    panelTitle: "மாவட்டம் & கிராம தரவுத்தொகுப்புகள்",
    panelDesc: "சுற்றுச்சூழல் சுகாதார குறியீடுகளை பகுப்பாய்வு செய்ய தரவுத்தொகுப்புகளை மாற்றவும் அல்லது சேர்க்கவும்.",
    active: "செயலில்",
    analyze: "பகுப்பாய்வு செய்",
    formTitle: "உள்ளூர் தரவைச் சேர்க்கவும்",
    nameLabel: "மாவட்டம் / கிராமத்தின் பெயர்",
    namePlaceholder: "உதாரணம்: சேலம் மாவட்டம்",
    soilLabel: "மண்ணின் தரம்",
    waterLabel: "நீர் இருப்பு",
    cropLabel: "பயிர் ஆரோக்கியம்",
    rainLabel: "மழைப்பொழிவு குறியீடு",
    partLabel: "விவசாயிகள் பங்களிப்பு",
    pestLabel: "பூச்சித் தாக்குதல்",
    btnSubmit: "சேர்த்து பகுப்பாய்வு செய்",
    errorName: "தயவுசெய்து சரியான பெயரை உள்ளிடவும்."
  },
  te: {
    panelTitle: "జిల్లా & గ్రామ డేటాసెట్లు",
    panelDesc: "పర్యావరణ ఆరోగ్య సూచికలను విశ్లేషించడానికి డేటాసెట్లను మార్చండి లేదా జోడించండి.",
    active: "క్రియాశీలం",
    analyze: "విశ్లేషించు",
    formTitle: "స్థానిక డేటాసెట్ జోడించు",
    nameLabel: "జిల్లా / గ్రామ పేరు",
    namePlaceholder: "ఉదా: వరంగల్ జిల్లా",
    soilLabel: "మట్టి నాణ్యత",
    waterLabel: "నీటి లభ్యత",
    cropLabel: "పంట ఆరోగ్యం",
    rainLabel: "వర్షపాతం సూచిక",
    partLabel: "రైతుల భాగస్వామ్యం",
    pestLabel: "తెగుళ్లు",
    btnSubmit: "జోడించి విశ్లేషించు",
    errorName: "దయచేసి సరైన పేరును నమోదు చేయండి."
  }
};

export default function VillageDashboard({ villageStats, setVillageStats, darkMode, language = 'en' }) {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [liveTime, setLiveTime] = useState(new Date());
  const [activeTooltip, setActiveTooltip] = useState(null);
  
  const lt = localT[language] || localT.en;

  const [datasets, setDatasets] = useState([
    {
      id: 'default',
      name: language === 'kn' ? 'ಪಾಟೀಲ್ ಗ್ರಾಮ (ಡೀಫಾಲ್ಟ್)' : language === 'hi' ? 'पाटिल ग्राम (डिफ़ॉल्ट)' : language === 'ta' ? 'பாட்டீல் கிராமம் (இயல்புநிலை)' : language === 'te' ? 'పాటిల్ గ్రామం (డిఫాల్ట్)' : 'Patil Village (Default)',
      soilQuality: 84,
      waterAvailability: 72,
      cropHealth: 89,
      employmentIndex: 68,
      sustainabilityScore: 78,
      educationScore: 75,
      rainfall: 65,
      farmerParticipation: 90,
      pestIncidents: 15
    },
    {
      id: 'mandya',
      name: language === 'kn' ? 'ಮಂಡ್ಯ ಜಿಲ್ಲೆ' : language === 'hi' ? 'मंड्या जिला' : language === 'ta' ? 'மண்டியா மாவட்டம்' : language === 'te' ? 'మండ్య జిల్లా' : 'Mandya District',
      soilQuality: 78,
      waterAvailability: 85,
      cropHealth: 82,
      employmentIndex: 72,
      sustainabilityScore: 80,
      educationScore: 68,
      rainfall: 80,
      farmerParticipation: 92,
      pestIncidents: 10
    },
    {
      id: 'kolar',
      name: language === 'kn' ? 'ಕೋಲಾರ ಜಿಲ್ಲೆ' : language === 'hi' ? 'कोलार जिला' : language === 'ta' ? 'கோலார் மாவட்டம்' : language === 'te' ? 'కోలార్ జిల్లా' : 'Kolar District',
      soilQuality: 65,
      waterAvailability: 45,
      cropHealth: 70,
      employmentIndex: 60,
      sustainabilityScore: 65,
      educationScore: 72,
      rainfall: 40,
      farmerParticipation: 80,
      pestIncidents: 25
    }
  ]);

  const [activeDatasetId, setActiveDatasetId] = useState('default');

  // Form states
  const [newName, setNewName] = useState('');
  const [newSoil, setNewSoil] = useState(75);
  const [newWater, setNewWater] = useState(70);
  const [newCrop, setNewCrop] = useState(80);
  const [newRain, setNewRain] = useState(60);
  const [newPart, setNewPart] = useState(85);
  const [newPest, setNewPest] = useState(15);
  const [formError, setFormError] = useState('');
  const handleSelectDataset = (ds) => {
    setActiveDatasetId(ds.id);
    if (setVillageStats) {
      setVillageStats(ds);
    }
  };

  const handleAddDataset = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      setFormError(lt.errorName);
      return;
    }
    const newDataset = {
      id: 'custom_' + Date.now(),
      name: newName,
      soilQuality: Number(newSoil),
      waterAvailability: Number(newWater),
      cropHealth: Number(newCrop),
      employmentIndex: 68,
      sustainabilityScore: 78,
      educationScore: 75,
      rainfall: Number(newRain),
      farmerParticipation: Number(newPart),
      pestIncidents: Number(newPest)
    };
    setDatasets([...datasets, newDataset]);
    if (setVillageStats) {
      setVillageStats(newDataset);
    }
    setActiveDatasetId(newDataset.id);
    setNewName('');
    setFormError('');
  };

  const healthScore = calculateVillageHealthMeter(villageStats);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Sector breakdown data for the Bar Chart (Translated)
  const employmentSectors = [
    { 
      label: language === 'kn' ? 'ಕೃಷಿ' : language === 'hi' ? 'खेती' : language === 'ta' ? 'விவசாயம்' : 'Farming', 
      value: 45, 
      color: '#10b981' 
    },
    { 
      label: language === 'kn' ? 'ಲಾಜಿಸ್ಟಿಕ್ಸ್' : language === 'hi' ? 'लॉजिस्टिक्स' : language === 'ta' ? 'தளவாடங்கள்' : 'Logistics', 
      value: 15, 
      color: '#0ea5e9' 
    },
    { 
      label: language === 'kn' ? 'ಕರಕುಶಲ' : language === 'hi' ? 'हस्तशिल्प' : language === 'ta' ? 'கைவினைப் பொருட்கள்' : 'Crafts', 
      value: 10, 
      color: '#f59e0b' 
    },
    { 
      label: language === 'kn' ? 'ತಂತ್ರಜ್ಞಾನ' : language === 'hi' ? 'तकनीकी' : language === 'ta' ? 'தொழில்நுட்பம்' : 'Tech Services', 
      value: 8, 
      color: '#8b5cf6' 
    },
    { 
      label: language === 'kn' ? 'ನಿರ್ಮಾಣ' : language === 'hi' ? 'निर्माण' : language === 'ta' ? 'கட்டுமானம்' : 'Construction', 
      value: 22, 
      color: '#ec4899' 
    },
  ];

  // Helper to translate months
  const translateMonth = (month) => {
    const map = {
      Jan: language === 'kn' ? 'ಜನ' : language === 'hi' ? 'जन' : language === 'ta' ? 'ஜன' : 'Jan',
      Feb: language === 'kn' ? 'ಫೆಬ್ರ' : language === 'hi' ? 'फर' : language === 'ta' ? 'பிப்' : 'Feb',
      Mar: language === 'kn' ? 'ಮಾರ್ಚ್' : language === 'hi' ? 'मार्च' : language === 'ta' ? 'மார்ச்' : 'Mar',
      Apr: language === 'kn' ? 'ಏಪ್ರಿ' : language === 'hi' ? 'अप्रैल' : language === 'ta' ? 'ஏப்' : 'Apr',
      May: language === 'kn' ? 'ಮೇ' : language === 'hi' ? 'मई' : language === 'ta' ? 'மே' : 'May',
      Jun: language === 'kn' ? 'ಜೂನ್' : language === 'hi' ? 'जून' : language === 'ta' ? 'ஜூன்' : 'Jun',
    };
    return map[month] || month;
  };

  // Trend line chart data points
  const lineChartPoints = [
    { month: 'Jan', water: 65, crop: 70 },
    { month: 'Feb', water: 68, crop: 72 },
    { month: 'Mar', water: 62, crop: 78 },
    { month: 'Apr', water: 55, crop: 82 },
    { month: 'May', water: 72, crop: 85 },
    { month: 'Jun', water: 80, crop: 89 }
  ];

  const getSmoothPath = (data, key) => {
    const width = 500;
    const height = 150;
    const spacing = width / (data.length - 1);
    const points = data.map((pt, idx) => ({
      x: idx * spacing,
      y: height - 10 - ((pt[key] / 100) * (height - 30))
    }));

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) / 3;
      const cp1y = points[i - 1].y;
      const cp2x = points[i].x - (points[i].x - points[i - 1].x) / 3;
      const cp2y = points[i].y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  const getAreaPath = (data, key) => {
    const width = 500;
    const height = 150;
    const linePath = getSmoothPath(data, key);
    return `${linePath} L ${width} ${height - 10} L 0 ${height - 10} Z`;
  };

  // Metric card config
  const cards = [
    { id: 'soil', title: t.dashboard.soilHealth, val: villageStats.soilQuality, icon: Sprout, color: 'text-emerald-500', bg: 'bg-emerald-500/10', stroke: 'stroke-emerald-500', trend: '+3.2%', trendUp: true },
    { id: 'water', title: t.dashboard.waterIndex, val: villageStats.waterAvailability, icon: Droplet, color: 'text-sky-500', bg: 'bg-sky-500/10', stroke: 'stroke-sky-500', trend: '-1.8%', trendUp: false },
    { id: 'crop', title: t.dashboard.cropPerformance, val: villageStats.cropHealth, icon: TrendingUp, color: 'text-teal-500', bg: 'bg-teal-500/10', stroke: 'stroke-teal-500', trend: '+5.1%', trendUp: true },
    { id: 'employment', title: t.dashboard.employmentIndex, val: villageStats.employmentIndex, icon: Briefcase, color: 'text-purple-500', bg: 'bg-purple-500/10', stroke: 'stroke-purple-500', trend: '+2.4%', trendUp: true },
    { id: 'sustainability', title: t.dashboard.sustainability, val: villageStats.sustainabilityScore, icon: Leaf, color: 'text-amber-500', bg: 'bg-amber-500/10', stroke: 'stroke-amber-500', trend: '+4.7%', trendUp: true }
  ];

  // Localized logs status panel
  const localizedLogs = [
    { 
      zone: language === 'kn' ? 'ವಲಯ A (ಉತ್ತರ)' : language === 'hi' ? 'जोन ए (उत्तर)' : language === 'ta' ? 'மண்டலம் A (வடக்கு)' : 'Zone A (North)', 
      type: language === 'kn' ? 'ಮಣ್ಣಿನ ತೇವಾಂಶ' : language === 'hi' ? 'मृदा नमी' : language === 'ta' ? 'மண் ஈரப்பதம்' : 'Soil Moisture', 
      details: language === 'kn' ? 'ಮೌಲ್ಯ 65% - ಸ್ಥಿತಿ: ಸೂಕ್ತವಾಗಿದೆ' : language === 'hi' ? 'मान 65% - स्थिति: इष्टतम' : language === 'ta' ? 'மதிப்பு 65% - நிலை: உகந்தது' : 'Value 65% - Status: Optimal', 
      time: language === 'kn' ? '10 ನಿಮಿಷಗಳ ಹಿಂದೆ' : language === 'hi' ? '10 मिनट पहले' : language === 'ta' ? '10 நிமிடங்களுக்கு முன்பு' : '10 mins ago', 
      success: true 
    },
    { 
      zone: language === 'kn' ? 'ವಲಯ E (ನದಿ ತೀರ)' : language === 'hi' ? 'जोन ई (नदी तट)' : language === 'ta' ? 'மண்டலம் E (ஆற்றங்கரை)' : 'Zone E (River Bank)', 
      type: language === 'kn' ? 'ನೀರಿನ ಮಟ್ಟದ ಸೂಚಕ' : language === 'hi' ? 'जल स्तर सूचक' : language === 'ta' ? 'நீர் மட்டக் காட்டி' : 'Water Level Indicator', 
      details: language === 'kn' ? 'ಮೌಲ್ಯ 90% - ಸ್ಥಿತಿ: ಹೆಚ್ಚು (ಪ್ರವಾಹ ಎಚ್ಚರಿಕೆ)' : language === 'hi' ? 'मान 90% - स्थिति: उच्च (बाढ़ की चेतावनी)' : language === 'ta' ? 'மதிப்பு 90% - நிலை: அதிகம் (வெள்ள எச்சரிக்கை)' : 'Value 90% - Status: High (Flood Warning)', 
      time: language === 'kn' ? '22 ನಿಮಿಷಗಳ ಹಿಂದೆ' : language === 'hi' ? '22 मिनट पहले' : language === 'ta' ? '22 நிமிடங்களுக்கு முன்பு' : '22 mins ago', 
      success: false 
    },
    { 
      zone: language === 'kn' ? 'ಕಾಂಪೋಸ್ಟ್ ಪಿಟ್ 2' : language === 'hi' ? 'कम्पोस्ट पिट 2' : language === 'ta' ? 'மண்புழு உரக் குழி 2' : 'Compost Pit 2', 
      type: language === 'kn' ? 'ತಾಪಮಾನ ಸಂವೇದಕ' : language === 'hi' ? 'तापमान सेंसर' : language === 'ta' ? 'வெப்பநிலை சென்சார்' : 'Temperature Sensor', 
      details: language === 'kn' ? 'ಮೌಲ್ಯ 54°C - ಸ್ಥಿತಿ: ಸೂಕ್ತ ಹುದುಗುವಿಕೆ' : language === 'hi' ? 'मान 54°C - स्थिति: इष्टतम किण्वन' : language === 'ta' ? 'மதிப்பு 54°C - நிலை: உகந்த நொதித்தல்' : 'Value 54°C - Status: Optimal fermentation', 
      success: true 
    },
    { 
      zone: language === 'kn' ? 'ವಲಯ D (ಪೂರ್ವ)' : language === 'hi' ? 'जोन डी (पूर्व)' : language === 'ta' ? 'மண்டலம் D (கிழके)' : 'Zone D (East)', 
      type: language === 'kn' ? 'ಪೋಷಕಾಂಶ ಪ್ರೋಬ್' : language === 'hi' ? 'पोषक तत्व जांच' : language === 'ta' ? 'ஊட்டச்சத்து ஆய்வு' : 'Nutrient Probe', 
      details: language === 'kn' ? 'ಮೌಲ್ಯ N:42 P:18 K:35 - ಸ್ಥಿತಿ: ಸಮತೋಲನ' : language === 'hi' ? 'मान N:42 P:18 K:35 - स्थिति: संतुलित' : language === 'ta' ? 'மதிப்பு N:42 P:18 K:35 - நிலை: சீரானது' : 'Value N:42 P:18 K:35 - Status: Balanced', 
      time: language === 'kn' ? '2 ಗಂಟೆಗಳ ಹಿಂದೆ' : language === 'hi' ? '2 घंटे पहले' : language === 'ta' ? '2 மணி நேரத்திற்கு முன்பு' : '2 hrs ago', 
      success: true 
    }
  ];

  // Contributing factors array
  const factors = [
    { 
      id: 'water', 
      name: language === 'kn' ? 'ನೀರಿನ ಲಭ್ಯತೆ' : language === 'hi' ? 'पानी की उपलब्धता' : language === 'ta' ? 'நீர் இருப்பு' : language === 'te' ? 'నీటి లభ్యత' : 'Water Availability', 
      val: villageStats.waterAvailability, 
      weight: '25%', 
      icon: Droplet, 
      color: 'text-sky-500', 
      bg: 'bg-sky-500/10',
      barColor: 'bg-sky-500',
      tooltip: t.dashboard.waterTooltip 
    },
    { 
      id: 'crop', 
      name: language === 'kn' ? 'ಬೆಳೆ ಆರೋಗ್ಯ' : language === 'hi' ? 'फसल स्वास्थ्य' : language === 'ta' ? 'பயிர் ஆரோக்கியம்' : language === 'te' ? 'పంట ఆరోగ్యం' : 'Crop Health', 
      val: villageStats.cropHealth, 
      weight: '20%', 
      icon: Sprout, 
      color: 'text-emerald-500', 
      bg: 'bg-emerald-500/10',
      barColor: 'bg-emerald-500',
      tooltip: t.dashboard.cropTooltip 
    },
    { 
      id: 'soil', 
      name: language === 'kn' ? 'ಮಣ್ಣಿನ ಗುಣಮಟ್ಟ' : language === 'hi' ? 'मिट्टी की गुणवत्ता' : language === 'ta' ? 'மண்ணின் தரம்' : language === 'te' ? 'మట్టి నాణ్యత' : 'Soil Quality', 
      val: villageStats.soilQuality, 
      weight: '20%', 
      icon: Leaf, 
      color: 'text-teal-500', 
      bg: 'bg-teal-500/10',
      barColor: 'bg-teal-500',
      tooltip: t.dashboard.soilTooltip 
    },
    { 
      id: 'rainfall', 
      name: language === 'kn' ? 'ಮಳೆ ಸೂಚ್ಯಂಕ' : language === 'hi' ? 'वर्षा सूचकांक' : language === 'ta' ? 'மழைப்பொழிவு குறியீடு' : language === 'te' ? 'వర్షపాతం సూచిక' : 'Rainfall Index', 
      val: villageStats.rainfall, 
      weight: '10%', 
      icon: CloudRain, 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10',
      barColor: 'bg-blue-500',
      tooltip: t.dashboard.rainfallTooltip 
    },
    { 
      id: 'participation', 
      name: language === 'kn' ? 'ರೈತರ ಸಹಭಾಗಿತ್ವ' : language === 'hi' ? 'किसानों की भागीदारी' : language === 'ta' ? 'விவசாயிகள் பங்களிப்பு' : language === 'te' ? 'రైతుల భాగస్వామ్యం' : 'Farmer Participation', 
      val: villageStats.farmerParticipation, 
      weight: '15%', 
      icon: Users, 
      color: 'text-indigo-500', 
      bg: 'bg-indigo-500/10',
      barColor: 'bg-indigo-500',
      tooltip: t.dashboard.participationTooltip 
    },
    { 
      id: 'pest', 
      name: language === 'kn' ? 'ಕೀಟಬಾಧೆ ಸಂಭವ' : language === 'hi' ? 'कीटों का प्रकोप' : language === 'ta' ? 'பூச்சித் தாக்குதல்' : language === 'te' ? 'తెగుళ్లు' : 'Pest Incidents', 
      val: villageStats.pestIncidents, 
      weight: '10%', 
      icon: AlertTriangle, 
      color: 'text-rose-500', 
      bg: 'bg-rose-500/10',
      barColor: 'bg-rose-500',
      negative: true,
      tooltip: t.dashboard.pestTooltip 
    }
  ];

  // Helper to format health range color
  const getProgressColorClass = (val, negative = false) => {
    if (negative) {
      if (val >= 40) return 'bg-rose-500';
      if (val >= 20) return 'bg-amber-500';
      return 'bg-emerald-500';
    } else {
      if (val >= 80) return 'bg-emerald-500';
      if (val >= 50) return 'bg-amber-500';
      return 'bg-rose-500';
    }
  };

  const getHealthTag = (score) => {
    if (score >= 82) return { label: t.common.excellent, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };
    if (score >= 70) return { label: t.common.optimal, color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' };
    if (score >= 50) return { label: t.common.moderate, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' };
    return { label: t.common.poor, color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' };
  };

  const healthTag = getHealthTag(healthScore);

  return (
    <div className="p-6 md:p-8 pb-20 text-left max-w-7xl mx-auto w-full animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Dashboard Panel */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Page Title Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="animate-fadeIn">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-heading">
                {t.dashboard.title}
              </h2>
              <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {t.dashboard.desc}
              </p>
            </div>
            <div className={`flex items-center gap-3 text-xs font-bold animate-fadeIn ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                {t.common.live}
              </span>
              <span className={`px-3 py-1.5 rounded-lg tabular-nums ${
                darkMode ? 'bg-slate-800' : 'bg-slate-100'
              }`}>
                {liveTime.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Grid of Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4.5">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              const r = 24;
              const circum = 2 * Math.PI * r;
              const offset = circum - (card.val / 100) * circum;
              
              return (
                <div 
                  key={card.id} 
                  className={`p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover-lift border animate-fadeInUp ${
                    darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
                  }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex justify-between items-start">
                    <div className={`p-2.5 rounded-xl ${card.bg} ${card.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Circular Mini Gauge */}
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="24" cy="24" r={r} className={darkMode ? 'stroke-slate-800' : 'stroke-slate-100'} strokeWidth="3" fill="transparent" />
                        <circle cx="24" cy="24" r={r} className={`${card.stroke} transition-all duration-1000`} strokeWidth="3" fill="transparent" strokeDasharray={circum} strokeDashoffset={offset} strokeLinecap="round" />
                      </svg>
                      <span className="absolute text-[10px] font-black">{card.val}%</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      {card.title}
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xl font-black">
                        {card.val} <span className="text-xs font-semibold text-slate-400">/ 100</span>
                      </span>
                      <span className={`text-[10px] font-bold flex items-center gap-0.5 ${
                        card.trendUp ? 'text-emerald-500' : 'text-rose-500'
                      }`}>
                        {card.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {card.trend}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Village Health Explanation Section */}
          <div className={`p-6 rounded-3xl border animate-fadeInUp ${
            darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-200/80'
          }`}>
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              {/* Left Side: Score & Formula explanation */}
              <div className="lg:w-2/5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-bold text-base leading-snug">{t.dashboard.healthBreakdownTitle}</h3>
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t.dashboard.healthExplanation}
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                  darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-tr from-emerald-500 to-sky-400 text-white font-black text-xl shadow-lg relative flex-shrink-0">
                    {healthScore}%
                    <span className="absolute -bottom-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold border capitalize bg-slate-900 text-slate-100 border-slate-700">
                      {healthTag.label}
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="font-bold block opacity-75 uppercase text-[9px] tracking-wider">
                      {t.dashboard.healthFormula}
                    </span>
                    <code className="block mt-1 font-mono font-bold leading-normal text-[10px] text-emerald-400 bg-emerald-950/20 px-2 py-1.5 rounded-lg border border-emerald-950/30 break-all select-all">
                      (Water × 25%) + (Crop × 20%) + (Soil × 20%) + (Farmers × 15%) + (Rainfall × 10%) + ((100 - Pest) × 10%)
                    </code>
                  </div>
                </div>
              </div>

              {/* Right Side: Visual contributing factors checklist */}
              <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {factors.map((factor) => {
                  const FactorIcon = factor.icon;
                  const isTooltipActive = activeTooltip === factor.id;

                  return (
                    <div 
                      key={factor.id}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative group ${
                        darkMode ? 'bg-slate-800/40 border-slate-800/80' : 'bg-slate-50/50 border-slate-100'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg ${factor.bg} ${factor.color}`}>
                            <FactorIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-xs block">{factor.name}</span>
                            <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">
                              Weight: {factor.weight}
                            </span>
                          </div>
                        </div>

                        {/* Tooltip trigger button */}
                        <button
                          type="button"
                          onClick={() => setActiveTooltip(isTooltipActive ? null : factor.id)}
                          onMouseEnter={() => setActiveTooltip(factor.id)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          className={`p-1 rounded-lg transition-colors ${
                            isTooltipActive 
                              ? 'text-emerald-500 bg-emerald-500/10' 
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Visual Progress Bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-[10px] font-black mb-1">
                          <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
                            {factor.val}%
                          </span>
                          {factor.negative && (
                            <span className="text-rose-400 font-medium text-[8px] uppercase">
                              {language === 'kn' ? 'ಕಡಿಮೆ ಇದ್ದಷ್ಟು ಉತ್ತಮ' : language === 'hi' ? 'कम होना बेहतर' : language === 'ta' ? 'குறைவாக இருந்தால் நல்லது' : 'Lower is better'}
                            </span>
                          )}
                        </div>
                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                          darkMode ? 'bg-slate-900' : 'bg-slate-200'
                        }`}>
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${getProgressColorClass(factor.val, factor.negative)}`} 
                            style={{ width: `${factor.val}%` }}
                          />
                        </div>
                      </div>

                      {/* Tooltip explanation bubble */}
                      {isTooltipActive && (
                        <div className="absolute inset-0 bg-slate-900/95 border border-slate-700 rounded-2xl p-4 flex flex-col justify-center text-left z-20 animate-fadeIn duration-200">
                          <span className="font-bold text-xs text-white block mb-1">
                            {factor.name} ({factor.weight})
                          </span>
                          <p className="text-[10px] text-slate-300 leading-normal">
                            {factor.tooltip}
                          </p>
                          <button 
                            type="button"
                            onClick={() => setActiveTooltip(null)}
                            className="absolute top-2 right-2 text-[9px] font-bold text-emerald-400 hover:text-white"
                          >
                            {t.common.close}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* SVG Line Chart: Resource Efficiency Trends */}
            <div className={`p-6 rounded-3xl border animate-fadeInUp ${
              darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
            }`} style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-base leading-snug">{t.dashboard.efficiencyTitle}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t.dashboard.efficiencySub}</p>
                </div>
                {/* Chart Legend */}
                <div className="flex gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> {t.dashboard.waterLegend}</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {t.dashboard.cropLegend}</span>
                </div>
              </div>

              <div className="w-full aspect-[16/7] relative">
                <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="cropGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[10, 50, 90, 130].map((y) => (
                    <line key={y} x1="0" y1={y} x2="500" y2={y} stroke={darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} strokeWidth="1" />
                  ))}

                  {/* Fill Areas */}
                  <path d={getAreaPath(lineChartPoints, 'water')} fill="url(#waterGrad)" />
                  <path d={getAreaPath(lineChartPoints, 'crop')} fill="url(#cropGrad)" />

                  {/* Smooth Paths */}
                  <path d={getSmoothPath(lineChartPoints, 'water')} fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
                  <path d={getSmoothPath(lineChartPoints, 'crop')} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Points with glow */}
                  {lineChartPoints.map((pt, idx) => {
                    const spacing = 500 / (lineChartPoints.length - 1);
                    const x = idx * spacing;
                    const waterY = 150 - 10 - ((pt.water / 100) * 120);
                    const cropY = 150 - 10 - ((pt.crop / 100) * 120);
                    
                    return (
                      <g key={idx}>
                        <circle cx={x} cy={waterY} r="5" fill="#0ea5e9" opacity="0.2" />
                        <circle cx={x} cy={waterY} r="3" fill="#0ea5e9" stroke={darkMode ? "#0f172a" : "#ffffff"} strokeWidth="1.5" />
                        <circle cx={x} cy={cropY} r="5" fill="#10b981" opacity="0.2" />
                        <circle cx={x} cy={cropY} r="3" fill="#10b981" stroke={darkMode ? "#0f172a" : "#ffffff"} strokeWidth="1.5" />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* X axis labels */}
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mt-2 px-1">
                {lineChartPoints.map((pt, idx) => <span key={idx}>{translateMonth(pt.month)}</span>)}
              </div>
            </div>

            {/* SVG Bar Chart: Employment sector breakdowns */}
            <div className={`p-6 rounded-3xl border animate-fadeInUp ${
              darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
            }`} style={{ animationDelay: '0.2s' }}>
              <div>
                <h3 className="font-bold text-base leading-snug">{t.dashboard.employmentTitle}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{t.dashboard.employmentSub}</p>
              </div>

              <div className="w-full aspect-[16/7] flex items-end justify-around relative mt-6 pt-4">
                {employmentSectors.map((sector, idx) => {
                  const isHovered = hoveredBar === idx;
                  return (
                    <div 
                      key={idx} 
                      className="flex flex-col items-center flex-1 max-w-[50px] relative group"
                      onMouseEnter={() => setHoveredBar(idx)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {/* Tooltip */}
                      <div className={`absolute -top-9 bg-slate-900 border border-slate-700 text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow-lg transition-all z-10 ${
                        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                      }`}>
                        {sector.value}%
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45" />
                      </div>

                      {/* Visual Bar */}
                      <div 
                        className="w-8 rounded-t-lg transition-all duration-500 shadow-md relative"
                        style={{ 
                          height: `${sector.value * 1.5}px`, 
                          backgroundColor: sector.color,
                          opacity: hoveredBar === null || isHovered ? 1.0 : 0.35,
                          boxShadow: isHovered ? `0 0 20px ${sector.color}40` : 'none',
                          transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
                          transformOrigin: 'bottom'
                        }}
                      />

                      <span className="text-[9px] text-slate-400 font-bold uppercase text-center mt-2.5 truncate w-full">
                        {sector.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Sensor alerts / logs panel */}
          <div className={`p-5 rounded-3xl border animate-fadeInUp ${
            darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
          }`} style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
                <h3 className="font-bold text-sm uppercase tracking-wider">{t.dashboard.iotTitle}</h3>
              </div>
              <button type="button" className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
              }`}>
                <RefreshCw className="w-3.5 h-3.5" />
                {t.common.refresh}
              </button>
            </div>

            <div className="space-y-3.5">
              {localizedLogs.map((log, idx) => (
                <div key={idx} className={`flex justify-between items-center text-xs border-b pb-2.5 last:border-0 last:pb-0 ${
                  darkMode ? 'border-slate-800/80' : 'border-slate-100'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      log.success 
                        ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                        : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)] animate-pulse'
                    }`} />
                    <div>
                      <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{log.zone}</span>
                      <span className="text-slate-400 mx-1.5 font-medium">—</span>
                      <span className="text-slate-500">{log.type}: {log.details}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold flex-shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Datasets Sidebar Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Active Datasets List Card */}
          <div className={`p-5 rounded-3xl border animate-fadeInUp ${
            darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
          }`}>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-2 text-emerald-500">
              {lt.panelTitle}
            </h3>
            <p className="text-[10px] text-slate-400 mb-4 leading-normal">
              {lt.panelDesc}
            </p>
            
            <div className="space-y-3">
              {datasets.map((ds) => {
                const isActive = activeDatasetId === ds.id;
                const score = calculateVillageHealthMeter(ds);
                return (
                  <div 
                    key={ds.id} 
                    className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                      isActive 
                        ? 'border-emerald-500/50 bg-emerald-500/5' 
                        : darkMode ? 'bg-slate-800/40 border-slate-800/80' : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs leading-snug truncate">{ds.name}</h4>
                        <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider mt-1">
                          Health: {score}%
                        </span>
                      </div>
                      
                      {isActive ? (
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full font-black uppercase flex-shrink-0">
                          {lt.active}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectDataset(ds)}
                          className={`text-[9px] px-2.5 py-1 rounded-lg font-bold border transition-colors flex-shrink-0 cursor-pointer ${
                            darkMode 
                              ? 'border-slate-700 bg-slate-800 hover:bg-slate-750 hover:border-slate-600 text-slate-200'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          {lt.analyze}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add Dataset Form Card */}
          <div className={`p-5 rounded-3xl border animate-fadeInUp ${
            darkMode ? 'glass-card' : 'bg-white shadow-sm border-slate-100'
          }`} style={{ animationDelay: '0.1s' }}>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-2 text-emerald-500">
              {lt.formTitle}
            </h3>
            
            <form onSubmit={handleAddDataset} className="space-y-4">
              
              <div>
                <label className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-1">
                  {lt.nameLabel}
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={lt.namePlaceholder}
                  className={`w-full text-xs p-2.5 rounded-xl border outline-none transition-all ${
                    darkMode 
                      ? 'border-slate-800 bg-[#0f172a] text-slate-100 focus:border-emerald-500/50' 
                      : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-emerald-600'
                  }`}
                />
                {formError && <p className="text-[10px] text-rose-500 font-bold mt-1">{formError}</p>}
              </div>

              {/* Slider Inputs */}
              {[
                { label: lt.soilLabel, val: newSoil, set: setNewSoil },
                { label: lt.waterLabel, val: newWater, set: setNewWater },
                { label: lt.cropLabel, val: newCrop, set: setNewCrop },
                { label: lt.rainLabel, val: newRain, set: setNewRain },
                { label: lt.partLabel, val: newPart, set: setNewPart },
                { label: lt.pestLabel, val: newPest, set: setNewPest }
              ].map((slider, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    <span>{slider.label}</span>
                    <span className="text-emerald-500">{slider.val}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={slider.val}
                    onChange={(e) => slider.set(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1 bg-slate-200 dark:bg-slate-900 rounded-lg appearance-none"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-95 transition-all cursor-pointer"
              >
                {lt.btnSubmit}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
