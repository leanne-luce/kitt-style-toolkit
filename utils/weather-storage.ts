import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData } from '@/services/weather';

const WEATHER_KEY = '@current_weather';

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
 * Clear weather data from local storage
 */
export async function clearCurrentWeather(): Promise<void> {
  try {
    await AsyncStorage.removeItem(WEATHER_KEY);
  } catch (error) {
    console.error('Error clearing weather:', error);
  }
}
