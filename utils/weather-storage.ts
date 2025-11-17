import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData } from '@/services/weather';

const WEATHER_KEY = '@current_weather';
const WEATHER_TIMESTAMP_KEY = '@current_weather_timestamp';
const OUTFIT_KEY = '@current_outfit';
const HOROSCOPE_KEY = '@current_horoscope';

// Cache weather for 30 minutes
const WEATHER_CACHE_DURATION = 30 * 60 * 1000;

/**
 * Save current weather data to local storage with timestamp
 */
export async function saveCurrentWeather(weather: WeatherData): Promise<void> {
  try {
    const weatherString = JSON.stringify(weather);
    const timestamp = Date.now().toString();
    await AsyncStorage.multiSet([
      [WEATHER_KEY, weatherString],
      [WEATHER_TIMESTAMP_KEY, timestamp],
    ]);
  } catch (error) {
    console.error('Error saving weather:', error);
  }
}

/**
 * Save current outfit recommendation to local storage
 */
export async function saveCurrentOutfit(outfit: string): Promise<void> {
  try {
    await AsyncStorage.setItem(OUTFIT_KEY, outfit);
  } catch (error) {
    console.error('Error saving outfit:', error);
  }
}

/**
 * Get current weather data from local storage if still valid
 * Returns null if cache is expired or doesn't exist
 */
export async function getCurrentWeather(): Promise<WeatherData | null> {
  try {
    const [[, weatherString], [, timestampString]] = await AsyncStorage.multiGet([
      WEATHER_KEY,
      WEATHER_TIMESTAMP_KEY,
    ]);

    if (!weatherString || !timestampString) return null;

    const timestamp = parseInt(timestampString, 10);
    const now = Date.now();

    // Check if cache is still valid (within 30 minutes)
    if (now - timestamp > WEATHER_CACHE_DURATION) {
      return null;
    }

    return JSON.parse(weatherString);
  } catch (error) {
    console.error('Error loading weather:', error);
    return null;
  }
}

/**
 * Check if cached weather is still valid
 */
export async function isWeatherCacheValid(): Promise<boolean> {
  try {
    const timestampString = await AsyncStorage.getItem(WEATHER_TIMESTAMP_KEY);
    if (!timestampString) return false;

    const timestamp = parseInt(timestampString, 10);
    const now = Date.now();

    return now - timestamp <= WEATHER_CACHE_DURATION;
  } catch (error) {
    console.error('Error checking weather cache:', error);
    return false;
  }
}

/**
 * Get current outfit recommendation from local storage
 */
export async function getCurrentOutfit(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(OUTFIT_KEY);
  } catch (error) {
    console.error('Error loading outfit:', error);
    return null;
  }
}

/**
 * Clear weather data from local storage
 */
export async function clearCurrentWeather(): Promise<void> {
  try {
    await AsyncStorage.removeItem(WEATHER_KEY);
  } catch (error) {
    console.error('Error clearing weather:', error);
  }
}

/**
 * Save current horoscope prompt to local storage
 */
export async function saveCurrentHoroscope(horoscope: string): Promise<void> {
  try {
    await AsyncStorage.setItem(HOROSCOPE_KEY, horoscope);
  } catch (error) {
    console.error('Error saving horoscope:', error);
  }
}

/**
 * Get current horoscope prompt from local storage
 */
export async function getCurrentHoroscope(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(HOROSCOPE_KEY);
  } catch (error) {
    console.error('Error loading horoscope:', error);
    return null;
  }
}
