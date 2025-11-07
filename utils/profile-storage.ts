import { supabase } from '@/lib/supabase';
import * as ImagePicker from 'expo-image-picker';
import { UserProfile } from '@/types/profile';

/**
 * Get user profile from database
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Profile doesn't exist yet
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

/**
 * Create or update user profile
 */
export async function upsertUserProfile(
  userId: string,
  firstName: string,
  lastName: string,
  profileImageUrl?: string,
  genderPreference?: 'womens' | 'mens' | 'both',
  birthDate?: string
): Promise<UserProfile | null> {
  try {
    console.log('Upserting profile for user:', userId);
    console.log('Profile data:', { firstName, lastName, profileImageUrl, genderPreference, birthDate });

    const now = new Date().toISOString();
    const profileData = {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      profile_image_url: profileImageUrl,
      gender_preference: genderPreference,
      birth_date: birthDate,
      updated_at: now,
    };

    console.log('Full profile data:', profileData);

    const { data, error } = await supabase
      .from('profiles')
      .upsert(profileData, {
        onConflict: 'user_id',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Profile upserted successfully:', data);
    return data;
  } catch (error) {
    console.error('Error upserting profile:', error);
    throw error;
  }
}

/**
 * Upload profile image to Supabase storage
 */
export async function uploadProfileImage(
  userId: string,
  imageUri: string
): Promise<string | null> {
  try {
    // For React Native, we need to convert the image to ArrayBuffer
    const response = await fetch(imageUri);
    const arrayBuffer = await response.arrayBuffer();

    // Create a unique filename
    const fileExt = imageUri.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `profile-images/${fileName}`;

    // Upload to Supabase storage using ArrayBuffer
    const { data, error } = await supabase.storage
      .from('user-uploads')
      .upload(filePath, arrayBuffer, {
        contentType: `image/${fileExt}`,
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('user-uploads')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
}

/**
 * Request image picker permissions
 */
export async function requestImagePermissions(): Promise<boolean> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
}

/**
 * Pick an image from the device library
 */
export async function pickProfileImage(): Promise<string | null> {
  try {
    const hasPermission = await requestImagePermissions();
    if (!hasPermission) {
      throw new Error('Permission to access media library is required');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) {
      return null;
    }

    return result.assets[0].uri;
  } catch (error) {
    console.error('Error picking image:', error);
    throw error;
  }
}
