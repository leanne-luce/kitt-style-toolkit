import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { useState, useEffect } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getDailyPrompt, getTodayDateString } from '@/utils/daily-prompt';
import { illustrations, IllustrationType } from '@/components/illustrations/fashion-illustrations';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors, Typography } from '@/constants/theme';

export default function StyleHoroscopeScreen() {
  const [prompt, setPrompt] = useState('');
  const [illustration, setIllustration] = useState<IllustrationType>('sparkle');
  const [dateString, setDateString] = useState('');
  const [loading, setLoading] = useState(true);
  const illustrationColor = useThemeColor({}, 'text');

  useEffect(() => {
    const loadPrompt = async () => {
      try {
        const dailyPromptData = await getDailyPrompt();
        setPrompt(dailyPromptData.prompt);
        setIllustration(dailyPromptData.illustration);
        setDateString(getTodayDateString());
      } catch (error) {
        console.error('Error loading prompt:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrompt();
  }, []);

  // Get the illustration component
  const IllustrationComponent = illustrations[illustration];

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ThemedText>Loading...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Style Horoscope</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>Your daily style inspiration</ThemedText>
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
          </Card.Content>
        </Card>

        <ThemedText style={styles.footer}>
          Return tomorrow for new inspiration
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
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '300',
    fontStyle: 'italic',
    textAlign: 'center',
    letterSpacing: 0.3,
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
});
