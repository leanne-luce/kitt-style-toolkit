import React from 'react';
import Svg, { Circle, Ellipse, G, Path, Defs, Mask, Rect } from 'react-native-svg';

interface LunarIllustrationProps {
  size?: number;
  color?: string;
}

// New Moon - completely dark
export const NewMoonIllustration = ({ size = 200, color = '#000' }: LunarIllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="100" cy="100" r="35" strokeWidth="2" fill={color} opacity="0.15" />
      <Circle cx="100" cy="100" r="35" strokeWidth="2.5" />
      {/* Subtle stars around new moon */}
      <Path d="M 55 85 L 58 85 M 56.5 83.5 L 56.5 86.5" strokeWidth="1.5" opacity="0.6" />
      <Path d="M 145 95 L 148 95 M 146.5 93.5 L 146.5 96.5" strokeWidth="1.5" opacity="0.6" />
      <Path d="M 70 125 L 73 125 M 71.5 123.5 L 71.5 126.5" strokeWidth="1.5" opacity="0.6" />
    </G>
  </Svg>
);

// Waxing Crescent - thin crescent on right
export const WaxingCrescentIllustration = ({ size = 200, color = '#000' }: LunarIllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="100" cy="100" r="35" strokeWidth="2.5" />
      {/* Crescent fill on right side */}
      <Path d="M 100 65 Q 120 80 125 100 Q 120 120 100 135 Q 110 120 112 100 Q 110 80 100 65" fill={color} opacity="0.25" />
      <Path d="M 145 110 L 148 110 M 146.5 108.5 L 146.5 111.5" strokeWidth="1.5" opacity="0.6" />
    </G>
  </Svg>
);

// First Quarter - right half illuminated
export const FirstQuarterIllustration = ({ size = 200, color = '#000' }: LunarIllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="100" cy="100" r="35" strokeWidth="2.5" />
      {/* Right half filled */}
      <Path d="M 100 65 L 100 135 Q 120 120 125 100 Q 120 80 100 65" fill={color} opacity="0.3" />
      <Path d="M 100 65 L 100 135" strokeWidth="2" />
      <Path d="M 145 85 L 148 85 M 146.5 83.5 L 146.5 86.5" strokeWidth="1.5" opacity="0.6" />
    </G>
  </Svg>
);

// Waxing Gibbous - more than half, right side
export const WaxingGibbousIllustration = ({ size = 200, color = '#000' }: LunarIllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="100" cy="100" r="35" strokeWidth="2.5" />
      {/* Most of circle filled, small crescent shadow on left */}
      <Circle cx="100" cy="100" r="35" fill={color} opacity="0.3" />
      <Path d="M 100 65 Q 88 80 85 100 Q 88 120 100 135 Q 90 120 88 100 Q 90 80 100 65" fill="#fff" />
      <Path d="M 55 100 L 58 100 M 56.5 98.5 L 56.5 101.5" strokeWidth="1.5" opacity="0.6" />
    </G>
  </Svg>
);

// Full Moon - completely illuminated
export const FullMoonIllustration = ({ size = 200, color = '#000' }: LunarIllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="100" cy="100" r="35" strokeWidth="2.5" fill={color} opacity="0.35" />
      {/* Lunar surface details */}
      <Circle cx="95" cy="92" r="8" strokeWidth="1.5" opacity="0.4" />
      <Circle cx="110" cy="105" r="6" strokeWidth="1.5" opacity="0.4" />
      <Circle cx="92" cy="112" r="5" strokeWidth="1.5" opacity="0.4" />
      {/* Sparkles around full moon */}
      <Path d="M 50 90 L 53 90 M 51.5 88.5 L 51.5 91.5" strokeWidth="1.5" opacity="0.7" />
      <Path d="M 150 110 L 153 110 M 151.5 108.5 L 151.5 111.5" strokeWidth="1.5" opacity="0.7" />
      <Path d="M 130 60 L 133 60 M 131.5 58.5 L 131.5 61.5" strokeWidth="1.5" opacity="0.7" />
      <Path d="M 65 135 L 68 135 M 66.5 133.5 L 66.5 136.5" strokeWidth="1.5" opacity="0.7" />
    </G>
  </Svg>
);

// Waning Gibbous - more than half, left side
export const WaningGibbousIllustration = ({ size = 200, color = '#000' }: LunarIllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="100" cy="100" r="35" strokeWidth="2.5" />
      {/* Most of circle filled, small crescent shadow on right */}
      <Circle cx="100" cy="100" r="35" fill={color} opacity="0.3" />
      <Path d="M 100 65 Q 112 80 115 100 Q 112 120 100 135 Q 110 120 112 100 Q 110 80 100 65" fill="#fff" />
      <Path d="M 145 100 L 148 100 M 146.5 98.5 L 146.5 101.5" strokeWidth="1.5" opacity="0.6" />
    </G>
  </Svg>
);

// Last Quarter - left half illuminated
export const LastQuarterIllustration = ({ size = 200, color = '#000' }: LunarIllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="100" cy="100" r="35" strokeWidth="2.5" />
      {/* Left half filled */}
      <Path d="M 100 65 L 100 135 Q 80 120 75 100 Q 80 80 100 65" fill={color} opacity="0.3" />
      <Path d="M 100 65 L 100 135" strokeWidth="2" />
      <Path d="M 55 85 L 58 85 M 56.5 83.5 L 56.5 86.5" strokeWidth="1.5" opacity="0.6" />
    </G>
  </Svg>
);

// Waning Crescent - thin crescent on left
export const WaningCrescentIllustration = ({ size = 200, color = '#000' }: LunarIllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="100" cy="100" r="35" strokeWidth="2.5" />
      {/* Crescent fill on left side */}
      <Path d="M 100 65 Q 80 80 75 100 Q 80 120 100 135 Q 90 120 88 100 Q 90 80 100 65" fill={color} opacity="0.25" />
      <Path d="M 55 110 L 58 110 M 56.5 108.5 L 56.5 111.5" strokeWidth="1.5" opacity="0.6" />
    </G>
  </Svg>
);

// Export map for easy lookup
export const lunarIllustrations = {
  newmoon: NewMoonIllustration,
  waxingcrescent: WaxingCrescentIllustration,
  firstquarter: FirstQuarterIllustration,
  waxinggibbous: WaxingGibbousIllustration,
  fullmoon: FullMoonIllustration,
  waninggibbous: WaningGibbousIllustration,
  lastquarter: LastQuarterIllustration,
  waningcrescent: WaningCrescentIllustration,
};

export type LunarIllustrationType = keyof typeof lunarIllustrations;
