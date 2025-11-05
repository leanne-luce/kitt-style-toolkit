import React from 'react';
import Svg, { Circle, Ellipse, G, Line, Path, Rect } from 'react-native-svg';

interface IllustrationProps {
  size?: number;
  color?: string;
}

// Default props
const defaultProps = {
  size: 200,
  color: '#000',
};

// 1. Spy/Sunglasses - mysterious, sophisticated
export const SpyIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2" fill="none">
      <Circle cx="100" cy="80" r="30" />
      <Rect x="75" y="75" width="22" height="15" rx="2" fill={color} />
      <Rect x="103" y="75" width="22" height="15" rx="2" fill={color} />
      <Line x1="97" y1="82" x2="103" y2="82" />
      <Path d="M 75 110 L 65 120 L 60 150" />
      <Path d="M 125 110 L 135 120 L 140 150" />
      <Line x1="100" y1="110" x2="100" y2="140" />
      <Path d="M 85 112 L 80 120 M 115 112 L 120 120" />
    </G>
  </Svg>
);

// 2. Victorian Ghost - lace and ethereal
export const VictorianGhostIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2" fill="none">
      <Circle cx="100" cy="70" r="25" />
      <Path d="M 90 95 Q 100 100 110 95" />
      <Path d="M 75 95 Q 75 120 75 145 Q 75 155 85 155 Q 90 155 90 150 Q 90 155 95 155 Q 100 155 100 150 Q 100 155 105 155 Q 110 155 110 150 Q 110 155 115 155 Q 125 155 125 145 Q 125 120 125 95" />
      <Path d="M 80 105 Q 85 102 90 105 M 110 105 Q 115 102 120 105" strokeWidth="1.5" />
      <Path d="M 85 115 Q 90 112 95 115 M 105 115 Q 110 112 115 115" strokeWidth="1.5" />
      <Circle cx="90" cy="65" r="3" fill={color} />
      <Circle cx="110" cy="65" r="3" fill={color} />
    </G>
  </Svg>
);

// 3. Music Note - for music-inspired prompts
export const MusicNoteIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none">
      <Line x1="110" y1="60" x2="110" y2="130" />
      <Ellipse cx="110" cy="135" rx="15" ry="10" fill={color} />
      <Path d="M 110 60 Q 130 55 145 65 Q 155 72 145 82 Q 135 90 110 85" strokeWidth="2" />
      <Path d="M 70 100 L 68 95 L 70 90 M 68 95 L 70 95" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M 140 110 L 142 105 L 140 100 M 142 105 L 140 105" strokeWidth="1.5" strokeLinecap="round" />
    </G>
  </Svg>
);

// 4. Striped Socks
export const StripedSocksIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2" fill="none">
      <Path d="M 80 60 L 80 130 Q 80 145 90 150 L 110 150 Q 120 145 120 130 L 120 60 Z" />
      <Line x1="80" y1="75" x2="120" y2="75" />
      <Line x1="80" y1="90" x2="120" y2="90" />
      <Line x1="80" y1="105" x2="120" y2="105" />
      <Line x1="80" y1="120" x2="120" y2="120" />
      <Ellipse cx="100" cy="60" rx="20" ry="8" />
    </G>
  </Svg>
);

// 5. Color Palette - for color directive prompts
export const ColorPaletteIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2" fill="none">
      <Circle cx="100" cy="100" r="50" />
      <Circle cx="100" cy="70" r="10" />
      <Circle cx="125" cy="85" r="10" />
      <Circle cx="130" cy="110" r="10" />
      <Circle cx="115" cy="130" r="10" />
      <Circle cx="85" cy="130" r="10" />
      <Circle cx="70" cy="110" r="10" />
      <Circle cx="75" cy="85" r="10" />
      <Path d="M 145 140 Q 150 145 155 140 L 165 150 Q 160 155 155 160 L 145 150 Q 150 145 145 140" />
    </G>
  </Svg>
);

// 6. Layered Necklaces - for maximalist/jewelry prompts
export const NecklacesIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2" fill="none">
      <Path d="M 70 60 Q 75 45 100 40 Q 125 45 130 60" />
      <Path d="M 85 65 Q 100 70 115 65" strokeWidth="1.5" />
      <Circle cx="100" cy="71" r="4" />
      <Path d="M 80 70 Q 100 78 120 70" strokeWidth="1.5" />
      <Rect x="96" y="77" width="8" height="8" rx="1" />
      <Path d="M 75 75 Q 100 88 125 75" strokeWidth="1.5" />
      <Circle cx="95" cy="86" r="3" />
      <Circle cx="105" cy="86" r="3" />
      <Path d="M 72 80 Q 100 98 128 80" strokeWidth="1.5" />
      <Path d="M 96 96 L 100 102 L 104 96" strokeWidth="1.5" />
      <Path d="M 70 85 Q 100 105 130 85" strokeWidth="1.5" />
      <Circle cx="100" cy="106" r="5" />
    </G>
  </Svg>
);

// 7. Cowboy Hat - Western theme
export const CowboyHatIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2" fill="none">
      <Ellipse cx="100" cy="100" rx="60" ry="10" />
      <Path d="M 45 100 Q 45 70 100 60 Q 155 70 155 100" />
      <Path d="M 70 100 L 70 75 Q 70 65 100 62 Q 130 65 130 75 L 130 100" />
      <Path d="M 90 110 L 100 120 L 110 110" />
      <Path d="M 90 110 Q 85 115 88 120" />
      <Path d="M 110 110 Q 115 115 112 120" />
    </G>
  </Svg>
);

// 8. Dress Silhouette - general fashion
export const DressIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2" fill="none">
      <Path d="M 85 50 L 75 70 L 70 140 Q 70 160 100 160 Q 130 160 130 140 L 125 70 L 115 50" />
      <Path d="M 85 50 Q 80 45 75 50" />
      <Path d="M 115 50 Q 120 45 125 50" />
      <Line x1="85" y1="60" x2="115" y2="60" />
      <Path d="M 70 140 Q 85 145 100 140 Q 115 145 130 140" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 9. Red Lipstick - bold statement
export const LipstickIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2" fill="none">
      <Rect x="85" y="60" width="30" height="50" rx="2" />
      <Rect x="82" y="110" width="36" height="20" rx="3" />
      <Line x1="85" y1="85" x2="115" y2="85" strokeWidth="1" />
      <Path d="M 85 60 Q 85 50 100 45 Q 115 50 115 60" fill={color} />
      <Path d="M 140 95 Q 145 100 150 95 Q 155 100 160 95" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M 40 95 Q 45 100 50 95 Q 55 100 60 95" strokeWidth="1.5" strokeLinecap="round" />
    </G>
  </Svg>
);

// 10. Ring Stack - jewelry/accessories
export const RingsIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2" fill="none">
      <Path d="M 70 80 L 65 150 Q 65 160 75 160 L 85 160 Q 95 160 95 150 L 90 80 Z" />
      <Ellipse cx="80" cy="80" rx="12" ry="5" />
      <Circle cx="80" cy="100" r="8" />
      <Rect x="72" y="115" width="16" height="8" rx="4" />
      <Circle cx="80" cy="135" r="6" />
      <Path d="M 76 145 L 74 148 L 80 151 L 86 148 L 84 145" />
    </G>
  </Svg>
);

// 11. Patterns/Texture - for mixing patterns
export const PatternsIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="1.5" fill="none">
      <Rect x="50" y="50" width="40" height="40" />
      <Line x1="50" y1="60" x2="90" y2="60" />
      <Line x1="50" y1="70" x2="90" y2="70" />
      <Line x1="50" y1="80" x2="90" y2="80" />
      <Circle cx="130" cy="70" r="20" />
      <Circle cx="130" cy="70" r="12" />
      <Circle cx="130" cy="70" r="4" />
      <Line x1="110" y1="110" x2="150" y2="150" />
      <Line x1="150" y1="110" x2="110" y2="150" />
      <Line x1="120" y1="110" x2="160" y2="150" />
      <Line x1="100" y1="120" x2="140" y2="160" />
      <Path d="M 50 110 Q 60 105 70 110 Q 80 115 90 110" />
      <Path d="M 50 120 Q 60 115 70 120 Q 80 125 90 120" />
      <Path d="M 50 130 Q 60 125 70 130 Q 80 135 90 130" />
    </G>
  </Svg>
);

// 12. Star/Sparkle - for confident/bold prompts
export const SparkleIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2" fill="none">
      <Path d="M 100 50 L 105 80 L 130 90 L 108 100 L 115 130 L 100 112 L 85 130 L 92 100 L 70 90 L 95 80 Z" />
      <Path d="M 60 60 L 64 60 M 62 58 L 62 62" strokeWidth="1.5" />
      <Path d="M 140 70 L 144 70 M 142 68 L 142 72" strokeWidth="1.5" />
      <Path d="M 150 120 L 154 120 M 152 118 L 152 122" strokeWidth="1.5" />
      <Path d="M 50 130 L 54 130 M 52 128 L 52 132" strokeWidth="1.5" />
      <Path d="M 135 140 L 139 140 M 137 138 L 137 142" strokeWidth="1.5" />
    </G>
  </Svg>
);

// Export map for easy lookup
export const illustrations = {
  spy: SpyIllustration,
  ghost: VictorianGhostIllustration,
  music: MusicNoteIllustration,
  socks: StripedSocksIllustration,
  color: ColorPaletteIllustration,
  necklaces: NecklacesIllustration,
  cowboy: CowboyHatIllustration,
  dress: DressIllustration,
  lipstick: LipstickIllustration,
  rings: RingsIllustration,
  patterns: PatternsIllustration,
  sparkle: SparkleIllustration,
};

export type IllustrationType = keyof typeof illustrations;
