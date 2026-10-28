import { SymbolView } from 'expo-symbols';
import { Alert, Pressable, View } from 'react-native';
import { radius, spacing, useThemeColors } from '@/theme';

export default function CaptureReadyScreen() {
  const colors = useThemeColors();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
        backgroundColor: colors.background,
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Start a voice note"
        accessibilityHint="Voice capture is not available in this preview yet."
        onPress={() =>
          Alert.alert(
            'Voice capture comes next',
            'This preview does not request microphone access or start a recording.',
          )
        }
        style={({ pressed }) => ({
          width: spacing.xxxl * 2 + spacing.md,
          height: spacing.xxxl * 2 + spacing.md,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: radius.full,
          borderWidth: 1,
          borderColor: colors.separator,
          backgroundColor: colors.accentSubtle,
          opacity: pressed ? 0.7 : 1,
        })}
        testID="start-voice-note"
      >
        <SymbolView
          accessibilityElementsHidden
          importantForAccessibility="no"
          name={{ ios: 'mic.fill', android: 'mic', web: 'mic' }}
          size={spacing.xxl}
          tintColor={colors.accent}
          weight="semibold"
        />
      </Pressable>
    </View>
  );
}
