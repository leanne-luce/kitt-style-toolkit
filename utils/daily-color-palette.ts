/**
 * Generates a consistent daily color palette based on the date
 * This ensures the same colors appear for all users on the same day
 */

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
}

// Curated color palettes that work well for fashion
const COLOR_PALETTES: ColorPalette[] = [
  { primary: 'cream', secondary: 'camel', accent: 'black' },
  { primary: 'navy', secondary: 'white', accent: 'burgundy' },
  { primary: 'charcoal', secondary: 'grey', accent: 'ivory' },
  { primary: 'olive', secondary: 'tan', accent: 'rust' },
  { primary: 'chocolate', secondary: 'beige', accent: 'gold' },
  { primary: 'black', secondary: 'white', accent: 'red' },
  { primary: 'camel', secondary: 'ivory', accent: 'navy' },
  { primary: 'grey', secondary: 'blush', accent: 'charcoal' },
  { primary: 'khaki', secondary: 'cream', accent: 'forest green' },
  { primary: 'burgundy', secondary: 'grey', accent: 'cream' },
  { primary: 'navy', secondary: 'camel', accent: 'white' },
  { primary: 'charcoal', secondary: 'cream', accent: 'burgundy' },
  { primary: 'sage', secondary: 'cream', accent: 'brown' },
  { primary: 'taupe', secondary: 'white', accent: 'black' },
  { primary: 'denim blue', secondary: 'white', accent: 'tan' },
  { primary: 'forest green', secondary: 'cream', accent: 'brown' },
  { primary: 'rust', secondary: 'cream', accent: 'olive' },
  { primary: 'plum', secondary: 'grey', accent: 'cream' },
  { primary: 'teal', secondary: 'cream', accent: 'rust' },
  { primary: 'terracotta', secondary: 'cream', accent: 'olive' },
];

/**
 * Get the color palette for today
 * Uses the date to deterministically select a palette
 */
export function getDailyColorPalette(): ColorPalette {
  const today = new Date();
  // Use year and day of year to get consistent palette per day
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = (today.getFullYear() + dayOfYear) % COLOR_PALETTES.length;
  return COLOR_PALETTES[index];
}

/**
 * Format color palette for search query
 */
export function formatColorPaletteForSearch(palette: ColorPalette): string {
  return `${palette.primary} ${palette.secondary} ${palette.accent}`;
}
