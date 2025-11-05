import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { Colors } from './theme';

export const paperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.light.tint,
    secondary: Colors.light.accent,
    background: Colors.light.background,
    surface: Colors.light.surface,
    surfaceVariant: Colors.light.surface,
    onSurface: Colors.light.text,
    onSurfaceVariant: Colors.light.text,
    onBackground: Colors.light.text,
    outline: Colors.light.border,
    outlineVariant: Colors.light.subtle,
    elevation: {
      level0: 'transparent',
      level1: Colors.light.surface,
      level2: Colors.light.surface,
      level3: Colors.light.surface,
      level4: Colors.light.surface,
      level5: Colors.light.surface,
    },
  },
  roundness: 2, // Subtle, refined corners
};

export const paperDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.dark.tint,
    secondary: Colors.dark.accent,
    background: Colors.dark.background,
    surface: Colors.dark.surface,
    surfaceVariant: Colors.dark.surface,
    onSurface: Colors.dark.text,
    onSurfaceVariant: Colors.dark.text,
    onBackground: Colors.dark.text,
    outline: Colors.dark.border,
    outlineVariant: Colors.dark.subtle,
    elevation: {
      level0: 'transparent',
      level1: Colors.dark.surface,
      level2: Colors.dark.surface,
      level3: Colors.dark.surface,
      level4: Colors.dark.surface,
      level5: Colors.dark.surface,
    },
  },
  roundness: 2,
};

export const paperTheme = { light: paperLightTheme, dark: paperDarkTheme };
