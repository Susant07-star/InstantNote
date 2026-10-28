import { View } from 'react-native';
import { radius, spacing, useThemeColors } from '@/theme';
import { ThemedText } from './themed-text';

type StatusMessageProps = {
  title: string;
  message?: string;
  tone?: 'neutral' | 'error';
};

export function StatusMessage({
  title,
  message,
  tone = 'neutral',
}: StatusMessageProps) {
  const colors = useThemeColors();
  const statusColor = tone === 'error' ? colors.destructive : colors.accent;

  return (
    <View
      accessibilityLiveRegion={tone === 'error' ? 'assertive' : 'polite'}
      accessibilityRole={tone === 'error' ? 'alert' : 'text'}
      style={{
        gap: spacing.xxs,
        padding: spacing.md,
        backgroundColor: colors.surfaceSecondary,
        borderLeftWidth: 3,
        borderLeftColor: statusColor,
        borderRadius: radius.md,
      }}
    >
      <ThemedText accessibilityRole="header" color={tone === 'error' ? 'text' : 'accent'} selectable>
        {title}
      </ThemedText>
      {message ? (
        <ThemedText color="textSecondary" selectable>
          {message}
        </ThemedText>
      ) : null}
    </View>
  );
}
