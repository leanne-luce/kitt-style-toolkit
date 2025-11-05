import { supabase } from '@/lib/supabase';
import { WardrobeItem, ItemCategory } from '@/types/capsule';
import { uploadWardrobeImage, deleteWardrobeImage } from './supabase-storage';

export interface WardrobeItemDB {
  id: string;
  user_id: string;
  image_url: string;
  category: ItemCategory;
  name?: string;
  color?: string;
  slot_index?: number;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database item to app WardrobeItem format
 */
function dbItemToWardrobeItem(dbItem: WardrobeItemDB): WardrobeItem {
  return {
    id: dbItem.id,
    imageUri: dbItem.image_url,
    category: dbItem.category,
    name: dbItem.name,
    color: dbItem.color,
  };
}

/**
 * Load all wardrobe items for the current user
 */
export async function loadUserWardrobeItems(): Promise<WardrobeItem[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('wardrobe_items')
      .select('*')
      .eq('user_id', user.id)
      .order('slot_index', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading wardrobe items:', error);
      throw error;
    }

    return (data || []).map(dbItemToWardrobeItem);
  } catch (error) {
    console.error('Error in loadUserWardrobeItems:', error);
    throw error;
  }
}

/**
 * Save a wardrobe item to the database
 * @param item - Wardrobe item to save
 * @param localImageUri - Local URI if this is a new upload
 * @param slotIndex - Optional slot index for ordering
 */
export async function saveWardrobeItem(
  item: Partial<WardrobeItem>,
  localImageUri?: string,
  slotIndex?: number
): Promise<WardrobeItem> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    let imageUrl = item.imageUri as string;

    // If there's a local image URI, upload it first
    if (localImageUri && typeof localImageUri === 'string' && localImageUri.startsWith('file://')) {
      imageUrl = await uploadWardrobeImage(localImageUri, user.id);
    }

    // Prepare the data for insertion
    const itemData = {
      user_id: user.id,
      image_url: imageUrl,
      category: item.category!,
      name: item.name || null,
      color: item.color || null,
      slot_index: slotIndex !== undefined ? slotIndex : null,
    };

    if (item.id) {
      // Update existing item
      const { data, error } = await supabase
        .from('wardrobe_items')
        .update(itemData)
        .eq('id', item.id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating wardrobe item:', error);
        throw error;
      }

      return dbItemToWardrobeItem(data);
    } else {
      // Insert new item
      const { data, error } = await supabase
        .from('wardrobe_items')
        .insert(itemData)
        .select()
        .single();

      if (error) {
        console.error('Error inserting wardrobe item:', error);
        throw error;
      }

      return dbItemToWardrobeItem(data);
    }
  } catch (error) {
    console.error('Error in saveWardrobeItem:', error);
    throw error;
  }
}

/**
 * Delete a wardrobe item from the database
 */
export async function deleteWardrobeItem(itemId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    // First, get the item to find the image URL
    const { data: item, error: fetchError } = await supabase
      .from('wardrobe_items')
      .select('image_url')
      .eq('id', itemId)
      .eq('user_id', user.id)
      .single();

    if (fetchError) {
      console.error('Error fetching item for deletion:', fetchError);
      throw fetchError;
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from('wardrobe_items')
      .delete()
      .eq('id', itemId)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Error deleting wardrobe item:', deleteError);
      throw deleteError;
    }

    // Delete the image from storage (only if it's hosted on Supabase)
    if (item?.image_url && item.image_url.includes('supabase')) {
      try {
        await deleteWardrobeImage(item.image_url);
      } catch (storageError) {
        console.warn('Failed to delete image from storage:', storageError);
        // Don't throw - the database record is already deleted
      }
    }
  } catch (error) {
    console.error('Error in deleteWardrobeItem:', error);
    throw error;
  }
}

/**
 * Update all wardrobe items with their slot indices
 */
export async function updateWardrobeItemsOrder(items: WardrobeItem[]): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    // Update each item with its index
    const updates = items.map((item, index) => ({
      id: item.id,
      user_id: user.id,
      slot_index: index,
    }));

    const { error } = await supabase
      .from('wardrobe_items')
      .upsert(updates, { onConflict: 'id' });

    if (error) {
      console.error('Error updating wardrobe items order:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateWardrobeItemsOrder:', error);
    throw error;
  }
}
