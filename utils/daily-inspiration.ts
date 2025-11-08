import { WeatherData } from '@/services/weather';
import { ZodiacSign } from './zodiac';

/**
 * Generates a whimsical but useful daily inspiration combining horoscope and weather
 */
export function getDailyInspiration(
  zodiacSign: ZodiacSign,
  horoscopePrompt: string,
  weather: WeatherData,
  location: string
): string {
  const { temperature, description, maxTemp, minTemp } = weather;

  // Extract key themes from horoscope (first sentence or key words)
  const horoscopeTheme = horoscopePrompt.split('.')[0];

  // Temperature-based opening phrases
  let weatherMood = '';
  const avgTemp = (maxTemp + minTemp) / 2;

  if (avgTemp >= 80) {
    weatherMood = 'the heat is your runway';
  } else if (avgTemp >= 70) {
    weatherMood = 'perfect weather for making moves';
  } else if (avgTemp >= 60) {
    weatherMood = 'layer up your ambitions';
  } else if (avgTemp >= 50) {
    weatherMood = 'cozy vibes, bold choices';
  } else if (avgTemp >= 40) {
    weatherMood = 'bundle up in confidence';
  } else {
    weatherMood = 'winter is your power season';
  }

  // Weather condition additions
  let weatherNote = '';
  if (weather.precipitation > 50) {
    weatherNote = ' Let the rain wash away yesterday\'s doubts.';
  } else if (weather.windSpeed > 15) {
    weatherNote = ' The wind carries new opportunities.';
  } else if ([0, 1].includes(weather.weatherCode)) {
    weatherNote = ' Clear skies, clear vision.';
  } else if ([71, 73, 75, 77].includes(weather.weatherCode)) {
    weatherNote = ' Fresh snow, fresh start.';
  }

  // Combine everything into a whimsical prompt
  const inspiration = `Today in ${location}, ${weatherMood}. ${horoscopeTheme.trim()}.${weatherNote}`;

  return inspiration;
}

/**
 * Gets a short, punchy version for mobile display
 */
export function getShortInspiration(
  horoscopePrompt: string,
  weather: WeatherData
): string {
  const { maxTemp, minTemp } = weather;
  const avgTemp = (maxTemp + minTemp) / 2;

  // Extract essence from horoscope
  const horoscopeEssence = horoscopePrompt.split('.')[0].replace(/^(Today|This week|Right now),?\s*/i, '').trim();

  // Temperature-based connector
  let connector = '';
  if (avgTemp >= 75) {
    connector = 'Shine bright: ';
  } else if (avgTemp >= 60) {
    connector = 'Layer with intention: ';
  } else if (avgTemp >= 45) {
    connector = 'Cozy + confident: ';
  } else {
    connector = 'Bundle up boldly: ';
  }

  return connector + horoscopeEssence.toLowerCase();
}
