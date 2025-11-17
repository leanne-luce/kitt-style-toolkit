export interface HourlyWeather {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitation: number;
}

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  description: string;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
  windSpeed: number;
  hourly?: HourlyWeather[];
}

/**
 * Weather code descriptions from Open-Meteo
 * https://open-meteo.com/en/docs
 */
function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };

  return descriptions[code] || 'Unknown';
}

/**
 * Fetches weather data from Open-Meteo API
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @returns Weather data for the location
 */
export async function getWeather(
  latitude: number,
  longitude: number,
  includeHourly: boolean = false
): Promise<WeatherData> {
  try {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`;

    if (includeHourly) {
      url += '&hourly=temperature_2m,weather_code,precipitation_probability&forecast_days=1';
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    const weatherData: WeatherData = {
      temperature: Math.round(data.current.temperature_2m),
      weatherCode: data.current.weather_code,
      description: getWeatherDescription(data.current.weather_code),
      maxTemp: Math.round(data.daily.temperature_2m_max[0]),
      minTemp: Math.round(data.daily.temperature_2m_min[0]),
      precipitation: data.daily.precipitation_sum[0],
      windSpeed: Math.round(data.current.wind_speed_10m),
    };

    if (includeHourly && data.hourly) {
      // Get hourly data starting from current hour
      const hourlyData: HourlyWeather[] = [];
      const now = new Date();
      const currentHour = now.getHours();

      // Find the index that matches the current hour
      let startIndex = 0;
      for (let i = 0; i < data.hourly.time.length; i++) {
        const hourTime = new Date(data.hourly.time[i]);
        // Match the hour that corresponds to the current hour
        if (hourTime.getHours() === currentHour &&
            hourTime.getDate() === now.getDate() &&
            hourTime.getMonth() === now.getMonth()) {
          startIndex = i;
          break;
        }
      }

      // Get all remaining hours (up to 24 hours max)
      for (let i = startIndex; i < Math.min(startIndex + 24, data.hourly.time.length); i++) {
        hourlyData.push({
          time: data.hourly.time[i],
          temperature: Math.round(data.hourly.temperature_2m[i]),
          weatherCode: data.hourly.weather_code[i],
          precipitation: data.hourly.precipitation_probability?.[i] || 0,
        });
      }

      weatherData.hourly = hourlyData;
    }

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}
