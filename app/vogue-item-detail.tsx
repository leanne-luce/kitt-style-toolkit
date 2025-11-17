import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Typography } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function VogueItemDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Parse the item data from params
  const item = {
    id: params.id as string,
    score: parseFloat(params.score as string),
    metadata: {
      description: params.description as string,
      designer: params.designer as string,
      season: params.season as string,
      year: parseInt(params.year as string),
      category: params.category as string,
      city: params.city as string,
      section: params.section as string,
      image_url: params.image_url as string,
      aesthetic_score: parseFloat(params.aesthetic_score as string),
    },
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {item.metadata.image_url && (
          <Image
            source={{ uri: item.metadata.image_url }}
            style={styles.image}
            contentFit="contain"
            transition={200}
          />
        )}
        <View style={styles.details}>
          <View style={styles.metaRow}>
            <ThemedText style={styles.season}>
              {item.metadata.season} {item.metadata.year}
            </ThemedText>
            <ThemedText style={styles.city}>
              {item.metadata.city}
            </ThemedText>
          </View>
          {item.metadata.designer && (
            <ThemedText style={styles.designer}>
              {item.metadata.designer}
            </ThemedText>
          )}
          <ThemedText style={styles.description}>
            {item.metadata.description}
          </ThemedText>
          {item.metadata.category && (
            <ThemedText style={styles.category}>
              {item.metadata.category}
            </ThemedText>
          )}
          {item.metadata.section && (
            <ThemedText style={styles.section}>
              {item.metadata.section}
            </ThemedText>
          )}
          <ThemedText style={styles.score}>
            {(item.score * 100).toFixed(0)}% match
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  image: {
    width: width,
    height: width * 1.33,
    backgroundColor: Colors.light.border,
  },
  details: {
    padding: 24,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  season: {
    ...Typography.caption,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  city: {
    ...Typography.caption,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  designer: {
    ...Typography.heading,
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  description: {
    ...Typography.body,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '300',
    marginBottom: 16,
  },
  category: {
    ...Typography.caption,
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 8,
  },
  section: {
    ...Typography.caption,
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 8,
  },
  score: {
    ...Typography.caption,
    fontSize: 13,
    color: Colors.light.tint,
    fontWeight: '500',
    marginTop: 16,
  },
});
