/**
 * Extracts key garment types from an outfit recommendation
 * to create more focused search queries
 */

// Key garment terms to look for in outfit descriptions
const GARMENT_KEYWORDS = [
  // Tops
  'blazer', 'jacket', 'coat', 'cardigan', 'sweater', 'pullover', 'turtleneck',
  'blouse', 'shirt', 'tee', 't-shirt', 'tank', 'vest', 'hoodie', 'sweatshirt',

  // Bottoms
  'jeans', 'pants', 'trousers', 'skirt', 'shorts', 'culottes', 'leggings',

  // Dresses & One-pieces
  'dress', 'jumpsuit', 'romper', 'gown',

  // Outerwear
  'puffer', 'parka', 'trench', 'peacoat', 'bomber', 'denim jacket', 'leather jacket',

  // Shoes
  'boots', 'sneakers', 'loafers', 'heels', 'sandals', 'flats', 'oxfords',
  'ankle boots', 'mules', 'slides', 'espadrilles',

  // Accessories
  'scarf', 'hat', 'beanie', 'gloves', 'belt', 'bag', 'sunglasses',
];

/**
 * Extract up to N key garments from an outfit description
 */
export function extractKeyGarments(outfitDescription: string, maxGarments: number = 3): string[] {
  const lowerDescription = outfitDescription.toLowerCase();
  const foundGarments: string[] = [];

  // Find all matching garments
  for (const garment of GARMENT_KEYWORDS) {
    if (lowerDescription.includes(garment)) {
      foundGarments.push(garment);
      if (foundGarments.length >= maxGarments) {
        break;
      }
    }
  }

  return foundGarments;
}

/**
 * Create an enhanced search query from outfit recommendation
 * Focuses on specific garments rather than full description
 */
export function createEnhancedSearchQuery(
  outfitDescription: string,
  colorPalette: string
): string {
  const garments = extractKeyGarments(outfitDescription, 3);

  if (garments.length === 0) {
    // Fallback to original description if no garments found
    return `${outfitDescription} ${colorPalette}`;
  }

  // Create focused query with garments and colors
  return `${garments.join(' ')} ${colorPalette}`;
}
