import { Text, type TextProps } from 'react-native';
import { useThemeColors, type } from '@/theme';

type ThemedTextProps = TextProps & {
  variant?: keyof typeof type;
  color?: 'text' | 'textSecondary' | 'accent';
};

export function ThemedText({
  variant = 'body',
  color = 'text',
  style,
  ...props
}: ThemedTextProps) {
  const colors = useThemeColors();

  return <Text {...props} style={[type[variant], { color: colors[color] }, style]} />;
}
