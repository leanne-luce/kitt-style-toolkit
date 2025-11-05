import { Image } from 'expo-image';
import { StyleSheet, Pressable, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Typography } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.surface, dark: Colors.dark.surface }}
      headerImage={
        <View style={styles.headerImageContainer}>
          <Image
            source={require('@/assets/images/style-tool-kit.jpg')}
            style={styles.reactLogo}
            contentFit="cover"
          />
          <View style={styles.headerOverlay} />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Kitted AI</ThemedText>
      </ThemedView>
      <ThemedText style={styles.tagline}>Your style toolkit.</ThemedText>

      <View style={styles.cardsContainer}>
        <Pressable onPress={() => router.push('/style-horoscope')}>
          <Card style={styles.card} elevation={0}>
            <Card.Content style={styles.cardContent}>
              <ThemedText style={styles.cardTitle}>Style Horoscope</ThemedText>
              <ThemedText style={styles.cardSubtitle}>Daily inspiration</ThemedText>
            </Card.Content>
          </Card>
        </Pressable>

        <Pressable onPress={() => router.push('/outfit-weather-report')}>
          <Card style={styles.card} elevation={0}>
            <Card.Content style={styles.cardContent}>
              <ThemedText style={styles.cardTitle}>Outfit Weather Report</ThemedText>
              <ThemedText style={styles.cardSubtitle}>Plan your look</ThemedText>
            </Card.Content>
          </Card>
        </Pressable>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  titleContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    ...Typography.title,
    fontSize: 42,
    fontWeight: '200',
    letterSpacing: 2,
  },
  tagline: {
    ...Typography.subtitle,
    fontSize: 13,
    letterSpacing: 2,
    opacity: 0.6,
    marginBottom: 32,
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
