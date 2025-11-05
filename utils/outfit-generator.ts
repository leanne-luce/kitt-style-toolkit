import { WardrobeItem, ItemCategory, Outfit } from '@/types/capsule';

/**
 * Validates if the wardrobe has enough items to generate outfits
 */
export function validateWardrobe(items: WardrobeItem[]): {
  isValid: boolean;
  message?: string;
} {
  if (items.length === 0) {
    return { isValid: false, message: 'Add items to get started' };
  }

  if (items.length < 10) {
    return {
      isValid: false,
      message: `Add ${10 - items.length} more item${10 - items.length === 1 ? '' : 's'} to complete your capsule`,
    };
  }

  const hasDress = items.some((item) => item.category === ItemCategory.DRESS);
  const hasTop = items.some((item) => item.category === ItemCategory.TOP);
  const hasBottom = items.some((item) => item.category === ItemCategory.BOTTOM);

  if (!hasDress && (!hasTop || !hasBottom)) {
    return {
      isValid: false,
      message: 'Add at least 1 dress OR (1 top + 1 bottom) to generate outfits',
    };
  }

  return { isValid: true };
}

/**
 * Generates all possible outfit combinations from wardrobe items
 */
export function generateOutfits(
  items: WardrobeItem[],
  favoriteOutfitIds: string[] = []
): Outfit[] {
  const outfits: Outfit[] = [];

  // Categorize items
  const tops = items.filter((item) => item.category === ItemCategory.TOP);
  const bottoms = items.filter((item) => item.category === ItemCategory.BOTTOM);
  const dresses = items.filter((item) => item.category === ItemCategory.DRESS);
  const outerwear = items.filter((item) => item.category === ItemCategory.OUTERWEAR);
  const shoes = items.filter((item) => item.category === ItemCategory.SHOES);
  const accessories = items.filter((item) => item.category === ItemCategory.ACCESSORY);

  // Generate dress-based outfits
  for (const dress of dresses) {
    // Dress alone
    const dressOutfit: WardrobeItem[] = [dress];
    const dressOutfitId = generateOutfitId(dressOutfit);
    outfits.push({
      id: dressOutfitId,
      items: dressOutfit,
      isDressOutfit: true,
      isFavorite: favoriteOutfitIds.includes(dressOutfitId),
    });

    // Dress + outerwear
    for (const outer of outerwear) {
      const items = [dress, outer];
      const id = generateOutfitId(items);
      outfits.push({
        id,
        items,
        isDressOutfit: true,
        isFavorite: favoriteOutfitIds.includes(id),
      });
    }

    // Dress + shoes
    for (const shoe of shoes) {
      const items = [dress, shoe];
      const id = generateOutfitId(items);
      outfits.push({
        id,
        items,
        isDressOutfit: true,
        isFavorite: favoriteOutfitIds.includes(id),
      });
    }

    // Dress + accessory
    for (const accessory of accessories) {
      const items = [dress, accessory];
      const id = generateOutfitId(items);
      outfits.push({
        id,
        items,
        isDressOutfit: true,
        isFavorite: favoriteOutfitIds.includes(id),
      });
    }

    // Dress + outerwear + shoes
    for (const outer of outerwear) {
      for (const shoe of shoes) {
        const items = [dress, outer, shoe];
        const id = generateOutfitId(items);
        outfits.push({
          id,
          items,
          isDressOutfit: true,
          isFavorite: favoriteOutfitIds.includes(id),
        });
      }
    }

    // Dress + outerwear + accessory
    for (const outer of outerwear) {
      for (const accessory of accessories) {
        const items = [dress, outer, accessory];
        const id = generateOutfitId(items);
        outfits.push({
          id,
          items,
          isDressOutfit: true,
          isFavorite: favoriteOutfitIds.includes(id),
        });
      }
    }

    // Dress + shoes + accessory
    for (const shoe of shoes) {
      for (const accessory of accessories) {
        const items = [dress, shoe, accessory];
        const id = generateOutfitId(items);
        outfits.push({
          id,
          items,
          isDressOutfit: true,
          isFavorite: favoriteOutfitIds.includes(id),
        });
      }
    }

    // Dress + outerwear + shoes + accessory
    for (const outer of outerwear) {
      for (const shoe of shoes) {
        for (const accessory of accessories) {
          const items = [dress, outer, shoe, accessory];
          const id = generateOutfitId(items);
          outfits.push({
            id,
            items,
            isDressOutfit: true,
            isFavorite: favoriteOutfitIds.includes(id),
          });
        }
      }
    }
  }

  // Generate standard (top + bottom) outfits
  for (const top of tops) {
    for (const bottom of bottoms) {
      // Top + bottom
      const baseOutfit: WardrobeItem[] = [top, bottom];
      const baseOutfitId = generateOutfitId(baseOutfit);
      outfits.push({
        id: baseOutfitId,
        items: baseOutfit,
        isDressOutfit: false,
        isFavorite: favoriteOutfitIds.includes(baseOutfitId),
      });

      // Top + bottom + outerwear
      for (const outer of outerwear) {
        const items = [top, bottom, outer];
        const id = generateOutfitId(items);
        outfits.push({
          id,
          items,
          isDressOutfit: false,
          isFavorite: favoriteOutfitIds.includes(id),
        });
      }

      // Top + bottom + shoes
      for (const shoe of shoes) {
        const items = [top, bottom, shoe];
        const id = generateOutfitId(items);
        outfits.push({
          id,
          items,
          isDressOutfit: false,
          isFavorite: favoriteOutfitIds.includes(id),
        });
      }

      // Top + bottom + accessory
      for (const accessory of accessories) {
        const items = [top, bottom, accessory];
        const id = generateOutfitId(items);
        outfits.push({
          id,
          items,
          isDressOutfit: false,
          isFavorite: favoriteOutfitIds.includes(id),
        });
      }

      // Top + bottom + outerwear + shoes
      for (const outer of outerwear) {
        for (const shoe of shoes) {
          const items = [top, bottom, outer, shoe];
          const id = generateOutfitId(items);
          outfits.push({
            id,
            items,
            isDressOutfit: false,
            isFavorite: favoriteOutfitIds.includes(id),
          });
        }
      }

      // Top + bottom + outerwear + accessory
      for (const outer of outerwear) {
        for (const accessory of accessories) {
          const items = [top, bottom, outer, accessory];
          const id = generateOutfitId(items);
          outfits.push({
            id,
            items,
            isDressOutfit: false,
            isFavorite: favoriteOutfitIds.includes(id),
          });
        }
      }

      // Top + bottom + shoes + accessory
      for (const shoe of shoes) {
        for (const accessory of accessories) {
          const items = [top, bottom, shoe, accessory];
          const id = generateOutfitId(items);
          outfits.push({
            id,
            items,
            isDressOutfit: false,
            isFavorite: favoriteOutfitIds.includes(id),
          });
        }
      }

      // Top + bottom + outerwear + shoes + accessory
      for (const outer of outerwear) {
        for (const shoe of shoes) {
          for (const accessory of accessories) {
            const items = [top, bottom, outer, shoe, accessory];
            const id = generateOutfitId(items);
            outfits.push({
              id,
              items,
              isDressOutfit: false,
              isFavorite: favoriteOutfitIds.includes(id),
            });
          }
        }
      }
    }
  }

  return outfits;
}

/**
 * Generates a unique ID for an outfit based on its item IDs
 */
function generateOutfitId(items: WardrobeItem[]): string {
  return items
    .map((item) => item.id)
    .sort()
    .join('_');
}

/**
 * Get outfit statistics
 */
export function getOutfitStats(outfits: Outfit[]): {
  total: number;
  dressOutfits: number;
  standardOutfits: number;
  favorites: number;
} {
  return {
    total: outfits.length,
    dressOutfits: outfits.filter((o) => o.isDressOutfit).length,
    standardOutfits: outfits.filter((o) => !o.isDressOutfit).length,
    favorites: outfits.filter((o) => o.isFavorite).length,
  };
}
