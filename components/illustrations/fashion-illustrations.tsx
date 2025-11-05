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
