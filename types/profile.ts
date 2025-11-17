export interface ViewedVogueItem {
  id: string;
  viewedAt: number; // timestamp
}

export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  profile_image_url?: string;
  gender_preference?: 'womens' | 'mens' | 'both';
  birth_date?: string;
  viewed_vogue_items?: ViewedVogueItem[];
  created_at: string;
  updated_at: string;
}
