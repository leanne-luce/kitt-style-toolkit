import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Card, Divider, SegmentedButtons } from 'react-native-paper';

import { ItemSlot } from '@/components/item-slot';
import { OutfitCard } from '@/components/outfit-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { Capsule, ItemCategory, Outfit, WardrobeItem } from '@/types/capsule';
import { getAllCapsules, saveCapsule } from '@/utils/capsule-storage';
import { generateOutfits, getOutfitStats, validateWardrobe } from '@/utils/outfit-generator';
import {
  deleteWardrobeItem,
  loadUserWardrobeItems,
  saveWardrobeItem
} from '@/utils/wardrobe-db';

type ViewMode = 'builder' | 'outfits' | 'library';
type OutfitFilter = 'all' | 'dress' | 'standard';

// Sample wardrobe items for demonstration
const sampleItems: WardrobeItem[] = [
  {
    id: 'sample_1',
    imageUri: require('@/assets/images/lululemon-henley.png'),
    category: ItemCategory.TOP,
    name: 'Green Henley',
  },
  {
    id: 'sample_2',
    imageUri: require('@/assets/images/jcrew-sweater.avif'),
    category: ItemCategory.OUTERWEAR,
    name: 'Wool Cardigan',
  },
  {
    id: 'sample_3',
    imageUri: require('@/assets/images/jcrew-green-turtleneck.avif'),
    category: ItemCategory.TOP,
    name: 'Green Turtleneck',
  },
  {
    id: 'sample_4',
    imageUri: require('@/assets/images/jcrew-black-trouser.avif'),
    category: ItemCategory.BOTTOM,
    name: 'Black Trousers',
  },
  {
    id: 'sample_5',
    imageUri: require('@/assets/images/jcrew-jeans.avif'),
    category: ItemCategory.BOTTOM,
    name: 'Denim Jeans',
  },
  {
    id: 'sample_6',
    imageUri: require('@/assets/images/jcrew-black-dress.avif'),
    category: ItemCategory.DRESS,
    name: 'Black Dress',
  },
  {
    id: 'sample_7',
    imageUri: require('@/assets/images/jcrew-stripe-turtleneck.avif'),
    category: ItemCategory.DRESS,
    name: 'Striped Dress',
  },
  {
    id: 'sample_8',
    imageUri: require('@/assets/images/jcrew-black-cardigan.avif'),
    category: ItemCategory.OUTERWEAR,
    name: 'Black Cardigan',
  },
  {
    id: 'sample_9',
    imageUri: require('@/assets/images/salomon-sneaks.avif'),
    category: ItemCategory.SHOES,
    name: 'White Sneakers',
  },
  {
    id: 'sample_10',
    imageUri: require('@/assets/images/lululemon-baseballcap.png'),
    category: ItemCategory.ACCESSORY,
    name: 'Baseball Cap',
  },
];

export default function CapsuleWardrobeScreen() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('builder');
  const [items, setItems] = useState<WardrobeItem[]>(sampleItems);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [outfitFilter, setOutfitFilter] = useState<OutfitFilter>('all');
  const [savedCapsules, setSavedCapsules] = useState<Capsule[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showOutfitModal, setShowOutfitModal] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load wardrobe items when user logs in or component mounts
  useEffect(() => {
    loadSavedCapsules();
    if (user) {
      loadUserWardrobe();
    }
  }, [user]);

  const loadSavedCapsules = async () => {
    const capsules = await getAllCapsules();
    setSavedCapsules(capsules);
  };

  const loadUserWardrobe = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const userItems = await loadUserWardrobeItems();
      if (userItems.length > 0) {
        setItems(userItems);
      }
    } catch (error: any) {
      console.error('Error loading wardrobe:', error);
      Alert.alert('Error', 'Failed to load your wardrobe. Using sample items.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = (slotIndex: number) => {
    setSelectedSlot(slotIndex);
    setShowCategoryModal(true);
  };

  const handleSelectCategory = async (category: ItemCategory) => {
    console.log('handleSelectCategory called with:', category);
    setShowCategoryModal(false);

    // Request permission to access media library
    console.log('Requesting media library permissions...');
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Permission status:', status);

    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please allow access to your photo library to add wardrobe items.',
        [{ text: 'OK' }]
      );
      return;
    }

    console.log('Launching image picker...');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    console.log('Image picker result:', result);

    if (!result.canceled && result.assets[0] && selectedSlot !== null) {
      const localUri = result.assets[0].uri;

      // If user is authenticated, save to Supabase
      if (user) {
        try {
          setIsSaving(true);

          const savedItem = await saveWardrobeItem(
            {
              category,
              name: `${category.charAt(0).toUpperCase() + category.slice(1)} Item`,
            },
            localUri,
            selectedSlot
          );

          const newItems = [...items];
          newItems[selectedSlot] = savedItem;
          setItems(newItems);

          Alert.alert('Success', 'Item saved to your wardrobe!');
        } catch (error: any) {
          console.error('Error saving item:', error);
          console.error('Error details:', JSON.stringify(error, null, 2));
          Alert.alert(
            'Error',
            `Failed to save item: ${error.message || 'Unknown error'}\n\nCheck console for details.`
          );
        } finally {
          setIsSaving(false);
        }
      } else {
        // For non-authenticated users, just store locally
        const newItem: WardrobeItem = {
          id: `item_${Date.now()}`,
          imageUri: localUri,
          category,
        };

        const newItems = [...items];
        newItems[selectedSlot] = newItem;
        setItems(newItems);
      }
    }
  };

  const handleRemoveItem = async (index: number) => {
    const item = items[index];

    // If user is authenticated and item has an ID, delete from Supabase
    if (user && item?.id && !item.id.startsWith('sample_')) {
      try {
        setIsSaving(true);
        await deleteWardrobeItem(item.id);

        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);

        Alert.alert('Success', 'Item removed from your wardrobe');
      } catch (error: any) {
        console.error('Error deleting item:', error);
        Alert.alert('Error', 'Failed to remove item. Please try again.');
      } finally {
        setIsSaving(false);
      }
    } else {
      // For non-authenticated users or sample items, just remove locally
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };

  const handleGenerateOutfits = () => {
    const validation = validateWardrobe(items);
    if (!validation.isValid) {
      Alert.alert('Cannot Generate Outfits', validation.message || 'Invalid wardrobe');
      return;
    }

    const generated = generateOutfits(items);
    setOutfits(generated);
    setViewMode('outfits');
  };

  const handleToggleFavorite = async (outfitId: string) => {
    // Update the outfit's favorite status in state
    const updatedOutfits = outfits.map((outfit) =>
      outfit.id === outfitId ? { ...outfit, isFavorite: !outfit.isFavorite } : outfit
    );
    setOutfits(updatedOutfits);

    // Get the updated list of favorite outfits
    const favoriteOutfits = updatedOutfits.filter((o) => o.isFavorite);

    // Save to storage (create or update a capsule with current favorites)
    const capsuleToSave: Capsule = {
      id: `capsule_current`, // Use a consistent ID to update the same capsule
      name: `My Favorites`,
      createdDate: Date.now(),
      items,
      favoriteOutfits: favoriteOutfits.map((o) => ({
        outfitId: o.id,
        itemIds: o.items.map((item) => item.id),
      })),
    };

    await saveCapsule(capsuleToSave);
    await loadSavedCapsules();
  };

  const handleOpenOutfit = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setShowOutfitModal(true);
  };

  const handleCloseOutfitModal = () => {
    setShowOutfitModal(false);
    setSelectedOutfit(null);
  };

  const filteredOutfits = outfits.filter((outfit) => {
    if (outfitFilter === 'all') return true;
    if (outfitFilter === 'dress') return outfit.isDressOutfit;
    if (outfitFilter === 'standard') return !outfit.isDressOutfit;
    return true;
  });

  const stats = getOutfitStats(outfits);

  // Calculate total saved outfits count
  const savedOutfitsCount = savedCapsules.reduce(
    (total, capsule) => total + capsule.favoriteOutfits.length,
    0
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Capsule Wardrobe
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            Your outfit generator
          </ThemedText>
        </ThemedView>

        {/* View Mode Selector */}
        <SegmentedButtons
          value={viewMode}
          onValueChange={(value) => setViewMode(value as ViewMode)}
          buttons={[
            { value: 'builder', label: 'Builder' },
            {
              value: 'outfits',
              label: `Outfits${outfits.length > 0 ? ` (${outfits.length})` : ''}`,
            },
            {
              value: 'library',
              label: `Saved${savedOutfitsCount > 0 ? ` (${savedOutfitsCount})` : ''}`,
            },
          ]}
          style={styles.segmentedButtons}
        />

        {/* Builder View */}
        {viewMode === 'builder' && (
          <>
            {items.length === 10 ? (
              <Button
                mode="contained"
                onPress={handleGenerateOutfits}
                style={styles.generateButtonTop}
                buttonColor={Colors.light.tint}>
                Generate Outfits
              </Button>
            ) : (
              items.length > 0 && (
                <ThemedText style={styles.hintTop}>
                  Add {10 - items.length} more item{10 - items.length === 1 ? '' : 's'} to
                  generate outfits
                </ThemedText>
              )
            )}

            <Card style={styles.card} elevation={2}>
              <Card.Content style={styles.cardContent}>
                <ThemedText style={styles.sectionTitle}>
                  Your Wardrobe ({items.length}/10)
                </ThemedText>
                <Divider style={styles.divider} />

                <View style={styles.itemGrid}>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <View key={index} style={styles.gridItem}>
                      <ItemSlot
                        item={items[index]}
                        slotNumber={index + 1}
                        onPress={() => handleAddItem(index)}
                        onRemove={items[index] ? () => handleRemoveItem(index) : undefined}
                      />
                    </View>
                  ))}
                </View>
              </Card.Content>
            </Card>
          </>
        )}

        {/* Outfits View */}
        {viewMode === 'outfits' && (
          <>
            {outfits.length > 0 ? (
              <>
                <Card style={styles.statsCard} elevation={1}>
                  <Card.Content style={styles.statsContent}>
                    <View style={styles.statItem}>
                      <ThemedText style={styles.statNumber}>{stats.total}</ThemedText>
                      <ThemedText style={styles.statLabel}>Total</ThemedText>
                    </View>
                    <View style={styles.statItem}>
                      <ThemedText style={styles.statNumber}>{stats.dressOutfits}</ThemedText>
                      <ThemedText style={styles.statLabel}>Dress</ThemedText>
                    </View>
                    <View style={styles.statItem}>
                      <ThemedText style={styles.statNumber}>{stats.standardOutfits}</ThemedText>
                      <ThemedText style={styles.statLabel}>Standard</ThemedText>
                    </View>
                  </Card.Content>
                </Card>

                <SegmentedButtons
                  value={outfitFilter}
                  onValueChange={(value) => setOutfitFilter(value as OutfitFilter)}
                  buttons={[
                    { value: 'all', label: 'All' },
                    { value: 'dress', label: 'Dress' },
                    { value: 'standard', label: 'Standard' },
                  ]}
                  style={styles.filterButtons}
                />

                <View style={styles.outfitGrid}>
                  {filteredOutfits.map((outfit) => (
                    <View key={outfit.id} style={styles.outfitGridItem}>
                      <OutfitCard
                        outfit={outfit}
                        onToggleFavorite={() => handleToggleFavorite(outfit.id)}
                        onPress={() => handleOpenOutfit(outfit)}
                      />
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <Card style={styles.card} elevation={2}>
                <Card.Content style={styles.cardContent}>
                  <ThemedText style={styles.emptyText}>
                    Generate outfits from the Builder tab
                  </ThemedText>
                </Card.Content>
              </Card>
            )}
          </>
        )}

        {/* Library View */}
        {viewMode === 'library' && (
          <>
            {(() => {
              // Flatten all saved outfits from all capsules
              const savedOutfits: Array<Outfit & { capsuleName: string; savedDate: number }> = [];

              savedCapsules.forEach((capsule) => {
                capsule.favoriteOutfits.forEach((favOutfit) => {
                  const outfitItems = capsule.items.filter((item) =>
                    favOutfit.itemIds.includes(item.id)
                  );

                  if (outfitItems.length > 0) {
                    savedOutfits.push({
                      id: favOutfit.outfitId,
                      items: outfitItems,
                      isDressOutfit: outfitItems.some((item) => item.category === ItemCategory.DRESS),
                      isFavorite: true,
                      capsuleName: capsule.name,
                      savedDate: capsule.createdDate,
                    });
                  }
                });
              });

              const handleUnsaveOutfit = async (outfitId: string) => {
                // Find the capsule that contains this outfit
                const capsule = savedCapsules.find((c) =>
                  c.favoriteOutfits.some((f) => f.outfitId === outfitId)
                );

                if (!capsule) return;

                // Remove the outfit from the capsule's favorites
                const updatedFavorites = capsule.favoriteOutfits.filter(
                  (f) => f.outfitId !== outfitId
                );

                // Update the capsule
                const updatedCapsule: Capsule = {
                  ...capsule,
                  favoriteOutfits: updatedFavorites,
                };

                // Save the updated capsule
                await saveCapsule(updatedCapsule);
                await loadSavedCapsules();

                // If this outfit is in the current outfits list, update it
                if (outfits.some((o) => o.id === outfitId)) {
                  setOutfits((prev) =>
                    prev.map((outfit) =>
                      outfit.id === outfitId ? { ...outfit, isFavorite: false } : outfit
                    )
                  );
                }
              };

              return savedOutfits.length > 0 ? (
                <>
                  <ThemedText style={styles.libraryCount}>
                    {savedOutfits.length} saved outfit{savedOutfits.length === 1 ? '' : 's'}
                  </ThemedText>

                  <View style={styles.outfitGrid}>
                    {savedOutfits.map((outfit) => (
                      <View key={outfit.id} style={styles.outfitGridItem}>
                        <OutfitCard
                          outfit={outfit}
                          onToggleFavorite={() => handleUnsaveOutfit(outfit.id)}
                          onPress={() => handleOpenOutfit(outfit)}
                        />
                      </View>
                    ))}
                  </View>
                </>
              ) : (
                <Card style={styles.card} elevation={2}>
                  <Card.Content style={styles.cardContent}>
                    <ThemedText style={styles.emptyText}>
                      No saved outfits yet. Heart your favorites and save them!
                    </ThemedText>
                  </Card.Content>
                </Card>
              );
            })()}
          </>
        )}
      </ScrollView>

      {/* Outfit Detail Modal */}
      <Modal visible={showOutfitModal} transparent animationType="fade">
        <View style={styles.outfitModalOverlay}>
          <Pressable style={styles.outfitModalBackdrop} onPress={handleCloseOutfitModal} />
          <View style={styles.outfitModalContent}>
            {selectedOutfit && (
              <>
                <View style={styles.outfitModalHeader}>
                  <ThemedText style={styles.outfitModalTitle}>
                    {selectedOutfit.isDressOutfit ? 'Dress Outfit' : 'Outfit'}
                  </ThemedText>
                  <Pressable onPress={handleCloseOutfitModal} hitSlop={8}>
                    <MaterialCommunityIcons name="close" size={28} color={Colors.light.icon} />
                  </Pressable>
                </View>

                <ScrollView style={styles.outfitModalScroll} showsVerticalScrollIndicator={false}>
                  <View style={styles.outfitItemsGrid}>
                    {selectedOutfit.items.map((item) => (
                      <View key={item.id} style={styles.outfitModalItem}>
                        <Image
                          source={typeof item.imageUri === 'string' ? { uri: item.imageUri } : item.imageUri}
                          style={styles.outfitModalImage}
                          contentFit="cover"
                        />
                        <View style={styles.outfitModalItemInfo}>
                          <View style={styles.outfitModalCategoryBadge}>
                            <ThemedText style={styles.outfitModalCategoryText}>
                              {item.category.toUpperCase()}
                            </ThemedText>
                          </View>
                          {item.name && (
                            <ThemedText style={styles.outfitModalItemName}>{item.name}</ThemedText>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Category Selection Modal */}
      <Modal visible={showCategoryModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Select Category</ThemedText>
            <Divider style={styles.divider} />

            {Object.values(ItemCategory).map((category) => (
              <Pressable
                key={category}
                style={styles.categoryOption}
                onPress={() => handleSelectCategory(category)}>
                <ThemedText style={styles.categoryLabel}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </ThemedText>
              </Pressable>
            ))}

            <Button mode="outlined" onPress={() => setShowCategoryModal(false)} style={styles.cancelButton}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>

      {/* Loading Overlay */}
      {(isLoading || isSaving) && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color={Colors.light.tint} />
            <ThemedText style={styles.loadingText}>
              {isLoading ? 'Loading wardrobe...' : 'Saving...'}
            </ThemedText>
          </View>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  segmentedButtons: {
    marginBottom: 24,
  },
  card: {
    marginBottom: 20,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cardContent: {
    padding: 28,
  },
  sectionTitle: {
    ...Typography.heading,
    fontSize: 22,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  divider: {
    marginBottom: 24,
    backgroundColor: Colors.light.border,
    height: 0.5,
  },
  itemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  gridItem: {
    width: '47%',
  },
  generateButton: {
    marginTop: 8,
  },
  generateButtonTop: {
    marginBottom: 20,
  },
  hint: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 16,
  },
  hintTop: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.5,
    textAlign: 'center',
    marginBottom: 20,
  },
  statsCard: {
    marginBottom: 20,
    backgroundColor: Colors.light.tint + '10',
    borderWidth: 1,
    borderColor: Colors.light.tint + '30',
    overflow: 'hidden',
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    paddingHorizontal: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '200',
    color: Colors.light.tint,
    marginBottom: 2,
  },
  statLabel: {
    ...Typography.caption,
    fontSize: 8,
    letterSpacing: 0.5,
    opacity: 0.6,
    textAlign: 'center',
  },
  filterButtons: {
    marginBottom: 20,
  },
  outfitGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  outfitGridItem: {
    width: '47%',
  },
  emptyText: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    opacity: 0.6,
    paddingVertical: 20,
  },
  libraryGrid: {
    gap: 12,
  },
  libraryCount: {
    ...Typography.caption,
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.5,
    textAlign: 'center',
    marginBottom: 20,
  },
  capsuleCard: {
    marginBottom: 12,
  },
  capsuleName: {
    ...Typography.heading,
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  capsuleInfo: {
    ...Typography.caption,
    fontSize: 10,
    letterSpacing: 0.5,
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.light.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    ...Typography.heading,
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  categoryOption: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  categoryLabel: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '300',
  },
  cancelButton: {
    marginTop: 16,
  },
  outfitModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outfitModalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  outfitModalContent: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: Colors.light.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  outfitModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  outfitModalTitle: {
    ...Typography.heading,
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  outfitModalScroll: {
    maxHeight: 500,
  },
  outfitItemsGrid: {
    padding: 20,
    gap: 16,
  },
  outfitModalItem: {
    marginBottom: 16,
  },
  outfitModalImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  outfitModalItemInfo: {
    marginTop: 12,
  },
  outfitModalCategoryBadge: {
    backgroundColor: Colors.light.tint + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  outfitModalCategoryText: {
    ...Typography.caption,
    fontSize: 10,
    letterSpacing: 1.5,
    color: Colors.light.tint,
    fontWeight: '500',
  },
  outfitModalItemName: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '300',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loadingContent: {
    backgroundColor: Colors.light.surface,
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: '300',
    color: Colors.light.text,
  },
});
