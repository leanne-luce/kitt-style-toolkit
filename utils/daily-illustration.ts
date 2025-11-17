/**
 * Returns a different illustration each day
 */

import { IllustrationType } from '@/components/illustrations/fashion-illustrations';

// Curated list of whimsical illustrations to rotate through
const DAILY_ILLUSTRATIONS: IllustrationType[] = [
  'spy',
  'victorianghost',
  'musicnote',
  'stripedsocks',
  'lipstick',
  'crown',
  'mirror',
  'perfume',
  'flower',
  'pearl',
  'feather',
  'sparkle',
  'dress',
  'handbag',
  'highheels',
  'sunhat',
  'scarf',
  'beret',
  'watch',
  'earrings',
  'clutch',
  'bowtie',
  'rings',
  'brooch',
  'balletflats',
  'trenchcoat',
  'sneaker',
  'booticon',
  'kimono',
  'lace',
  'stiletto',
];

/**
 * Get the illustration for today
 * Uses the date to deterministically select an illustration
 */
export function getDailyIllustration(): IllustrationType {
  const today = new Date();
  // Use year and day of year to get consistent illustration per day
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = (today.getFullYear() + dayOfYear) % DAILY_ILLUSTRATIONS.length;
  return DAILY_ILLUSTRATIONS[index];
}
