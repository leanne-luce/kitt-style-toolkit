import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { usePaperTheme } from '@/hooks/use-paper-theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  usePaperBackground?: boolean;
};

export function ThemedView({ style, lightColor, darkColor, usePaperBackground, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const paperTheme = usePaperTheme();

  const finalBackgroundColor = usePaperBackground ? paperTheme.colors.background : backgroundColor;

  return <View style={[{ backgroundColor: finalBackgroundColor }, style]} {...otherProps} />;
}
