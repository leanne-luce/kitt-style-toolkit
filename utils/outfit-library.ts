/**
 * Library of varied outfit recommendations to keep things fresh
 * even when temperatures remain consistent
 */

export interface SeasonalEvent {
  month: number; // 1-12
  startDay: number;
  endDay: number;
  name: string;
  keywords: string[]; // Style keywords for this event
}

// Seasonal events (non-religious focus on seasonal themes)
export const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    month: 2,
    startDay: 10,
    endDay: 14,
    name: 'Valentine\'s Season',
    keywords: ['red', 'pink', 'romantic', 'velvet'],
  },
  {
    month: 3,
    startDay: 1,
    endDay: 20,
    name: 'Early Spring',
    keywords: ['pastel', 'floral', 'light knits', 'transitional'],
  },
  {
    month: 10,
    startDay: 20,
    endDay: 31,
    name: 'Halloween Season',
    keywords: ['orange', 'black', 'dark florals', 'velvet', 'dramatic'],
  },
  {
    month: 11,
    startDay: 20,
    endDay: 30,
    name: 'Thanksgiving Week',
    keywords: ['burgundy', 'rust', 'warm tones', 'cozy knits'],
  },
  {
    month: 12,
    startDay: 1,
    endDay: 25,
    name: 'Holiday Season',
    keywords: ['fair isle', 'festive', 'velvet', 'sparkle', 'rich colors'],
  },
  {
    month: 12,
    startDay: 26,
    endDay: 31,
    name: 'New Year\'s Week',
    keywords: ['sequins', 'metallics', 'party-ready', 'statement'],
  },
];

// Temperature-based outfit variations
export const OUTFIT_LIBRARY = {
  // 80°F+
  hot: [
    'Keep it breezy: linen or cotton slip dress with sandals',
    'Light and airy: breathable tank with wide-leg pants and slides',
    'Effortless: oversized tee tucked into shorts, sneakers on',
    'Summer ease: sleeveless button-down with denim cutoffs and espadrilles',
    'Minimal layers: silk cami with flowy skirt and flat sandals',
  ],

  // 70°F+
  warm: [
    'Easy layers: t-shirt under an open cardigan, loafers at the ready',
    'Light and loose: cotton dress with a denim jacket tied at the waist, sandals',
    'Transitional: short-sleeve knit with midi skirt and mules',
    'Breezy: chambray shirt over a tank, ankle pants, and sneakers',
    'Relaxed: linen button-up with cropped jeans and loafers',
  ],

  // 60°F+
  mild: [
    'A light jacket moment—blazer over a tee with jeans and ankle boots',
    'Layering mode: turtleneck under a slip dress, add loafers',
    'Transitional chic: sweater vest over a button-down, trousers, and oxfords',
    'Easy elegance: cardigan over a midi dress with ankle boots',
    'Classic: denim jacket with a lightweight sweater and sneakers',
  ],

  // 50°F+
  cool: [
    'Sweater weather: chunky knit with jeans and your favorite boots',
    'Cozy layers: turtleneck under a blazer, trousers, and loafers',
    'Fall mode: oversized cardigan over a slip dress with ankle boots',
    'Comfortable: crewneck sweater with a light jacket and closed-toe shoes',
    'Layered up: long-sleeve tee, vest, light coat, and boots',
  ],

  // 40°F+
  cold: [
    'Bundle up: wool sweater under a real coat, boots on',
    'Warmth meets style: cashmere turtleneck, tailored coat, and heeled boots',
    'Layered smart: chunky knit, long coat, scarf for extra warmth',
    'Cozy elegance: sweater dress under a structured coat with knee-high boots',
    'Cold weather ready: mock neck under a puffer, jeans, and insulated boots',
  ],

  // 32°F+
  freezing: [
    'Heavy coat season—add a thick sweater underneath and reach for insulated boots',
    'Winter mode: thermal layer, wool sweater, down coat, waterproof boots',
    'Full coverage: turtleneck, cardigan, heavy parka, and winter boots',
    'Maximum warmth: layered knits under a long wool coat with tall boots',
    'Arctic ready: base layer, sweater, insulated coat, snow boots',
  ],

  // Below 32°F
  arctic: [
    'Full winter mode: thermal base, sweater, heavy coat, insulated boots. Don\'t skimp',
    'Extreme cold protocol: layers on layers—thermal, fleece, down coat, winter boots',
    'No compromises: base layer, turtleneck, cardigan, parka, insulated boots',
    'Maximum insulation: thermal underwear, wool sweater, heavy coat, snow boots',
    'Winter survival: all the layers—base, mid, outer shell, warmest boots you own',
  ],
};

// Temperature range additions (for big swings)
export const TEMP_RANGE_ADDITIONS = [
  '. Toss a light layer in your bag for when the sun sets',
  '. Bring something you can tie around your waist when it warms up',
  '. Layer smart so you can peel off as the day warms up',
  ' that work from morning coffee to evening plans',
  '. Layer strategically for those temperature swings',
  '. Plan to add or subtract layers as the day shifts',
];

// Weather-specific additions
export const WEATHER_ADDITIONS = {
  heavyRain: [
    '. Grab an umbrella and a water-resistant bag—it\'s going to rain',
    '. Don\'t forget: umbrella, waterproof bag, maybe rain boots',
    '. Umbrella is non-negotiable today, water-resistant everything',
  ],
  lightRain: [
    '. Keep an umbrella handy, just in case',
    '. Toss an umbrella in your bag—better safe than sorry',
    '. Bring an umbrella along for the ride',
  ],
  snow: [
    '. Don\'t forget: hat, gloves, scarf—the full winter kit',
    '. Accessorize for snow: warm hat, insulated gloves, cozy scarf',
    '. Bundle accessories: beanie, mittens, and a good scarf',
  ],
  wind: [
    '. Bring a scarf to block the wind',
    '. Scarf up—it\'s going to be blustery',
    '. Add a windproof layer and a scarf to keep cozy',
  ],
  veryHot: [
    '. Sunglasses and a wide-brim hat are non-negotiable',
    '. Sun protection is key: hat, sunglasses, maybe even a light scarf',
    '. Don\'t skip the sunglasses and a hat for shade',
  ],
};

// Seasonal modifiers for outfit recommendations
export const SEASONAL_MODIFIERS: Record<string, string[]> = {
  'Valentine\'s Season': [
    ' (feeling romantic? add a touch of red or pink)',
    ' (velvet would be perfect for the season)',
    ' (bonus points for something in a romantic shade)',
  ],
  'Early Spring': [
    ' (pastels would be lovely right now)',
    ' (perfect weather for light florals)',
    ' (spring transitional pieces shine here)',
  ],
  'Halloween Season': [
    ' (orange or black would be festive)',
    ' (dark florals or velvet for seasonal flair)',
    ' (feeling dramatic? lean into it)',
  ],
  'Thanksgiving Week': [
    ' (burgundy or rust tones feel right for the season)',
    ' (warm, cozy colors are calling)',
    ' (think rich autumn hues)',
  ],
  'Holiday Season': [
    ' (fair isle sweater? now\'s the time)',
    ' (add a festive touch with rich colors or velvet)',
    ' (sparkle is encouraged this time of year)',
    ' (holiday-ready with metallics or jewel tones)',
  ],
  'New Year\'s Week': [
    ' (sequins and metallics are fair game)',
    ' (party-ready layers for celebrating)',
    ' (add something with a little shine)',
  ],
};

/**
 * Get current seasonal event if within date range
 */
export function getCurrentSeasonalEvent(): SeasonalEvent | null {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentDay = now.getDate();

  return (
    SEASONAL_EVENTS.find(
      (event) =>
        event.month === currentMonth &&
        currentDay >= event.startDay &&
        currentDay <= event.endDay
    ) || null
  );
}

/**
 * Get a random item from an array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get a varied outfit recommendation using the library
 * Uses date-based seed to ensure same recommendation on same day
 */
export function getVariedOutfit(
  category: keyof typeof OUTFIT_LIBRARY,
  hasLargeTempRange: boolean,
  seasonalEvent: SeasonalEvent | null
): string {
  // Use today's date as seed for consistent daily recommendations
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );

  // Get base outfit using date-seeded index
  const outfits = OUTFIT_LIBRARY[category];
  const baseOutfit = outfits[dayOfYear % outfits.length];

  let recommendation = baseOutfit;

  // Add temperature range note if applicable
  if (hasLargeTempRange && category !== 'arctic') {
    const rangeNote = getRandomItem(TEMP_RANGE_ADDITIONS);
    recommendation += rangeNote;
  }

  // Add seasonal modifier if we're in a seasonal event
  if (seasonalEvent && SEASONAL_MODIFIERS[seasonalEvent.name]) {
    const modifier = getRandomItem(SEASONAL_MODIFIERS[seasonalEvent.name]);
    recommendation += modifier;
  }

  return recommendation;
}
