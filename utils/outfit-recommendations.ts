import { WeatherData } from '@/services/weather';

export interface OutfitRecommendation {
  layers: string;
  accessories: string;
  footwear: string;
  note?: string;
}

/**
 * Generates outfit recommendations based on weather conditions
 */
export function getOutfitRecommendation(weather: WeatherData): OutfitRecommendation {
  const { temperature, precipitation, windSpeed, weatherCode, maxTemp, minTemp } = weather;

  // Consider the temperature range for the day
  const tempRange = maxTemp - minTemp;
  const avgTemp = (maxTemp + minTemp) / 2;

  // Temperature-based recommendations using average temp, with notes about range
  let layers = '';
  let footwear = '';

  if (avgTemp >= 80) {
    layers = 'Single layer - light, breathable fabrics like linen or cotton';
    if (tempRange > 15) {
      layers += '. Bring a light layer for evening';
    }
    footwear = 'Sandals or breathable sneakers';
  } else if (avgTemp >= 70) {
    layers = 'Light layers - add a light cardigan or kimono for air conditioning';
    if (tempRange > 15) {
      layers += '. Consider a versatile layer you can add/remove';
    }
    footwear = 'Sandals, loafers, or sneakers';
  } else if (avgTemp >= 60) {
    layers = 'Light jacket, blazer, or denim jacket over base layer';
    if (tempRange > 15) {
      layers += '. Layer so you can adjust throughout the day';
    }
    footwear = 'Loafers, sneakers, or ankle boots';
  } else if (avgTemp >= 50) {
    layers = 'Sweater or hoodie with light jacket';
    if (maxTemp >= 65) {
      layers = 'Start with sweater, bring a jacket for cooler parts of day';
    } else if (minTemp <= 45) {
      layers += ' - it will be chilly, especially morning and evening';
    }
    footwear = 'Closed-toe shoes or boots';
  } else if (avgTemp >= 40) {
    layers = 'Sweater with medium-weight jacket or coat';
    if (tempRange > 15) {
      layers += '. Layering is key with this temperature swing';
    }
    footwear = 'Boots or sturdy closed-toe shoes';
  } else if (avgTemp >= 32) {
    layers = 'Heavy coat, sweater, long sleeves - consider layering base';
    footwear = 'Insulated boots';
  } else {
    layers = 'Maximum warmth - thermal base layer, sweater, heavy winter coat';
    footwear = 'Insulated waterproof boots';
  }

  // Precipitation and weather condition adjustments
  let accessories = '';
  let note: string | undefined;

  // Check if it's sunny or clear (weather codes 0, 1, 2)
  const isSunny = [0, 1, 2].includes(weatherCode);
  const isCloudy = [3].includes(weatherCode);

  if (precipitation > 50 || [61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    // High chance of rain or actively raining
    accessories = 'Umbrella, water-resistant bag';
    note = 'Rain expected - prioritize waterproof materials';
    // Adjust layers for rain
    layers = layers + ' with waterproof outer layer';
  } else if (precipitation > 20) {
    accessories = 'Pack an umbrella just in case, crossbody bag';
  } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    // Snow conditions
    accessories = 'Warm hat, gloves, scarf';
    note = 'Snowy conditions - dress for warmth and traction';
  } else if (windSpeed > 15) {
    accessories = 'Scarf to block wind, secure bag';
    if (!note) note = 'Windy conditions - secure loose items';
  } else if (isSunny && temperature >= 75) {
    // Hot and sunny
    accessories = 'Sunglasses, wide-brim hat, tote or crossbody bag';
  } else if (isSunny) {
    // Sunny but not too hot
    accessories = 'Sunglasses, versatile bag';
  } else if (isCloudy || [45, 48].includes(weatherCode)) {
    // Overcast or foggy
    accessories = 'Structured bag, watch';
  } else {
    // Default for other conditions
    accessories = 'Versatile bag';
  }

  // Additional notes for extreme conditions
  if (temperature >= 90) {
    note = 'Very hot - stay hydrated, seek shade';
  } else if (temperature <= 20) {
    note = 'Extremely cold - cover all exposed skin';
  } else if ([95, 96, 99].includes(weatherCode)) {
    note = 'Thunderstorm expected - stay safe and dry';
  }

  return {
    layers,
    accessories,
    footwear,
    note,
  };
}
