# Weather-to-Fashion Integration

## Overview

The Vogue Archive Search page automatically pre-populates with weather-appropriate fashion inspiration based on the current weather from the Outfit Weather Report. No button clicks needed - the fashion results appear automatically when you open the search page.

## How It Works

### 1. Weather Analysis ([utils/weather-to-fashion-query.ts](utils/weather-to-fashion-query.ts))

The system converts weather data into fashion search queries:

**Temperature-based queries:**
- 80°F+: "light summer dress linen breathable"
- 70-80°F: "spring outfit light layers casual chic"
- 60-70°F: "jacket blazer transitional"
- 50-60°F: "sweater knitwear layered look"
- 40-50°F: "coat wool autumn winter"
- Below 40°F: "winter coat outerwear warm layers"

**Weather condition modifiers:**
- Rainy: adds "rain coat waterproof trench"
- Snowy: adds "winter outerwear heavy coat"
- Sunny & hot: adds "resort wear summer look breezy"

### 2. User Flow

1. User views weather on Outfit Weather Report page
2. Weather data is automatically saved to local storage
3. Sees "What to Wear" recommendations (layers, accessories, footwear)
4. User navigates to Vogue Archive Search tab
5. Search page automatically:
   - Loads saved weather data
   - Generates fashion query based on weather
   - Executes search showing runway looks matching the weather
   - Displays subtitle: "Today's inspiration: [weather type] fashion"

### 3. Gender Preference Integration

The search automatically applies the user's gender preference:
- Women's: filters to womenswear + appends "womenswear" to query
- Men's: filters to menswear + appends "menswear" to query
- Both: shows all results

### 4. Technical Implementation

**Weather Storage ([utils/weather-storage.ts](utils/weather-storage.ts)):**
```typescript
// Save weather to AsyncStorage for cross-screen access
export async function saveCurrentWeather(weather: WeatherData): Promise<void> {
  const weatherString = JSON.stringify(weather);
  await AsyncStorage.setItem('@current_weather', weatherString);
}

export async function getCurrentWeather(): Promise<WeatherData | null> {
  const weatherString = await AsyncStorage.getItem('@current_weather');
  return weatherString ? JSON.parse(weatherString) : null;
}
```

**Weather Page ([app/outfit-weather-report.tsx](app/outfit-weather-report.tsx:48-51)):**
```typescript
setLocation(cityName);
setWeather(weatherData);

// Save weather to storage for Vogue Archive to use
await saveCurrentWeather(weatherData);
```

**Vogue Archive Search ([app/vogue-archive-search.tsx](app/vogue-archive-search.tsx:101-125)):**
```typescript
// Auto-load weather-based query when screen is focused
useFocusEffect(
  useCallback(() => {
    const loadWeatherQuery = async () => {
      // Skip if there's a URL parameter or already auto-searched
      if (params.q || hasAutoSearched) return;

      const weather = await getCurrentWeather();
      if (weather) {
        const fashionQuery = getWeatherBasedFashionQuery(weather);
        const description = getWeatherFashionDescription(weather);

        setQuery(fashionQuery);
        setWeatherDescription(description);
        setHasAutoSearched(true);

        // Perform search after gender preference is loaded
        setTimeout(() => {
          performSearch(fashionQuery);
        }, 500);
      }
    };

    loadWeatherQuery();
  }, [params.q, hasAutoSearched, genderPreference])
);
```

## Example Scenarios

### Scenario 1: Hot Summer Day
- **Weather**: 85°F, sunny, 0% precipitation
- **Fashion Query**: "light summer dress linen breathable"
- **Subtitle**: "Today's inspiration: Summer heat fashion"
- **Results**: Breezy summer dresses, linen pieces, resort wear

### Scenario 2: Rainy Spring Day
- **Weather**: 65°F, 70% precipitation chance
- **Fashion Query**: "jacket blazer transitional rain coat waterproof trench"
- **Subtitle**: "Today's inspiration: Rainy day fashion"
- **Results**: Trench coats, waterproof jackets, rain-ready outfits

### Scenario 3: Cold Winter Morning
- **Weather**: 32°F, snowing
- **Fashion Query**: "winter coat outerwear warm layers winter outerwear heavy coat bundled"
- **Subtitle**: "Today's inspiration: Winter weather style"
- **Results**: Heavy coats, layered winter looks, bundled outfits

## Benefits

1. **Contextual Inspiration**: Users see fashion that's actually appropriate for their weather
2. **Zero Friction**: No buttons to click - results appear automatically when opening the search
3. **Persistent**: Weather data saved locally, works across app sessions
4. **Personalized**: Respects user's gender preference automatically
5. **Smart Queries**: CLIP model understands fashion terms for better semantic matching
6. **Discoverable**: Users can still manually search for anything they want

## Future Enhancements

Potential improvements:
- Add time-of-day context (morning/evening wear)
- Consider user's location (city fashion styles)
- Save favorite weather-based searches
- Add "Shop this look" functionality
