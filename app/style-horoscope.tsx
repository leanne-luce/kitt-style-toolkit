import { StyleSheet, ScrollView, View, Alert, ActivityIndicator } from 'react-native';
import { Card, Divider, TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { illustrations, IllustrationType } from '@/components/illustrations/fashion-illustrations';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors, Typography } from '@/constants/theme';
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

export default function StyleHoroscopeScreen() {
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
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      setDateString(today.toLocaleDateString('en-US', options));

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
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.tint} />
          <ThemedText style={styles.loadingText}>Loading your cosmic style guidance...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  // Show birth date input if user doesn't have one
  if (!hasBirthDate && user) {
    return (
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>Style Horoscope</ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Cosmic fashion guidance tailored to your zodiac
            </ThemedText>
          </ThemedView>

          <Card style={styles.promptCard} elevation={2}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.illustrationContainer}>
                <IllustrationComponent size={120} color={illustrationColor} />
              </View>

              <ThemedText style={styles.noBirthDateTitle}>
                Unlock Your Personalized Style Horoscope
              </ThemedText>

              <ThemedText style={styles.noBirthDateText}>
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
            </Card.Content>
          </Card>
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Style Horoscope</ThemedText>
          {zodiacSign && (
            <ThemedText type="subtitle" style={styles.subtitle}>
              {getZodiacInfo(zodiacSign).symbol} {zodiacSign.toUpperCase()} {getZodiacInfo(zodiacSign).symbol}
            </ThemedText>
          )}
        </ThemedView>

        <Card style={styles.promptCard} elevation={2}>
          <Card.Content style={styles.cardContent}>
            <ThemedText style={styles.date}>{dateString}</ThemedText>
            <Divider style={styles.divider} />

            {/* Illustration */}
            <View style={styles.illustrationContainer}>
              <IllustrationComponent size={180} color={illustrationColor} />
            </View>

            <ThemedText style={styles.prompt}>{prompt}</ThemedText>

            {zodiacNote && (
              <View style={styles.zodiacNoteContainer}>
                <ThemedText style={styles.zodiacNoteText}>{zodiacNote}</ThemedText>
              </View>
            )}
          </Card.Content>
        </Card>

        <ThemedText style={styles.footer}>
          Your daily cosmic style guidance refreshes every 24 hours
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    opacity: 0.6,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 20,
  },
  header: {
    marginBottom: 40,
    paddingTop: 16,
    alignItems: 'center',
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
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 2,
    opacity: 0.6,
    textTransform: 'uppercase',
  },
  promptCard: {
    marginBottom: 32,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cardContent: {
    padding: 32,
  },
  date: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1.5,
    opacity: 0.5,
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    marginBottom: 32,
    backgroundColor: Colors.light.border,
    height: 0.5,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  prompt: {
    ...Typography.body,
    fontSize: 17,
    lineHeight: 28,
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  zodiacNoteContainer: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 0.5,
    borderTopColor: Colors.light.border,
    alignItems: 'center',
  },
  zodiacNoteText: {
    ...Typography.body,
    fontSize: 13,
    fontWeight: '300',
    fontStyle: 'italic',
    opacity: 0.6,
    textAlign: 'center',
  },
  footer: {
    ...Typography.caption,
    textAlign: 'center',
    fontSize: 11,
    letterSpacing: 1.5,
    opacity: 0.4,
    marginTop: 8,
    marginBottom: 32,
  },
  noBirthDateTitle: {
    ...Typography.body,
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  noBirthDateText: {
    ...Typography.body,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '300',
    textAlign: 'center',
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
});
