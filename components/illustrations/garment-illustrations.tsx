import React from 'react';
import Svg, { Circle, Ellipse, G, Path, Line, Rect } from 'react-native-svg';

interface IllustrationProps {
  size?: number;
  color?: string;
}

// ============ LAYERS ILLUSTRATIONS ============

// Heavy layers - winter coat (puffy coat with sleeves)
export const HeavyLayersIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Left sleeve */}
      <Path d="M 28 42 L 24 46 Q 22 50 22 54 L 22 64 Q 22 66 24 66 L 28 65 L 28 42" fill={color} opacity="0.08" strokeWidth="2" />
      {/* Sleeve quilting */}
      <Path d="M 23 52 Q 25 53 27 52" strokeWidth="1.5" opacity="0.3" />
      <Path d="M 23 58 Q 25 59 27 58" strokeWidth="1.5" opacity="0.3" />

      {/* Right sleeve */}
      <Path d="M 72 42 L 76 46 Q 78 50 78 54 L 78 64 Q 78 66 76 66 L 72 65 L 72 42" fill={color} opacity="0.08" strokeWidth="2" />
      {/* Sleeve quilting */}
      <Path d="M 73 52 Q 75 53 77 52" strokeWidth="1.5" opacity="0.3" />
      <Path d="M 73 58 Q 75 59 77 58" strokeWidth="1.5" opacity="0.3" />

      {/* Puffy winter coat body - slightly imperfect edges for hand-drawn feel */}
      <Path d="M 28 42 L 32 38 Q 33 37 38 35 Q 44 32.5 50 32 Q 56 32.5 62 35 Q 67 37 68 38 L 72 42 L 72.5 80 Q 72 83.5 68 84 L 32 84 Q 28 83.5 27.5 80 Z" fill={color} opacity="0.12" strokeWidth="2" />

      {/* Hood - hand-drawn style with slight curves */}
      <Path d="M 36 35 Q 37.5 28 44 25.5 Q 47 24 50 24 Q 53 24 56 25.5 Q 62.5 28 64 35" strokeWidth="2" />
      <Path d="M 36 35 Q 36.5 37 36 40 M 64 35 Q 63.5 37 64 40" strokeWidth="1.8" />

      {/* Puffy horizontal quilting lines - slightly wavy for hand-drawn effect */}
      <Path d="M 30 50 Q 35 51 40 51.5 Q 45 52 50 51.5 Q 55 51 60 51.5 Q 65 52 70 50" strokeWidth="1.5" opacity="0.35" />
      <Path d="M 30 60 Q 35 61 40 61.5 Q 45 62 50 61.5 Q 55 61 60 61.5 Q 65 62 70 60" strokeWidth="1.5" opacity="0.35" />
      <Path d="M 30 70 Q 35 71 40 71.5 Q 45 72 50 71.5 Q 55 71 60 71.5 Q 65 72 70 70" strokeWidth="1.5" opacity="0.35" />

      {/* Zipper - slightly imperfect */}
      <Path d="M 50 40 Q 50.5 50 50 60 Q 49.5 70 50 80" strokeWidth="2" opacity="0.6" />
      <Rect x="48" y="38" width="4" height="4" fill={color} opacity="0.25" rx="0.5" />

      {/* Pockets - hand-drawn curves */}
      <Path d="M 34 56 Q 37 56.5 40 56 Q 40.5 58 40 60" strokeWidth="2" />
      <Path d="M 66 56 Q 63 56.5 60 56 Q 59.5 58 60 60" strokeWidth="2" />
    </G>
  </Svg>
);

// Medium layers - cozy sweater
export const MediumLayersIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Sweater body - hand-drawn with slight imperfections */}
      <Path d="M 32 40 Q 31.5 41 28 44 L 28 50 Q 29 49 32 48 L 32.5 78 Q 32 81.5 36 82 L 64 82 Q 68 81.5 67.5 78 L 68 48 Q 71 49 72 50 L 72 44 Q 68.5 41 68 40 L 62 36 Q 56 32.5 50 32 Q 44 32.5 38 36 Z" fill={color} opacity="0.14" strokeWidth="2" />

      {/* Crew neck - sketchy style */}
      <Path d="M 42 36 Q 44.5 33.5 47 33 Q 48.5 32.5 50 33 Q 51.5 32.5 53 33 Q 55.5 33.5 58 36" strokeWidth="2" />
      <Path d="M 42 37 Q 45 34 50 34 Q 55 34 58 37" strokeWidth="1.5" opacity="0.4" />

      {/* Ribbed cuffs - irregular spacing for hand-drawn feel */}
      <Path d="M 32 78 Q 33.5 78.5 36 78 M 64 78 Q 66.5 78.5 68 78" strokeWidth="2" opacity="0.5" />
      <Path d="M 32 75 Q 33.5 75.5 36 75 M 64 75 Q 66.5 75.5 68 75" strokeWidth="1.5" opacity="0.4" />
      <Path d="M 32 72 Q 33.5 72.5 36 72 M 64 72 Q 66.5 72.5 68 72" strokeWidth="1.5" opacity="0.4" />

      {/* Ribbed hem - slightly wavy */}
      <Path d="M 36 82 Q 45 81.5 50 82 Q 55 82.5 64 82" strokeWidth="1.8" opacity="0.5" />

      {/* Cable knit pattern - hand-drawn curves */}
      <Path d="M 46 50 Q 47.5 51.5 49 50.5 Q 49.5 51 50 50.5 Q 50.5 51 51 50.5 Q 52.5 51.5 54 50" strokeWidth="1.5" opacity="0.3" />
      <Path d="M 46 58 Q 47.5 59.5 49 58.5 Q 49.5 59 50 58.5 Q 50.5 59 51 58.5 Q 52.5 59.5 54 58" strokeWidth="1.5" opacity="0.3" />
      <Path d="M 46 66 Q 47.5 67.5 49 66.5 Q 49.5 67 50 66.5 Q 50.5 67 51 66.5 Q 52.5 67.5 54 66" strokeWidth="1.5" opacity="0.3" />
    </G>
  </Svg>
);

// Light layers - open cardigan
export const LightLayersIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Cardigan left side - hand-drawn edges */}
      <Path d="M 28 38 Q 30 37 32 36 L 36 34 Q 39.5 32.5 43 32 L 44 32 Q 44.5 40 44 50 Q 43.5 65 44 80 Q 44 83.5 40 84 L 30 84 Q 28.5 84 28 82 Z" fill={color} opacity="0.1" strokeWidth="2" />

      {/* Cardigan right side - hand-drawn edges */}
      <Path d="M 72 38 Q 70 37 68 36 L 64 34 Q 60.5 32.5 57 32 L 56 32 Q 55.5 40 56 50 Q 56.5 65 56 80 Q 56 83.5 60 84 L 70 84 Q 71.5 84 72 82 Z" fill={color} opacity="0.1" strokeWidth="2" />

      {/* T-shirt underneath (visible in center) - slightly imperfect */}
      <Path d="M 44 40 Q 44.5 50 44 60 Q 43.5 70 44 78 L 56 78 Q 56.5 70 56 60 Q 55.5 50 56 40" fill={color} opacity="0.05" strokeWidth="1.5" />
      <Path d="M 46 36 Q 47.5 34.5 49 34 Q 50 33.5 51 34 Q 52.5 34.5 54 36" strokeWidth="1.5" />

      {/* Cardigan buttons - slightly irregular */}
      <Circle cx="42" cy="45" r="1.5" fill={color} opacity="0.8" />
      <Circle cx="42.5" cy="55" r="1.5" fill={color} opacity="0.8" />
      <Circle cx="42" cy="65" r="1.5" fill={color} opacity="0.8" />
      <Circle cx="58" cy="45" r="1.5" fill={color} opacity="0.8" />
      <Circle cx="57.5" cy="55" r="1.5" fill={color} opacity="0.8" />
      <Circle cx="58" cy="65" r="1.5" fill={color} opacity="0.8" />

      {/* Cardigan collar/neckline - sketchy */}
      <Path d="M 44 32 Q 45.5 30.5 48 30 Q 49 29.5 50 30 Q 51 29.5 52 30 Q 54.5 30.5 56 32" strokeWidth="2" />
    </G>
  </Svg>
);

// Single layer - basic tee
export const SingleLayerIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* T-shirt body - hand-drawn with organic curves */}
      <Path d="M 36 38 Q 34 40 32 42 Q 32 44 32 48 Q 34 47 36 46 L 36.5 78 Q 36 81.5 40 82 L 60 82 Q 64 81.5 63.5 78 L 64 46 Q 66 47 68 48 Q 68 44 68 42 Q 66 40 64 38 L 60 34 Q 55 32.5 50 32 Q 45 32.5 40 34 Z" fill={color} opacity="0.1" strokeWidth="2" />

      {/* V-neck - slightly imperfect */}
      <Path d="M 42 34 Q 45 37 48 40 Q 49 41 50 42 Q 51 41 52 40 Q 55 37 58 34" strokeWidth="2" />

      {/* Short sleeves with rolled cuffs - sketchy style */}
      <Path d="M 32 42 Q 30.5 43.5 30 46 Q 30 47 30 48" strokeWidth="2" />
      <Path d="M 68 42 Q 69.5 43.5 70 46 Q 70 47 70 48" strokeWidth="2" />
      <Path d="M 32 46 Q 33.5 46.5 36 46 M 64 46 Q 66.5 46.5 68 46" strokeWidth="1.8" opacity="0.5" />
    </G>
  </Svg>
);

// Blazer illustration - tailored blazer with notched lapels and sleeves
export const BlazerIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Left sleeve */}
      <Path d="M 30 42 L 26 46 Q 24 50 24 56 L 24 68 Q 24 70 26 70 L 30 69 L 30 42" fill={color} opacity="0.08" strokeWidth="2" />

      {/* Right sleeve */}
      <Path d="M 70 42 L 74 46 Q 76 50 76 56 L 76 68 Q 76 70 74 70 L 70 69 L 70 42" fill={color} opacity="0.08" strokeWidth="2" />

      {/* Blazer body - more structured, single-breasted */}
      <Path d="M 30 42 Q 32 40 34 38 L 38 36 Q 43 34 47 33.5 Q 49 33 50 33 Q 51 33 53 33.5 Q 57 34 62 36 L 66 38 Q 68 40 70 42 L 70 80 Q 70 83 67 84 L 54 84 L 54 78 L 50 78 L 50 84 L 33 84 Q 30 83 30 80 Z" fill={color} opacity="0.12" strokeWidth="2" />

      {/* Left lapel - prominent notched lapel */}
      <Path d="M 38 36 L 35 40 L 33 46" strokeWidth="2.2" />
      <Path d="M 38 36 L 42 40 L 44 44 L 46 48" strokeWidth="2.2" />
      {/* Lapel notch detail */}
      <Path d="M 38 36 L 40 38" strokeWidth="1.5" opacity="0.5" />

      {/* Right lapel - prominent notched lapel */}
      <Path d="M 62 36 L 65 40 L 67 46" strokeWidth="2.2" />
      <Path d="M 62 36 L 58 40 L 56 44 L 54 48" strokeWidth="2.2" />
      {/* Lapel notch detail */}
      <Path d="M 62 36 L 60 38" strokeWidth="1.5" opacity="0.5" />

      {/* Center button line / front closure */}
      <Path d="M 50 48 Q 50.5 55 50 62 Q 49.5 70 50 78" strokeWidth="1.5" opacity="0.3" />

      {/* Single-breasted buttons - left side */}
      <Circle cx="48" cy="56" r="1.2" fill={color} opacity="0.8" />
      <Circle cx="48.5" cy="64" r="1.2" fill={color} opacity="0.8" />

      {/* Pocket square - right breast pocket */}
      <Path d="M 58 50 L 64 50 Q 64 52 64 54 L 58 54 Q 58 52 58 50 Z" strokeWidth="1.5" fill={color} opacity="0.12" />
      <Path d="M 59 50.5 Q 60 51 61 51.5 Q 62 52 62.5 52.5" strokeWidth="1" opacity="0.4" />

      {/* Left welt pocket */}
      <Path d="M 35 52 Q 38 52.5 41 52" strokeWidth="1.8" opacity="0.5" />

      {/* Right hip pocket with flap */}
      <Path d="M 55 66 Q 58 66.5 61 66" strokeWidth="1.8" opacity="0.5" />
      <Path d="M 55 66 L 55 70 Q 55 71 56 71 L 60 71 Q 61 71 61 70 L 61 66" strokeWidth="1.5" opacity="0.3" />

      {/* Shoulder padding structure lines */}
      <Path d="M 34 38 Q 36 37 38 36.5 M 66 38 Q 64 37 62 36.5" strokeWidth="1.5" opacity="0.4" />
    </G>
  </Svg>
);

// Denim jacket illustration - classic denim with pockets, stitching, and sleeves
export const DenimJacketIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Left sleeve */}
      <Path d="M 32 44 L 28 48 Q 26 52 26 58 L 26 70 Q 26 72 28 72 L 32 71 L 32 44" fill={color} opacity="0.08" strokeWidth="2" />
      {/* Sleeve seam stitching */}
      <Path d="M 28 55 Q 29.5 56 31 55" strokeWidth="1" opacity="0.4" />

      {/* Right sleeve */}
      <Path d="M 68 44 L 72 48 Q 74 52 74 58 L 74 70 Q 74 72 72 72 L 68 71 L 68 44" fill={color} opacity="0.08" strokeWidth="2" />
      {/* Sleeve seam stitching */}
      <Path d="M 69 55 Q 70.5 56 72 55" strokeWidth="1" opacity="0.4" />

      {/* Denim jacket body - hand-drawn with organic edges */}
      <Path d="M 32 44 Q 34 42 36 40 L 42 37 Q 45.5 35.5 49 35 Q 50 34.5 51 35 Q 54.5 35.5 58 37 L 64 40 Q 66 42 68 44 L 68.5 76 Q 68 79.5 64 80 L 53 80 Q 53.5 76 53 72 L 47 72 Q 46.5 76 47 80 L 36 80 Q 32 79.5 31.5 76 Z" fill={color} opacity="0.12" strokeWidth="2" />

      {/* Classic denim collar - sketchy lines */}
      <Path d="M 42 37 Q 40 39.5 38 42 L 36.5 50" strokeWidth="2" />
      <Path d="M 58 37 Q 60 39.5 62 42 L 63.5 50" strokeWidth="2" />

      {/* Chest pockets with flaps - hand-drawn rectangles */}
      <Path d="M 36 50 Q 39.5 50.5 43 50 L 43.5 58 L 36 58 Q 36 54 36 50 Z" strokeWidth="2" fill={color} opacity="0.1" />
      <Path d="M 57 50 Q 60.5 50.5 64 50 L 64 58 Q 60.5 57.5 57 58 Q 57 54 57 50 Z" strokeWidth="2" fill={color} opacity="0.1" />
      {/* Pocket flaps - slightly wavy */}
      <Path d="M 36 50 Q 39.5 50.5 43 50 M 57 50 Q 60.5 50.5 64 50" strokeWidth="2" />
      <Circle cx="38" cy="53" r="0.8" fill={color} opacity="0.6" />
      <Circle cx="59.5" cy="53" r="0.8" fill={color} opacity="0.6" />

      {/* Button placket down center - hand-drawn vertical lines */}
      <Path d="M 47 50 Q 47.5 55 47 60 Q 46.5 66 47 72 M 53 50 Q 52.5 55 53 60 Q 53.5 66 53 72" strokeWidth="1.5" opacity="0.3" />

      {/* Metal buttons - smaller */}
      <Circle cx="48" cy="55" r="1.1" fill={color} opacity="0.8" />
      <Circle cx="48.5" cy="62" r="1.1" fill={color} opacity="0.8" />
      <Circle cx="48" cy="69" r="1.1" fill={color} opacity="0.8" />

      {/* Iconic denim stitching detail - hand-drawn topstitching */}
      <Path d="M 38 52 Q 39.5 52.5 41 52 M 59 52 Q 60.5 52.5 62 52" strokeWidth="1" opacity="0.5" />
      <Path d="M 34 60 Q 35 61 36 61.5 Q 37 62 38 62 M 62 62 Q 63 62 64 61.5 Q 65 61 66 60" strokeWidth="1.5" opacity="0.4" />
    </G>
  </Svg>
);

// ============ ACCESSORIES ILLUSTRATIONS ============

// Sunglasses and hat
export const SunAccessoriesIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Wide-brim hat */}
      <Ellipse cx="50" cy="45" rx="22" ry="6" fill={color} opacity="0.1" strokeWidth="2.5" />
      <Path d="M 35 45 Q 35 38 42 35 Q 46 33 50 33 Q 54 33 58 35 Q 65 38 65 45" fill={color} opacity="0.08" strokeWidth="2.5" />
      {/* Sunglasses */}
      <G transform="translate(0, 20)">
        <Path d="M 35 48 L 38 48 Q 40 48 42 50 L 42 54 Q 40 56 38 56 L 35 56 Q 33 56 33 54 L 33 50 Q 33 48 35 48 Z" fill={color} opacity="0.15" strokeWidth="2" />
        <Path d="M 58 48 L 61 48 Q 63 48 65 50 L 65 54 Q 63 56 61 56 L 58 56 Q 56 56 56 54 L 56 50 Q 56 48 58 48 Z" fill={color} opacity="0.15" strokeWidth="2" />
        <Path d="M 42 52 L 56 52" strokeWidth="1.5" />
      </G>
    </G>
  </Svg>
);

// Scarf and beanie
export const WinterAccessoriesIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Beanie hat */}
      <Path d="M 35 48 Q 34 40 40 35 Q 45 32 50 32 Q 55 32 60 35 Q 66 40 65 48 L 65 52 Q 65 56 60 56 L 40 56 Q 35 56 35 52 Z" fill={color} opacity="0.1" strokeWidth="2.5" />
      {/* Ribbed texture on hat */}
      <Path d="M 38 45 L 38 52 M 43 42 L 43 52 M 48 40 L 48 52 M 53 40 L 53 52 M 58 42 L 58 52" strokeWidth="1.5" opacity="0.4" />
      {/* Pom pom on top */}
      <Circle cx="50" cy="28" r="5" fill={color} opacity="0.15" strokeWidth="2" />
      {/* Scarf wrapped around */}
      <Path d="M 32 62 Q 40 58 50 58 Q 60 58 68 62 Q 72 64 70 68 L 68 72 Q 66 68 60 66 Q 50 64 40 66 Q 34 68 32 72 L 30 68 Q 28 64 32 62" fill={color} opacity="0.12" strokeWidth="2.5" />
      {/* Scarf ends */}
      <Path d="M 30 72 L 28 80 L 26 88 M 32 74 L 32 82 L 30 88" strokeWidth="2.5" />
    </G>
  </Svg>
);

// Bag illustration
export const BagIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Tote bag */}
      <Path d="M 32 45 L 30 48 L 30 78 Q 30 82 34 82 L 66 82 Q 70 82 70 78 L 70 48 L 68 45 Z" fill={color} opacity="0.08" strokeWidth="2.5" />
      {/* Handles */}
      <Path d="M 38 45 Q 38 38 42 35 Q 45 33 48 35 M 52 35 Q 55 33 58 35 Q 62 38 62 45" strokeWidth="2.5" />
      {/* Bag details */}
      <Path d="M 35 52 L 65 52" strokeWidth="1.5" opacity="0.3" />
      <Circle cx="50" cy="65" r="3" strokeWidth="1.5" opacity="0.4" />
    </G>
  </Svg>
);

// Umbrella illustration
export const UmbrellaIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Umbrella canopy */}
      <Path d="M 50 40 Q 35 42 28 50 Q 25 54 28 58 L 35 52 Q 42 48 50 48 Q 58 48 65 52 L 72 58 Q 75 54 72 50 Q 65 42 50 40" fill={color} opacity="0.12" strokeWidth="2.5" />
      {/* Umbrella panels */}
      <Path d="M 50 40 L 50 48 M 50 40 Q 42 42 35 48 M 50 40 Q 58 42 65 48" strokeWidth="1.5" opacity="0.4" />
      {/* Handle */}
      <Path d="M 50 48 L 50 75 Q 50 78 53 78 Q 56 78 56 75" strokeWidth="2.5" />
      {/* Raindrops */}
      <Path d="M 32 64 Q 32 68 34 70 Q 36 72 38 70 Q 40 68 40 64 M 60 66 Q 60 70 62 72 Q 64 74 66 72 Q 68 70 68 66" strokeWidth="1.5" fill={color} opacity="0.1" />
    </G>
  </Svg>
);

// Watch and jewelry
export const JewelryIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Watch */}
      <Rect x="42" y="45" width="16" height="20" rx="2" fill={color} opacity="0.08" strokeWidth="2" />
      <Circle cx="50" cy="55" r="6" strokeWidth="1.5" />
      {/* Watch hands */}
      <Path d="M 50 55 L 50 52 M 50 55 L 53 55" strokeWidth="1" opacity="0.6" />
      {/* Watch band */}
      <Path d="M 42 45 L 42 38 Q 42 35 45 35 L 55 35 Q 58 35 58 38 L 58 45" strokeWidth="2" />
      <Path d="M 42 65 L 42 72 Q 42 75 45 75 L 55 75 Q 58 75 58 72 L 58 65" strokeWidth="2" />
      {/* Bracelet */}
      <Circle cx="32" cy="55" r="8" strokeWidth="2" opacity="0.5" />
      <Circle cx="68" cy="55" r="8" strokeWidth="2" opacity="0.5" />
    </G>
  </Svg>
);

// Gloves illustration
export const GlovesIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Left glove */}
      <Path d="M 28 55 L 28 75 Q 28 78 31 78 L 40 78 Q 43 78 43 75 L 43 60 L 42 55 L 40 52 L 37 50 Q 35 49 33 50 L 30 52 Z" fill={color} opacity="0.1" strokeWidth="2" />
      <Path d="M 36 50 L 36 55 M 39 50 L 39 56" strokeWidth="1.5" opacity="0.4" />
      {/* Right glove */}
      <Path d="M 57 55 L 57 75 Q 57 78 60 78 L 69 78 Q 72 78 72 75 L 72 60 L 71 55 L 69 52 L 66 50 Q 64 49 62 50 L 59 52 Z" fill={color} opacity="0.1" strokeWidth="2" />
      <Path d="M 65 50 L 65 55 M 62 50 L 62 56" strokeWidth="1.5" opacity="0.4" />
      {/* Ribbed cuffs */}
      <Path d="M 28 72 L 43 72 M 57 72 L 72 72" strokeWidth="1" opacity="0.3" />
    </G>
  </Svg>
);

// ============ FOOTWEAR ILLUSTRATIONS ============

// Boots illustration - knee-high boots with heel
export const BootsIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Left boot - tall shaft */}
      <Path d="M 30 30 L 30 68 Q 30 70 32 72 L 38 72 Q 40 70 40 68 L 40 30 Q 40 28 38 28 L 32 28 Q 30 28 30 30 Z" fill={color} opacity="0.1" strokeWidth="2" />

      {/* Left boot sole and heel */}
      <Path d="M 32 72 L 28 72 Q 26 72 26 74 L 26 78 Q 26 80 28 80 L 38 80 Q 40 80 40 78 L 40 72" strokeWidth="2" fill={color} opacity="0.08" />

      {/* Heel detail - left */}
      <Path d="M 32 80 L 32 84 Q 32 86 34 86 L 36 86 Q 38 86 38 84 L 38 80" strokeWidth="2" fill={color} opacity="0.15" />

      {/* Zipper and stitching detail - left */}
      <Path d="M 35 32 L 35 68" strokeWidth="1.5" opacity="0.4" />
      <Path d="M 32 40 L 38 40 M 32 50 L 38 50 M 32 60 L 38 60" strokeWidth="1" opacity="0.3" />

      {/* Right boot - tall shaft */}
      <Path d="M 60 30 L 60 68 Q 60 70 62 72 L 68 72 Q 70 70 70 68 L 70 30 Q 70 28 68 28 L 62 28 Q 60 28 60 30 Z" fill={color} opacity="0.1" strokeWidth="2" />

      {/* Right boot sole and heel */}
      <Path d="M 62 72 L 58 72 Q 56 72 56 74 L 56 78 Q 56 80 58 80 L 68 80 Q 70 80 70 78 L 70 72" strokeWidth="2" fill={color} opacity="0.08" />

      {/* Heel detail - right */}
      <Path d="M 62 80 L 62 84 Q 62 86 64 86 L 66 86 Q 68 86 68 84 L 68 80" strokeWidth="2" fill={color} opacity="0.15" />

      {/* Zipper and stitching detail - right */}
      <Path d="M 65 32 L 65 68" strokeWidth="1.5" opacity="0.4" />
      <Path d="M 62 40 L 68 40 M 62 50 L 68 50 M 62 60 L 68 60" strokeWidth="1" opacity="0.3" />
    </G>
  </Svg>
);

// Sneakers illustration - athletic sneaker with laces and sole
export const SneakersIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Left sneaker - toe box and upper */}
      <Path d="M 22 62 Q 22 58 26 56 L 36 56 Q 40 56 42 58 L 42 66 Q 42 68 40 70 L 26 70 Q 22 68 22 66 Z" fill={color} opacity="0.08" strokeWidth="2" />

      {/* Left sneaker sole - chunky sole */}
      <Path d="M 24 70 L 20 70 Q 18 70 18 72 L 18 76 Q 18 78 20 78 L 42 78 Q 44 78 44 76 L 44 70" strokeWidth="2.5" fill={color} opacity="0.12" />

      {/* Laces - left */}
      <Path d="M 28 58 L 28 64 M 32 58 L 32 64 M 36 58 L 36 64" strokeWidth="1.5" opacity="0.5" />
      <Path d="M 28 60 L 36 60 M 28 62 L 36 62" strokeWidth="1" opacity="0.4" />

      {/* Swoosh/stripe detail - left */}
      <Path d="M 24 64 Q 30 62 38 64" strokeWidth="2" opacity="0.3" />

      {/* Right sneaker - toe box and upper */}
      <Path d="M 58 62 Q 58 58 62 56 L 72 56 Q 76 56 78 58 L 78 66 Q 78 68 76 70 L 62 70 Q 58 68 58 66 Z" fill={color} opacity="0.08" strokeWidth="2" />

      {/* Right sneaker sole - chunky sole */}
      <Path d="M 60 70 L 56 70 Q 54 70 54 72 L 54 76 Q 54 78 56 78 L 78 78 Q 80 78 80 76 L 80 70" strokeWidth="2.5" fill={color} opacity="0.12" />

      {/* Laces - right */}
      <Path d="M 64 58 L 64 64 M 68 58 L 68 64 M 72 58 L 72 64" strokeWidth="1.5" opacity="0.5" />
      <Path d="M 64 60 L 72 60 M 64 62 L 72 62" strokeWidth="1" opacity="0.4" />

      {/* Swoosh/stripe detail - right */}
      <Path d="M 60 64 Q 66 62 74 64" strokeWidth="2" opacity="0.3" />
    </G>
  </Svg>
);

// Sandals illustration - flat sandal with straps
export const SandalsIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Left sandal - footbed/sole */}
      <Path d="M 24 72 Q 24 70 26 68 L 42 68 Q 44 70 44 72 Q 44 74 42 76 L 26 76 Q 24 74 24 72 Z" fill={color} opacity="0.08" strokeWidth="2" />

      {/* Toe strap - left */}
      <Path d="M 30 68 Q 32 64 34 64 Q 36 64 38 68" strokeWidth="2" />

      {/* Ankle strap - left */}
      <Path d="M 26 70 Q 24 66 26 62 L 42 62 Q 44 66 42 70" strokeWidth="2" />

      {/* Buckle detail - left */}
      <Circle cx="40" cy="62" r="1.5" fill={color} opacity="0.6" />

      {/* Right sandal - footbed/sole */}
      <Path d="M 56 72 Q 56 70 58 68 L 74 68 Q 76 70 76 72 Q 76 74 74 76 L 58 76 Q 56 74 56 72 Z" fill={color} opacity="0.08" strokeWidth="2" />

      {/* Toe strap - right */}
      <Path d="M 62 68 Q 64 64 66 64 Q 68 64 70 68" strokeWidth="2" />

      {/* Ankle strap - right */}
      <Path d="M 58 70 Q 56 66 58 62 L 74 62 Q 76 66 74 70" strokeWidth="2" />

      {/* Buckle detail - right */}
      <Circle cx="72" cy="62" r="1.5" fill={color} opacity="0.6" />
    </G>
  </Svg>
);

// Loafers illustration - classic penny loafer with strap detail
export const LoafersIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Left loafer - rounded toe and body */}
      <Path d="M 20 66 Q 20 62 24 60 L 40 60 Q 44 62 44 66 L 44 70 Q 44 72 42 74 L 24 74 Q 20 72 20 70 Z" fill={color} opacity="0.1" strokeWidth="2" />

      {/* Left loafer sole - flat */}
      <Path d="M 22 74 L 18 74 Q 16 74 16 76 L 16 78 Q 16 80 18 80 L 44 80 Q 46 80 46 78 L 46 74" strokeWidth="2" fill={color} opacity="0.08" />

      {/* Penny strap detail - left */}
      <Path d="M 26 64 L 38 64 Q 40 64 40 66 L 40 68 Q 40 70 38 70 L 26 70 Q 24 70 24 68 L 24 66 Q 24 64 26 64 Z" strokeWidth="2" fill={color} opacity="0.12" />

      {/* Diamond cutout - left */}
      <Path d="M 32 66 L 30 67 L 32 68 L 34 67 Z" strokeWidth="1.5" opacity="0.5" />

      {/* Moc toe stitching - left */}
      <Path d="M 22 64 Q 26 62 32 62 Q 38 62 42 64" strokeWidth="1" opacity="0.4" />

      {/* Right loafer - rounded toe and body */}
      <Path d="M 56 66 Q 56 62 60 60 L 76 60 Q 80 62 80 66 L 80 70 Q 80 72 78 74 L 60 74 Q 56 72 56 70 Z" fill={color} opacity="0.1" strokeWidth="2" />

      {/* Right loafer sole - flat */}
      <Path d="M 58 74 L 54 74 Q 52 74 52 76 L 52 78 Q 52 80 54 80 L 80 80 Q 82 80 82 78 L 82 74" strokeWidth="2" fill={color} opacity="0.08" />

      {/* Penny strap detail - right */}
      <Path d="M 62 64 L 74 64 Q 76 64 76 66 L 76 68 Q 76 70 74 70 L 62 70 Q 60 70 60 68 L 60 66 Q 60 64 62 64 Z" strokeWidth="2" fill={color} opacity="0.12" />

      {/* Diamond cutout - right */}
      <Path d="M 68 66 L 66 67 L 68 68 L 70 67 Z" strokeWidth="1.5" opacity="0.5" />

      {/* Moc toe stitching - right */}
      <Path d="M 58 64 Q 62 62 68 62 Q 74 62 78 64" strokeWidth="1" opacity="0.4" />
    </G>
  </Svg>
);

// Ankle boots illustration - Chelsea boot with elastic side panel
export const AnkleBootsIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Left ankle boot - shaft */}
      <Path d="M 28 50 L 28 68 Q 28 70 30 72 L 38 72 Q 40 70 40 68 L 40 50 Q 40 48 38 48 L 30 48 Q 28 48 28 50 Z" fill={color} opacity="0.1" strokeWidth="2" />

      {/* Left boot sole - chunky sole */}
      <Path d="M 30 72 L 26 72 Q 24 72 24 74 L 24 78 Q 24 80 26 80 L 38 80 Q 40 80 40 78 L 40 72" strokeWidth="2" fill={color} opacity="0.08" />

      {/* Small heel - left */}
      <Path d="M 30 80 L 30 82 Q 30 84 32 84 L 36 84 Q 38 84 38 82 L 38 80" strokeWidth="2" fill={color} opacity="0.12" />

      {/* Elastic side panel - left */}
      <Path d="M 28 52 Q 26 54 26 58 Q 26 62 28 64" strokeWidth="2" opacity="0.6" />
      <Path d="M 27 54 L 29 54 M 27 56 L 29 56 M 27 58 L 29 58 M 27 60 L 29 60 M 27 62 L 29 62" strokeWidth="0.8" opacity="0.4" />

      {/* Pull tab - left */}
      <Path d="M 32 48 L 32 44 Q 32 42 34 42 Q 36 42 36 44 L 36 48" strokeWidth="1.5" opacity="0.5" />

      {/* Right ankle boot - shaft */}
      <Path d="M 60 50 L 60 68 Q 60 70 62 72 L 70 72 Q 72 70 72 68 L 72 50 Q 72 48 70 48 L 62 48 Q 60 48 60 50 Z" fill={color} opacity="0.1" strokeWidth="2" />

      {/* Right boot sole - chunky sole */}
      <Path d="M 62 72 L 58 72 Q 56 72 56 74 L 56 78 Q 56 80 58 80 L 70 80 Q 72 80 72 78 L 72 72" strokeWidth="2" fill={color} opacity="0.08" />

      {/* Small heel - right */}
      <Path d="M 62 80 L 62 82 Q 62 84 64 84 L 68 84 Q 70 84 70 82 L 70 80" strokeWidth="2" fill={color} opacity="0.12" />

      {/* Elastic side panel - right */}
      <Path d="M 72 52 Q 74 54 74 58 Q 74 62 72 64" strokeWidth="2" opacity="0.6" />
      <Path d="M 71 54 L 73 54 M 71 56 L 73 56 M 71 58 L 73 58 M 71 60 L 73 60 M 71 62 L 73 62" strokeWidth="0.8" opacity="0.4" />

      {/* Pull tab - right */}
      <Path d="M 64 48 L 64 44 Q 64 42 66 42 Q 68 42 68 44 L 68 48" strokeWidth="1.5" opacity="0.5" />
    </G>
  </Svg>
);

// Insulated boots illustration - winter snow boot with fur lining
export const InsulatedBootsIllustration = ({ size = 50, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Left insulated boot - wide shaft */}
      <Path d="M 26 38 L 26 66 Q 26 68 28 70 L 40 70 Q 42 68 42 66 L 42 38 Q 42 36 40 36 L 28 36 Q 26 36 26 38 Z" fill={color} opacity="0.12" strokeWidth="2" />

      {/* Left boot sole - thick rubber sole */}
      <Path d="M 28 70 L 24 70 Q 22 70 22 72 L 22 76 Q 22 78 24 78 L 40 78 Q 42 78 42 76 L 42 70" strokeWidth="2.5" fill={color} opacity="0.15" />

      {/* Thick tread pattern - left */}
      <Path d="M 24 74 L 40 74 M 26 76 L 38 76" strokeWidth="1.5" opacity="0.4" />

      {/* Fur/fleece lining at top - left */}
      <Path d="M 26 36 Q 28 34 30 34 Q 32 36 34 34 Q 36 36 38 34 Q 40 36 42 36" strokeWidth="2" fill={color} opacity="0.15" />
      <Path d="M 27 36 Q 29 37 31 36 Q 33 37 35 36 Q 37 37 39 36 Q 41 37 41 38" strokeWidth="1.5" opacity="0.3" />

      {/* Laces - left */}
      <Path d="M 30 42 L 30 64 M 34 42 L 34 64 M 38 42 L 38 64" strokeWidth="1.5" opacity="0.4" />
      <Path d="M 30 46 L 38 46 M 30 52 L 38 52 M 30 58 L 38 58" strokeWidth="1" opacity="0.3" />

      {/* Right insulated boot - wide shaft */}
      <Path d="M 58 38 L 58 66 Q 58 68 60 70 L 72 70 Q 74 68 74 66 L 74 38 Q 74 36 72 36 L 60 36 Q 58 36 58 38 Z" fill={color} opacity="0.12" strokeWidth="2" />

      {/* Right boot sole - thick rubber sole */}
      <Path d="M 60 70 L 56 70 Q 54 70 54 72 L 54 76 Q 54 78 56 78 L 72 78 Q 74 78 74 76 L 74 70" strokeWidth="2.5" fill={color} opacity="0.15" />

      {/* Thick tread pattern - right */}
      <Path d="M 56 74 L 72 74 M 58 76 L 70 76" strokeWidth="1.5" opacity="0.4" />

      {/* Fur/fleece lining at top - right */}
      <Path d="M 58 36 Q 60 34 62 34 Q 64 36 66 34 Q 68 36 70 34 Q 72 36 74 36" strokeWidth="2" fill={color} opacity="0.15" />
      <Path d="M 59 36 Q 61 37 63 36 Q 65 37 67 36 Q 69 37 71 36 Q 73 37 73 38" strokeWidth="1.5" opacity="0.3" />

      {/* Laces - right */}
      <Path d="M 62 42 L 62 64 M 66 42 L 66 64 M 70 42 L 70 64" strokeWidth="1.5" opacity="0.4" />
      <Path d="M 62 46 L 70 46 M 62 52 L 70 52 M 62 58 L 70 58" strokeWidth="1" opacity="0.3" />
    </G>
  </Svg>
);

/**
 * Get appropriate illustration based on category and text content
 * Ensures unique illustrations for layers, accessories, and footwear
 */
export function getGarmentIllustration(
  text: string,
  category: 'layers' | 'accessories' | 'footwear'
): React.FC<IllustrationProps> {
  const lowerText = text.toLowerCase();

  if (category === 'layers') {
    // Check for specific layer types
    if (lowerText.includes('heavy') || lowerText.includes('winter coat') ||
        lowerText.includes('maximum warmth') || lowerText.includes('thermal')) {
      return HeavyLayersIllustration;
    }
    if (lowerText.includes('blazer') || lowerText.includes('sport coat')) {
      return BlazerIllustration;
    }
    if (lowerText.includes('denim') || lowerText.includes('jean jacket')) {
      return DenimJacketIllustration;
    }
    if (lowerText.includes('sweater') || lowerText.includes('medium') ||
        lowerText.includes('hoodie')) {
      return MediumLayersIllustration;
    }
    if (lowerText.includes('single') || lowerText.includes('tank') ||
        lowerText.includes('breathable') || lowerText.includes('linen')) {
      return SingleLayerIllustration;
    }
    if (lowerText.includes('light') || lowerText.includes('cardigan') ||
        lowerText.includes('kimono')) {
      return LightLayersIllustration;
    }
    // Default for layers
    return MediumLayersIllustration;
  }

  if (category === 'accessories') {
    // Check for specific accessory types
    if (lowerText.includes('umbrella')) {
      return UmbrellaIllustration;
    }
    if (lowerText.includes('gloves')) {
      return GlovesIllustration;
    }
    if (lowerText.includes('scarf') || lowerText.includes('beanie') ||
        lowerText.includes('warm hat')) {
      return WinterAccessoriesIllustration;
    }
    if (lowerText.includes('sunglasses') || lowerText.includes('wide-brim') ||
        lowerText.includes('sun')) {
      return SunAccessoriesIllustration;
    }
    if (lowerText.includes('watch') || lowerText.includes('jewelry')) {
      return JewelryIllustration;
    }
    if (lowerText.includes('bag') || lowerText.includes('tote') ||
        lowerText.includes('crossbody')) {
      return BagIllustration;
    }
    // Default for accessories
    return BagIllustration;
  }

  if (category === 'footwear') {
    // Check for specific footwear types
    if (lowerText.includes('insulated') || lowerText.includes('waterproof boot')) {
      return InsulatedBootsIllustration;
    }
    if (lowerText.includes('boot') && (lowerText.includes('ankle') || lowerText.includes('sturdy'))) {
      return AnkleBootsIllustration;
    }
    if (lowerText.includes('boot')) {
      return BootsIllustration;
    }
    if (lowerText.includes('sneaker')) {
      return SneakersIllustration;
    }
    if (lowerText.includes('sandal')) {
      return SandalsIllustration;
    }
    if (lowerText.includes('loafer')) {
      return LoafersIllustration;
    }
    // Default for footwear
    return SneakersIllustration;
  }

  // Fallback
  return MediumLayersIllustration;
}
