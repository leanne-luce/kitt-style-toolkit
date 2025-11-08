import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData } from '@/services/weather';

const WEATHER_KEY = '@current_weather';
const OUTFIT_KEY = '@current_outfit';
const HOROSCOPE_KEY = '@current_horoscope';

/**
 * Save current weather data to local storage
 */
export async function saveCurrentWeather(weather: WeatherData): Promise<void> {
  try {
    const weatherString = JSON.stringify(weather);
    await AsyncStorage.setItem(WEATHER_KEY, weatherString);
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
 * Get current weather data from local storage
 */
export async function getCurrentWeather(): Promise<WeatherData | null> {
  try {
    const weatherString = await AsyncStorage.getItem(WEATHER_KEY);
    if (!weatherString) return null;
    return JSON.parse(weatherString);
  } catch (error) {
    console.error('Error loading weather:', error);
    return null;
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
