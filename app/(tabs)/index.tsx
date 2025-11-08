import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Card, TextInput, Button, Divider } from 'react-native-paper';
import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48 - 12) / 2; // padding and gap

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Typography, Fonts } from '@/constants/theme';
import { illustrations, IllustrationType } from '@/components/illustrations/fashion-illustrations';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useAuth } from '@/contexts/auth-context';
import { getUserProfile, upsertUserProfile } from '@/utils/profile-storage';
import { getZodiacSign, getZodiacInfo, ZodiacSign } from '@/utils/zodiac';
import { getDailyZodiacPrompt } from '@/utils/daily-zodiac-prompt';
import { getCurrentLocation, getCityFromCoords } from '@/services/location';
import { getWeather, WeatherData } from '@/services/weather';
import { getOutfitRecommendation } from '@/utils/outfit-recommendations';
import { getWeatherIllustration } from '@/components/illustrations/weather-illustrations';
import { saveCurrentWeather, saveCurrentOutfit, saveCurrentHoroscope } from '@/utils/weather-storage';

const API_URL = 'https://vogue-archive-api.onrender.com';

interface SearchResult {
  id: string;
  score: number;
  metadata: {
    description: string;
    designer: string;
    season: string;
    year: number;
    category: string;
    city: string;
    section: string;
    image_url: string;
    aesthetic_score: number;
  };
}

// Map zodiac signs to illustration types
const zodiacIllustrations: Record<ZodiacSign, IllustrationType> = {
  aries: 'sparkle',
  taurus: 'rings',
  gemini: 'patterns',
  cancer: 'dress',
  leo: 'sparkle',
  virgo: 'necklaces',
  libra: 'lipstick',
  scorpio: 'ghost',
  sagittarius: 'cowboy',
  capricorn: 'socks',
  aquarius: 'music',
  pisces: 'color',
};

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [zodiacNote, setZodiacNote] = useState('');
  const [illustration, setIllustration] = useState<IllustrationType>('sparkle');
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | null>(null);
  const [dateString, setDateString] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasBirthDate, setHasBirthDate] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>('');
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [genderPreference, setGenderPreference] = useState<'womens' | 'mens' | 'both'>('both');
  const illustrationColor = useThemeColor({}, 'text');

  // Format birth date with slashes as user types
  const handleBirthDateChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length >= 2) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned.length >= 4) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4, 8);
    }
    setBirthDate(formatted);
  };

  // Load horoscope when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadHoroscope();
    }, [user])
  );

  // Load weather on mount
  useEffect(() => {
    loadWeather();
  }, []);

  // Load user's gender preference
  useEffect(() => {
    const loadGenderPreference = async () => {
      if (user) {
        const profile = await getUserProfile(user.id);
        if (profile?.gender_preference) {
          setGenderPreference(profile.gender_preference);
        }
      }
    };
    loadGenderPreference();
  }, [user]);

  const loadHoroscope = async () => {
    setLoading(true);
    try {
      // Get current date
      const today = new Date();
      const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });
      const month = today.toLocaleDateString('en-US', { month: 'short' });
      const day = today.getDate();
      setDateString(`${weekday}, ${month} ${day}`);

      if (!user) {
        setPrompt('Sign in to get your personalized style horoscope based on your zodiac sign.');
        setHasBirthDate(false);
        setLoading(false);
        return;
      }

      // Load user profile to get birth date
      const profile = await getUserProfile(user.id);

      if (!profile?.birth_date) {
        setHasBirthDate(false);
        setLoading(false);
        return;
      }

      // User has birth date, get their zodiac sign
      const sign = getZodiacSign(profile.birth_date);

      if (!sign) {
        setPrompt('Unable to determine your zodiac sign. Please check your birth date in your profile.');
        setHasBirthDate(true);
        setLoading(false);
        return;
      }

      setZodiacSign(sign);
      setHasBirthDate(true);
      setIllustration(zodiacIllustrations[sign]);

      // Get daily zodiac prompt (fetches fresh or returns cached)
      const { prompt: stylePrompt, note } = await getDailyZodiacPrompt(sign);

      setPrompt(stylePrompt);
      setZodiacNote(note);

      // Save horoscope prompt to storage for Vogue Archive search
      await saveCurrentHoroscope(stylePrompt);
    } catch (error) {
      console.error('Error loading horoscope:', error);
      setPrompt('Unable to load your style horoscope. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBirthDate = async () => {
    if (!user) {
      Alert.alert('Error', 'Please sign in to save your birth date');
      return;
    }

    if (!birthDate || birthDate.length < 10) {
      Alert.alert('Error', 'Please enter a valid birth date (MM/DD/YYYY)');
      return;
    }

    setIsSaving(true);
    try {
      // Load existing profile data
      const profile = await getUserProfile(user.id);

      if (!profile) {
        Alert.alert('Error', 'Please complete your profile first');
        setIsSaving(false);
        return;
      }

      // Update profile with birth date
      await upsertUserProfile(
        user.id,
        profile.first_name,
        profile.last_name,
        profile.profile_image_url,
        profile.gender_preference,
        birthDate
      );

      // Reload horoscope with new birth date
      await loadHoroscope();

      Alert.alert('Success', 'Birth date saved! Your personalized horoscope is ready.');
    } catch (error) {
      console.error('Error saving birth date:', error);
      Alert.alert('Error', 'Failed to save birth date. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const loadWeather = async () => {
    try {
      setWeatherLoading(true);
      setWeatherError('');

      // Get user location
      const coords = await getCurrentLocation();

      if (!coords) {
        setWeatherError('Location permission denied. Please enable location services to see weather.');
        setWeatherLoading(false);
        return;
      }

      // Get city name and weather in parallel
      const [cityName, weatherData] = await Promise.all([
        getCityFromCoords(coords.latitude, coords.longitude),
        getWeather(coords.latitude, coords.longitude),
      ]);

      setLocation(cityName);
      setWeather(weatherData);

      // Generate outfit recommendation
      const recommendation = getOutfitRecommendation(weatherData);

      // Save weather and outfit to storage for Vogue Archive to use
      await saveCurrentWeather(weatherData);
      await saveCurrentOutfit(recommendation.outfit);

      // Perform search with outfit recommendation
      await performSearch(recommendation.outfit);
    } catch (err) {
      console.error('Error loading weather:', err);
      setWeatherError('Failed to load weather data. Please try again.');
    } finally {
      setWeatherLoading(false);
    }
  };

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    try {
      // Append gender preference to query behind the scenes
      let enhancedQuery = searchQuery.trim();
      if (genderPreference === 'womens') {
        enhancedQuery += ' womenswear';
      } else if (genderPreference === 'mens') {
        enhancedQuery += ' menswear';
      }

      const response = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: enhancedQuery,
          top_k: 6, // Get 6 results for the home page
          gender_preference: genderPreference,
        }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();

      // Deduplicate results by ID
      const uniqueResults = data.results.filter((result: SearchResult, index: number, self: SearchResult[]) =>
        index === self.findIndex((r) => r.id === result.id)
      );

      setSearchResults(uniqueResults);
    } catch (error: any) {
      console.error('Search error:', error);
      // Silently fail - search results are optional
    } finally {
      setSearchLoading(false);
    }
  };

  // Get the illustration component
  const IllustrationComponent = illustrations[illustration];

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.brandContainer}>
            <Image
              source={require('@/assets/images/kitt-logo.png')}
              style={styles.logo}
              contentFit="contain"
            />
            <ThemedText style={styles.tagline}>Style toolkit</ThemedText>
          </View>

          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.tint} />
            <ThemedText style={styles.loadingText}>Loading your cosmic style guidance...</ThemedText>
          </View>

          <View style={styles.cardsContainer}>
            <Pressable onPress={() => router.push('/outfit-weather-report')}>
              <Card style={styles.card} elevation={0}>
                <Card.Content style={styles.cardContent}>
                  <ThemedText style={styles.cardTitle}>Outfit Weather Report</ThemedText>
                  <ThemedText style={styles.cardSubtitle}>Plan your look</ThemedText>
                </Card.Content>
              </Card>
            </Pressable>

            <Pressable onPress={() => router.push('/vogue-archive-search')}>
              <Card style={styles.card} elevation={0}>
                <Card.Content style={styles.cardContent}>
                  <ThemedText style={styles.cardTitle}>Vogue Archive Search</ThemedText>
                  <ThemedText style={styles.cardSubtitle}>Explore fashion history</ThemedText>
                </Card.Content>
              </Card>
            </Pressable>
          </View>
        </ScrollView>
      </ThemedView>
    );
  }

  // Show birth date input if user doesn't have one
  if (!hasBirthDate && user) {
    return (
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.brandContainer}>
            <Image
              source={require('@/assets/images/kitt-logo.png')}
              style={styles.logo}
              contentFit="contain"
            />
            <ThemedText style={styles.tagline}>Style toolkit</ThemedText>
          </View>

          <View style={styles.horoscopeSection}>
            <View style={styles.illustrationContainer}>
              <IllustrationComponent size={120} color={illustrationColor} />
            </View>

            <ThemedText style={styles.horoscopeTitle}>
              Unlock Your Personalized Style Horoscope
            </ThemedText>

            <ThemedText style={styles.horoscopeSubtitle}>
              Enter your birth date to receive daily style inspiration based on your zodiac sign's unique energy and today's cosmic forecast.
            </ThemedText>

            <TextInput
              label="Birth Date (MM/DD/YYYY)"
              value={birthDate}
              onChangeText={handleBirthDateChange}
              mode="outlined"
              style={styles.input}
              outlineColor={Colors.light.border}
              activeOutlineColor={Colors.light.tint}
              placeholder="01/15/1990"
              keyboardType="numeric"
              maxLength={10}
            />

            <Button
              mode="contained"
              onPress={handleSaveBirthDate}
              loading={isSaving}
              disabled={isSaving || birthDate.length < 10}
              style={styles.saveButton}
              buttonColor={Colors.light.tint}
              textColor="#FFFFFF"
            >
              Save & Get My Horoscope
            </Button>
          </View>
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.brandContainer}>
          <Image
            source={require('@/assets/images/kitt-logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <ThemedText style={styles.tagline}>{dateString}</ThemedText>
        </View>

        {/* Style Horoscope Content */}
        {hasBirthDate && zodiacSign && (
          <View style={styles.horoscopeSection}>
            <View style={styles.horoscopeHeader}>
              <ThemedText style={styles.horoscopeTitle}>
                {zodiacSign.charAt(0).toUpperCase() + zodiacSign.slice(1)} cosmic style guidance
              </ThemedText>

              {/* Illustration */}
              <View style={styles.illustrationContainer}>
                <IllustrationComponent size={120} color={illustrationColor} />
              </View>
            </View>

            <ThemedText style={styles.prompt}>{prompt}</ThemedText>

            {zodiacNote && (
              <ThemedText style={styles.zodiacNoteText}>{zodiacNote}</ThemedText>
            )}
          </View>
        )}

        {/* Divider between sections */}
        <View style={styles.sectionDivider}>
          <View style={styles.dividerLine} />
        </View>

        {/* Weather Section */}
        <View style={styles.weatherSection}>
          {weatherLoading && (
            <View style={styles.weatherLoadingContainer}>
              <ActivityIndicator size="large" color={Colors.light.tint} />
              <ThemedText style={styles.loadingText}>Getting weather...</ThemedText>
            </View>
          )}

          {weatherError && !weatherLoading && (
            <ThemedText style={styles.errorText}>{weatherError}</ThemedText>
          )}

          {weather && !weatherLoading && (
            <>
              <View style={styles.weatherHeader}>
                <ThemedText style={styles.weatherLocation}>{location}</ThemedText>
                <Pressable onPress={() => router.push('/outfit-weather-report')}>
                  <ThemedText style={styles.weatherViewMore}>View More</ThemedText>
                </Pressable>
              </View>

              {/* Current Temperature and Weather Illustration */}
              <View style={styles.tempRow}>
                {/* Weather Illustration */}
                {(() => {
                  const WeatherIcon = getWeatherIllustration(weather.weatherCode);
                  return <WeatherIcon size={70} color={illustrationColor} />;
                })()}

                <View style={styles.tempTextContainer}>
                  <ThemedText style={styles.temperature}>{weather.temperature}°F</ThemedText>
                  <ThemedText style={styles.description}>{weather.description}</ThemedText>
                </View>
              </View>

              <View style={styles.weatherCard}>

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
                </View>
              </View>

              {/* Outfit Recommendations */}
              <View style={styles.outfitRecommendations}>
                {(() => {
                  const recommendation = getOutfitRecommendation(weather);
                  return (
                    <>
                      {recommendation.note && (
                        <View style={styles.noteContainer}>
                          <ThemedText style={styles.noteText}>{recommendation.note}</ThemedText>
                        </View>
                      )}

                      <ThemedText style={styles.recommendationText}>
                        {recommendation.outfit}
                      </ThemedText>
                    </>
                  );
                })()}
              </View>
            </>
          )}
        </View>

        {/* Vogue Archive Results */}
        {searchResults.length > 0 && !weatherLoading && (
          <>
            {/* Divider between sections */}
            <View style={styles.sectionDivider}>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.vogueSection}>
              <View style={styles.vogueSectionHeader}>
                <ThemedText style={styles.vogueSectionTitle}>From the Vogue Archive</ThemedText>
                <Pressable onPress={() => router.push('/vogue-archive-search')}>
                  <ThemedText style={styles.viewAllText}>View More</ThemedText>
                </Pressable>
              </View>

              {searchLoading ? (
                <View style={styles.searchLoadingContainer}>
                  <ActivityIndicator size="small" color={Colors.light.tint} />
                </View>
              ) : (
                <View style={styles.mosaicContainer}>
                  {searchResults.slice(0, 6).map((result) => (
                    <Pressable
                      key={result.id}
                      style={styles.mosaicItem}
                      onPress={() => router.push('/vogue-archive-search')}>
                      {result.metadata.image_url && (
                        <Image
                          source={{ uri: result.metadata.image_url }}
                          style={styles.mosaicImage}
                          contentFit="cover"
                          transition={200}
                        />
                      )}
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </>
        )}

        <View style={styles.cardsContainer}>
          <Pressable onPress={() => router.push('/outfit-weather-report')}>
            <Card style={styles.card} elevation={0}>
              <Card.Content style={styles.cardContent}>
                <ThemedText style={styles.cardTitle}>Outfit Weather Report</ThemedText>
                <ThemedText style={styles.cardSubtitle}>Plan your look</ThemedText>
              </Card.Content>
            </Card>
          </Pressable>

          <Pressable onPress={() => router.push('/vogue-archive-search')}>
            <Card style={styles.card} elevation={0}>
              <Card.Content style={styles.cardContent}>
                <ThemedText style={styles.cardTitle}>Vogue Archive Search</ThemedText>
                <ThemedText style={styles.cardSubtitle}>Explore fashion history</ThemedText>
              </Card.Content>
            </Card>
          </Pressable>

          <Pressable onPress={() => router.push('/illustration-preview')}>
            <Card style={styles.card} elevation={0}>
              <Card.Content style={styles.cardContent}>
                <ThemedText style={styles.cardTitle}>Illustration Preview</ThemedText>
                <ThemedText style={styles.cardSubtitle}>View all illustrations</ThemedText>
              </Card.Content>
            </Card>
          </Pressable>
        </View>
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
    paddingTop: 60,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  logo: {
    width: 100,
    height: 50,
    marginLeft: -24,
  },
  tagline: {
    ...Typography.subtitle,
    fontSize: 13,
    letterSpacing: 2,
    opacity: 0.6,
    textAlign: 'right',
  },
  inspirationModule: {
    backgroundColor: Colors.light.tint,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    marginTop: -16,
  },
  inspirationText: {
    ...Typography.body,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400',
    letterSpacing: 0.2,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: Fonts.serif,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginBottom: 32,
  },
  loadingText: {
    marginTop: 16,
    opacity: 0.6,
  },
  horoscopeSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  horoscopeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  horoscopeGreeting: {
    ...Typography.subtitle,
    fontSize: 13,
    letterSpacing: 2,
    opacity: 0.6,
    textTransform: 'uppercase',
    flex: 1,
    paddingRight: 16,
  },
  illustrationContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginRight: -8,
    marginTop: -8,
  },
  prompt: {
    ...Typography.body,
    fontSize: 22,
    lineHeight: 34,
    fontWeight: '300',
    letterSpacing: 0.3,
    marginBottom: 16,
    fontFamily: Fonts.serif,
  },
  zodiacNoteText: {
    ...Typography.body,
    fontSize: 13,
    fontWeight: '300',
    fontStyle: 'italic',
    opacity: 0.6,
  },
  horoscopeTitle: {
    ...Typography.subtitle,
    fontSize: 13,
    letterSpacing: 2,
    opacity: 0.6,
    textTransform: 'uppercase',
    flex: 1,
    paddingRight: 16,
  },
  horoscopeSubtitle: {
    ...Typography.body,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '300',
    opacity: 0.7,
    marginBottom: 32,
  },
  input: {
    marginBottom: 24,
    backgroundColor: Colors.light.surface,
  },
  saveButton: {
    paddingVertical: 6,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cardContent: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  cardTitle: {
    ...Typography.heading,
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardSubtitle: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1.5,
    opacity: 0.5,
  },
  sectionDivider: {
    paddingVertical: 24,
    marginBottom: 24,
    marginHorizontal: -24,
  },
  dividerLine: {
    height: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.light.border,
  },
  weatherSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    ...Typography.subtitle,
    fontSize: 13,
    letterSpacing: 2,
    opacity: 0.6,
    marginBottom: 24,
  },
  weatherLoadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  errorText: {
    ...Typography.body,
    textAlign: 'center',
    opacity: 0.6,
    paddingVertical: 40,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  weatherLocation: {
    ...Typography.subtitle,
    fontSize: 13,
    letterSpacing: 2,
    opacity: 0.6,
    marginBottom: 0,
  },
  weatherViewMore: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.light.tint,
    letterSpacing: 0.5,
  },
  tempRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
    gap: 8,
  },
  weatherIllustrationContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginRight: -8,
  },
  tempTextContainer: {
    alignItems: 'flex-start',
    gap: 2,
  },
  temperature: {
    ...Typography.body,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '300',
    letterSpacing: 0.3,
    fontFamily: Fonts.serif,
  },
  description: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '300',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  weatherCard: {
    marginBottom: 32,
    marginTop: 0,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    gap: 16,
    marginBottom: 24,
  },
  detailsContainer: {
    gap: 8,
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
  outfitRecommendations: {
    marginBottom: 24,
  },
  noteContainer: {
    backgroundColor: Colors.light.tint + '15',
    padding: 16,
    borderRadius: 2,
    marginBottom: 20,
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
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '300',
    letterSpacing: 0.3,
    fontFamily: Fonts.serif,
  },
  vogueSection: {
    marginBottom: 32,
  },
  vogueSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  vogueSectionTitle: {
    ...Typography.subtitle,
    fontSize: 13,
    letterSpacing: 2,
    opacity: 0.6,
  },
  viewAllText: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.light.tint,
    letterSpacing: 0.5,
  },
  searchLoadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  mosaicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  mosaicItem: {
    width: COLUMN_WIDTH,
    aspectRatio: 0.75,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: Colors.light.border,
  },
  mosaicImage: {
    width: '100%',
    height: '100%',
  },
});
