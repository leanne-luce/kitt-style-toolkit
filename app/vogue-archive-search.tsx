import { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, Alert, Pressable, Modal, Dimensions, PanResponder } from 'react-native';
import { Card, Searchbar, Button, IconButton } from 'react-native-paper';
import { Image } from 'expo-image';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { getUserProfile } from '@/utils/profile-storage';
import { getCurrentWeather } from '@/utils/weather-storage';
import { getWeatherBasedFashionQuery, getWeatherFashionDescription } from '@/utils/weather-to-fashion-query';

const API_URL = 'https://vogue-archive-api.onrender.com';
const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48 - 12) / 2; // padding and gap

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
  const { user } = useAuth();
  const params = useLocalSearchParams();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [genderPreference, setGenderPreference] = useState<'womens' | 'mens' | 'both'>('both');
  const [hasAutoSearched, setHasAutoSearched] = useState(false);
  const [weatherDescription, setWeatherDescription] = useState<string>('');
  const [similarItems, setSimilarItems] = useState<SearchResult[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);

  // Search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a search query');
      return;
    }

    setLoading(true);
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
          top_k: 10,
          gender_preference: genderPreference,
        }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();

      // Deduplicate results by ID (in case backend returns duplicates)
      const uniqueResults = data.results.filter((result: SearchResult, index: number, self: SearchResult[]) =>
        index === self.findIndex((r) => r.id === result.id)
      );

      setResults(uniqueResults);
    } catch (error: any) {
      console.error('Search error:', error);
      Alert.alert('Error', 'Failed to search. Make sure the API is deployed and running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    performSearch(query);
  };

  const fetchSimilarItems = async (item: SearchResult) => {
    setLoadingSimilar(true);
    try {
      // Build a garment-focused query using category and designer
      // This focuses on the actual garments rather than photographic style
      let garmentQuery = `${item.metadata.category} ${item.metadata.designer}`;

      // Append gender preference to query behind the scenes
      if (genderPreference === 'womens') {
        garmentQuery += ' womenswear';
      } else if (genderPreference === 'mens') {
        garmentQuery += ' menswear';
      }

      // Use the garment-focused query to find similar items
      const response = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: garmentQuery,
          top_k: 4, // Get 4 (including the current item, we'll filter it out)
          gender_preference: genderPreference,
        }),
      });

      if (!response.ok) {
        throw new Error('Similar items search failed');
      }

      const data = await response.json();
      // Filter out the current item and take only 3
      const similar = data.results.filter((r: SearchResult) => r.id !== item.id).slice(0, 3);
      setSimilarItems(similar);
    } catch (error: any) {
      console.error('Similar items error:', error);
      setSimilarItems([]);
    } finally {
      setLoadingSimilar(false);
    }
  };

  const handleItemPress = (item: SearchResult, index?: number) => {
    setSelectedItem(item);
    setModalVisible(true);
    setSimilarItems([]); // Reset similar items
    fetchSimilarItems(item);

    // Set the current index if provided (from results grid)
    if (index !== undefined) {
      setCurrentResultIndex(index);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSimilarItems([]);
  };

  const handleNextResult = () => {
    if (currentResultIndex < results.length - 1) {
      const nextIndex = currentResultIndex + 1;
      const nextItem = results[nextIndex];
      setCurrentResultIndex(nextIndex);
      setSelectedItem(nextItem);
      setSimilarItems([]);
      fetchSimilarItems(nextItem);
    }
  };

  // Pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only activate if it's a clear horizontal swipe
        // Must have significant horizontal movement AND be more horizontal than vertical
        const isHorizontal = Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        const hasSignificantMovement = Math.abs(gestureState.dx) > 15;
        return isHorizontal && hasSignificantMovement;
      },
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (_, gestureState) => {
        const SWIPE_THRESHOLD = 75;
        const SWIPE_VELOCITY_THRESHOLD = 0.4;

        // Swipe right (positive dx) - close modal
        if (gestureState.dx > SWIPE_THRESHOLD || gestureState.vx > SWIPE_VELOCITY_THRESHOLD) {
          handleCloseModal();
        }
        // Swipe left (negative dx) - advance to next result
        else if (gestureState.dx < -SWIPE_THRESHOLD || gestureState.vx < -SWIPE_VELOCITY_THRESHOLD) {
          handleNextResult();
        }
      },
    })
  ).current;

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

  // Auto-load weather-based query when screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadWeatherQuery = async () => {
        // Skip if there's a URL parameter or already auto-searched
        if (params.q || hasAutoSearched) return;

        const weather = await getCurrentWeather();
        if (weather) {
          const fashionQuery = getWeatherBasedFashionQuery(weather);
          const description = getWeatherFashionDescription(weather);

          setQuery(fashionQuery);
          setWeatherDescription(description);
          setHasAutoSearched(true);

          // Perform search after gender preference is loaded
          setTimeout(() => {
            performSearch(fashionQuery);
          }, 500);
        }
      };

      loadWeatherQuery();
    }, [params.q, hasAutoSearched, genderPreference])
  );

  // Auto-search if query parameter is provided
  useEffect(() => {
    if (params.q && typeof params.q === 'string' && !hasAutoSearched) {
      setQuery(params.q);
      setHasAutoSearched(true);
      // Perform search after a short delay to ensure gender preference is loaded
      setTimeout(() => {
        performSearch(params.q as string);
      }, 500);
    }
  }, [params.q, genderPreference, hasAutoSearched]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Vogue Archive Search
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            {weatherDescription ? `Today's inspiration: ${weatherDescription}` : 'Explore fashion history'}
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
            <View style={styles.mosaicContainer}>
              {results.map((result, index) => (
                <Pressable
                  key={result.id}
                  style={styles.mosaicItem}
                  onPress={() => handleItemPress(result, index)}>
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
          </>
        )}
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={handleCloseModal}>
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <IconButton
              icon="close"
              size={24}
              onPress={handleCloseModal}
              iconColor={Colors.light.text}
            />
          </View>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {selectedItem?.metadata.image_url && (
              <View {...panResponder.panHandlers}>
                <Image
                  source={{ uri: selectedItem.metadata.image_url }}
                  style={styles.modalImage}
                  contentFit="contain"
                  transition={200}
                />
              </View>
            )}
            {selectedItem && (
              <View style={styles.modalDetails}>
                <View style={styles.modalMetaRow}>
                  <ThemedText style={styles.modalSeason}>
                    {selectedItem.metadata.season} {selectedItem.metadata.year}
                  </ThemedText>
                  <ThemedText style={styles.modalCity}>
                    {selectedItem.metadata.city}
                  </ThemedText>
                </View>
                {selectedItem.metadata.designer && (
                  <ThemedText style={styles.modalDesigner}>
                    {selectedItem.metadata.designer}
                  </ThemedText>
                )}
                <ThemedText style={styles.modalDescription}>
                  {selectedItem.metadata.description}
                </ThemedText>
                {selectedItem.metadata.category && (
                  <ThemedText style={styles.modalCategory}>
                    {selectedItem.metadata.category}
                  </ThemedText>
                )}
                {selectedItem.metadata.section && (
                  <ThemedText style={styles.modalSection}>
                    {selectedItem.metadata.section}
                  </ThemedText>
                )}
                <ThemedText style={styles.modalScore}>
                  {(selectedItem.score * 100).toFixed(0)}% match
                </ThemedText>

                {/* Similar Looks Section */}
                <View style={styles.similarSection}>
                  <ThemedText style={styles.similarTitle}>Similar Looks</ThemedText>
                  {loadingSimilar ? (
                    <ActivityIndicator size="small" color={Colors.light.tint} style={styles.similarLoader} />
                  ) : (
                    <View style={styles.similarGrid}>
                      {similarItems.map((similar) => (
                        <Pressable
                          key={similar.id}
                          style={styles.similarItem}
                          onPress={() => handleItemPress(similar)}>
                          <Image
                            source={{ uri: similar.metadata.image_url }}
                            style={styles.similarImage}
                            contentFit="cover"
                            transition={200}
                          />
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            )}
          </ScrollView>
        </ThemedView>
      </Modal>
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
  // Mosaic Layout
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
  // Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    paddingTop: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.light.background,
  },
  modalContent: {
    paddingBottom: 40,
  },
  modalImage: {
    width: width,
    height: width * 1.33,
    backgroundColor: Colors.light.border,
  },
  modalDetails: {
    padding: 24,
  },
  modalMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalSeason: {
    ...Typography.caption,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  modalCity: {
    ...Typography.caption,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  modalDesigner: {
    ...Typography.heading,
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  modalDescription: {
    ...Typography.body,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '300',
    marginBottom: 16,
  },
  modalCategory: {
    ...Typography.caption,
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 8,
  },
  modalSection: {
    ...Typography.caption,
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 8,
  },
  modalScore: {
    ...Typography.caption,
    fontSize: 13,
    color: Colors.light.tint,
    fontWeight: '500',
    marginTop: 16,
  },
  // Similar Looks
  similarSection: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  similarTitle: {
    ...Typography.heading,
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  similarLoader: {
    marginVertical: 20,
  },
  similarGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  similarItem: {
    flex: 1,
    aspectRatio: 0.75,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: Colors.light.border,
  },
  similarImage: {
    width: '100%',
    height: '100%',
  },
  // Deprecated styles (keeping for reference)
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
