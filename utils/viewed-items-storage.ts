import { supabase } from '@/lib/supabase';
import { ViewedVogueItem } from '@/types/profile';

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

/**
 * Get all viewed items that are still within the week window for the current user
 */
export async function getViewedItems(userId: string): Promise<string[]> {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('viewed_vogue_items')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error getting viewed items:', error);
      return [];
    }

    if (!profile?.viewed_vogue_items) return [];

    const items: ViewedVogueItem[] = profile.viewed_vogue_items as ViewedVogueItem[];
    const now = Date.now();

    // Filter out items older than one week
    const recentItems = items.filter(item => now - item.viewedAt < ONE_WEEK_MS);

    // If we filtered anything out, update the database
    if (recentItems.length !== items.length) {
      await supabase
        .from('profiles')
        .update({ viewed_vogue_items: recentItems })
        .eq('user_id', userId);
    }

    return recentItems.map(item => item.id);
  } catch (error) {
    console.error('Error getting viewed items:', error);
    return [];
  }
}

/**
 * Mark an item as viewed for the current user
 */
export async function markItemAsViewed(userId: string, itemId: string): Promise<void> {
  try {
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('viewed_vogue_items')
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching profile for viewed items:', fetchError);
      return;
    }

    const items: ViewedVogueItem[] = (profile?.viewed_vogue_items as ViewedVogueItem[]) || [];

    // Check if item already exists
    const existingIndex = items.findIndex(item => item.id === itemId);

    if (existingIndex >= 0) {
      // Update timestamp if already exists
      items[existingIndex].viewedAt = Date.now();
    } else {
      // Add new item
      items.push({
        id: itemId,
        viewedAt: Date.now(),
      });
    }

    // Clean up old items while we're here
    const now = Date.now();
    const recentItems = items.filter(item => now - item.viewedAt < ONE_WEEK_MS);

    // Update the database
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ viewed_vogue_items: recentItems })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error updating viewed items:', updateError);
    }
  } catch (error) {
    console.error('Error marking item as viewed:', error);
  }
}

/**
 * Clear all viewed items for the current user (for testing or user request)
 */
export async function clearViewedItems(userId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ viewed_vogue_items: [] })
      .eq('user_id', userId);

    if (error) {
      console.error('Error clearing viewed items:', error);
    }
  } catch (error) {
    console.error('Error clearing viewed items:', error);
  }
}
