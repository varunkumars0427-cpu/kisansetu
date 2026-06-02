// GramVerse AI Simulation and Calculation Engines

export function calculateVillageHealthMeter(stats) {
  if (!stats) return 0;
  
  // 6 specific factors requested
  const water = stats.waterAvailability ?? stats.waterIndex ?? 72;
  const crop = stats.cropHealth ?? stats.cropPerformance ?? 89;
  const soil = stats.soilQuality ?? stats.soilHealth ?? 84;
  const farmerPart = stats.farmerParticipation ?? 85;
  const rainfall = stats.rainfall ?? 75; 
  const pest = stats.pestIncidents ?? 15; 

  // Weighted calculation:
  // Water availability: 25%
  // Crop health: 20%
  // Soil quality: 20%
  // Farmer participation: 15%
  // Rainfall: 10%
  // Pest incidents: 10% (negatively correlated, i.e. 100 - pestIncidents)
  const totalScore = (water * 0.25) + 
                     (crop * 0.20) + 
                     (soil * 0.20) + 
                     (farmerPart * 0.15) + 
                     (rainfall * 0.10) + 
                     ((100 - pest) * 0.10);
  
  return Math.round(totalScore);
}

export function simulateDigitalTwin({ crop, rainfall, fertilizer, irrigationFrequency }) {
  // 1. Establish Crop Constants
  const baseYields = { // tonnes per acre
    Wheat: 1.8,
    Rice: 2.3,
    Cotton: 1.1,
    Millets: 0.8
  };
  
  const marketPrices = { // per tonne in ₹
    Wheat: 21250,
    Rice: 22500,
    Cotton: 68000,
    Millets: 32000
  };
  
  const base = baseYields[crop] || 1.0;
  const price = marketPrices[crop] || 20000;

  // 2. Rainfall Factor (Bell curve centered around optimal rainfall)
  const optimalRain = {
    Wheat: 500,
    Rice: 1000,
    Cotton: 650,
    Millets: 300
  };
  const targetRain = optimalRain[crop] || 600;
  const rainDiff = Math.abs(rainfall - targetRain);
  // Yield factor drops as difference increases
  const rainFactor = Math.max(0.3, 1 - (rainDiff / targetRain) * 0.7);

  // 3. Fertilizer Factor (Increases yields up to a limit, then becomes toxic)
  let fertFactor = 1.0;
  if (fertilizer <= 100) {
    // Linear positive effect
    fertFactor = 0.7 + (fertilizer / 100) * 0.5; // max 1.2
  } else {
    // Quadratic drop due to soil toxicity
    const overage = fertilizer - 100;
    fertFactor = 1.2 - (overage / 100) * 0.6; // drops down if excessive
    fertFactor = Math.max(0.4, fertFactor);
  }

  // 4. Irrigation Frequency Factor (Frequency in days; lower is more frequent)
  // Optimal frequencies (days): Rice: 3, Wheat: 7, Cotton: 10, Millets: 12
  const optimalFreq = {
    Wheat: 7,
    Rice: 3,
    Cotton: 10,
    Millets: 12
  };
  const targetFreq = optimalFreq[crop] || 7;
  const freqDiff = Math.abs(irrigationFrequency - targetFreq);
  const freqFactor = Math.max(0.4, 1 - (freqDiff / 14) * 0.5);

  // 5. Calculate Final Yield (tonnes/acre)
  const predictedYield = parseFloat((base * rainFactor * fertFactor * freqFactor).toFixed(2));

  // 6. Calculate Soil Health Impact
  // Base soil health starts at 85
  let soilHealth = 85;
  // Negative impacts: high fertilizer, too high rainfall, or bad irrigation frequency
  if (fertilizer > 100) {
    soilHealth -= (fertilizer - 100) * 0.35; // chemical depletion
  } else {
    soilHealth += (fertilizer / 100) * 5; // organic/moderate nutrition benefit
  }
  
  if (irrigationFrequency < 4 && crop !== 'Rice') {
    soilHealth -= 8; // waterlogging/salinity
  }
  
  soilHealth = Math.min(100, Math.max(10, Math.round(soilHealth)));

  // 7. Carbon Footprint (kg CO2-eq per acre)
  // Base footprint + fertilizer impact + irrigation pump electricity usage
  let carbonFootprint = 120;
  carbonFootprint += fertilizer * 2.8; // Chemical fertilizer production is carbon heavy
  carbonFootprint += (15 - irrigationFrequency) * 18; // pumping water uses diesel/coal grid power
  carbonFootprint = Math.round(carbonFootprint);

  // 8. Sustainability Score
  let sustainabilityScore = 80;
  // Depleted by carbon footprint, high fertilizer, and depleted soil health
  sustainabilityScore += (soilHealth - 80) * 0.8;
  sustainabilityScore -= (carbonFootprint - 350) * 0.1;
  sustainabilityScore = Math.min(100, Math.max(10, Math.round(sustainabilityScore)));

  // Determine Sustainability Letter Grade
  let sustainabilityGrade = "C";
  if (sustainabilityScore >= 88) sustainabilityGrade = "A";
  else if (sustainabilityScore >= 74) sustainabilityGrade = "B";
  else if (sustainabilityScore >= 58) sustainabilityGrade = "C";
  else if (sustainabilityScore >= 42) sustainabilityGrade = "D";
  else sustainabilityGrade = "F";

  // 9. Financials
  const grossRevenue = Math.round(predictedYield * price);
  const costs = Math.round((fertilizer * 40) + ((15 - irrigationFrequency) * 200) + 4000); // seed cost + fertilizer + water pumping
  const netProfit = grossRevenue - costs;

  return {
    yield: predictedYield,
    soilHealth,
    carbonFootprint,
    sustainabilityScore,
    sustainabilityGrade,
    grossRevenue,
    netProfit
  };
}

export function simulateIrrigation({ crop, size, waterLevel }) {
  // Base water requirements by crop per acre per season (cubic meters)
  const baseWaterReq = {
    Wheat: 1800,
    Rice: 4500,
    Cotton: 2800,
    Millets: 1000
  };

  const reqPerAcre = baseWaterReq[crop] || 2000;
  const totalWaterRequired = Math.round(reqPerAcre * size);

  // Water level factor: 100 (high), 50 (medium), 20 (low)
  const wlFactor = waterLevel / 100;

  // Base yields by crop (tonnes per acre)
  const baseYield = {
    Wheat: 1.8,
    Rice: 2.3,
    Cotton: 1.1,
    Millets: 0.8
  };
  const cropPrice = {
    Wheat: 21250,
    Rice: 22500,
    Cotton: 68000,
    Millets: 32000
  };

  const yieldPerAcre = baseYield[crop] || 1.0;
  // Yield is constrained if water availability is low
  const waterYieldFactor = wlFactor >= 0.8 ? 1.0 : wlFactor >= 0.5 ? 0.85 : 0.6;
  const predictedYield = parseFloat((yieldPerAcre * size * waterYieldFactor).toFixed(2));

  // Costs and profits
  const costPerAcre = crop === 'Rice' ? 9000 : crop === 'Cotton' ? 8000 : 5000;
  const costEstimate = Math.round(costPerAcre * size + (totalWaterRequired * 0.15)); // land prep + seed + water cost
  const grossRevenue = Math.round(predictedYield * (cropPrice[crop] || 20000));
  const profitForecast = grossRevenue - costEstimate;

  return {
    waterRequired: totalWaterRequired,
    predictedYield,
    costEstimate,
    profitForecast
  };
}
