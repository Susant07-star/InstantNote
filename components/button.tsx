import { Button as NativeButton, Host } from '@expo/ui';
import type { StyleProp, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import { radius, spacing, useThemeColors } from '../theme';

const variants = {
  primary: 'filled',
  secondary: 'outlined',
} as const;

const sizes = {
  regular: spacing.sm,
  large: spacing.md,
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  size = 'regular',
  disabled = false,
  testID,
  style,
}: AppButtonProps) {
  const colorScheme = useColorScheme();
  const colors = useThemeColors();

  return (
    <Host
      matchContents
      colorScheme={colorScheme ?? undefined}
      seedColor={colors.accent}
      style={[{ minHeight: spacing.xxl }, style]}
    >
      <NativeButton
        label={label}
        onPress={onPress}
        variant={variants[variant]}
        disabled={disabled}
        testID={testID}
        style={{
          paddingHorizontal: spacing.md,
          paddingVertical: sizes[size],
          borderRadius: radius.full,
        }}
      />
    </Host>
  );
}
