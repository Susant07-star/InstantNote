import { View } from 'react-native';
import { spacing } from '@/theme';
import { ThemedText } from './themed-text';

type SectionHeadingProps = {
  title: string;
  supportingText?: string;
};

export function SectionHeading({ title, supportingText }: SectionHeadingProps) {
  return (
    <View style={{ gap: spacing.xxs }}>
      <ThemedText accessibilityRole="header" variant="headline">
        {title}
      </ThemedText>
      {supportingText ? (
        <ThemedText color="textSecondary">{supportingText}</ThemedText>
      ) : null}
    </View>
  );
}
