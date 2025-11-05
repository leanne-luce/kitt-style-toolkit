import { IllustrationType } from '@/components/illustrations/fashion-illustrations';

/**
 * Maps prompt indices to their corresponding illustration types.
 * Each prompt gets assigned a thematically appropriate illustration.
 */
export const promptIllustrationMap: Record<number, IllustrationType> = {
  // Scenario-Based (0-4)
  0: 'spy',          // Spy at hotel
  1: 'ghost',        // Victorian ghost
  2: 'sparkle',      // Tea with Queen then rob bank
  3: 'dress',        // Retired ballerina
  4: 'sparkle',      // Diplomat from fictional country

  // Music-Inspired (5-9)
  5: 'music',        // Life on Mars
  6: 'music',        // Fifth member of ABBA
  7: 'music',        // Fleetwood Mac Rumours
  8: 'music',        // Music video from 1985
  9: 'music',        // Stevie Nicks groceries

  // Specific Items (10-14)
  10: 'socks',       // Striped socks
  11: 'patterns',    // Three textures
  12: 'dress',       // Button-down strange
  13: 'patterns',    // Scarf multiple ways
  14: 'sparkle',     // Big earrings

  // Color Directives (15-19)
  15: 'color',       // Blue
  16: 'color',       // Monochrome with pop
  17: 'color',       // Pink
  18: 'color',       // Black with wild accessory
  19: 'color',       // Orange and pink

  // Unexpected Juxtapositions (20-24)
  20: 'patterns',    // Boardroom and beach
  21: 'patterns',    // Punk and prairie
  22: 'cowboy',      // Cowboy at opera
  23: 'dress',       // Athletic wear Edwardian
  24: 'patterns',    // Possessed prep

  // Sentimental/Personal (25-29)
  25: 'necklaces',   // Grandmother piece
  26: 'sparkle',     // Teenage cool
  27: 'dress',       // Loved not practical
  28: 'sparkle',     // Getting away with something
  29: 'dress',       // Person who never showed

  // Maximalist Challenges (30-34)
  30: 'rings',       // All rings
  31: 'patterns',    // Multiple patterns
  32: 'necklaces',   // Pile on necklaces
  33: 'sparkle',     // Multiple brooches
  34: 'color',       // Four shades same color

  // Rediscovery (35-39)
  35: 'dress',       // Haven't touched in 6 months
  36: 'dress',       // Impulse buy 2019
  37: 'sparkle',     // Too much piece
  38: 'dress',       // Forgot you loved
  39: 'sparkle',     // Special occasion piece

  // Bold Declarations (40-44)
  40: 'lipstick',    // Red lipstick armor
  41: 'sparkle',     // Quit job confidence
  42: 'cowboy',      // Wearing a hat
  43: 'spy',         // Sunglasses indoors
  44: 'dress',       // Walk differently

  // Absurd & Whimsical (45-49)
  45: 'sparkle',     // Seductive librarian
  46: 'patterns',    // Wes Anderson
  47: 'spy',         // 1960s Italian film star
  48: 'sparkle',     // Know something
  49: 'dress',       // Confuse your mother

  // Texture & Fabric Focus (50-54)
  50: 'patterns',    // Velvet day
  51: 'dress',       // Linen louche
  52: 'patterns',    // Leather and lace
  53: 'sparkle',     // Makes noise
  54: 'dress',       // Silk

  // Time Period Inspirations (55-59)
  55: 'spy',         // 1973 glamorous
  56: 'sparkle',     // 1920s reckless
  57: 'patterns',    // 1990s minimal + feral
  58: 'dress',       // 1950s scandalous housewife
  59: 'sparkle',     // 1980s power

  // Weather/Season Defiance (60-62)
  60: 'patterns',    // Ignore weather
  61: 'dress',       // Secret rebellion
  62: 'patterns',    // Wrong season

  // Confidence Builders (63-69)
  63: 'sparkle',     // Belong anywhere
  64: 'sparkle',     // Inherited castle
  65: 'dress',       // Stand up straighter
  66: 'sparkle',     // In on the joke
  67: 'sparkle',     // Most interesting person
};

/**
 * Gets the illustration type for a specific prompt index.
 * Falls back to 'sparkle' if no mapping exists.
 */
export function getIllustrationForPrompt(promptIndex: number): IllustrationType {
  return promptIllustrationMap[promptIndex] || 'sparkle';
}
