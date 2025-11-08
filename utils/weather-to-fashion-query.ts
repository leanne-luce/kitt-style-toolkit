import { WeatherData } from '@/services/weather';
import { getCurrentOutfit, getCurrentHoroscope } from './weather-storage';

/**
 * Converts outfit recommendation into a Vogue Archive search query
 * Uses the actual outfit recommendation text if available, combined with horoscope
 */
export async function getWeatherBasedFashionQuery(weather: WeatherData): Promise<string> {
  // Try to get the stored outfit recommendation and horoscope
  const outfitText = await getCurrentOutfit();
  const horoscopeText = await getCurrentHoroscope();

  if (outfitText) {
    // Combine outfit recommendation with horoscope for personalized search
    let query = outfitText;
    if (horoscopeText) {
      query += ' ' + horoscopeText;
    }
    return query;
  }

  // Fallback: generate query from weather data if no outfit is stored
  const { temperature, precipitation, weatherCode, maxTemp, minTemp } = weather;
  const avgTemp = (maxTemp + minTemp) / 2;

  // Build query based on temperature and conditions
  let queryParts: string[] = [];

  // Temperature-based style descriptors
  if (avgTemp >= 80) {
    queryParts.push('light summer dress', 'linen', 'breathable');
  } else if (avgTemp >= 70) {
    queryParts.push('spring outfit', 'light layers', 'casual chic');
  } else if (avgTemp >= 60) {
    queryParts.push('jacket', 'blazer', 'transitional');
  } else if (avgTemp >= 50) {
    queryParts.push('sweater', 'knitwear', 'layered look');
  } else if (avgTemp >= 40) {
    queryParts.push('coat', 'wool', 'autumn winter');
  } else {
    queryParts.push('winter coat', 'outerwear', 'warm layers');
  }

  // Weather condition adjustments
  if (precipitation > 50 || [61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    // Rainy
    queryParts.push('rain coat', 'waterproof', 'trench');
  } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    // Snow
    queryParts.push('winter outerwear', 'heavy coat', 'bundled');
  } else if ([0, 1, 2].includes(weatherCode) && temperature >= 75) {
    // Sunny and hot
    queryParts.push('resort wear', 'summer look', 'breezy');
  }

  // Pick 2-3 most relevant terms for a focused query
  const primaryQuery = queryParts.slice(0, 3).join(' ');

  return primaryQuery;
}

/**
 * Get a user-friendly description of what fashion we're showing
 */
export function getWeatherFashionDescription(weather: WeatherData): string {
  const { temperature, precipitation, weatherCode } = weather;

  if (precipitation > 50) {
    return 'Rainy day fashion';
  } else if ([71, 73, 75, 77].includes(weatherCode)) {
    return 'Winter weather style';
  } else if (temperature >= 80) {
    return 'Summer heat fashion';
  } else if (temperature >= 70) {
    return 'Spring/summer style';
  } else if (temperature >= 60) {
    return 'Transitional weather looks';
  } else if (temperature >= 50) {
    return 'Cool weather layering';
  } else {
    return 'Cold weather outfits';
  }
}
