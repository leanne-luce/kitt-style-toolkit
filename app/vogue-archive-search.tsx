import { useState } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, Alert } from 'react-native';
import { Card, Searchbar, Button } from 'react-native-paper';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Typography } from '@/constants/theme';

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

export default function VogueArchiveSearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      Alert.alert('Error', 'Please enter a search query');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          top_k: 10,
        }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResults(data.results);
    } catch (error: any) {
      console.error('Search error:', error);
      Alert.alert('Error', 'Failed to search. Make sure the API is deployed and running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Vogue Archive Search
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            Explore fashion history
          </ThemedText>
        </View>

        <Card style={styles.searchCard} elevation={2}>
          <Card.Content style={styles.cardContent}>
            <Searchbar
              placeholder="Search for fashion moments..."
              onChangeText={setQuery}
              value={query}
              onSubmitEditing={handleSearch}
              style={styles.searchBar}
              inputStyle={styles.searchInput}
            />
            <Button
              mode="contained"
              onPress={handleSearch}
              loading={loading}
              disabled={loading}
              style={styles.searchButton}
              buttonColor={Colors.light.tint}>
              Search
            </Button>

          </Card.Content>
        </Card>

        {loading && (
          <Card style={styles.card} elevation={2}>
            <Card.Content style={styles.cardContent}>
              <ActivityIndicator size="large" color={Colors.light.tint} />
              <ThemedText style={styles.loadingText}>Searching...</ThemedText>
            </Card.Content>
          </Card>
        )}

        {results.length > 0 && !loading && (
          <>
            <ThemedText style={styles.resultsTitle}>
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </ThemedText>
            {results.map((result) => (
              <Card key={result.id} style={styles.resultCard} elevation={2}>
                {result.metadata.image_url && (
                  <Image
                    source={{ uri: result.metadata.image_url }}
                    style={styles.resultImage}
                    contentFit="contain"
                    transition={200}
                  />
                )}
                <Card.Content style={styles.resultContent}>
                  <View style={styles.resultHeader}>
                    <ThemedText style={styles.resultDate}>
                      {result.metadata.season} {result.metadata.year} • {result.metadata.city}
                    </ThemedText>
                    <ThemedText style={styles.resultScore}>
                      {(result.score * 100).toFixed(0)}% match
                    </ThemedText>
                  </View>
                  {result.metadata.designer && (
                    <ThemedText style={styles.designerName}>
                      {result.metadata.designer}
                    </ThemedText>
                  )}
                  <ThemedText style={styles.resultDescription}>
                    {result.metadata.description}
                  </ThemedText>
                  {result.metadata.category && (
                    <ThemedText style={styles.resultMeta}>
                      {result.metadata.category}
                    </ThemedText>
                  )}
                  {result.metadata.section && (
                    <ThemedText style={styles.resultMeta}>
                      {result.metadata.section}
                    </ThemedText>
                  )}
                </Card.Content>
              </Card>
            ))}
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
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
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
  searchCard: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 24,
  },
  card: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 16,
  },
  cardContent: {
    padding: 24,
  },
  searchBar: {
    marginBottom: 12,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  searchInput: {
    ...Typography.body,
    fontSize: 14,
  },
  searchButton: {
    marginBottom: 16,
  },
  setupNote: {
    backgroundColor: Colors.light.tint + '15',
    padding: 16,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: Colors.light.tint,
  },
  setupText: {
    ...Typography.caption,
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.8,
  },
  loadingText: {
    ...Typography.body,
    textAlign: 'center',
    marginTop: 16,
    opacity: 0.6,
  },
  resultsTitle: {
    ...Typography.heading,
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 12,
    overflow: 'hidden',
  },
  resultImage: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.light.border,
  },
  resultContent: {
    padding: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultDate: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.5,
  },
  resultScore: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1,
    color: Colors.light.tint,
    fontWeight: '500',
  },
  resultDescription: {
    ...Typography.body,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '300',
    marginBottom: 12,
  },
  designerName: {
    ...Typography.heading,
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 4,
  },
  resultMeta: {
    ...Typography.caption,
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
});
