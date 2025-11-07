/**
 * Horoscope API service using Aztro API (free, open-source)
 * Documentation: https://github.com/sameerkumar18/aztro
 */

import { ZodiacSign } from '@/utils/zodiac';

export interface HoroscopeData {
  date_range: string;
  current_date: string;
  description: string;
  compatibility: string;
  mood: string;
  color: string;
  lucky_number: string;
  lucky_time: string;
}

/**
 * Fetch daily horoscope for a zodiac sign
 * Uses Aztro API: https://aztro.sameerkumar.website/
 * Falls back gracefully if API is unavailable
 */
export async function getDailyHoroscope(sign: ZodiacSign): Promise<HoroscopeData | null> {
  try {
    const response = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      // API unavailable, use fallback
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Network error or API down - silently fail and use fallback
    return null;
  }
}
