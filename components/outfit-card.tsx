import { View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Outfit } from '@/types/capsule';
import { ThemedText } from './themed-text';
import { Colors, Typography } from '@/constants/theme';

interface OutfitCardProps {
  outfit: Outfit;
  onToggleFavorite: () => void;
}

export function OutfitCard({ outfit, onToggleFavorite }: OutfitCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageGrid}>
        {outfit.items.map((item) => (
          <View
            key={item.id}
            style={[
              styles.imageWrapper,
              outfit.items.length === 1 && styles.singleImage,
              outfit.items.length === 2 && styles.twoImages,
              outfit.items.length === 3 && styles.threeImages,
              outfit.items.length >= 4 && styles.fourPlusImages,
            ]}>
            <Image source={{ uri: item.imageUri }} style={styles.image} contentFit="cover" />
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.badges}>
          {outfit.isDressOutfit && (
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>Dress</ThemedText>
            </View>
          )}
          <ThemedText style={styles.itemCount}>{outfit.items.length} items</ThemedText>
        </View>

        <Pressable onPress={onToggleFavorite} hitSlop={8}>
          <MaterialCommunityIcons
            name={outfit.isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={outfit.isFavorite ? Colors.light.tint : Colors.light.icon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageGrid: {
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    borderWidth: 0.5,
    borderColor: Colors.light.border,
  },
  singleImage: {
    width: '100%',
    height: '100%',
  },
  twoImages: {
    width: '50%',
    height: '100%',
  },
  threeImages: {
    width: '50%',
    height: '50%',
  },
  fourPlusImages: {
    width: '50%',
    height: '50%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: Colors.light.tint + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    ...Typography.caption,
    fontSize: 9,
    letterSpacing: 1,
    color: Colors.light.tint,
  },
  itemCount: {
    ...Typography.caption,
    fontSize: 10,
    letterSpacing: 0.5,
    opacity: 0.5,
  },
});
