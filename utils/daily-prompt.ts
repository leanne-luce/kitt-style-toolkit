import AsyncStorage from '@react-native-async-storage/async-storage';
import { fashionPrompts } from '@/constants/fashion-prompts';
import { getIllustrationForPrompt } from '@/constants/prompt-illustrations';
import type { IllustrationType } from '@/components/illustrations/fashion-illustrations';

const PROMPT_HISTORY_KEY = '@style_horoscope_history';
const CURRENT_PROMPT_KEY = '@style_horoscope_current';
const LAST_UPDATE_KEY = '@style_horoscope_last_update';

interface PromptData {
  prompt: string;
  index: number;
  date: string;
  illustration: IllustrationType;
}

export interface DailyPromptResult {
  prompt: string;
  illustration: IllustrationType;
}

/**
 * Gets today's date in YYYY-MM-DD format
 */
function getTodayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Shuffles an array using Fisher-Yates algorithm with a date-based seed
 */
function shuffleWithSeed(array: number[], seed: string): number[] {
  const arr = [...array];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash = hash & hash;
  }

  // Simple seeded random function
  const random = () => {
    hash = (hash * 9301 + 49297) % 233280;
    return hash / 233280;
  };

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

/**
 * Gets a consistent daily fashion prompt that doesn't repeat.
 * Tracks history to ensure prompts aren't repeated until all prompts have been shown.
 * The same prompt will be returned for the entire day (resets at midnight local time).
 */
export async function getDailyPrompt(): Promise<DailyPromptResult> {
  const today = getTodayDate();

  try {
    // Check if we already have a prompt for today
    const lastUpdate = await AsyncStorage.getItem(LAST_UPDATE_KEY);
    if (lastUpdate === today) {
      const currentPrompt = await AsyncStorage.getItem(CURRENT_PROMPT_KEY);
      if (currentPrompt) {
        const data: PromptData = JSON.parse(currentPrompt);
        // Check if illustration exists (for backwards compatibility)
        if (data.illustration) {
          return {
            prompt: data.prompt,
            illustration: data.illustration,
          };
        }
        // If no illustration, we need to add it based on the stored index
        if (data.index !== undefined) {
          const illustration = getIllustrationForPrompt(data.index);
          // Update stored data with illustration
          const updatedData: PromptData = { ...data, illustration };
          await AsyncStorage.setItem(CURRENT_PROMPT_KEY, JSON.stringify(updatedData));
          return {
            prompt: data.prompt,
            illustration,
          };
        }
      }
    }

    // Need to get a new prompt
    const historyJson = await AsyncStorage.getItem(PROMPT_HISTORY_KEY);
    let viewedIndices: number[] = historyJson ? JSON.parse(historyJson) : [];

    // If we've seen all prompts, reset the history (start fresh cycle)
    if (viewedIndices.length >= fashionPrompts.length) {
      viewedIndices = [];
      await AsyncStorage.setItem(PROMPT_HISTORY_KEY, JSON.stringify([]));
    }

    // Get available prompts (ones we haven't seen yet)
    const allIndices = Array.from({ length: fashionPrompts.length }, (_, i) => i);
    const availableIndices = allIndices.filter(i => !viewedIndices.includes(i));

    // Shuffle available prompts with today's date as seed for consistency
    const shuffled = shuffleWithSeed(availableIndices, today);

    // Pick the first one from the shuffled list
    const selectedIndex = shuffled[0];
    const selectedPrompt = fashionPrompts[selectedIndex];
    const selectedIllustration = getIllustrationForPrompt(selectedIndex);

    // Update history
    viewedIndices.push(selectedIndex);
    await AsyncStorage.setItem(PROMPT_HISTORY_KEY, JSON.stringify(viewedIndices));

    // Store current prompt
    const promptData: PromptData = {
      prompt: selectedPrompt,
      index: selectedIndex,
      date: today,
      illustration: selectedIllustration,
    };
    await AsyncStorage.setItem(CURRENT_PROMPT_KEY, JSON.stringify(promptData));
    await AsyncStorage.setItem(LAST_UPDATE_KEY, today);

    return {
      prompt: selectedPrompt,
      illustration: selectedIllustration,
    };
  } catch (error) {
    console.error('Error getting daily prompt:', error);
    // Fallback to simple date-based selection
    return {
      prompt: fashionPrompts[0],
      illustration: 'sparkle',
    };
  }
}

/**
 * Gets the date string for display purposes
 */
export function getTodayDateString(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return now.toLocaleDateString('en-US', options);
}

/**
 * Gets the number of prompts the user has seen
 */
export async function getViewedPromptsCount(): Promise<number> {
  try {
    const historyJson = await AsyncStorage.getItem(PROMPT_HISTORY_KEY);
    const viewedIndices: number[] = historyJson ? JSON.parse(historyJson) : [];
    return viewedIndices.length;
  } catch (error) {
    console.error('Error getting viewed prompts count:', error);
    return 0;
  }
}

/**
 * Gets the total number of available prompts
 */
export function getTotalPromptsCount(): number {
  return fashionPrompts.length;
}

/**
 * Resets the prompt history (for testing or if user wants to start over)
 */
export async function resetPromptHistory(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      PROMPT_HISTORY_KEY,
      CURRENT_PROMPT_KEY,
      LAST_UPDATE_KEY,
    ]);
  } catch (error) {
    console.error('Error resetting prompt history:', error);
  }
}
