import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/style-tool-kit.jpg')}
          style={styles.reactLogo}
          contentFit="cover"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Kitted AI</ThemedText>
        <ThemedText type="subtitle">Your style toolkit.</ThemedText>
      </ThemedView>
      <Card style={styles.card}>
        <Card.Content>
          <ThemedText type="subtitle">Style Horoscope</ThemedText>
        </Card.Content>
      </Card>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  card: {
    marginTop: 16,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
