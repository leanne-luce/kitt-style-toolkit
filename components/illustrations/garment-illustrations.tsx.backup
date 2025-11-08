import React from 'react';
import Svg, { Circle, Ellipse, G, Path, Line } from 'react-native-svg';

interface IllustrationProps {
  size?: number;
  color?: string;
}

// Layers illustration - stacked clothing
export const LayersIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Bottom layer - sweater */}
      <Path d="M 30 45 Q 30 38 35 35 L 40 35 L 45 30 Q 50 28 55 30 L 60 35 L 65 35 Q 70 38 70 45 L 70 75 Q 70 78 67 78 L 33 78 Q 30 78 30 75 Z" fill={color} opacity="0.08" />
      {/* Middle layer - shirt collar peeking out */}
      <Path d="M 42 35 Q 45 32 50 32 Q 55 32 58 35" strokeWidth="2" />
      {/* Top layer - jacket */}
      <Path d="M 25 50 L 30 48 L 35 45 L 40 42 Q 45 40 50 40 Q 55 40 60 42 L 65 45 L 70 48 L 75 50 L 75 85 Q 75 88 72 88 L 52 88 L 52 78 L 48 78 L 48 88 L 28 88 Q 25 88 25 85 Z" strokeWidth="2.5" />
      {/* Jacket collar */}
      <Path d="M 48 42 L 45 50 M 52 42 L 55 50" strokeWidth="2" />
    </G>
  </Svg>
);

// Accessories illustration - scarf/hat
export const AccessoriesIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Beanie hat */}
      <Path d="M 35 48 Q 34 40 40 35 Q 45 32 50 32 Q 55 32 60 35 Q 66 40 65 48 L 65 52 Q 65 56 60 56 L 40 56 Q 35 56 35 52 Z" fill={color} opacity="0.1" strokeWidth="2.5" />
      {/* Ribbed texture on hat */}
      <Path d="M 38 45 L 38 52" strokeWidth="1.5" opacity="0.4" />
      <Path d="M 43 42 L 43 52" strokeWidth="1.5" opacity="0.4" />
      <Path d="M 48 40 L 48 52" strokeWidth="1.5" opacity="0.4" />
      <Path d="M 53 40 L 53 52" strokeWidth="1.5" opacity="0.4" />
      <Path d="M 58 42 L 58 52" strokeWidth="1.5" opacity="0.4" />
      {/* Pom pom on top */}
      <Circle cx="50" cy="28" r="5" fill={color} opacity="0.15" strokeWidth="2" />
      {/* Scarf wrapped around */}
      <Path d="M 32 62 Q 40 58 50 58 Q 60 58 68 62 Q 72 64 70 68 L 68 72 Q 66 68 60 66 Q 50 64 40 66 Q 34 68 32 72 L 30 68 Q 28 64 32 62" fill={color} opacity="0.12" strokeWidth="2.5" />
      {/* Scarf ends */}
      <Path d="M 30 72 L 28 80 L 26 88" strokeWidth="2.5" />
      <Path d="M 32 74 L 32 82 L 30 88" strokeWidth="2.5" />
    </G>
  </Svg>
);

// Footwear illustration - boots
export const FootwearIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Left boot */}
      <Path d="M 28 45 L 28 70 Q 28 75 32 78 L 38 78 Q 42 78 44 74 L 44 68 L 42 50 Q 42 45 38 45 Z" fill={color} opacity="0.1" strokeWidth="2.5" />
      {/* Boot sole */}
      <Path d="M 32 78 Q 28 80 28 84 L 44 84 Q 44 80 44 78" strokeWidth="2.5" />
      {/* Boot details - laces/seam */}
      <Path d="M 35 50 L 35 72" strokeWidth="1.5" opacity="0.4" />

      {/* Right boot */}
      <Path d="M 56 45 L 56 70 Q 56 75 60 78 L 66 78 Q 70 78 72 74 L 72 68 L 70 50 Q 70 45 66 45 Z" fill={color} opacity="0.1" strokeWidth="2.5" />
      {/* Boot sole */}
      <Path d="M 60 78 Q 56 80 56 84 L 72 84 Q 72 80 72 78" strokeWidth="2.5" />
      {/* Boot details */}
      <Path d="M 63 50 L 63 72" strokeWidth="1.5" opacity="0.4" />
    </G>
  </Svg>
);

// Light layers - t-shirt
export const LightLayersIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* T-shirt */}
      <Path d="M 35 38 L 30 42 L 30 50 L 35 48 L 35 75 Q 35 78 38 78 L 62 78 Q 65 78 65 75 L 65 48 L 70 50 L 70 42 L 65 38 L 60 35 Q 55 32 50 32 Q 45 32 40 35 Z" fill={color} opacity="0.08" strokeWidth="2.5" />
      {/* Neckline */}
      <Path d="M 42 35 Q 45 33 50 33 Q 55 33 58 35 L 58 38 Q 55 40 50 40 Q 45 40 42 38 Z" strokeWidth="2" />
      {/* Cute pocket detail */}
      <Path d="M 43 52 L 57 52 L 57 60 Q 50 62 43 60 Z" strokeWidth="1.5" />
    </G>
  </Svg>
);

// Rain gear - umbrella
export const RainGearIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Umbrella canopy */}
      <Path d="M 50 40 Q 35 42 28 50 Q 25 54 28 58 L 35 52 Q 42 48 50 48 Q 58 48 65 52 L 72 58 Q 75 54 72 50 Q 65 42 50 40" fill={color} opacity="0.12" strokeWidth="2.5" />
      {/* Umbrella panels */}
      <Path d="M 50 40 L 50 48" strokeWidth="1.5" opacity="0.4" />
      <Path d="M 50 40 Q 42 42 35 48" strokeWidth="1.5" opacity="0.4" />
      <Path d="M 50 40 Q 58 42 65 48" strokeWidth="1.5" opacity="0.4" />
      {/* Handle */}
      <Path d="M 50 48 L 50 75 Q 50 78 53 78 Q 56 78 56 75" strokeWidth="2.5" />
      {/* Raindrops */}
      <Path d="M 32 64 Q 32 68 34 70 Q 36 72 38 70 Q 40 68 40 64" strokeWidth="1.5" fill={color} opacity="0.1" />
      <Path d="M 60 66 Q 60 70 62 72 Q 64 74 66 72 Q 68 70 68 66" strokeWidth="1.5" fill={color} opacity="0.1" />
    </G>
  </Svg>
);

// Waterproof - raincoat
export const WaterproofIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Raincoat with hood */}
      <Path d="M 38 32 Q 42 28 50 28 Q 58 28 62 32 L 65 35 Q 68 38 68 42 L 68 45 L 72 48 L 72 82 Q 72 86 68 86 L 52 86 L 52 76 L 48 76 L 48 86 L 32 86 Q 28 86 28 82 L 28 48 L 32 45 L 32 42 Q 32 38 35 35 Z" fill={color} opacity="0.1" strokeWidth="2.5" />
      {/* Hood detail */}
      <Path d="M 38 32 Q 42 30 50 30 Q 58 30 62 32" strokeWidth="2" />
      {/* Zipper */}
      <Path d="M 50 45 L 50 82" strokeWidth="1.5" opacity="0.4" />
      <Circle cx="50" cy="48" r="2" fill={color} opacity="0.3" />
      {/* Pockets */}
      <Path d="M 36 58 L 42 58 L 42 66" strokeWidth="1.5" />
      <Path d="M 64 58 L 58 58 L 58 66" strokeWidth="1.5" />
    </G>
  </Svg>
);

/**
 * Get appropriate garment illustration based on text content
 */
export function getGarmentIllustration(text: string): React.FC<IllustrationProps> {
  const lowerText = text.toLowerCase();

  // Check for rain/waterproof gear
  if (lowerText.includes('umbrella') || lowerText.includes('rain jacket')) {
    return RainGearIllustration;
  }

  if (lowerText.includes('waterproof') || lowerText.includes('rain')) {
    return WaterproofIllustration;
  }

  // Check for accessories
  if (lowerText.includes('scarf') || lowerText.includes('hat') ||
      lowerText.includes('gloves') || lowerText.includes('beanie')) {
    return AccessoriesIllustration;
  }

  // Check for footwear
  if (lowerText.includes('boot') || lowerText.includes('shoe') ||
      lowerText.includes('sneaker')) {
    return FootwearIllustration;
  }

  // Check for light layers
  if (lowerText.includes('light') || lowerText.includes('breathable') ||
      lowerText.includes('t-shirt') || lowerText.includes('single')) {
    return LightLayersIllustration;
  }

  // Default to layers for anything else
  return LayersIllustration;
}
