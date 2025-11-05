import { supabase } from '@/lib/supabase';
import { File } from 'expo-file-system';

/**
 * Upload an image to Supabase Storage
 * @param uri - Local file URI from ImagePicker
 * @param userId - User ID for organizing files
 * @returns Public URL of the uploaded image
 */
export async function uploadWardrobeImage(uri: string, userId: string): Promise<string> {
  try {
    console.log('uploadWardrobeImage called with uri:', uri);
    console.log('userId:', userId);

    // Read the file using the new File API
    console.log('Reading file...');
    const file = new File(uri);

    // Use bytes() method to read the file as a Uint8Array
    console.log('Reading file as bytes...');
    const bytes = await file.bytes();

    if (!bytes || bytes.length === 0) {
      throw new Error('Failed to read file - empty or null bytes');
    }

    console.log('File bytes length:', bytes.length);

    // Generate a unique filename
    const fileExt = uri.split('.').pop() || 'jpg';
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    console.log('Upload filename:', fileName);

    // Upload to Supabase Storage using the bytes directly
    console.log('Uploading to Supabase...');
    const { data, error } = await supabase.storage
      .from('wardrobe-images')
      .upload(fileName, bytes, {
        contentType: `image/${fileExt}`,
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    console.log('Upload successful, data:', data);

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('wardrobe-images')
      .getPublicUrl(data.path);

    console.log('Public URL:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Delete an image from Supabase Storage
 * @param imageUrl - Public URL of the image to delete
 */
export async function deleteWardrobeImage(imageUrl: string): Promise<void> {
  try {
    // Extract the file path from the public URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/wardrobe-images/');
    if (pathParts.length < 2) {
      throw new Error('Invalid image URL');
    }
    const filePath = pathParts[1];

    const { error } = await supabase.storage.from('wardrobe-images').remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}
