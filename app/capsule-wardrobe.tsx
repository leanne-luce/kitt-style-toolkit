import {
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  Alert,
  Modal,
} from 'react-native';
import { Card, Divider, Button, SegmentedButtons } from 'react-native-paper';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ItemSlot } from '@/components/item-slot';
import { OutfitCard } from '@/components/outfit-card';
import { Colors, Typography } from '@/constants/theme';
import { WardrobeItem, ItemCategory, Capsule, Outfit } from '@/types/capsule';
import { generateOutfits, validateWardrobe, getOutfitStats } from '@/utils/outfit-generator';
import { saveCapsule, getAllCapsules } from '@/utils/capsule-storage';

type ViewMode = 'builder' | 'outfits' | 'library';
type OutfitFilter = 'all' | 'dress' | 'standard';

// Sample wardrobe items for demonstration
const sampleItems: WardrobeItem[] = [
  {
    id: 'sample_1',
    imageUri: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400',
    category: ItemCategory.TOP,
    name: 'White Blouse',
  },
  {
    id: 'sample_2',
    imageUri: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
    category: ItemCategory.TOP,
    name: 'Black T-Shirt',
  },
  {
    id: 'sample_3',
    imageUri: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
    category: ItemCategory.TOP,
    name: 'Striped Top',
  },
  {
    id: 'sample_4',
    imageUri: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400',
    category: ItemCategory.BOTTOM,
    name: 'Black Trousers',
  },
  {
    id: 'sample_5',
    imageUri: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    category: ItemCategory.BOTTOM,
    name: 'Denim Jeans',
  },
  {
    id: 'sample_6',
    imageUri: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400',
    category: ItemCategory.DRESS,
    name: 'Black Dress',
  },
  {
    id: 'sample_7',
    imageUri: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    category: ItemCategory.DRESS,
    name: 'Midi Dress',
  },
  {
    id: 'sample_8',
    imageUri: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
    category: ItemCategory.OUTERWEAR,
    name: 'Blazer',
  },
  {
    id: 'sample_9',
    imageUri: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
    category: ItemCategory.SHOES,
    name: 'White Sneakers',
  },
  {
    id: 'sample_10',
    imageUri: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400',
    category: ItemCategory.ACCESSORY,
    name: 'Leather Bag',
  },
];

export default function CapsuleWardrobeScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('builder');
  const [items, setItems] = useState<WardrobeItem[]>(sampleItems);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [outfitFilter, setOutfitFilter] = useState<OutfitFilter>('all');
  const [savedCapsules, setSavedCapsules] = useState<Capsule[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  useEffect(() => {
    loadSavedCapsules();
  }, []);

  const loadSavedCapsules = async () => {
    const capsules = await getAllCapsules();
    setSavedCapsules(capsules);
  };

  const handleAddItem = (slotIndex: number) => {
    setSelectedSlot(slotIndex);
    setShowCategoryModal(true);
  };

  const handleSelectCategory = async (category: ItemCategory) => {
    setShowCategoryModal(false);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0] && selectedSlot !== null) {
      const newItem: WardrobeItem = {
        id: `item_${Date.now()}`,
        imageUri: result.assets[0].uri,
        category,
      };

      const newItems = [...items];
      newItems[selectedSlot] = newItem;
      setItems(newItems);
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
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
                          onToggleFavorite={() => {}}
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
});
