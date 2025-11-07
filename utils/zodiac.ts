/**
 * Zodiac sign utilities
 */

export type ZodiacSign =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces';

export interface ZodiacInfo {
  sign: ZodiacSign;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  dates: string;
  traits: string[];
}

export const zodiacSigns: Record<ZodiacSign, ZodiacInfo> = {
  aries: {
    sign: 'aries',
    symbol: '♈',
    element: 'fire',
    dates: 'March 21 - April 19',
    traits: ['bold', 'confident', 'energetic', 'pioneering', 'fearless'],
  },
  taurus: {
    sign: 'taurus',
    symbol: '♉',
    element: 'earth',
    dates: 'April 20 - May 20',
    traits: ['luxurious', 'sensual', 'grounded', 'reliable', 'elegant'],
  },
  gemini: {
    sign: 'gemini',
    symbol: '♊',
    element: 'air',
    dates: 'May 21 - June 20',
    traits: ['versatile', 'curious', 'playful', 'expressive', 'adaptable'],
  },
  cancer: {
    sign: 'cancer',
    symbol: '♋',
    element: 'water',
    dates: 'June 21 - July 22',
    traits: ['intuitive', 'nurturing', 'romantic', 'sentimental', 'protective'],
  },
  leo: {
    sign: 'leo',
    symbol: '♌',
    element: 'fire',
    dates: 'July 23 - August 22',
    traits: ['dramatic', 'regal', 'confident', 'charismatic', 'bold'],
  },
  virgo: {
    sign: 'virgo',
    symbol: '♍',
    element: 'earth',
    dates: 'August 23 - September 22',
    traits: ['refined', 'meticulous', 'practical', 'sophisticated', 'polished'],
  },
  libra: {
    sign: 'libra',
    symbol: '♎',
    element: 'air',
    dates: 'September 23 - October 22',
    traits: ['balanced', 'harmonious', 'elegant', 'charming', 'aesthetic'],
  },
  scorpio: {
    sign: 'scorpio',
    symbol: '♏',
    element: 'water',
    dates: 'October 23 - November 21',
    traits: ['magnetic', 'mysterious', 'intense', 'transformative', 'powerful'],
  },
  sagittarius: {
    sign: 'sagittarius',
    symbol: '♐',
    element: 'fire',
    dates: 'November 22 - December 21',
    traits: ['adventurous', 'optimistic', 'free-spirited', 'bold', 'eclectic'],
  },
  capricorn: {
    sign: 'capricorn',
    symbol: '♑',
    element: 'earth',
    dates: 'December 22 - January 19',
    traits: ['timeless', 'classic', 'ambitious', 'structured', 'sophisticated'],
  },
  aquarius: {
    sign: 'aquarius',
    symbol: '♒',
    element: 'air',
    dates: 'January 20 - February 18',
    traits: ['innovative', 'unconventional', 'futuristic', 'unique', 'independent'],
  },
  pisces: {
    sign: 'pisces',
    symbol: '♓',
    element: 'water',
    dates: 'February 19 - March 20',
    traits: ['dreamy', 'ethereal', 'romantic', 'artistic', 'fluid'],
  },
};

/**
 * Get zodiac sign from birth date string (MM/DD/YYYY format)
 */
export function getZodiacSign(birthDate: string): ZodiacSign | null {
  if (!birthDate || birthDate.length < 5) return null;

  try {
    // Parse MM/DD/YYYY format
    const parts = birthDate.split('/');
    if (parts.length < 2) return null;

    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);

    if (isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
      return null;
    }

    // Determine zodiac sign based on month and day
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'pisces';

    return null;
  } catch (error) {
    console.error('Error parsing birth date:', error);
    return null;
  }
}

/**
 * Get zodiac info for a sign
 */
export function getZodiacInfo(sign: ZodiacSign): ZodiacInfo {
  return zodiacSigns[sign];
}
