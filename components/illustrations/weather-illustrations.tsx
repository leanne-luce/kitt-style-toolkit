import React from 'react';
import Svg, { Circle, Ellipse, G, Path, Line } from 'react-native-svg';

interface IllustrationProps {
  size?: number;
  color?: string;
}

// Clear sky - cute sun with rays
export const ClearSkyIllustration = ({ size = 80, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Sun center */}
      <Circle cx="50" cy="50" r="18" fill={color} opacity="0.15" stroke={color} />
      {/* Sun rays - slightly wavy for hand-drawn feel */}
      <Path d="M 50 20 L 50 12" strokeWidth="2.5" />
      <Path d="M 66 28 L 72 22" strokeWidth="2.5" />
      <Path d="M 80 50 L 88 50" strokeWidth="2.5" />
      <Path d="M 72 72 L 78 78" strokeWidth="2.5" />
      <Path d="M 50 80 L 50 88" strokeWidth="2.5" />
      <Path d="M 28 72 L 22 78" strokeWidth="2.5" />
      <Path d="M 20 50 L 12 50" strokeWidth="2.5" />
      <Path d="M 28 28 L 22 22" strokeWidth="2.5" />
      {/* Cute sparkle */}
      <Path d="M 70 42 L 72 42 M 71 41 L 71 43" strokeWidth="1.5" />
    </G>
  </Svg>
);

// Partly cloudy - sun peeking behind cloud
export const PartlyCloudyIllustration = ({ size = 80, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Sun rays peeking out */}
      <Path d="M 62 22 L 66 16" strokeWidth="2" />
      <Path d="M 78 28 L 84 26" strokeWidth="2" />
      <Path d="M 82 42 L 88 42" strokeWidth="2" />
      {/* Sun circle partial */}
      <Circle cx="64" cy="34" r="12" fill={color} opacity="0.1" />
      {/* Cute fluffy cloud */}
      <Path d="M 28 48 Q 26 42 32 38 Q 36 36 42 38 Q 46 32 54 32 Q 62 32 66 38 Q 72 36 76 40 Q 80 44 78 50 Q 78 56 72 58 L 34 58 Q 28 56 28 50 Q 28 48 28 48" fill={color} opacity="0.08" />
    </G>
  </Svg>
);

// Overcast - fluffy clouds with hand-drawn outline overlay
export const OvercastIllustration = ({ size = 80, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Top cloud */}
      <Path d="M 32 32 Q 30 28 34 26 Q 38 24 42 26 Q 44 22 50 22 Q 56 22 58 26 Q 62 24 66 26 Q 70 28 68 32 Q 68 36 64 38 L 36 38 Q 32 36 32 32" fill={color} opacity="0.06" />
      {/* Middle cloud - larger */}
      <Path d="M 24 50 Q 22 44 28 40 Q 32 38 38 40 Q 42 34 50 34 Q 58 34 62 40 Q 68 38 72 42 Q 76 46 74 52 Q 74 58 68 60 L 30 60 Q 24 58 24 52" fill={color} opacity="0.08" />
      {/* Bottom cloud */}
      <Path d="M 30 68 Q 28 64 32 62 Q 36 60 42 62 Q 44 58 50 58 Q 56 58 58 62 Q 62 60 66 62 Q 70 64 68 68 Q 68 72 64 74 L 36 74 Q 30 72 30 68" fill={color} opacity="0.06" />

      {/* Hand-drawn black cloud outline - off-center, puffy shape */}
      <Path d="M 68.5 57.8 Q 67.1 55.2 69.9 53.3 Q 72.7 51.9 76.3 53.3 Q 78.3 51.2 81.1 51.2 Q 83.9 51.2 86.0 53.3 Q 88.8 51.9 91.6 53.5 Q 93.5 55.6 92.8 58.6 Q 92.8 61.2 91.3 63.8 Q 89.9 65.2 87.1 65.9 Q 84.3 66.5 81.1 65.9 Q 78.3 66.5 75.5 65.9 L 70.6 65.2 Q 67.8 63.8 67.1 61.2 Q 66.4 59.3 67.1 57.8"
            stroke={color}
            strokeWidth="2"
            fill="none" />
    </G>
  </Svg>
);

// Rain - cloud with raindrops
export const RainIllustration = ({ size = 80, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Cloud */}
      <Path d="M 26 36 Q 24 30 30 26 Q 34 24 40 26 Q 44 20 52 20 Q 60 20 64 26 Q 70 24 74 28 Q 78 32 76 38 Q 76 44 70 46 L 32 46 Q 26 44 26 38" fill={color} opacity="0.08" />
      {/* Raindrops - cute teardrop shapes */}
      <Path d="M 36 54 Q 36 60 38 62 Q 40 64 42 62 Q 44 60 44 54" strokeWidth="2" fill={color} opacity="0.15" />
      <Path d="M 48 58 Q 48 64 50 66 Q 52 68 54 66 Q 56 64 56 58" strokeWidth="2" fill={color} opacity="0.15" />
      <Path d="M 60 52 Q 60 58 62 60 Q 64 62 66 60 Q 68 58 68 52" strokeWidth="2" fill={color} opacity="0.15" />
      <Path d="M 42 68 Q 42 72 44 74 Q 46 76 48 74 Q 50 72 50 68" strokeWidth="2" fill={color} opacity="0.12" />
      <Path d="M 54 72 Q 54 76 56 78 Q 58 80 60 78 Q 62 76 62 72" strokeWidth="2" fill={color} opacity="0.12" />
    </G>
  </Svg>
);

// Snow - cloud with snowflakes
export const SnowIllustration = ({ size = 80, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Cloud */}
      <Path d="M 26 36 Q 24 30 30 26 Q 34 24 40 26 Q 44 20 52 20 Q 60 20 64 26 Q 70 24 74 28 Q 78 32 76 38 Q 76 44 70 46 L 32 46 Q 26 44 26 38" fill={color} opacity="0.08" />
      {/* Cute snowflakes */}
      <G strokeWidth="1.8">
        <Path d="M 38 58 L 38 64 M 35 61 L 41 61 M 36 59 L 40 63 M 36 63 L 40 59" />
        <Path d="M 52 54 L 52 60 M 49 57 L 55 57 M 50 55 L 54 59 M 50 59 L 54 55" />
        <Path d="M 64 60 L 64 66 M 61 63 L 67 63 M 62 61 L 66 65 M 62 65 L 66 61" />
        <Path d="M 44 72 L 44 78 M 41 75 L 47 75 M 42 73 L 46 77 M 42 77 L 46 73" />
      </G>
    </G>
  </Svg>
);

// Foggy - horizontal wavy lines
export const FoggyIllustration = ({ size = 80, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Wavy fog lines */}
      <Path d="M 20 32 Q 30 30 40 32 Q 50 34 60 32 Q 70 30 80 32" strokeWidth="2.5" opacity="0.6" />
      <Path d="M 24 42 Q 34 40 44 42 Q 54 44 64 42 Q 74 40 84 42" strokeWidth="2.5" opacity="0.7" />
      <Path d="M 16 52 Q 28 50 40 52 Q 52 54 64 52 Q 76 50 86 52" strokeWidth="2.5" opacity="0.8" />
      <Path d="M 22 62 Q 32 60 42 62 Q 52 64 62 62 Q 72 60 82 62" strokeWidth="2.5" opacity="0.7" />
      <Path d="M 18 72 Q 30 70 42 72 Q 54 74 66 72 Q 78 70 88 72" strokeWidth="2.5" opacity="0.6" />
    </G>
  </Svg>
);

// Thunderstorm - cloud with lightning bolt
export const ThunderstormIllustration = ({ size = 80, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Dark cloud */}
      <Path d="M 26 32 Q 24 26 30 22 Q 34 20 40 22 Q 44 16 52 16 Q 60 16 64 22 Q 70 20 74 24 Q 78 28 76 34 Q 76 40 70 42 L 32 42 Q 26 40 26 34" fill={color} opacity="0.12" />
      {/* Lightning bolt - cute angular */}
      <Path d="M 54 42 L 48 56 L 54 56 L 50 72" strokeWidth="2.5" fill={color} opacity="0.2" />
      {/* Sparkle for energy */}
      <Path d="M 64 48 L 67 48 M 65.5 46.5 L 65.5 49.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

/**
 * Get the appropriate weather illustration based on weather code
 */
export function getWeatherIllustration(weatherCode: number): React.FC<IllustrationProps> {
  // Clear conditions (0-1)
  if (weatherCode <= 1) return ClearSkyIllustration;

  // Partly cloudy (2)
  if (weatherCode === 2) return PartlyCloudyIllustration;

  // Overcast (3)
  if (weatherCode === 3) return OvercastIllustration;

  // Fog (45, 48)
  if (weatherCode >= 45 && weatherCode <= 48) return FoggyIllustration;

  // Snow (71-77, 85-86)
  if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) {
    return SnowIllustration;
  }

  // Thunderstorm (95-99)
  if (weatherCode >= 95) return ThunderstormIllustration;

  // Rain/Drizzle (51-65, 80-82) - default
  return RainIllustration;
}
