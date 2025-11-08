import { WeatherData } from '@/services/weather';
import {
  OUTFIT_LIBRARY,
  WEATHER_ADDITIONS,
  getCurrentSeasonalEvent,
  getVariedOutfit,
  getRandomItem,
} from './outfit-library';

export interface OutfitRecommendation {
  outfit: string;
  bring: string;
  note?: string;
}

export interface DetailedOutfitRecommendation {
  layers: string;
  top: string;
  bottom: string;
  shoes: string;
  accessories?: string;
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

  // Determine temperature category for outfit library
  let category: keyof typeof OUTFIT_LIBRARY;
  if (avgTemp >= 80) {
    category = 'hot';
  } else if (avgTemp >= 70) {
    category = 'warm';
  } else if (avgTemp >= 60) {
    category = 'mild';
  } else if (avgTemp >= 50) {
    category = 'cool';
  } else if (avgTemp >= 40) {
    category = 'cold';
  } else if (avgTemp >= 32) {
    category = 'freezing';
  } else {
    category = 'arctic';
  }

  // Get current seasonal event if any
  const seasonalEvent = getCurrentSeasonalEvent();

  // Get varied outfit from library with seasonal modifiers
  const hasLargeTempRange = tempRange > 15;
  let outfit = getVariedOutfit(category, hasLargeTempRange, seasonalEvent);

  // Precipitation and weather condition adjustments - append to outfit
  let note: string | undefined;

  // Only append weather-specific items when meaningfully relevant
  if (precipitation > 50 || [61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    // High chance of rain or actively raining
    outfit += getRandomItem(WEATHER_ADDITIONS.heavyRain);
    note = 'Rain expected - add waterproof outer layer';
  } else if (precipitation > 20) {
    outfit += getRandomItem(WEATHER_ADDITIONS.lightRain);
  } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    // Snow conditions
    outfit += getRandomItem(WEATHER_ADDITIONS.snow);
    note = 'Snowy conditions - dress for warmth and traction';
  } else if (windSpeed > 15) {
    outfit += getRandomItem(WEATHER_ADDITIONS.wind);
    if (!note) note = 'Windy conditions - secure loose items';
  } else if (temperature >= 85) {
    // Very hot
    outfit += getRandomItem(WEATHER_ADDITIONS.veryHot);
  }
  // For normal/mild conditions, leave as is - no need to add generic accessories

  // Additional notes for extreme conditions
  if (temperature >= 90) {
    note = 'Very hot - stay hydrated, seek shade';
  } else if (temperature <= 20) {
    note = 'Extremely cold - cover all exposed skin';
  } else if ([95, 96, 99].includes(weatherCode)) {
    note = 'Thunderstorm expected - stay safe and dry';
  }

  return {
    outfit,
    bring: '', // No longer used - accessories are appended to outfit
    note,
  };
}

/**
 * Generates detailed, categorized outfit recommendations for the weather report page
 */
export function getDetailedOutfitRecommendation(weather: WeatherData): DetailedOutfitRecommendation {
  const { temperature, precipitation, windSpeed, weatherCode, maxTemp, minTemp } = weather;
  const tempRange = maxTemp - minTemp;
  const avgTemp = (maxTemp + minTemp) / 2;

  let layers = '';
  let top = '';
  let bottom = '';
  let shoes = '';
  let accessories = '';
  let note: string | undefined;

  // Determine outfit based on temperature
  if (avgTemp >= 80) {
    // Hot weather
    layers = 'Single layer - keep it minimal';
    top = 'Breathable cotton or linen tank, sleeveless button-down, or loose tee';
    bottom = 'Shorts, flowy midi skirt, or wide-leg linen pants';
    shoes = 'Sandals, slides, or espadrilles';
    accessories = 'Sunglasses, lightweight hat for sun protection';

    if (temperature >= 90) {
      note = 'Very hot - stay hydrated, seek shade when possible';
    }
  } else if (avgTemp >= 70) {
    // Warm weather
    layers = 'Light layers - cardigan or denim jacket you can tie around waist';
    top = 'Cotton tee, short-sleeve knit, or chambray shirt';
    bottom = 'Jeans, cropped pants, midi skirt, or casual dress';
    shoes = 'Sneakers, loafers, mules, or ankle boots';

    if (tempRange > 15) {
      accessories = 'Light scarf for temperature changes';
    }
  } else if (avgTemp >= 60) {
    // Mild weather
    layers = 'Layering essential - blazer, denim jacket, or cardigan';
    top = 'Turtleneck, lightweight sweater, button-down, or sweater vest';
    bottom = 'Jeans, trousers, or midi dress as base layer';
    shoes = 'Ankle boots, loafers, or oxfords';
    accessories = 'Light scarf, crossbody bag';
  } else if (avgTemp >= 50) {
    // Cool weather
    layers = 'Sweater weather - chunky knit, cardigan, or light coat';
    top = 'Turtleneck, crewneck sweater, or long-sleeve base layer';
    bottom = 'Jeans, trousers, or warm dress';
    shoes = 'Boots, closed-toe shoes, or weatherproof sneakers';
    accessories = 'Scarf, beanie if windy';
  } else if (avgTemp >= 40) {
    // Cold weather
    layers = 'Real coat time - wool coat, puffer, or heavy jacket';
    top = 'Wool sweater, thick knit, or thermal layers';
    bottom = 'Jeans, lined pants, or warm dress with tights';
    shoes = 'Insulated boots or weatherproof ankle boots';
    accessories = 'Warm scarf, gloves, beanie';
  } else if (avgTemp >= 32) {
    // Freezing
    layers = 'Heavy winter coat - insulated puffer or wool coat';
    top = 'Multiple layers: thermal base, sweater, possibly vest';
    bottom = 'Insulated pants, warm jeans, or fleece-lined tights';
    shoes = 'Insulated winter boots with good traction';
    accessories = 'Warm hat, insulated gloves, thick scarf';
    note = 'Layer up - multiple thin layers trap heat better than one thick layer';
  } else {
    // Arctic
    layers = 'Maximum insulation - down puffer or arctic-rated coat';
    top = 'Layer heavily: thermal base, fleece mid-layer, thick sweater';
    bottom = 'Insulated pants or multiple layers';
    shoes = 'Heavy-duty winter boots rated for extreme cold';
    accessories = 'Insulated hat covering ears, warm gloves, neck gaiter or scarf';
    note = 'Extremely cold - cover all exposed skin, limit time outdoors';
  }

  // Weather condition adjustments
  if (precipitation > 50 || [61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    // Heavy rain
    if (!accessories) accessories = '';
    accessories += (accessories ? ', ' : '') + 'Waterproof jacket or rain coat, umbrella';
    if (!note) note = 'Rain expected - add waterproof outer layer';
  } else if (precipitation > 20) {
    // Light rain possibility
    if (!accessories) accessories = '';
    accessories += (accessories ? ', ' : '') + 'Bring umbrella or light rain jacket';
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    // Snow
    shoes = 'Waterproof insulated boots with good traction';
    if (!accessories) accessories = '';
    accessories += (accessories ? ', ' : '') + 'Water-resistant gloves, warm hat';
    if (!note) note = 'Snowy conditions - dress for warmth and traction';
  }

  if (windSpeed > 20) {
    if (!note) note = 'Very windy - wear windproof outer layer, secure loose items';
  } else if (windSpeed > 15) {
    if (!note) note = 'Windy conditions - consider a windbreaker or secured layers';
  }

  if ([95, 96, 99].includes(weatherCode)) {
    note = 'Thunderstorm expected - stay safe and dry';
  }

  if (tempRange > 15) {
    if (!note) note = 'Large temperature swing today - dress in layers you can remove';
  }

  return {
    layers,
    top,
    bottom,
    shoes,
    accessories: accessories || undefined,
    note,
  };
}
