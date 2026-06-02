// GramVerse AI Mock Data Banks

export const DEFAULT_VILLAGE_STATS = {
  soilHealth: 84,
  waterIndex: 72,
  cropPerformance: 89,
  employmentIndex: 68,
  sustainabilityScore: 78,
  educationScore: 75,
  waterAvailability: 72,
  cropHealth: 89,
  soilQuality: 84,
  rainfall: 65,
  farmerParticipation: 90,
  pestIncidents: 15,
};

export const CHAT_PRESETS = [
  "Which crop should I grow in low rainfall?",
  "How can I improve my soil organic carbon?",
  "What is the best pest control for tomato blight?",
  "Tell me about solar water pump subsidies.",
  "Suggest a rotation plan for cotton farms."
];

export const MAP_ZONES = [
  { id: 1, name: "North Fields (Zone A)", soilType: "Loamy Clay", pH: 6.8, moisture: 65, activeCrop: "Wheat", status: "Optimal" },
  { id: 2, name: "South Hills (Zone B)", soilType: "Sandy Soil", pH: 5.5, moisture: 30, activeCrop: "Millets", status: "Dry" },
  { id: 3, name: "West Valley (Zone C)", soilType: "Black Cotton", pH: 7.4, moisture: 80, activeCrop: "Cotton", status: "Wet" },
  { id: 4, name: "East Orchard (Zone D)", soilType: "Alluvial Silts", pH: 6.2, moisture: 55, activeCrop: "Pomegranates", status: "Optimal" },
  { id: 5, name: "River Bank (Zone E)", soilType: "Clay Loam", pH: 7.0, moisture: 90, activeCrop: "Rice Paddy", status: "Waterlogged" },
  { id: 6, name: "Central Grove (Zone F)", soilType: "Laterite Red", pH: 5.8, moisture: 45, activeCrop: "Groundnuts", status: "Optimal" },
  { id: 7, name: "Dry Uplands (Zone G)", soilType: "Gravelly Clay", pH: 6.0, moisture: 25, activeCrop: "Fallow", status: "Low Nutrient" },
  { id: 8, name: "Experimental Plot (Zone H)", soilType: "Loam (Organic)", pH: 6.5, moisture: 60, activeCrop: "Organic Vegetables", status: "Excellent" }
];

export const MARKET_ITEMS = [
  { id: 1, name: "Premium Sonalika Wheat", category: "Grains", quantity: "150 Quintals", price: 2150, location: "East Mandi", seller: "Ramesh Patel", rating: 4.8 },
  { id: 2, name: "Organic Desi Onions", category: "Vegetables", quantity: "80 Quintals", price: 1850, location: "Central Hub", seller: "Suresh Rao", rating: 4.6 },
  { id: 3, name: "Hybrid BT Cotton Seeds", category: "Seeds", quantity: "20 Bags", price: 820, location: "Agri-Store A", seller: "Gram Seeds Co.", rating: 4.9 },
  { id: 4, name: "Pure Organic Vermicompost", category: "Organic", quantity: "50 Bags", price: 350, location: "West compost pit", seller: "Mahila Self-Help Group", rating: 5.0 },
  { id: 5, name: "Fresh Alphonso Mangoes", category: "Fruits", quantity: "30 Crates", price: 4200, location: "Dabhol Market", seller: "Anant Sawant", rating: 4.7 },
  { id: 6, name: "Cold-pressed Groundnut Oil", category: "Processed", quantity: "100 Liters", price: 190, location: "Village Oil Press", seller: "Gopal Joshi", rating: 4.5 }
];

export const GOV_SCHEMES = [
  {
    id: 1,
    name: "PM Kisan Samman Nidhi (PM-KISAN)",
    benefit: "Direct income support of ₹6,000/year in three equal installments to all landholding farmer families.",
    criteria: "Landholding farmer families with cultivable land.",
    action: "Apply Online via GramVerse Portal"
  },
  {
    id: 2,
    name: "PM Krishi Sinchayee Yojana (PMKSY)",
    benefit: "Subsidies up to 80% on drip and sprinkler irrigation systems to improve water use efficiency ('Per Drop More Crop').",
    criteria: "All farmers owning cultivable land (priority to small/marginal & women farmers).",
    action: "Schedule Irrigation Audit"
  },
  {
    id: 3,
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    benefit: "Financial assistance of ₹50,000 per hectare for 3 years for organic farming, certification, and marketing.",
    criteria: "Groups of farmers (minimum 20 hectares cluster size).",
    action: "Form Organic Cluster"
  },
  {
    id: 4,
    name: "Solar Pump Subsidy (KUSUM Scheme)",
    benefit: "Up to 60% subsidy on installing standalone solar-powered agricultural pumps.",
    criteria: "Farmers, cooperatives, or cluster communities with valid irrigation sources.",
    action: "Check Solar Eligibility"
  }
];

export const SKILL_PROGRAMS = [
  { date: "June 10, 2026", title: "Drone Spraying Workshop", provider: "Village Innovation Hub", duration: "2 Days", status: "Upcoming" },
  { date: "June 18, 2026", title: "Organic Certification Training", provider: "PKVY Board", duration: "3 Days", status: "Open for Registration" },
  { date: "June 25, 2026", title: "Hydroponics for Beginners", provider: "GramVerse Biotech Lab", duration: "1 Day", status: "Upcoming" },
  { date: "July 02, 2026", title: "Agricultural Bookkeeping & E-Marketplace Selling", provider: "NABARD", duration: "5 Days", status: "Planning" }
];

export const STARTUP_IDEAS = [
  { title: "Solar Cold Storage Network", description: "Providing micro-cold storage facilities using solar energy, reducing post-harvest losses from 30% to under 5%.", fundingRequired: "₹5 Lakhs", stage: "Incubating" },
  { title: "Drone Agro-Sprayers Collective", description: "Providing localized precision pesticide and fertilizer drone spraying services at 60% lower costs than manual methods.", fundingRequired: "₹3 Lakhs", stage: "Pilot Testing" },
  { title: "Vermi-Gold Biofertilizers", description: "Turning organic crop residues and cow dung into high-grade vermicompost, sold directly through our Rural Marketplace.", fundingRequired: "₹1.5 Lakhs", stage: "Profitable" }
];

export const SUCCESS_STORIES = [
  { id: 1, name: "Savita Kamble", role: "Millets Farmer", text: "Using GramVerse's Digital Twin simulations, I adjusted my irrigation times and saved 40% water while increasing my ragi yield by 25%.", location: "Khed, Pune" },
  { id: 2, name: "Vikram Singh", role: "Agri-Entrepreneur", text: "I launched my drone spraying startup through the Innovation Hub. We now spray 200 acres of fields daily, providing 4 jobs to local youths.", location: "Baramati" },
  { id: 3, name: "Deepak Mahajan", role: "Horticulturist", text: "The AI Farm Advisor diagnosed my pomegranate leaf spots as bacterial blight and suggested an organic solution. I saved my crop just in time!", location: "Solapur" }
];

export const DISCUSSION_THREADS = [
  {
    id: 1,
    title: "Whitefly infestation in cotton fields",
    category: "Pests & Disease",
    author: "Harish Kurane",
    replies: 12,
    likes: 34,
    lastActive: "2 hours ago",
    content: "My BT cotton crops are showing heavy whitefly infestations. I've sprayed standard insecticide but with no result. Any organic recipes that actually work?"
  },
  {
    id: 2,
    title: "Setting up a biogas plant for a cluster of 5 houses",
    category: "Green Energy",
    author: "Shyamrao Patil",
    replies: 8,
    likes: 21,
    lastActive: "1 day ago",
    content: "We have around 12 cows across 5 households. We want to set up a shared biogas digester. Is there any subsidy available in Maharashtra this year?"
  },
  {
    id: 3,
    title: "Price expectations for Soybean in the next two weeks",
    category: "Mandi Rates",
    author: "Anil Deshmukh",
    replies: 19,
    likes: 45,
    lastActive: "30 mins ago",
    content: "Soybean rates are hovering around ₹4600/quintal. Should I store my harvest or sell now? What do demand trends indicate?"
  }
];
