import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { useState, useEffect } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getCurrentLocation, getCityFromCoords } from '@/services/location';
import { getWeather, WeatherData } from '@/services/weather';
import { getOutfitRecommendation, getDetailedOutfitRecommendation } from '@/utils/outfit-recommendations';
import { getWeatherIllustration } from '@/components/illustrations/weather-illustrations';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors, Typography, Fonts } from '@/constants/theme';
import { saveCurrentWeather, saveCurrentOutfit } from '@/utils/weather-storage';
import { getLunarPhase } from '@/utils/lunar-phase';
import { lunarIllustrations } from '@/components/illustrations/lunar-illustrations';

export default function OutfitWeatherReportScreen() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const illustrationColor = useThemeColor({}, 'text');

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      setLoading(true);
      setError('');

      // Get user location
      const coords = await getCurrentLocation();

      if (!coords) {
        setError('Location permission denied. Please enable location services to see weather.');
        setLoading(false);
        return;
      }

      // Get city name and weather in parallel (with hourly data)
      const [cityName, weatherData] = await Promise.all([
        getCityFromCoords(coords.latitude, coords.longitude),
        getWeather(coords.latitude, coords.longitude, true),
      ]);

      setLocation(cityName);
      setWeather(weatherData);

      // Generate outfit recommendation
      const recommendation = getOutfitRecommendation(weatherData);

      // Save weather and outfit to storage for Vogue Archive to use
      await saveCurrentWeather(weatherData);
      await saveCurrentOutfit(recommendation.outfit);
    } catch (err) {
      console.error('Error loading weather:', err);
      setError('Failed to load weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Outfit Weather Report</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>Plan your outfit for today</ThemedText>
        </ThemedView>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <ThemedText style={styles.loadingText}>Getting weather...</ThemedText>
          </View>
        )}

        {error && !loading && (
          <Card style={styles.card}>
            <Card.Content>
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            </Card.Content>
          </Card>
        )}

        {weather && !loading && (
          <>
            <Card style={styles.card} elevation={2}>
              <Card.Content style={styles.cardContent}>
                <ThemedText style={styles.location}>{location}</ThemedText>
                <Divider style={styles.divider} />

                {/* Current Temperature */}
                <View style={styles.tempContainer}>
                  {(() => {
                    const WeatherIcon = getWeatherIllustration(weather.weatherCode);
                    return <WeatherIcon size={70} color={illustrationColor} />;
                  })()}
                  <View style={styles.tempTextContainer}>
                    <ThemedText style={styles.temperature}>{weather.temperature}°F</ThemedText>
                    <ThemedText style={styles.description}>{weather.description}</ThemedText>
                  </View>
                </View>

                <Divider style={styles.divider} />

                {/* Weather Details */}
                <View style={styles.detailsContainer}>
                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>High / Low</ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {weather.maxTemp}° / {weather.minTemp}°
                    </ThemedText>
                  </View>

                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>Precipitation</ThemedText>
                    <ThemedText style={styles.detailValue}>{weather.precipitation}%</ThemedText>
                  </View>

                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>Wind Speed</ThemedText>
                    <ThemedText style={styles.detailValue}>{weather.windSpeed} mph</ThemedText>
                  </View>

                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>Lunar Phase</ThemedText>
                    <View style={styles.lunarPhaseValue}>
                      {(() => {
                        const lunarPhase = getLunarPhase();
                        const LunarIcon = lunarIllustrations[lunarPhase.illustrationKey];
                        return (
                          <>
                            <LunarIcon size={24} color={illustrationColor} />
                            <ThemedText style={styles.detailValue}>{lunarPhase.name}</ThemedText>
                          </>
                        );
                      })()}
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Hourly Forecast */}
            {weather.hourly && weather.hourly.length > 0 && (
              <Card style={styles.card} elevation={2}>
                <Card.Content style={styles.cardContent}>
                  <ThemedText style={styles.hourlyTitle}>Hourly Forecast</ThemedText>
                  <Divider style={styles.divider} />

                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
                    <View style={styles.hourlyContainer}>
                      {weather.hourly.map((hour, index) => {
                        const hourTime = new Date(hour.time);
                        const displayTime = hourTime.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          hour12: true
                        });
                        const WeatherIcon = getWeatherIllustration(hour.weatherCode);

                        return (
                          <View key={index} style={styles.hourlyItem}>
                            <ThemedText style={styles.hourlyTime}>{displayTime}</ThemedText>
                            <View style={styles.hourlyIconContainer}>
                              <WeatherIcon size={32} color={illustrationColor} />
                            </View>
                            <ThemedText style={styles.hourlyTemp}>{hour.temperature}°</ThemedText>
                            <ThemedText style={styles.hourlyPrecip}>{hour.precipitation}%</ThemedText>
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                </Card.Content>
              </Card>
            )}

            {/* Outfit Recommendations */}
            <Card style={styles.card} elevation={2}>
              <Card.Content style={styles.cardContent}>
                <ThemedText style={styles.recommendationTitle}>What to Wear</ThemedText>
                <Divider style={styles.divider} />

                <View style={styles.recommendationContainer}>
                  {(() => {
                    const detailedRec = getDetailedOutfitRecommendation(weather);

                    return (
                      <>
                        {detailedRec.note && (
                          <View style={styles.noteContainer}>
                            <ThemedText style={styles.noteText}>{detailedRec.note}</ThemedText>
                          </View>
                        )}

                        <View style={styles.categoryContainer}>
                          <View style={styles.categoryItem}>
                            <ThemedText style={styles.categoryLabel}>Layers</ThemedText>
                            <ThemedText style={styles.categoryText}>{detailedRec.layers}</ThemedText>
                          </View>

                          <View style={styles.categoryItem}>
                            <ThemedText style={styles.categoryLabel}>Top</ThemedText>
                            <ThemedText style={styles.categoryText}>{detailedRec.top}</ThemedText>
                          </View>

                          <View style={styles.categoryItem}>
                            <ThemedText style={styles.categoryLabel}>Bottom</ThemedText>
                            <ThemedText style={styles.categoryText}>{detailedRec.bottom}</ThemedText>
                          </View>

                          <View style={styles.categoryItem}>
                            <ThemedText style={styles.categoryLabel}>Shoes</ThemedText>
                            <ThemedText style={styles.categoryText}>{detailedRec.shoes}</ThemedText>
                          </View>

                          {detailedRec.accessories && (
                            <View style={styles.categoryItem}>
                              <ThemedText style={styles.categoryLabel}>Accessories</ThemedText>
                              <ThemedText style={styles.categoryText}>{detailedRec.accessories}</ThemedText>
                            </View>
                          )}
                        </View>
                      </>
                    );
                  })()}
                </View>
              </Card.Content>
            </Card>
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 20,
  },
  header: {
    marginBottom: 40,
    paddingTop: 16,
  },
  title: {
    ...Typography.title,
    fontSize: 36,
    fontWeight: '200',
    letterSpacing: 1,
    marginBottom: 12,
  },
  subtitle: {
    ...Typography.subtitle,
    fontSize: 12,
    fontWeight: '300',
    letterSpacing: 2,
    opacity: 0.6,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    ...Typography.body,
    marginTop: 16,
    opacity: 0.5,
  },
  card: {
    marginBottom: 20,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cardContent: {
    padding: 28,
  },
  location: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1.5,
    opacity: 0.5,
    marginBottom: 20,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: Colors.light.border,
    height: 0.5,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  tempTextContainer: {
    alignItems: 'flex-start',
    gap: 2,
  },
  temperature: {
    fontSize: 48,
    fontWeight: '200',
    lineHeight: 52,
    letterSpacing: -1,
  },
  description: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '300',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  detailsContainer: {
    gap: 18,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    ...Typography.label,
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.6,
  },
  detailValue: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '400',
  },
  lunarPhaseValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  errorText: {
    ...Typography.body,
    textAlign: 'center',
    opacity: 0.6,
  },
  recommendationTitle: {
    ...Typography.heading,
    fontSize: 22,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  recommendationContainer: {
    gap: 24,
  },
  noteContainer: {
    backgroundColor: Colors.light.tint + '15', // champagne gold with transparency
    padding: 16,
    borderRadius: 2,
    marginBottom: 12,
    borderLeftWidth: 2,
    borderLeftColor: Colors.light.tint,
  },
  noteText: {
    ...Typography.label,
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  recommendationText: {
    ...Typography.body,
    fontSize: 22,
    lineHeight: 34,
    fontWeight: '300',
    letterSpacing: 0.3,
    fontFamily: Fonts.serif,
  },
  hourlyTitle: {
    ...Typography.heading,
    fontSize: 22,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  hourlyScroll: {
    marginHorizontal: -12,
  },
  hourlyContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 12,
  },
  hourlyItem: {
    alignItems: 'center',
    gap: 8,
    minWidth: 60,
  },
  hourlyTime: {
    ...Typography.caption,
    fontSize: 11,
    opacity: 0.6,
    letterSpacing: 0.3,
  },
  hourlyIconContainer: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourlyTemp: {
    ...Typography.body,
    fontSize: 18,
    fontWeight: '400',
  },
  hourlyPrecip: {
    ...Typography.caption,
    fontSize: 11,
    opacity: 0.6,
    color: Colors.light.tint,
  },
  categoryContainer: {
    gap: 20,
  },
  categoryItem: {
    gap: 6,
  },
  categoryLabel: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1.5,
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  categoryText: {
    ...Typography.body,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '300',
    letterSpacing: 0.3,
  },
});
