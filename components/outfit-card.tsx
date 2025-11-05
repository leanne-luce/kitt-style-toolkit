import { View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Outfit } from '@/types/capsule';
import { ThemedText } from './themed-text';
import { Colors, Typography } from '@/constants/theme';

interface OutfitCardProps {
  outfit: Outfit;
  onToggleFavorite: () => void;
  onPress?: () => void;
}

export function OutfitCard({ outfit, onToggleFavorite, onPress }: OutfitCardProps) {
  const getCollageLayout = (count: number) => {
    switch (count) {
      case 1:
        return [{ width: '100%' as const, height: '100%' as const, top: 0, left: 0, zIndex: 1 }];
      case 2:
        return [
          { width: '65%' as const, height: '70%' as const, top: 0, left: 0, zIndex: 2 },
          { width: '55%' as const, height: '60%' as const, top: '35%' as const, left: '40%' as const, zIndex: 1 },
        ];
      case 3:
        return [
          { width: '55%' as const, height: '60%' as const, top: 0, left: 0, zIndex: 2 },
          { width: '50%' as const, height: '55%' as const, top: '15%' as const, left: '45%' as const, zIndex: 3 },
          { width: '45%' as const, height: '50%' as const, top: '45%' as const, left: '10%' as const, zIndex: 1 },
        ];
      case 4:
        return [
          { width: '50%' as const, height: '55%' as const, top: 0, left: 0, zIndex: 3 },
          { width: '45%' as const, height: '50%' as const, top: '10%' as const, left: '50%' as const, zIndex: 2 },
          { width: '40%' as const, height: '45%' as const, top: '50%' as const, left: '5%' as const, zIndex: 1 },
          { width: '42%' as const, height: '47%' as const, top: '48%' as const, left: '53%' as const, zIndex: 4 },
        ];
      default:
        return [
          { width: '48%' as const, height: '50%' as const, top: 0, left: 0, zIndex: 3 },
          { width: '42%' as const, height: '45%' as const, top: '8%' as const, left: '52%' as const, zIndex: 2 },
          { width: '38%' as const, height: '42%' as const, top: '52%' as const, left: '8%' as const, zIndex: 1 },
          { width: '40%' as const, height: '44%' as const, top: '50%' as const, left: '55%' as const, zIndex: 4 },
          { width: '35%' as const, height: '38%' as const, top: '28%' as const, left: '28%' as const, zIndex: 5 },
        ];
    }
  };

  const layouts = getCollageLayout(outfit.items.length);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.collageContainer}>
        {outfit.items.slice(0, 5).map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.collageImage,
              {
                width: layouts[index].width,
                height: layouts[index].height,
                top: layouts[index].top,
                left: layouts[index].left,
                zIndex: layouts[index].zIndex,
              },
            ]}>
            <Image
              source={typeof item.imageUri === 'string' ? { uri: item.imageUri } : item.imageUri}
              style={styles.image}
              contentFit="cover"
            />
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

        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          hitSlop={8}>
          <MaterialCommunityIcons
            name={outfit.isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={outfit.isFavorite ? Colors.light.tint : Colors.light.icon}
          />
        </Pressable>
      </View>
    </Pressable>
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
  collageContainer: {
    aspectRatio: 1,
    position: 'relative',
    backgroundColor: '#f8f8f8',
  },
  collageImage: {
    position: 'absolute',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
