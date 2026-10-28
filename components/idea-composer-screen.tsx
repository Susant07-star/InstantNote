import { Host, TextInput as NativeTextInput } from '@expo/ui';
import { SymbolView } from 'expo-symbols';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '@/components/button';
import { StatusMessage } from '@/components/status-message';
import { ThemedText } from '@/components/themed-text';
import { getIdeasRepository } from '@/storage/ideas-database';
import { radius, spacing, type, useThemeColors } from '@/theme';
import type { Idea } from '@/models/idea';

type SaveError = 'empty' | 'save';

export function IdeaComposerScreen() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [draft, setDraft] = useState('');
  const [saveError, setSaveError] = useState<SaveError | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedIdea, setSavedIdea] = useState<Idea | null>(null);
  const saveInProgress = useRef(false);
  const topInset = Math.max(insets.top, StatusBar.currentHeight ?? 0);

  const saveIdea = async () => {
    if (saveInProgress.current) {
      return;
    }

    if (!draft.trim()) {
      setSaveError('empty');
      return;
    }

    saveInProgress.current = true;
    setIsSaving(true);
    setSaveError(null);
    Keyboard.dismiss();

    try {
      const repository = await getIdeasRepository();
      const idea = await repository.create({
        title: null,
        originalText: draft,
      });
      setSavedIdea(idea);
    } catch (error) {
      console.error('Could not save the local idea.', error);
      setSaveError('save');
    } finally {
      saveInProgress.current = false;
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: 'padding',
        android: 'height',
        default: 'padding',
      })}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View
        style={{
          flex: 1,
          paddingTop: topInset,
          paddingBottom: insets.bottom,
        }}
      >
        <View
          style={{
            minHeight: spacing.xxxl,
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
            paddingHorizontal: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: colors.separator,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={savedIdea ? 'Close saved idea' : 'Close idea editor'}
            accessibilityState={{ disabled: isSaving }}
            disabled={isSaving}
            onPress={() => router.back()}
            style={({ pressed }) => ({
              width: spacing.xxl,
              height: spacing.xxl,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: radius.full,
              backgroundColor: pressed ? colors.surfaceSecondary : 'transparent',
              opacity: isSaving ? 0.6 : 1,
            })}
            testID="close-idea-composer"
          >
            <SymbolView
              accessibilityElementsHidden
              importantForAccessibility="no"
              name={{ ios: 'xmark', android: 'close', web: 'close' }}
              size={spacing.lg}
              tintColor={colors.text}
            />
          </Pressable>
          <ThemedText
            accessibilityRole="header"
            style={{ flex: 1 }}
            variant="headline"
          >
            {savedIdea ? 'Saved idea' : 'New idea'}
          </ThemedText>
          <View style={{ width: spacing.xxl }} />
        </View>

        {savedIdea ? (
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                gap: spacing.lg,
                padding: spacing.lg,
              }}
              contentInsetAdjustmentBehavior="automatic"
            >
              <StatusMessage title="Saved locally" />
              <ThemedText selectable>{savedIdea.originalText}</ThemedText>
            </ScrollView>
            <View
              style={{
                paddingHorizontal: spacing.lg,
                paddingTop: spacing.sm,
              }}
            >
              <AppButton
                label="Done"
                onPress={() => router.back()}
                style={{ alignSelf: 'stretch' }}
              />
            </View>
          </View>
        ) : (
          <>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                gap: spacing.sm,
                padding: spacing.lg,
              }}
              contentInsetAdjustmentBehavior="automatic"
              keyboardShouldPersistTaps="handled"
            >
              <ThemedText variant="label">Your idea</ThemedText>
              <Host style={{ flex: 1 }}>
                <NativeTextInput
                  autoCapitalize="sentences"
                  autoCorrect
                  autoFocus
                  defaultValue={draft}
                  multiline
                  onChangeText={(text) => {
                    setDraft(text);
                    if (saveError) {
                      setSaveError(null);
                    }
                  }}
                  placeholder="Write your idea..."
                  placeholderTextColor={colors.textSecondary}
                  style={{
                    height: spacing.xxxl * 3,
                    padding: spacing.md,
                    borderRadius: radius.md,
                    backgroundColor: colors.surface,
                  }}
                  textStyle={{
                    ...type.body,
                    color: colors.text,
                  }}
                  testID="idea-text-input"
                />
              </Host>
              {saveError ? (
                <StatusMessage
                  message={
                    saveError === 'save'
                      ? 'Your text is still here. Try again.'
                      : undefined
                  }
                  title={
                    saveError === 'empty'
                      ? 'Write something before saving.'
                      : "Couldn't save this idea."
                  }
                  tone="error"
                />
              ) : null}
            </ScrollView>

            <View
              style={{
                paddingHorizontal: spacing.lg,
                paddingTop: spacing.sm,
              }}
            >
              <AppButton
                disabled={isSaving}
                label={isSaving ? 'Saving...' : 'Save idea'}
                onPress={saveIdea}
                size="large"
                style={{ alignSelf: 'stretch' }}
                testID="save-idea"
              />
            </View>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
