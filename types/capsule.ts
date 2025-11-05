export enum ItemCategory {
  TOP = 'top',
  BOTTOM = 'bottom',
  DRESS = 'dress',
  OUTERWEAR = 'outerwear',
  SHOES = 'shoes',
  ACCESSORY = 'accessory',
}

export interface WardrobeItem {
  id: string;
  imageUri: string;
  category: ItemCategory;
  name?: string;
  color?: string;
}

export interface FavoriteOutfit {
  outfitId: string;
  itemIds: string[];
}

export interface Capsule {
  id: string;
  name: string;
  createdDate: number;
  season?: string;
  notes?: string;
  items: WardrobeItem[];
  favoriteOutfits: FavoriteOutfit[];
}

export interface Outfit {
  id: string;
  items: WardrobeItem[];
  isDressOutfit: boolean;
  isFavorite?: boolean;
}
