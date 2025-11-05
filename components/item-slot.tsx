import { View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WardrobeItem, ItemCategory } from '@/types/capsule';
import { ThemedText } from './themed-text';
import { Colors, Typography } from '@/constants/theme';

interface ItemSlotProps {
  item?: WardrobeItem;
  slotNumber: number;
  onPress: () => void;
  onRemove?: () => void;
}

const categoryLabels: Record<ItemCategory, string> = {
  [ItemCategory.TOP]: 'Top',
  [ItemCategory.BOTTOM]: 'Bottom',
  [ItemCategory.DRESS]: 'Dress',
  [ItemCategory.OUTERWEAR]: 'Outerwear',
  [ItemCategory.SHOES]: 'Shoes',
  [ItemCategory.ACCESSORY]: 'Accessory',
};

export function ItemSlot({ item, slotNumber, onPress, onRemove }: ItemSlotProps) {
  if (!item) {
    return (
      <Pressable style={styles.emptySlot} onPress={onPress}>
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={32}
          color={Colors.light.icon}
          style={styles.plusIcon}
        />
        <ThemedText style={styles.slotNumber}>Item {slotNumber}</ThemedText>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.filledSlot} onPress={onPress}>
      <Image source={{ uri: item.imageUri }} style={styles.image} contentFit="cover" />
      <View style={styles.overlay}>
        <View style={styles.categoryBadge}>
          <ThemedText style={styles.categoryText}>
            {categoryLabels[item.category]}
          </ThemedText>
        </View>
        {onRemove && (
          <Pressable
            style={styles.removeButton}
            onPress={(e) => {
              e.stopPropagation();
              onRemove();
            }}>
            <MaterialCommunityIcons name="close-circle" size={24} color="#fff" />
          </Pressable>
        )}
      </View>
      {item.name && <ThemedText style={styles.itemName}>{item.name}</ThemedText>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  emptySlot: {
    aspectRatio: 1,
    backgroundColor: Colors.light.surface,
    borderWidth: 2,
    borderColor: Colors.light.border,
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  filledSlot: {
    aspectRatio: 1,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 8,
  },
  categoryBadge: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    ...Typography.caption,
    fontSize: 9,
    letterSpacing: 1,
    color: '#fff',
  },
  removeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  plusIcon: {
    marginBottom: 8,
    opacity: 0.4,
  },
  slotNumber: {
    ...Typography.caption,
    fontSize: 10,
    letterSpacing: 1,
    opacity: 0.4,
  },
  itemName: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: 6,
    fontSize: 10,
    textAlign: 'center',
  },
});
