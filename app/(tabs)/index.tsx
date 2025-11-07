import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Typography } from '@/constants/theme';
import { illustrations, IllustrationType } from '@/components/illustrations/fashion-illustrations';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useAuth } from '@/contexts/auth-context';
import { getUserProfile, upsertUserProfile } from '@/utils/profile-storage';
import { getZodiacSign, getZodiacInfo, ZodiacSign } from '@/utils/zodiac';
import { getDailyZodiacPrompt } from '@/utils/daily-zodiac-prompt';

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

  const loadHoroscope = async () => {
    setLoading(true);
    try {
      // Get current date
      const today = new Date();
      const weekday = today.toLocaleDateString('en-US', { weekday: 'short' });
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

        {/* Style Horoscope Content */}
        {hasBirthDate && zodiacSign && (
          <View style={styles.horoscopeSection}>
            <View style={styles.horoscopeHeader}>
              <ThemedText style={styles.horoscopeGreeting}>
                Hey {zodiacSign.charAt(0).toUpperCase() + zodiacSign.slice(1)}, it's {dateString}
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
    marginBottom: 48,
  },
  logo: {
    width: 100,
    height: 50,
  },
  tagline: {
    ...Typography.subtitle,
    fontSize: 13,
    letterSpacing: 2,
    opacity: 0.6,
    textAlign: 'right',
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
    marginBottom: 48,
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
  },
  prompt: {
    ...Typography.body,
    fontSize: 17,
    lineHeight: 28,
    fontWeight: '300',
    letterSpacing: 0.3,
    marginBottom: 16,
  },
  zodiacNoteText: {
    ...Typography.body,
    fontSize: 13,
    fontWeight: '300',
    fontStyle: 'italic',
    opacity: 0.6,
  },
  horoscopeTitle: {
    ...Typography.body,
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 16,
    letterSpacing: 0.5,
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
});
