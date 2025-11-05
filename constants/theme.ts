/**
 * Moda Operandi-inspired color palette
 * Sophisticated, luxurious aesthetic with cream backgrounds, black text, and gold accents
 */

import { Platform } from 'react-native';

// Moda Operandi brand colors
const champagneGold = '#C9A961';
const deepBlack = '#000000';
const softCream = '#FAF7F2';
const warmIvory = '#F5F1E8';
const charcoal = '#2C2C2C';
const mutedGold = '#B8975A';
const softGray = '#8B8680';

export const Colors = {
  light: {
    text: deepBlack,
    background: softCream,
    tint: champagneGold,
    icon: charcoal,
    tabIconDefault: softGray,
    tabIconSelected: champagneGold,
    surface: warmIvory,
    border: '#E8E3D8',
    accent: mutedGold,
    subtle: '#C8C3B8',
  },
  dark: {
    text: warmIvory,
    background: '#1A1A1A',
    tint: champagneGold,
    icon: '#B8B3A8',
    tabIconDefault: '#8B8680',
    tabIconSelected: champagneGold,
    surface: charcoal,
    border: '#3A3A3A',
    accent: mutedGold,
    subtle: '#5A5550',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` - elegant sans */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` - editorial serif */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});

// Typography scale inspired by Moda Operandi
export const Typography = {
  title: {
    fontSize: 32,
    fontWeight: '300' as const, // Light weight for elegance
    letterSpacing: 0.5,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  heading: {
    fontSize: 24,
    fontWeight: '400' as const,
    letterSpacing: 0.25,
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  label: {
    fontSize: 14,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
};
