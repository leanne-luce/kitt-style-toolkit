/**
 * Calculates the current lunar phase
 */

export type LunarPhaseKey =
  | 'newmoon'
  | 'waxingcrescent'
  | 'firstquarter'
  | 'waxinggibbous'
  | 'fullmoon'
  | 'waninggibbous'
  | 'lastquarter'
  | 'waningcrescent';

export interface LunarPhase {
  name: string;
  emoji: string;
  illumination: number; // percentage 0-100
  illustrationKey: LunarPhaseKey;
}

/**
 * Calculate the lunar phase for a given date
 * Based on astronomical calculations
 */
export function getLunarPhase(date: Date = new Date()): LunarPhase {
  // Known new moon date (January 6, 2000, 18:14 UTC)
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');

  // Lunar cycle is approximately 29.53 days
  const lunarCycle = 29.530588853;

  // Calculate days since known new moon
  const daysSinceNew = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);

  // Calculate current position in lunar cycle (0-1)
  const phase = (daysSinceNew % lunarCycle) / lunarCycle;

  // Calculate illumination percentage
  const illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) * 50);

  // Determine phase name and emoji based on position
  let name: string;
  let emoji: string;
  let illustrationKey: LunarPhaseKey;

  if (phase < 0.0625 || phase >= 0.9375) {
    name = 'New Moon';
    emoji = '🌑';
    illustrationKey = 'newmoon';
  } else if (phase < 0.1875) {
    name = 'Waxing Crescent';
    emoji = '🌒';
    illustrationKey = 'waxingcrescent';
  } else if (phase < 0.3125) {
    name = 'First Quarter';
    emoji = '🌓';
    illustrationKey = 'firstquarter';
  } else if (phase < 0.4375) {
    name = 'Waxing Gibbous';
    emoji = '🌔';
    illustrationKey = 'waxinggibbous';
  } else if (phase < 0.5625) {
    name = 'Full Moon';
    emoji = '🌕';
    illustrationKey = 'fullmoon';
  } else if (phase < 0.6875) {
    name = 'Waning Gibbous';
    emoji = '🌖';
    illustrationKey = 'waninggibbous';
  } else if (phase < 0.8125) {
    name = 'Last Quarter';
    emoji = '🌗';
    illustrationKey = 'lastquarter';
  } else {
    name = 'Waning Crescent';
    emoji = '🌘';
    illustrationKey = 'waningcrescent';
  }

  return {
    name,
    emoji,
    illumination,
    illustrationKey,
  };
}
