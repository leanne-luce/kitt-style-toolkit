import React from 'react';
import Svg, { Circle, Ellipse, G, Path } from 'react-native-svg';

interface IllustrationProps {
  size?: number;
  color?: string;
}

// 1. Spy/Sunglasses - mysterious, sophisticated
export const SpyIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Face outline with slight irregularity */}
      <Path d="M 70 80 Q 70 55 85 50 Q 100 48 115 50 Q 130 55 130 80 Q 130 95 120 102 Q 100 110 80 102 Q 70 95 70 80" />
      {/* Sunglasses lenses - cute rounded rectangles */}
      <Path d="M 76 73 Q 76 69 80 69 L 92 69 Q 96 69 96 73 L 96 83 Q 96 87 92 87 L 80 87 Q 76 87 76 83 Z" fill={color} opacity="0.8" />
      <Path d="M 104 73 Q 104 69 108 69 L 120 69 Q 124 69 124 73 L 124 83 Q 124 87 120 87 L 108 87 Q 104 87 104 83 Z" fill={color} opacity="0.8" />
      {/* Bridge */}
      <Path d="M 96 78 Q 98 76 100 76 Q 102 76 104 78" strokeWidth="2" />
      {/* Tiny sparkles for glam */}
      <Path d="M 68 72 L 70 72 M 69 71 L 69 73" strokeWidth="1.5" />
      <Path d="M 130 72 L 132 72 M 131 71 L 131 73" strokeWidth="1.5" />
      {/* Cute smile */}
      <Path d="M 88 100 Q 100 104 112 100" strokeWidth="2" />
    </G>
  </Svg>
);

// 2. Victorian Ghost - lace and ethereal
export const VictorianGhostIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Cute ghost head */}
      <Path d="M 75 70 Q 75 52 85 48 Q 100 45 115 48 Q 125 52 125 70 Q 125 85 100 88 Q 75 85 75 70" />
      {/* Sweet eyes */}
      <Circle cx="90" cy="67" r="3.5" fill={color} />
      <Circle cx="110" cy="67" r="3.5" fill={color} />
      {/* Tiny blush marks */}
      <Path d="M 82 75 Q 84 76 86 75" strokeWidth="2" opacity="0.4" />
      <Path d="M 114 75 Q 116 76 118 75" strokeWidth="2" opacity="0.4" />
      {/* Flowing ghostly dress with scalloped edges */}
      <Path d="M 77 88 Q 76 110 76 130 Q 76 145 80 150 Q 83 153 86 150 Q 88 148 88 152 Q 90 155 92 152 Q 94 149 94 152 Q 96 155 98 152 Q 100 149 100 152 Q 102 155 104 152 Q 106 149 106 152 Q 108 155 110 152 Q 112 149 112 152 Q 114 155 117 150 Q 120 145 124 130 Q 124 110 123 88" />
      {/* Delicate lace details */}
      <Path d="M 82 100 Q 86 98 90 100 Q 94 102 98 100 Q 102 98 106 100 Q 110 102 114 100" strokeWidth="1.5" />
      <Path d="M 84 112 Q 88 110 92 112 Q 96 114 100 112 Q 104 110 108 112 Q 112 114 116 112" strokeWidth="1.5" />
      {/* Tiny heart detail */}
      <Path d="M 98 125 Q 98 122 100 122 Q 102 122 102 125 Q 102 127 100 129 Q 98 127 98 125" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 3. Music Note - for music-inspired prompts
export const MusicNoteIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Music note stem with slight curve */}
      <Path d="M 108 135 Q 108 100 110 70 Q 111 60 112 58" strokeWidth="3" />
      {/* Filled note head */}
      <Ellipse cx="105" cy="138" rx="13" ry="9" fill={color} transform="rotate(-15 105 138)" />
      {/* Cute flag at top */}
      <Path d="M 112 58 Q 128 54 138 62 Q 145 68 142 78 Q 138 86 125 88 Q 115 88 112 82" fill={color} opacity="0.7" />
      {/* Sparkle accents */}
      <Path d="M 65 85 L 70 85 M 67.5 82.5 L 67.5 87.5" strokeWidth="2" />
      <Path d="M 145 95 L 150 95 M 147.5 92.5 L 147.5 97.5" strokeWidth="2" />
      <Path d="M 80 120 L 83 120 M 81.5 118.5 L 81.5 121.5" strokeWidth="1.5" />
      {/* Wavy lines suggesting sound */}
      <Path d="M 68 108 Q 72 105 76 108" strokeWidth="2" opacity="0.5" />
      <Path d="M 138 120 Q 142 117 146 120" strokeWidth="2" opacity="0.5" />
    </G>
  </Svg>
);

// 4. Striped Socks
export const StripedSocksIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Sock body with gentle curves */}
      <Path d="M 82 62 L 81 115 Q 81 135 86 142 Q 90 148 96 150 L 104 150 Q 110 148 114 142 Q 119 135 119 115 L 118 62" />
      {/* Striped pattern - slightly wavy for hand-drawn feel */}
      <Path d="M 82 75 Q 100 76 118 75" strokeWidth="2" />
      <Path d="M 81.5 88 Q 100 89 118.5 88" strokeWidth="2" />
      <Path d="M 81 101 Q 100 102 119 101" strokeWidth="2" />
      <Path d="M 81 114 Q 100 115 119 114" strokeWidth="2" />
      <Path d="M 81 127 Q 100 128 119 127" strokeWidth="2" />
      {/* Cute ribbed cuff at top */}
      <Ellipse cx="100" cy="62" rx="18" ry="7" />
      <Path d="M 82 62 Q 82 58 82 55" strokeWidth="1.5" />
      <Path d="M 87 62 Q 87 58 87 55" strokeWidth="1.5" />
      <Path d="M 92 62 Q 92 58 92 55" strokeWidth="1.5" />
      <Path d="M 108 62 Q 108 58 108 55" strokeWidth="1.5" />
      <Path d="M 113 62 Q 113 58 113 55" strokeWidth="1.5" />
      <Path d="M 118 62 Q 118 58 118 55" strokeWidth="1.5" />
      {/* Tiny heart on toe */}
      <Path d="M 98 145 Q 98 143 100 143 Q 102 143 102 145 Q 102 146 100 148 Q 98 146 98 145" strokeWidth="1.5" fill={color} opacity="0.6" />
    </G>
  </Svg>
);

// 5. Color Palette - for color directive prompts
export const ColorPaletteIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Artist palette with organic shape */}
      <Path d="M 55 100 Q 52 70 70 58 Q 90 50 110 55 Q 135 60 145 80 Q 150 95 148 110 Q 145 125 130 135 Q 115 142 100 140 Q 80 138 65 125 Q 55 115 55 100" />
      {/* Thumb hole */}
      <Ellipse cx="138" cy="120" rx="8" ry="12" transform="rotate(25 138 120)" />
      {/* Paint dots - cute irregular circles */}
      <Circle cx="100" cy="75" r="8" strokeWidth="2" />
      <Circle cx="122" cy="88" r="9" strokeWidth="2" />
      <Circle cx="125" cy="108" r="7" strokeWidth="2" />
      <Circle cx="110" cy="122" r="8" strokeWidth="2" />
      <Circle cx="88" cy="120" r="7" strokeWidth="2" />
      <Circle cx="72" cy="105" r="9" strokeWidth="2" />
      <Circle cx="75" cy="85" r="8" strokeWidth="2" />
      {/* Cute paintbrush */}
      <Path d="M 148 140 Q 152 142 156 140 L 164 148 Q 162 152 158 154 L 150 146 Q 152 142 148 140" fill={color} opacity="0.3" />
      <Path d="M 156 140 L 168 152" strokeWidth="2" />
      {/* Sparkle */}
      <Path d="M 65 68 L 68 68 M 66.5 66.5 L 66.5 69.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 6. Layered Necklaces - for maximalist/jewelry prompts
export const NecklacesIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Delicate chain necklaces with gentle curves */}
      <Path d="M 72 62 Q 77 48 100 44 Q 123 48 128 62" strokeWidth="2" />
      {/* First necklace with tiny pendant */}
      <Path d="M 80 66 Q 100 72 120 66" strokeWidth="2" />
      <Circle cx="100" cy="74" r="4.5" fill={color} opacity="0.6" />
      {/* Second necklace with square charm */}
      <Path d="M 76 72 Q 100 80 124 72" strokeWidth="2" />
      <Path d="M 96 79 Q 96 83 100 83 Q 104 83 104 79 Q 104 75 100 75 Q 96 75 96 79" strokeWidth="2" fill={color} opacity="0.5" />
      {/* Third necklace with double beads */}
      <Path d="M 73 78 Q 100 90 127 78" strokeWidth="2" />
      <Circle cx="96" cy="88" r="3.5" fill={color} opacity="0.6" />
      <Circle cx="104" cy="88" r="3.5" fill={color} opacity="0.6" />
      {/* Fourth necklace with tiny heart */}
      <Path d="M 70 85 Q 100 100 130 85" strokeWidth="2" />
      <Path d="M 97 98 Q 97 95 100 95 Q 103 95 103 98 Q 103 101 100 104 Q 97 101 97 98" strokeWidth="2" fill={color} opacity="0.7" />
      {/* Fifth longest necklace with pendant */}
      <Path d="M 68 92 Q 100 110 132 92" strokeWidth="2" />
      <Circle cx="100" cy="112" r="5.5" strokeWidth="2" />
      <Circle cx="100" cy="112" r="2.5" fill={color} />
    </G>
  </Svg>
);

// 7. Cowboy Hat - Western theme
export const CowboyHatIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Hat brim with organic curves */}
      <Path d="M 42 102 Q 40 100 42 98 Q 50 95 70 94 Q 100 92 130 94 Q 150 95 158 98 Q 160 100 158 102 Q 150 105 130 106 Q 100 108 70 106 Q 50 105 42 102" />
      {/* Hat crown */}
      <Path d="M 48 98 Q 48 72 68 62 Q 85 56 100 58 Q 115 56 132 62 Q 152 72 152 98" />
      <Path d="M 72 98 Q 72 78 85 72 Q 100 68 115 72 Q 128 78 128 98" />
      {/* Cute band with star detail */}
      <Path d="M 72 100 Q 75 96 100 94 Q 125 96 128 100" strokeWidth="2" />
      {/* Little star on band */}
      <Path d="M 100 96 L 101 94 L 102 96 L 104 96.5 L 102 97.5 L 102 99.5 L 100 98.5 L 98 99.5 L 98 97.5 L 96 96.5 Z" fill={color} opacity="0.6" strokeWidth="1" />
      {/* Tiny stitching detail */}
      <Path d="M 80 100 L 82 102" strokeWidth="1.5" />
      <Path d="M 88 100 L 90 102" strokeWidth="1.5" />
      <Path d="M 110 100 L 112 102" strokeWidth="1.5" />
      <Path d="M 118 100 L 120 102" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 8. Dress Silhouette - general fashion
export const DressIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Dress body with feminine silhouette */}
      <Path d="M 86 52 Q 84 58 78 68 Q 75 80 73 100 Q 72 125 71 145 Q 70 158 85 162 Q 100 165 115 162 Q 130 158 129 145 Q 128 125 127 100 Q 125 80 122 68 Q 116 58 114 52" />
      {/* Cute puff sleeves */}
      <Path d="M 86 52 Q 82 48 76 50 Q 72 52 74 56 Q 76 60 78 64" strokeWidth="2" />
      <Path d="M 114 52 Q 118 48 124 50 Q 128 52 126 56 Q 124 60 122 64" strokeWidth="2" />
      {/* Neckline */}
      <Path d="M 86 52 Q 92 48 100 48 Q 108 48 114 52" strokeWidth="2" />
      {/* Waistline detail */}
      <Path d="M 78 95 Q 100 93 122 95" strokeWidth="2" opacity="0.5" />
      {/* Flowy hem detail */}
      <Path d="M 71 145 Q 78 150 86 148 Q 93 146 100 150 Q 107 146 114 148 Q 122 150 129 145" strokeWidth="2" />
      {/* Tiny buttons */}
      <Circle cx="100" cy="70" r="2" fill={color} opacity="0.7" />
      <Circle cx="100" cy="80" r="2" fill={color} opacity="0.7" />
      <Circle cx="100" cy="90" r="2" fill={color} opacity="0.7" />
      {/* Heart detail on skirt */}
      <Path d="M 97 125 Q 97 122 100 122 Q 103 122 103 125 Q 103 128 100 131 Q 97 128 97 125" strokeWidth="1.5" fill={color} opacity="0.4" />
    </G>
  </Svg>
);

// 9. Red Lipstick - bold statement
export const LipstickIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Lipstick tube body */}
      <Path d="M 86 64 Q 86 62 88 62 L 112 62 Q 114 62 114 64 L 114 108 Q 114 110 112 110 L 88 110 Q 86 110 86 108 Z" />
      {/* Lipstick base/cap */}
      <Path d="M 83 112 Q 83 110 85 110 L 115 110 Q 117 110 117 112 L 117 126 Q 117 128 115 128 L 85 128 Q 83 128 83 126 Z" />
      {/* Cute lipstick bullet - slightly tilted */}
      <Path d="M 86 64 Q 88 56 92 52 Q 96 48 100 47 Q 104 48 108 52 Q 112 56 114 64" fill={color} opacity="0.8" />
      {/* Shine mark on lipstick */}
      <Path d="M 92 54 Q 94 52 96 54" strokeWidth="1.5" stroke="#fff" opacity="0.8" />
      {/* Detail line on tube */}
      <Path d="M 86 88 L 114 88" strokeWidth="1.5" opacity="0.4" />
      {/* Kiss marks floating around */}
      <Path d="M 138 90 Q 142 88 146 90 Q 148 92 146 94 Q 142 96 138 94 Q 136 92 138 90" strokeWidth="2" fill={color} opacity="0.4" />
      <Path d="M 52 95 Q 56 93 60 95 Q 62 97 60 99 Q 56 101 52 99 Q 50 97 52 95" strokeWidth="2" fill={color} opacity="0.4" />
      {/* Sparkle */}
      <Path d="M 66 82 L 69 82 M 67.5 80.5 L 67.5 83.5" strokeWidth="1.5" />
      <Path d="M 130 105 L 133 105 M 131.5 103.5 L 131.5 106.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 10. Ring Stack - jewelry/accessories
export const RingsIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Delicate finger */}
      <Path d="M 72 82 Q 71 95 70 110 Q 69 130 68 145 Q 68 156 76 160 L 84 160 Q 92 156 92 145 Q 91 130 90 110 Q 89 95 88 82" />
      <Ellipse cx="80" cy="82" rx="10" ry="5" />
      {/* Ring 1 - simple band with gem */}
      <Ellipse cx="80" cy="98" rx="9" ry="5" strokeWidth="2" />
      <Circle cx="80" cy="96" r="3.5" fill={color} opacity="0.7" />
      {/* Ring 2 - chunky statement ring */}
      <Path d="M 71 113 Q 71 110 74 110 L 86 110 Q 89 110 89 113 L 89 120 Q 89 123 86 123 L 74 123 Q 71 123 71 120 Z" strokeWidth="2" />
      {/* Ring 3 - delicate band */}
      <Ellipse cx="80" cy="133" rx="8" ry="4.5" strokeWidth="2" />
      {/* Ring 4 - engagement ring style with heart */}
      <Ellipse cx="80" cy="147" rx="9" ry="5" strokeWidth="2" />
      <Path d="M 77 145 Q 77 143 80 143 Q 83 143 83 145 Q 83 147 80 149 Q 77 147 77 145" fill={color} opacity="0.8" strokeWidth="1.5" />
      {/* Sparkles around rings */}
      <Path d="M 62 96 L 65 96 M 63.5 94.5 L 63.5 97.5" strokeWidth="1.5" />
      <Path d="M 95 115 L 98 115 M 96.5 113.5 L 96.5 116.5" strokeWidth="1.5" />
      <Path d="M 60 140 L 63 140 M 61.5 138.5 L 61.5 141.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 11. Patterns/Texture - for mixing patterns
export const PatternsIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Striped swatch */}
      <Path d="M 52 52 Q 50 52 50 54 L 50 86 Q 50 88 52 88 L 88 88 Q 90 88 90 86 L 90 54 Q 90 52 88 52 Z" strokeWidth="2" />
      <Path d="M 50 62 Q 70 63 90 62" strokeWidth="2" />
      <Path d="M 50 72 Q 70 73 90 72" strokeWidth="2" />
      <Path d="M 50 82 Q 70 83 90 82" strokeWidth="2" />
      {/* Polka dot swatch */}
      <Circle cx="128" cy="68" r="22" strokeWidth="2" />
      <Circle cx="120" cy="62" r="3" fill={color} opacity="0.6" />
      <Circle cx="136" cy="66" r="3.5" fill={color} opacity="0.6" />
      <Circle cx="124" cy="75" r="3" fill={color} opacity="0.6" />
      <Circle cx="133" cy="78" r="2.5" fill={color} opacity="0.6" />
      {/* Checkered swatch */}
      <Path d="M 112 112 Q 110 112 110 114 L 110 146 Q 110 148 112 148 L 148 148 Q 150 148 150 146 L 150 114 Q 150 112 148 112 Z" strokeWidth="2" />
      <Path d="M 110 130 L 150 130 M 130 112 L 130 148" strokeWidth="2" />
      <Path d="M 112 114 L 128 114 L 128 128 L 112 128 Z" fill={color} opacity="0.3" />
      <Path d="M 132 132 L 148 132 L 148 146 L 132 146 Z" fill={color} opacity="0.3" />
      {/* Wavy swatch */}
      <Path d="M 52 112 Q 50 112 50 114 L 50 146 Q 50 148 52 148 L 88 148 Q 90 148 90 146 L 90 114 Q 90 112 88 112 Z" strokeWidth="2" />
      <Path d="M 50 120 Q 58 117 66 120 Q 74 123 82 120 Q 86 118 90 120" strokeWidth="2" />
      <Path d="M 50 130 Q 58 127 66 130 Q 74 133 82 130 Q 86 128 90 130" strokeWidth="2" />
      <Path d="M 50 140 Q 58 137 66 140 Q 74 143 82 140 Q 86 138 90 140" strokeWidth="2" />
    </G>
  </Svg>
);

// 12. Star/Sparkle - for confident/bold prompts
export const SparkleIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Large decorative star with soft curves */}
      <Path d="M 100 52 Q 102 76 106 82 Q 112 88 128 92 Q 118 96 112 102 Q 108 108 116 128 Q 106 118 100 114 Q 94 118 84 128 Q 92 108 88 102 Q 82 96 72 92 Q 88 88 94 82 Q 98 76 100 52 Z" fill={color} opacity="0.2" />
      <Path d="M 100 52 Q 102 76 106 82 Q 112 88 128 92 Q 118 96 112 102 Q 108 108 116 128 Q 106 118 100 114 Q 94 118 84 128 Q 92 108 88 102 Q 82 96 72 92 Q 88 88 94 82 Q 98 76 100 52 Z" strokeWidth="2" />
      {/* Cute twinkle stars around */}
      <Path d="M 58 62 L 62 62 M 60 60 L 60 64" strokeWidth="2" />
      <Path d="M 138 68 L 142 68 M 140 66 L 140 70" strokeWidth="2" />
      <Path d="M 148 118 L 152 118 M 150 116 L 150 120" strokeWidth="2" />
      <Path d="M 48 128 L 52 128 M 50 126 L 50 130" strokeWidth="2" />
      <Path d="M 133 138 L 137 138 M 135 136 L 135 140" strokeWidth="2" />
      {/* Tiny dots for extra sparkle */}
      <Circle cx="66" cy="85" r="2" fill={color} opacity="0.6" />
      <Circle cx="145" cy="95" r="2.5" fill={color} opacity="0.6" />
      <Circle cx="55" cy="115" r="2" fill={color} opacity="0.6" />
      <Circle cx="130" cy="150" r="2" fill={color} opacity="0.6" />
    </G>
  </Svg>
);

// 13. High Heels - confidence, glamour
export const HighHeelsIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 78 72 Q 80 68 84 66 L 100 62 Q 110 64 115 72 Q 118 82 118 95 L 118 125 Q 118 132 112 135 L 85 135 Q 78 132 78 125 Z" />
      <Path d="M 112 135 Q 115 138 115 145 L 115 152 Q 115 156 110 156 L 85 156 Q 80 156 80 152 L 80 145 Q 80 138 83 135" />
      <Path d="M 118 125 Q 120 127 124 127 Q 128 127 132 122 Q 134 115 131 108 Q 128 102 124 102" strokeWidth="3" />
      <Circle cx="100" cy="80" r="3" fill={color} opacity="0.6" />
      <Path d="M 68 90 L 71 90 M 69.5 88.5 L 69.5 91.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 14. Handbag - accessories, luxury
export const HandbagIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 62 88 Q 60 88 60 90 L 60 135 Q 60 142 68 145 L 132 145 Q 140 142 140 135 L 140 90 Q 140 88 138 88 Z" />
      <Path d="M 75 88 Q 75 72 85 65 Q 100 60 115 65 Q 125 72 125 88" strokeWidth="2" />
      <Path d="M 62 105 L 138 105" strokeWidth="2" opacity="0.4" />
      <Circle cx="100" cy="115" r="5" strokeWidth="2" />
      <Circle cx="100" cy="115" r="2" fill={color} />
      <Path d="M 150 100 L 153 100 M 151.5 98.5 L 151.5 101.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 15. Bow Tie - formal, playful
export const BowTieIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 55 90 Q 52 85 55 80 Q 65 75 80 78 Q 90 82 92 90 Q 90 98 80 102 Q 65 105 55 100 Q 52 95 55 90" fill={color} opacity="0.15" />
      <Path d="M 145 90 Q 148 85 145 80 Q 135 75 120 78 Q 110 82 108 90 Q 110 98 120 102 Q 135 105 145 100 Q 148 95 145 90" fill={color} opacity="0.15" />
      <Path d="M 92 90 L 108 90" strokeWidth="3" />
      <Path d="M 95 85 Q 95 83 97 83 L 103 83 Q 105 83 105 85 L 105 95 Q 105 97 103 97 L 97 97 Q 95 97 95 95 Z" fill={color} opacity="0.3" />
      <Path d="M 64 88 Q 68 87 72 88" strokeWidth="1.5" opacity="0.5" />
      <Path d="M 128 88 Q 132 87 136 88" strokeWidth="1.5" opacity="0.5" />
    </G>
  </Svg>
);

// 16. Perfume Bottle - elegance, luxury
export const PerfumeIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 92 58 Q 92 56 94 56 L 106 56 Q 108 56 108 58 L 108 72 Q 108 74 106 74 L 94 74 Q 92 74 92 72 Z" />
      <Path d="M 94 52 Q 94 50 96 50 L 104 50 Q 106 50 106 52 L 106 56 L 94 56 Z" fill={color} opacity="0.2" />
      <Path d="M 80 74 Q 78 74 78 76 L 80 125 Q 82 135 92 138 L 108 138 Q 118 135 120 125 L 122 76 Q 122 74 120 74 Z" />
      <Path d="M 85 95 Q 100 93 115 95" strokeWidth="2" opacity="0.4" />
      <Path d="M 92 105 L 108 105" strokeWidth="2" opacity="0.4" />
      <Path d="M 60 85 L 63 85 M 61.5 83.5 L 61.5 86.5" strokeWidth="1.5" />
      <Circle cx="140" cy="110" r="2" fill={color} opacity="0.5" />
    </G>
  </Svg>
);

// 17. Sunhat - summer, vacation
export const SunhatIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Ellipse cx="100" cy="105" rx="52" ry="12" />
      <Path d="M 70 105 Q 70 78 85 68 Q 100 62 115 68 Q 130 78 130 105" />
      <Path d="M 75 105 Q 75 85 88 77 Q 100 72 112 77 Q 125 85 125 105" />
      <Path d="M 85 100 Q 100 98 115 100" strokeWidth="2" opacity="0.4" />
      <Path d="M 95 103 Q 98 102 100 103 Q 102 102 105 103" strokeWidth="2" fill={color} opacity="0.3" />
      <Path d="M 58 112 L 61 112 M 59.5 110.5 L 59.5 113.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 18. Scarf - cozy, layering
export const ScarfIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 60 70 Q 65 62 75 60 Q 100 58 125 60 Q 135 62 140 70 Q 142 80 138 90 Q 130 105 115 115 Q 100 122 85 115 Q 70 105 62 90 Q 58 80 60 70" fill={color} opacity="0.1" />
      <Path d="M 80 72 Q 100 70 120 72" strokeWidth="2" />
      <Path d="M 85 82 Q 100 80 115 82" strokeWidth="2" />
      <Path d="M 72 100 L 74 108 L 70 108 L 68 100" strokeWidth="2" fill={color} opacity="0.15" />
      <Path d="M 78 105 L 80 113 L 76 113 L 74 105" strokeWidth="2" fill={color} opacity="0.15" />
      <Path d="M 122 105 L 124 113 L 120 113 L 118 105" strokeWidth="2" fill={color} opacity="0.15" />
      <Path d="M 128 100 L 130 108 L 126 108 L 124 100" strokeWidth="2" fill={color} opacity="0.15" />
    </G>
  </Svg>
);

// 19. Ballet Flats - comfort, classic
export const BalletFlatsIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 55 100 Q 52 95 55 90 Q 65 85 85 87 Q 105 88 115 95 Q 118 100 115 105 L 60 105 Q 55 103 55 100" fill={color} opacity="0.1" />
      <Path d="M 82 93 Q 88 92 94 93" strokeWidth="2" opacity="0.5" />
      <Path d="M 95 96 Q 97 95 100 96 Q 102 95 104 96" strokeWidth="2" fill={color} opacity="0.3" />
      <Path d="M 145 100 Q 142 95 145 90 Q 155 85 175 87 Q 195 88 205 95 Q 208 100 205 105 L 150 105 Q 145 103 145 100" fill={color} opacity="0.1" transform="translate(-70 0)" />
      <Circle cx="75" cy="98" r="2" fill={color} opacity="0.6" />
    </G>
  </Svg>
);

// 20. Blazer - professional, power
export const BlazerIconIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 65 68 Q 62 70 60 75 L 58 95 Q 58 120 60 135 Q 62 145 72 148 L 128 148 Q 138 145 140 135 Q 142 120 142 95 L 140 75 Q 138 70 135 68 L 120 62 Q 100 58 80 62 Z" />
      <Path d="M 80 62 L 75 68 L 72 80" strokeWidth="2" />
      <Path d="M 80 62 L 85 72 L 88 85" strokeWidth="2" />
      <Path d="M 120 62 L 125 68 L 128 80" strokeWidth="2" />
      <Path d="M 120 62 L 115 72 L 112 85" strokeWidth="2" />
      <Circle cx="95" cy="100" r="2.5" fill={color} opacity="0.7" />
      <Circle cx="95" cy="115" r="2.5" fill={color} opacity="0.7" />
      <Path d="M 105 90 L 115 90 L 115 96 L 105 96 Z" strokeWidth="2" fill={color} opacity="0.2" />
    </G>
  </Svg>
);

// 21. Earrings - accessories, statement
export const EarringsIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="75" cy="82" r="3" strokeWidth="2" />
      <Path d="M 75 85 L 75 105" strokeWidth="2" />
      <Circle cx="75" cy="108" r="8" strokeWidth="2" />
      <Circle cx="75" cy="108" r="4" fill={color} opacity="0.6" />
      <Circle cx="125" cy="82" r="3" strokeWidth="2" />
      <Path d="M 125 85 L 125 105" strokeWidth="2" />
      <Circle cx="125" cy="108" r="8" strokeWidth="2" />
      <Circle cx="125" cy="108" r="4" fill={color} opacity="0.6" />
      <Path d="M 65 95 L 68 95 M 66.5 93.5 L 66.5 96.5" strokeWidth="1.5" />
      <Path d="M 132 95 L 135 95 M 133.5 93.5 L 133.5 96.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 22. Clutch - evening, sophistication
export const ClutchIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 55 85 Q 53 85 53 87 L 53 113 Q 53 115 55 115 L 145 115 Q 147 115 147 113 L 147 87 Q 147 85 145 85 Z" />
      <Path d="M 55 85 L 145 85 Q 147 85 147 83 L 147 77 Q 147 75 145 75 L 55 75 Q 53 75 53 77 L 53 83 Q 53 85 55 85" fill={color} opacity="0.15" />
      <Path d="M 95 95 Q 95 93 97 93 L 103 93 Q 105 93 105 95 L 105 101 Q 105 103 103 103 L 97 103 Q 95 103 95 101 Z" strokeWidth="2" />
      <Circle cx="100" cy="98" r="2" fill={color} />
      <Path d="M 160 90 L 163 90 M 161.5 88.5 L 161.5 91.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 23. Beret - French, artistic
export const BeretIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Ellipse cx="100" cy="85" rx="40" ry="25" />
      <Path d="M 60 85 Q 60 95 68 100 L 132 100 Q 140 95 140 85" fill={color} opacity="0.1" />
      <Circle cx="100" cy="75" r="5" fill={color} opacity="0.5" />
      <Path d="M 75 88 Q 85 86 95 88" strokeWidth="2" opacity="0.4" />
      <Path d="M 55 92 L 58 92 M 56.5 90.5 L 56.5 93.5" strokeWidth="1.5" />
      <Path d="M 142 92 L 145 92 M 143.5 90.5 L 143.5 93.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 24. Watch - timeless, classic
export const WatchIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 85 75 Q 83 75 83 77 L 83 85 L 77 85 Q 75 85 75 87 L 75 113 Q 75 115 77 115 L 83 115 L 83 123 Q 83 125 85 125 L 115 125 Q 117 125 117 123 L 117 115 L 123 115 Q 125 115 125 113 L 125 87 Q 125 85 123 85 L 117 85 L 117 77 Q 117 75 115 75 Z" />
      <Circle cx="100" cy="100" r="18" strokeWidth="2" />
      <Path d="M 100 100 L 100 88" strokeWidth="2" />
      <Path d="M 100 100 L 108 105" strokeWidth="2" />
      <Circle cx="100" cy="100" r="3" fill={color} />
      <Path d="M 140 95 L 143 95 M 141.5 93.5 L 141.5 96.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 25. Flower - romantic, feminine
export const FlowerIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="100" cy="100" r="12" fill={color} opacity="0.3" />
      <Circle cx="85" cy="90" r="15" strokeWidth="2" fill={color} opacity="0.1" />
      <Circle cx="115" cy="90" r="15" strokeWidth="2" fill={color} opacity="0.1" />
      <Circle cx="88" cy="115" r="15" strokeWidth="2" fill={color} opacity="0.1" />
      <Circle cx="112" cy="115" r="15" strokeWidth="2" fill={color} opacity="0.1" />
      <Circle cx="100" cy="80" r="15" strokeWidth="2" fill={color} opacity="0.1" />
      <Circle cx="100" cy="120" r="15" strokeWidth="2" fill={color} opacity="0.1" />
      <Path d="M 100 120 Q 102 135 100 145 Q 98 135 100 120" strokeWidth="2" fill={color} opacity="0.15" />
      <Path d="M 55 125 L 58 125 M 56.5 123.5 L 56.5 126.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 26. Trench Coat - classic, timeless
export const TrenchCoatIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 72 60 Q 70 62 68 68 L 65 140 Q 65 148 72 150 L 92 150 L 92 145 L 88 145 L 88 150 L 128 150 L 128 145 L 124 145 L 124 150 L 128 150 Q 135 148 135 140 L 132 68 Q 130 62 128 60 L 115 55 Q 100 52 85 55 Z" />
      <Path d="M 85 55 L 80 62 L 75 75" strokeWidth="2" />
      <Path d="M 115 55 L 120 62 L 125 75" strokeWidth="2" />
      <Path d="M 88 100 Q 100 98 112 100" strokeWidth="2" opacity="0.4" />
      <Circle cx="94" cy="85" r="2" fill={color} opacity="0.7" />
      <Circle cx="94" cy="95" r="2" fill={color} opacity="0.7" />
      <Circle cx="94" cy="105" r="2" fill={color} opacity="0.7" />
    </G>
  </Svg>
);

// 27. Sneakers - casual, sporty
export const SneakerIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 52 95 Q 50 92 52 88 Q 60 82 78 80 L 125 80 Q 135 82 140 88 Q 145 95 143 102 L 135 108 L 60 108 Q 52 105 52 95" fill={color} opacity="0.1" />
      <Path d="M 60 108 L 58 115 Q 58 118 62 118 L 133 118 Q 137 118 137 115 L 135 108" strokeWidth="2.5" />
      <Path d="M 70 88 L 70 102" strokeWidth="2" />
      <Path d="M 78 88 L 78 102" strokeWidth="2" />
      <Path d="M 86 88 L 86 102" strokeWidth="2" />
      <Path d="M 65 95 Q 80 92 100 95" strokeWidth="2" opacity="0.4" />
      <Path d="M 150 90 L 153 90 M 151.5 88.5 L 151.5 91.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 28. Pocket Square - detail, refinement
export const PocketSquareIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 70 80 Q 68 80 68 82 L 68 118 Q 68 120 70 120 L 130 120 Q 132 120 132 118 L 132 82 Q 132 80 130 80 Z" />
      <Path d="M 75 88 Q 75 85 78 85 L 100 85 L 122 85 Q 125 85 125 88 L 125 95 L 100 105 L 75 95 Z" fill={color} opacity="0.15" />
      <Path d="M 100 85 L 100 105" strokeWidth="2" opacity="0.5" />
      <Path d="M 85 90 Q 95 87 100 90" strokeWidth="2" opacity="0.5" />
      <Path d="M 100 90 Q 105 87 115 90" strokeWidth="2" opacity="0.5" />
      <Path d="M 60 95 L 63 95 M 61.5 93.5 L 61.5 96.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 29. Boots - edgy, confident
export const BootIconIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 72 60 L 72 115 Q 72 122 78 125 L 108 125 Q 114 122 114 115 L 114 60 Q 114 58 112 58 L 74 58 Q 72 58 72 60 Z" fill={color} opacity="0.1" />
      <Path d="M 78 125 L 75 130 Q 75 135 80 135 L 106 135 Q 111 135 111 130 L 108 125" strokeWidth="2" />
      <Path d="M 85 65 L 85 115" strokeWidth="2" opacity="0.4" />
      <Path d="M 75 80 L 111 80" strokeWidth="2" opacity="0.4" />
      <Path d="M 75 95 L 111 95" strokeWidth="2" opacity="0.4" />
      <Circle cx="80" cy="70" r="2" fill={color} opacity="0.6" />
      <Circle cx="80" cy="85" r="2" fill={color} opacity="0.6" />
      <Circle cx="80" cy="100" r="2" fill={color} opacity="0.6" />
    </G>
  </Svg>
);

// 30. Crown - royalty, confidence
export const CrownIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 60 95 L 65 75 L 75 85 L 85 68 L 100 80 L 115 68 L 125 85 L 135 75 L 140 95 L 135 110 Q 133 115 128 115 L 72 115 Q 67 115 65 110 Z" fill={color} opacity="0.15" />
      <Circle cx="100" cy="70" r="5" fill={color} opacity="0.6" />
      <Circle cx="85" cy="78" r="4" fill={color} opacity="0.6" />
      <Circle cx="115" cy="78" r="4" fill={color} opacity="0.6" />
      <Path d="M 75 105 Q 100 103 125 105" strokeWidth="2" opacity="0.4" />
      <Path d="M 55 85 L 58 85 M 56.5 83.5 L 56.5 86.5" strokeWidth="1.5" />
      <Path d="M 142 85 L 145 85 M 143.5 83.5 L 143.5 86.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 31. Button - details matter
export const ButtonIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="100" cy="100" r="25" strokeWidth="2" />
      <Circle cx="100" cy="100" r="15" strokeWidth="2" opacity="0.5" />
      <Circle cx="92" cy="92" r="3" fill={color} opacity="0.6" />
      <Circle cx="108" cy="92" r="3" fill={color} opacity="0.6" />
      <Circle cx="92" cy="108" r="3" fill={color} opacity="0.6" />
      <Circle cx="108" cy="108" r="3" fill={color} opacity="0.6" />
      <Path d="M 65 90 L 68 90 M 66.5 88.5 L 66.5 91.5" strokeWidth="1.5" />
      <Path d="M 132 110 L 135 110 M 133.5 108.5 L 133.5 111.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 32. Mirror - self-reflection, beauty
export const MirrorIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Ellipse cx="100" cy="90" rx="35" ry="42" strokeWidth="2" />
      <Ellipse cx="100" cy="90" rx="30" ry="37" strokeWidth="1.5" opacity="0.3" />
      <Path d="M 100 132 Q 102 145 100 155" strokeWidth="3" />
      <Path d="M 90 155 Q 90 153 92 153 L 108 153 Q 110 153 110 155 L 110 160 Q 110 162 108 162 L 92 162 Q 90 162 90 160 Z" />
      <Path d="M 85 85 Q 90 83 95 85" strokeWidth="2" opacity="0.4" />
      <Path d="M 60 95 L 63 95 M 61.5 93.5 L 61.5 96.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 33. Feather - bohemian, free spirit
export const FeatherIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 100 145 Q 102 100 105 70 Q 107 55 110 50" strokeWidth="2" />
      <Path d="M 105 60 Q 90 65 85 70" strokeWidth="2" opacity="0.6" />
      <Path d="M 105 75 Q 88 80 82 85" strokeWidth="2" opacity="0.6" />
      <Path d="M 104 90 Q 85 95 78 100" strokeWidth="2" opacity="0.6" />
      <Path d="M 103 105 Q 83 110 75 115" strokeWidth="2" opacity="0.6" />
      <Path d="M 105 60 Q 120 65 125 70" strokeWidth="2" opacity="0.6" />
      <Path d="M 105 75 Q 122 80 128 85" strokeWidth="2" opacity="0.6" />
      <Path d="M 104 90 Q 125 95 132 100" strokeWidth="2" opacity="0.6" />
      <Path d="M 103 105 Q 127 110 135 115" strokeWidth="2" opacity="0.6" />
      <Path d="M 140 60 L 143 60 M 141.5 58.5 L 141.5 61.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 34. Zipper - edgy, rock'n'roll
export const ZipperIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 95 55 L 95 145" strokeWidth="2" />
      <Path d="M 105 55 L 105 145" strokeWidth="2" />
      <Path d="M 92 60 L 108 60 M 92 70 L 108 70 M 92 80 L 108 80 M 92 90 L 108 90 M 92 100 L 108 100 M 92 110 L 108 110 M 92 120 L 108 120 M 92 130 L 108 130 M 92 140 L 108 140" strokeWidth="1.5" />
      <Path d="M 95 145 Q 95 148 97 150 L 103 150 Q 105 148 105 145" strokeWidth="2" fill={color} opacity="0.2" />
      <Path d="M 98 150 L 98 156 Q 98 158 100 158 Q 102 158 102 156 L 102 150" strokeWidth="2" />
      <Path d="M 140 100 L 143 100 M 141.5 98.5 L 141.5 101.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 35. Pearl - classic elegance
export const PearlIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 75 85 Q 77 70 100 68 Q 123 70 125 85 Q 126 92 124 98" strokeWidth="2" />
      <Circle cx="100" cy="100" r="8" strokeWidth="2" />
      <Circle cx="88" cy="102" r="7" strokeWidth="2" />
      <Circle cx="112" cy="102" r="7" strokeWidth="2" />
      <Circle cx="78" cy="106" r="6.5" strokeWidth="2" />
      <Circle cx="122" cy="106" r="6.5" strokeWidth="2" />
      <Circle cx="70" cy="112" r="6" strokeWidth="2" />
      <Circle cx="130" cy="112" r="6" strokeWidth="2" />
      <Path d="M 100 95 Q 102 93 104 95" strokeWidth="1.5" stroke="#fff" opacity="0.8" />
      <Path d="M 55 95 L 58 95 M 56.5 93.5 L 56.5 96.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 36. Thread/Needle - craftsmanship, detail
export const ThreadIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 85 60 L 120 95" strokeWidth="2" />
      <Circle cx="82" cy="57" r="4" strokeWidth="2" />
      <Path d="M 120 95 Q 130 105 125 120 Q 115 135 95 130 Q 80 125 78 115 Q 76 105 85 100" strokeWidth="2" fill={color} opacity="0.1" />
      <Path d="M 90 108 Q 100 106 110 108" strokeWidth="2" opacity="0.5" />
      <Path d="M 92 115 Q 100 113 108 115" strokeWidth="2" opacity="0.5" />
      <Path d="M 94 122 Q 100 120 106 122" strokeWidth="2" opacity="0.5" />
      <Path d="M 140 75 L 143 75 M 141.5 73.5 L 141.5 76.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 37. Lace - delicate, romantic
export const LaceIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 60 80 Q 70 75 80 80 Q 90 75 100 80 Q 110 75 120 80 Q 130 75 140 80" strokeWidth="2" />
      <Path d="M 60 95 Q 70 90 80 95 Q 90 90 100 95 Q 110 90 120 95 Q 130 90 140 95" strokeWidth="2" />
      <Path d="M 60 110 Q 70 105 80 110 Q 90 105 100 110 Q 110 105 120 110 Q 130 105 140 110" strokeWidth="2" />
      <Circle cx="70" cy="77" r="3" strokeWidth="1.5" opacity="0.5" />
      <Circle cx="90" cy="77" r="3" strokeWidth="1.5" opacity="0.5" />
      <Circle cx="110" cy="77" r="3" strokeWidth="1.5" opacity="0.5" />
      <Circle cx="130" cy="77" r="3" strokeWidth="1.5" opacity="0.5" />
      <Circle cx="70" cy="92" r="3" strokeWidth="1.5" opacity="0.5" />
      <Circle cx="90" cy="92" r="3" strokeWidth="1.5" opacity="0.5" />
      <Circle cx="110" cy="92" r="3" strokeWidth="1.5" opacity="0.5" />
      <Circle cx="130" cy="92" r="3" strokeWidth="1.5" opacity="0.5" />
    </G>
  </Svg>
);

// 38. Stiletto - power, femininity
export const StilettoIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 70 95 Q 72 90 76 88 L 110 85 Q 118 86 122 92 Q 124 98 124 108 L 124 115 Q 124 118 120 120 L 80 120 Q 76 118 76 115 L 76 108 Q 76 100 70 95" fill={color} opacity="0.1" />
      <Path d="M 120 120 Q 128 122 134 118 Q 138 112 136 106 Q 134 102 130 102" strokeWidth="3" />
      <Path d="M 90 100 Q 95 98 100 100" strokeWidth="2" opacity="0.5" />
      <Path d="M 58 102 L 61 102 M 59.5 100.5 L 59.5 103.5" strokeWidth="1.5" />
      <Path d="M 145 95 L 148 95 M 146.5 93.5 L 146.5 96.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 39. Tie - professional, power
export const TieIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 90 55 L 85 65 L 90 75 L 95 80 L 95 130 L 100 140 L 105 130 L 105 80 L 110 75 L 115 65 L 110 55 Z" fill={color} opacity="0.12" />
      <Path d="M 90 75 Q 100 73 110 75" strokeWidth="2" opacity="0.4" />
      <Path d="M 92 90 L 108 90" strokeWidth="2" opacity="0.4" />
      <Path d="M 93 105 L 107 105" strokeWidth="2" opacity="0.4" />
      <Path d="M 94 120 L 106 120" strokeWidth="2" opacity="0.4" />
      <Path d="M 85 65 Q 90 62 95 65 Q 100 62 105 65 Q 110 62 115 65" strokeWidth="2" />
      <Path d="M 140 90 L 143 90 M 141.5 88.5 L 141.5 91.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 40. Brooch - vintage, statement
export const BroochIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="100" cy="100" r="28" strokeWidth="2" />
      <Circle cx="100" cy="100" r="18" strokeWidth="2" />
      <Circle cx="100" cy="85" r="5" fill={color} opacity="0.6" />
      <Circle cx="115" cy="100" r="5" fill={color} opacity="0.6" />
      <Circle cx="100" cy="115" r="5" fill={color} opacity="0.6" />
      <Circle cx="85" cy="100" r="5" fill={color} opacity="0.6" />
      <Path d="M 65 80 L 68 80 M 66.5 78.5 L 66.5 81.5" strokeWidth="1.5" />
      <Path d="M 132 120 L 135 120 M 133.5 118.5 L 133.5 121.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 41. Glove - sophistication, elegance
export const GloveIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 75 90 Q 73 92 73 95 L 73 135 Q 73 140 78 140 L 122 140 Q 127 140 127 135 L 127 95 Q 127 92 125 90 L 120 85 L 120 70 L 115 70 L 115 80 L 110 80 L 110 65 L 105 65 L 105 80 L 100 80 L 100 62 L 95 62 L 95 80 L 90 80 L 90 68 L 85 68 L 85 80 L 80 85 Z" fill={color} opacity="0.1" />
      <Path d="M 80 110 L 120 110" strokeWidth="2" opacity="0.4" />
      <Path d="M 78 122 L 122 122" strokeWidth="2" opacity="0.4" />
      <Path d="M 142 105 L 145 105 M 143.5 103.5 L 143.5 106.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 42. Cufflinks - refinement, detail
export const CufflinksIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 68 95 Q 68 93 70 93 L 88 93 Q 90 93 90 95 L 90 105 Q 90 107 88 107 L 70 107 Q 68 107 68 105 Z" strokeWidth="2" />
      <Circle cx="79" cy="100" r="4" fill={color} opacity="0.6" />
      <Path d="M 90 100 L 110 100" strokeWidth="2" />
      <Path d="M 110 95 Q 110 93 112 93 L 130 93 Q 132 93 132 95 L 132 105 Q 132 107 130 107 L 112 107 Q 110 107 110 105 Z" strokeWidth="2" />
      <Circle cx="121" cy="100" r="4" fill={color} opacity="0.6" />
      <Path d="M 55 92 L 58 92 M 56.5 90.5 L 56.5 93.5" strokeWidth="1.5" />
      <Path d="M 142 108 L 145 108 M 143.5 106.5 L 143.5 109.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 43. Kimono - elegance, global style
export const KimonoIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 60 65 L 55 70 L 52 85 L 52 125 Q 52 135 60 138 L 75 138 L 75 132 L 70 132 L 70 138 L 130 138 L 130 132 L 125 132 L 125 138 L 140 138 Q 148 135 148 125 L 148 85 L 145 70 L 140 65 L 120 60 Q 100 58 80 60 Z" fill={color} opacity="0.08" />
      <Path d="M 80 60 L 72 68 L 68 85" strokeWidth="2" />
      <Path d="M 120 60 L 128 68 L 132 85" strokeWidth="2" />
      <Path d="M 75 95 Q 100 93 125 95" strokeWidth="2" opacity="0.4" />
      <Circle cx="85" cy="80" r="4" strokeWidth="2" opacity="0.5" />
      <Circle cx="95" cy="85" r="4.5" strokeWidth="2" opacity="0.5" />
      <Circle cx="105" cy="85" r="4.5" strokeWidth="2" opacity="0.5" />
      <Circle cx="115" cy="80" r="4" strokeWidth="2" opacity="0.5" />
    </G>
  </Svg>
);

// 44. Sandal - summer, casual
export const SandalIconIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 60 105 Q 58 102 60 98 Q 68 92 88 94 L 112 94 Q 120 96 124 102 Q 126 108 122 112 L 65 112 Q 60 110 60 105" fill={color} opacity="0.1" />
      <Path d="M 80 94 Q 82 88 86 88 Q 90 88 92 94" strokeWidth="2" />
      <Path d="M 108 94 Q 110 88 114 88 Q 118 88 120 94" strokeWidth="2" />
      <Path d="M 65 100 Q 90 98 115 100" strokeWidth="2" opacity="0.4" />
      <Circle cx="90" cy="105" r="2" fill={color} opacity="0.5" />
      <Path d="M 145 100 L 148 100 M 146.5 98.5 L 146.5 101.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 45. Vest - layering, smart casual
export const VestIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 70 65 Q 68 68 66 75 L 64 105 Q 64 125 68 135 Q 70 140 76 142 L 124 142 Q 130 140 132 135 Q 136 125 136 105 L 134 75 Q 132 68 130 65 L 118 60 Q 100 58 82 60 Z" fill={color} opacity="0.1" />
      <Path d="M 82 60 L 76 68 L 72 82" strokeWidth="2" />
      <Path d="M 82 60 L 88 70 L 92 85" strokeWidth="2" />
      <Path d="M 118 60 L 124 68 L 128 82" strokeWidth="2" />
      <Path d="M 118 60 L 112 70 L 108 85" strokeWidth="2" />
      <Circle cx="97" cy="95" r="2.5" fill={color} opacity="0.7" />
      <Circle cx="97" cy="108" r="2.5" fill={color} opacity="0.7" />
      <Circle cx="97" cy="121" r="2.5" fill={color} opacity="0.7" />
      <Path d="M 78 112 Q 100 110 122 112" strokeWidth="2" opacity="0.4" />
    </G>
  </Svg>
);

// 46. Collar - classic, preppy
export const CollarIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 65 90 L 70 75 L 82 70 L 92 72 L 95 85" strokeWidth="2" fill={color} opacity="0.1" />
      <Path d="M 135 90 L 130 75 L 118 70 L 108 72 L 105 85" strokeWidth="2" fill={color} opacity="0.1" />
      <Path d="M 95 85 Q 97 80 100 80 Q 103 80 105 85" strokeWidth="2" />
      <Path d="M 75 78 Q 80 76 85 78" strokeWidth="2" opacity="0.5" />
      <Path d="M 115 78 Q 120 76 125 78" strokeWidth="2" opacity="0.5" />
      <Circle cx="97" cy="82" r="1.5" fill={color} opacity="0.7" />
      <Circle cx="103" cy="82" r="1.5" fill={color} opacity="0.7" />
      <Path d="M 55 85 L 58 85 M 56.5 83.5 L 56.5 86.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 47. Pocket - functional, style
export const PocketIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 70 80 Q 68 80 68 82 L 68 125 Q 68 132 74 135 L 126 135 Q 132 132 132 125 L 132 82 Q 132 80 130 80 Z" />
      <Path d="M 75 90 Q 100 88 125 90" strokeWidth="2" opacity="0.4" />
      <Path d="M 80 105 L 120 105" strokeWidth="2" opacity="0.4" />
      <Path d="M 82 120 L 118 120" strokeWidth="2" opacity="0.4" />
      <Path d="M 85 88 Q 85 85 87 85 L 95 85 Q 97 85 97 87 L 97 92 L 85 92 Z" strokeWidth="2" fill={color} opacity="0.15" />
      <Path d="M 103 88 Q 103 85 105 85 L 113 85 Q 115 85 115 87 L 115 92 L 103 92 Z" strokeWidth="2" fill={color} opacity="0.15" />
      <Path d="M 145 100 L 148 100 M 146.5 98.5 L 146.5 101.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 48. Heel (Block) - modern, comfortable
export const BlockHeelIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 75 88 Q 77 84 81 82 L 108 80 Q 116 82 120 88 Q 122 95 122 108 L 122 120 Q 122 124 118 126 L 80 126 Q 76 124 76 120 L 76 108 Q 76 98 75 88" fill={color} opacity="0.1" />
      <Path d="M 118 126 L 118 142 Q 118 146 114 146 L 84 146 Q 80 146 80 142 L 80 126" strokeWidth="2.5" />
      <Path d="M 92 100 Q 99 98 106 100" strokeWidth="2" opacity="0.5" />
      <Path d="M 56 95 L 59 95 M 57.5 93.5 L 57.5 96.5" strokeWidth="1.5" />
      <Path d="M 140 110 L 143 110 M 141.5 108.5 L 141.5 111.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 49. Belt - structure, definition
export const BeltIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 50 95 Q 50 93 52 93 L 148 93 Q 150 93 150 95 L 150 105 Q 150 107 148 107 L 52 107 Q 50 107 50 105 Z" />
      <Path d="M 85 93 Q 83 93 83 95 L 83 105 Q 83 107 85 107 L 115 107 Q 117 107 117 105 L 117 95 Q 117 93 115 93 Z" strokeWidth="2" />
      <Circle cx="100" cy="100" r="5" strokeWidth="2" />
      <Circle cx="100" cy="100" r="2" fill={color} />
      <Path d="M 60 100 L 63 100" strokeWidth="2" />
      <Path d="M 68 100 L 71 100" strokeWidth="2" />
      <Path d="M 129 100 L 132 100" strokeWidth="2" />
      <Path d="M 137 100 L 140 100" strokeWidth="2" />
      <Path d="M 55 85 L 58 85 M 56.5 83.5 L 56.5 86.5" strokeWidth="1.5" />
    </G>
  </Svg>
);

// 50. Jumpsuit - modern, effortless
export const JumpsuitIllustration = ({ size = 200, color = '#000' }: IllustrationProps) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <G stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 78 58 Q 76 60 74 66 L 72 95 Q 72 110 74 125 L 74 148 Q 74 152 78 152 L 92 152 Q 96 152 96 148 L 96 125 L 104 125 L 104 148 Q 104 152 108 152 L 122 152 Q 126 152 126 148 L 126 125 Q 128 110 128 95 L 126 66 Q 124 60 122 58 L 112 54 Q 100 52 88 54 Z" fill={color} opacity="0.1" />
      <Path d="M 88 54 L 82 62 L 78 78" strokeWidth="2" />
      <Path d="M 112 54 L 118 62 L 122 78" strokeWidth="2" />
      <Path d="M 78 90 Q 100 88 122 90" strokeWidth="2" opacity="0.4" />
      <Circle cx="98" cy="75" r="2" fill={color} opacity="0.7" />
      <Circle cx="98" cy="85" r="2" fill={color} opacity="0.7" />
      <Path d="M 60 100 L 63 100 M 61.5 98.5 L 61.5 101.5" strokeWidth="1.5" />
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
  highheels: HighHeelsIllustration,
  handbag: HandbagIllustration,
  bowtie: BowTieIllustration,
  perfume: PerfumeIllustration,
  sunhat: SunhatIllustration,
  scarf: ScarfIllustration,
  balletflats: BalletFlatsIllustration,
  blazericon: BlazerIconIllustration,
  earrings: EarringsIllustration,
  clutch: ClutchIllustration,
  beret: BeretIllustration,
  watch: WatchIllustration,
  flower: FlowerIllustration,
  trenchcoat: TrenchCoatIllustration,
  sneaker: SneakerIllustration,
  pocketsquare: PocketSquareIllustration,
  booticon: BootIconIllustration,
  crown: CrownIllustration,
  button: ButtonIllustration,
  mirror: MirrorIllustration,
  feather: FeatherIllustration,
  zipper: ZipperIllustration,
  pearl: PearlIllustration,
  thread: ThreadIllustration,
  lace: LaceIllustration,
  stiletto: StilettoIllustration,
  tie: TieIllustration,
  brooch: BroochIllustration,
  glove: GloveIllustration,
  cufflinks: CufflinksIllustration,
  kimono: KimonoIllustration,
  sandalicon: SandalIconIllustration,
  vest: VestIllustration,
  collar: CollarIllustration,
  pocket: PocketIllustration,
  blockheel: BlockHeelIllustration,
  belt: BeltIllustration,
  jumpsuit: JumpsuitIllustration,
};

export type IllustrationType = keyof typeof illustrations;
