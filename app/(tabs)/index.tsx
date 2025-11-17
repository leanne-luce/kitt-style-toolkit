import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View, ActivityIndicator, Alert, Dimensions, Animated } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { useState, useCallback, useEffect, useRef } from 'react';
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
import { getZodiacSign, ZodiacSign } from '@/utils/zodiac';
import { getDailyZodiacPrompt } from '@/utils/daily-zodiac-prompt';
import { getCurrentLocation, getCityFromCoords } from '@/services/location';
import { getWeather, WeatherData } from '@/services/weather';
import { getOutfitRecommendation } from '@/utils/outfit-recommendations';
import { getWeatherIllustration } from '@/components/illustrations/weather-illustrations';
import { saveCurrentWeather, saveCurrentOutfit, saveCurrentHoroscope, getCurrentWeather, getCurrentOutfit } from '@/utils/weather-storage';
import { getLunarPhase } from '@/utils/lunar-phase';
import { lunarIllustrations } from '@/components/illustrations/lunar-illustrations';
import { getViewedItems, markItemAsViewed } from '@/utils/viewed-items-storage';
import { getDailyColorPalette, formatColorPaletteForSearch } from '@/utils/daily-color-palette';
import { createEnhancedSearchQuery } from '@/utils/extract-garments';
import { calculateCombinedScore } from '@/utils/season-relevance';
import { getDailyIllustration } from '@/utils/daily-illustration';

const API_URL = 'https://vogue-archive-api.onrender.com';

interface SearchResult {
  id: string;
  score: number;
  combinedScore?: number;
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [outfitRecommendation, setOutfitRecommendation] = useState<string>('');
  const [genderPreference, setGenderPreference] = useState<'womens' | 'mens' | 'both'>('both');
  const illustrationColor = useThemeColor({}, 'text');

  // Animation values for horoscope illustration
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const lastBounceTime = useRef(0);

  // Scroll position management
  const scrollViewRef = useRef<ScrollView>(null);
  const savedScrollPosition = useRef(0);

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

  // Navigate to detail page
  const handleItemPress = async (item: SearchResult) => {
    // Mark item as viewed (only if user is logged in)
    if (user) {
      await markItemAsViewed(user.id, item.id);
    }

    router.push({
      pathname: '/vogue-item-detail',
      params: {
        id: item.id,
        score: item.score.toString(),
        description: item.metadata.description,
        designer: item.metadata.designer,
        season: item.metadata.season,
        year: item.metadata.year.toString(),
        category: item.metadata.category,
        city: item.metadata.city,
        section: item.metadata.section,
        image_url: item.metadata.image_url,
        aesthetic_score: item.metadata.aesthetic_score.toString(),
      },
    });
  };

  // Handle scroll to bottom - trigger bounce animation and save position
  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    // Save scroll position
    savedScrollPosition.current = contentOffset.y;

    const paddingToBottom = 20; // Trigger when within 20 pixels of bottom
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

    if (isCloseToBottom && hasBirthDate && zodiacSign) {
      // Debounce: only trigger if 1.5 seconds have passed since last bounce
      const now = Date.now();
      if (now - lastBounceTime.current > 1500) {
        lastBounceTime.current = now;

        // Trigger bounce animation
        Animated.sequence([
          Animated.spring(bounceAnim, {
            toValue: 1.2,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.spring(bounceAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  };

  // Load horoscope when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadHoroscope();
    }, [user])
  );

  // Restore scroll position when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Small delay to ensure content is rendered before scrolling
      const timer = setTimeout(() => {
        if (scrollViewRef.current && savedScrollPosition.current > 0) {
          scrollViewRef.current.scrollTo({
            y: savedScrollPosition.current,
            animated: false,
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }, [])
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

  // Start illustration animation
  useEffect(() => {
    // Pulse animation (scale between 1 and 1.05)
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    // Rotation animation (rotate between -3 and 3 degrees)
    const rotateAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();
    rotateAnimation.start();

    return () => {
      pulseAnimation.stop();
      rotateAnimation.stop();
    };
  }, []);

  const loadHoroscope = async () => {
    setLoading(true);
    try {
      // Get current date
      const today = new Date();
      const weekday = today.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
      const month = today.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
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
      setIllustration(getDailyIllustration());

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
        // Profile doesn't exist - navigate to profile page to complete setup
        Alert.alert(
          'Complete Your Profile',
          'Please complete your profile to save your birth date and get your personalized horoscope.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => setIsSaving(false),
            },
            {
              text: 'Complete Profile',
              onPress: () => {
                setIsSaving(false);
                // Navigate to profile page (YOU tab) with birthday
                router.push({
                  pathname: '/(tabs)/explore',
                  params: { birthDate: birthDate },
                });
              },
            },
          ]
        );
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

      // Try to load from cache first
      const cachedWeather = await getCurrentWeather();
      const cachedOutfit = await getCurrentOutfit();

      if (cachedWeather && cachedOutfit) {
        // Use cached data
        setWeather(cachedWeather);
        setOutfitRecommendation(cachedOutfit);
        setWeatherLoading(false);

        // Get daily color palette
        const colorPalette = getDailyColorPalette();
        const colorString = formatColorPaletteForSearch(colorPalette);

        // Create enhanced search query with garments and colors
        const enhancedQuery = createEnhancedSearchQuery(cachedOutfit, colorString);

        // Perform search with enhanced query
        await performSearch(enhancedQuery);
        return;
      }

      // Get user location
      const coords = await getCurrentLocation();

      if (!coords) {
        setWeatherError('Location permission denied. Please enable location services to see weather.');
        setWeatherLoading(false);
        return;
      }

      // Get city name and weather in parallel (include hourly data)
      const [cityName, weatherData] = await Promise.all([
        getCityFromCoords(coords.latitude, coords.longitude),
        getWeather(coords.latitude, coords.longitude, true),
      ]);

      setLocation(cityName);
      setWeather(weatherData);

      // Generate outfit recommendation
      const recommendation = getOutfitRecommendation(weatherData);

      // Save outfit recommendation to state for consistent display
      setOutfitRecommendation(recommendation.outfit);

      // Get daily color palette
      const colorPalette = getDailyColorPalette();
      const colorString = formatColorPaletteForSearch(colorPalette);

      // Create enhanced search query with garments and colors
      const enhancedQuery = createEnhancedSearchQuery(recommendation.outfit, colorString);
      console.log('Enhanced search query:', enhancedQuery);
      console.log('Daily color palette:', colorString);

      // Save weather and outfit to storage for Vogue Archive to use
      await saveCurrentWeather(weatherData);
      await saveCurrentOutfit(recommendation.outfit);

      // Perform search with enhanced query
      await performSearch(enhancedQuery);
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
    // Save the original search query to display to user
    setSearchQuery(searchQuery.trim());

    try {
      // Get list of already-viewed items to filter out (only if user is logged in)
      const viewedItemIds = user ? await getViewedItems(user.id) : [];

      // Append gender preference to query behind the scenes
      let enhancedQuery = searchQuery.trim();
      if (genderPreference === 'womens') {
        enhancedQuery += ' womenswear';
      } else if (genderPreference === 'mens') {
        enhancedQuery += ' menswear';
      }

      // Request more results to account for filtering
      const requestCount = 20; // Request 20, filter, then take top 6

      const response = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: enhancedQuery,
          top_k: requestCount,
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

      // Filter out already-viewed items
      const unseenResults = uniqueResults.filter((result: SearchResult) =>
        !viewedItemIds.includes(result.id)
      );

      // Re-rank results using season relevance and recency
      const rerankedResults = unseenResults.map((result: SearchResult) => {
        const combinedScore = calculateCombinedScore(
          result.score,
          result.metadata.season,
          searchQuery
        );
        return {
          ...result,
          combinedScore,
        };
      }).sort((a, b) => b.combinedScore - a.combinedScore);

      console.log('Top 3 reranked results:', rerankedResults.slice(0, 3).map(r => ({
        season: r.metadata.season,
        year: r.metadata.year,
        originalScore: r.score,
        combinedScore: r.combinedScore,
      })));

      // Take top 6 re-ranked results
      const finalResults = rerankedResults.slice(0, 6);

      setSearchResults(finalResults);
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
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.brandContainer}>
          <Image
            source={require('@/assets/images/kitt-logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <ThemedText style={styles.tagline}>
            {location ? `${dateString}, ${location.toUpperCase()}` : dateString}
          </ThemedText>
        </View>

        {/* Temperature Row */}
        {weather && !weatherLoading && (
          <View style={styles.topRow}>
            {/* Weather Illustration and Temperature */}
            <View style={styles.weatherTempRow}>
              {(() => {
                const WeatherIcon = getWeatherIllustration(weather.weatherCode);
                return <WeatherIcon size={70} color={illustrationColor} />;
              })()}
              <View style={styles.tempTextContainer}>
                <ThemedText style={styles.temperature}>{weather.temperature}°F</ThemedText>
                <ThemedText style={styles.description}>{weather.description}</ThemedText>
              </View>
            </View>
          </View>
        )}

        {/* Hourly Forecast */}
        {weather && !weatherLoading && weather.hourly && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hourlyContainer}
          >
            {weather.hourly.map((hour, index) => {
              const time = new Date(hour.time);
              const now = new Date();

              // First hour is "Now" since we start from most recently passed hour
              const isNow = index === 0;

              const hourStr = isNow
                ? 'Now'
                : time.getHours() === 0
                  ? '12 AM'
                  : time.getHours() < 12
                    ? `${time.getHours()} AM`
                    : time.getHours() === 12
                      ? '12 PM'
                      : `${time.getHours() - 12} PM`;

              const HourWeatherIcon = getWeatherIllustration(hour.weatherCode);

              return (
                <View key={index} style={styles.hourlyItem}>
                  <ThemedText style={[styles.hourlyTime, isNow && styles.hourlyTimeNow]}>
                    {hourStr}
                  </ThemedText>
                  <HourWeatherIcon size={32} color={illustrationColor} />
                  <ThemedText style={styles.hourlyTemp}>{hour.temperature}°</ThemedText>
                  <ThemedText style={styles.hourlyPrecip}>
                    {hour.precipitation > 0 ? `${hour.precipitation}%` : '—'}
                  </ThemedText>
                </View>
              );
            })}
          </ScrollView>
        )}

        {/* Style Horoscope Content */}
        {hasBirthDate && zodiacSign && (
          <View style={styles.horoscopeSection}>
            <ThemedText style={styles.horoscopeTitle}>
              {zodiacSign.charAt(0).toUpperCase() + zodiacSign.slice(1)}, your cosmic style guidance
            </ThemedText>

            <ThemedText style={styles.prompt}>{prompt}</ThemedText>

            {/* Outfit Recommendation */}
            {weather && !weatherLoading && outfitRecommendation && (
              <View style={styles.outfitSection}>
                <ThemedText style={styles.forThisWeatherLabel}>FOR THIS WEATHER</ThemedText>
                <ThemedText style={styles.outfitText}>
                  {outfitRecommendation}
                </ThemedText>
              </View>
            )}
          </View>
        )}

        {/* Divider between sections */}
        <View style={styles.sectionDivider}>
          <View style={styles.dividerLine} />
        </View>

        {/* Weather Details Section */}
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

                <View style={styles.detailRow}>
                  <ThemedText style={styles.detailLabel}>Lunar Phase</ThemedText>
                  <View style={styles.lunarPhaseValue}>
                    {(() => {
                      const lunarPhase = getLunarPhase();
                      const LunarIcon = lunarIllustrations[lunarPhase.illustrationKey];
                      return (
                        <>
                          <LunarIcon size={32} color={illustrationColor} />
                          <ThemedText style={styles.detailValue}>{lunarPhase.name}</ThemedText>
                        </>
                      );
                    })()}
                  </View>
                </View>
              </View>

              {/* Weather Notes */}
              {(() => {
                const recommendation = getOutfitRecommendation(weather);
                return recommendation.note ? (
                  <View style={styles.weatherNoteContainer}>
                    <ThemedText style={styles.weatherNoteText}>{recommendation.note}</ThemedText>
                  </View>
                ) : null;
              })()}

              {/* View More Link */}
              <Pressable
                onPress={() => router.push('/outfit-weather-report')}
                style={styles.viewMoreLink}
              >
                <ThemedText style={styles.viewMoreText}>View More</ThemedText>
              </Pressable>
            </View>
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
              <ThemedText style={styles.vogueSectionTitle}>From the Vogue Archive</ThemedText>
              {searchQuery && (
                <ThemedText style={styles.searchQueryText}>"{searchQuery}"</ThemedText>
              )}

              {searchLoading ? (
                <View style={styles.searchLoadingContainer}>
                  <ActivityIndicator size="small" color={Colors.light.tint} />
                </View>
              ) : (
                <>
                  <View style={styles.mosaicContainer}>
                    {searchResults.slice(0, 6).map((result) => (
                      <Pressable
                        key={result.id}
                        style={styles.mosaicItem}
                        onPress={() => handleItemPress(result)}>
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
                  <Pressable onPress={() => router.push('/vogue-archive-search')}>
                    <ThemedText style={styles.viewMoreLink}>View More</ThemedText>
                  </Pressable>
                </>
              )}
            </View>
          </>
        )}

        {/* Horoscope Illustration at Bottom */}
        {hasBirthDate && zodiacSign && (
          <View style={styles.bottomIllustrationContainer}>
            <Animated.View
              style={{
                transform: [
                  {
                    scale: Animated.multiply(pulseAnim, bounceAnim),
                  },
                  {
                    rotate: rotateAnim.interpolate({
                      inputRange: [-1, 1],
                      outputRange: ['-3deg', '3deg'],
                    }),
                  },
                ],
              }}>
              <IllustrationComponent size={140} color={illustrationColor} />
            </Animated.View>
            <ThemedText style={styles.bottomMessage}>
              Check back tomorrow for more style inspiration
            </ThemedText>
          </View>
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
    fontSize: 11,
    letterSpacing: 2,
    opacity: 0.5,
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
    paddingVertical: 16,
    gap: 16,
  },
  weatherTempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tempTextContainer: {
    alignItems: 'flex-start',
    gap: 2,
    flex: 1,
  },
  hourlyContainer: {
    paddingHorizontal: 24,
    gap: 20,
    marginBottom: 32,
  },
  hourlyItem: {
    alignItems: 'center',
    gap: 8,
    minWidth: 60,
  },
  hourlyTime: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 0.5,
    opacity: 0.6,
  },
  hourlyTimeNow: {
    opacity: 1,
    fontWeight: '600',
    color: Colors.light.tint,
  },
  hourlyTemp: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '500',
  },
  hourlyPrecip: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.light.tint,
    opacity: 0.7,
    minHeight: 14, // Ensure consistent spacing even with "—"
  },
  horoscopeSection: {
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
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '300',
    letterSpacing: 0.2,
    marginBottom: 24,
    fontFamily: Fonts.serif,
  },
  zodiacNoteText: {
    ...Typography.body,
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'italic',
    opacity: 0.5,
    lineHeight: 20,
  },
  outfitSection: {
    marginTop: 16,
  },
  forThisWeatherLabel: {
    ...Typography.subtitle,
    fontSize: 10,
    letterSpacing: 2.5,
    opacity: 0.4,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  outfitText: {
    ...Typography.body,
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '300',
    letterSpacing: 0.2,
    fontFamily: Fonts.serif,
  },
  horoscopeTitle: {
    ...Typography.subtitle,
    fontSize: 11,
    letterSpacing: 2.5,
    opacity: 0.5,
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
    gap: 12,
    marginTop: 16,
  },
  card: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 2,
  },
  cardContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  cardTitle: {
    ...Typography.heading,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  cardSubtitle: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.5,
  },
  sectionDivider: {
    paddingTop: 32,
    paddingBottom: 0,
    marginBottom: 24,
    marginHorizontal: -24,
  },
  dividerLine: {
    height: 1,
    backgroundColor: Colors.light.border,
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
    marginBottom: 24,
  },
  weatherLocation: {
    ...Typography.subtitle,
    fontSize: 11,
    letterSpacing: 2.5,
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  weatherViewMore: {
    ...Typography.body,
    fontSize: 12,
    color: Colors.light.tint,
    letterSpacing: 0.5,
  },
  tempRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
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
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '200',
    letterSpacing: -0.5,
    fontFamily: Fonts.serif,
  },
  description: {
    ...Typography.body,
    fontSize: 13,
    fontWeight: '300',
    letterSpacing: 0.5,
    opacity: 0.6,
  },
  weatherCard: {
    marginBottom: 0,
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
    paddingVertical: 4,
  },
  detailLabel: {
    ...Typography.label,
    fontSize: 13,
    fontWeight: '300',
    opacity: 0.5,
    letterSpacing: 0.5,
  },
  detailValue: {
    ...Typography.body,
    fontSize: 15,
    fontWeight: '300',
  },
  lunarPhaseValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weatherNoteContainer: {
    backgroundColor: Colors.light.surface,
    padding: 16,
    borderRadius: 2,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  weatherNoteText: {
    ...Typography.label,
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  viewMoreLink: {
    marginTop: 20,
    alignItems: 'flex-end',
    paddingVertical: 12,
  },
  viewMoreText: {
    ...Typography.label,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.light.tint,
  },
  outfitRecommendations: {
    marginBottom: 0,
  },
  noteContainer: {
    backgroundColor: Colors.light.surface,
    padding: 20,
    borderRadius: 2,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  noteText: {
    ...Typography.label,
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  recommendationText: {
    ...Typography.body,
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '300',
    letterSpacing: 0.2,
    fontFamily: Fonts.serif,
  },
  bottomIllustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  bottomMessage: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 0.5,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 24,
  },
  vogueSection: {
    marginBottom: 32,
  },
  vogueSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  vogueSectionTitle: {
    ...Typography.subtitle,
    fontSize: 11,
    letterSpacing: 2.5,
    opacity: 0.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  searchQueryText: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '300',
    opacity: 0.7,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  viewAllText: {
    ...Typography.body,
    fontSize: 12,
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
    gap: 8,
  },
  mosaicItem: {
    width: COLUMN_WIDTH,
    aspectRatio: 0.75,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  mosaicImage: {
    width: '100%',
    height: '100%',
  },
  viewMoreLink: {
    ...Typography.body,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 20,
    opacity: 0.7,
    color: Colors.light.tint,
  },
});
