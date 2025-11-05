import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { Colors } from './theme';

export const paperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.light.tint,
    background: Colors.light.background,
    surface: Colors.light.background,
    onSurface: Colors.light.text,
    onBackground: Colors.light.text,
  },
};

export const paperDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.dark.tint,
    background: Colors.dark.background,
    surface: Colors.dark.background,
    onSurface: Colors.dark.text,
    onBackground: Colors.dark.text,
  },
};

export const paperTheme = { light: paperLightTheme, dark: paperDarkTheme };
