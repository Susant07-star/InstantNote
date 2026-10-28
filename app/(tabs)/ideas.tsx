import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView } from 'expo-symbols';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  RefreshControl,
  StatusBar,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusMessage } from '@/components/status-message';
import { ThemedText } from '@/components/themed-text';
import type { Idea } from '@/models/idea';
import { getIdeasRepository } from '@/storage/ideas-database';
import { radius, spacing, type, useThemeColors } from '@/theme';
import { filterIdeas } from '@/utils/filter-ideas';

function EmptyIdeas() {
  const colors = useThemeColors();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
        padding: spacing.lg,
      }}
    >
      <View
        style={{
          width: spacing.xxxl + spacing.md,
          height: spacing.xxxl + spacing.md,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: radius.full,
          backgroundColor: colors.accentSubtle,
        }}
      >
        <SymbolView
          accessibilityElementsHidden
          importantForAccessibility="no"
          name={{ ios: 'lightbulb', android: 'lightbulb', web: 'lightbulb' }}
          size={spacing.xl}
          tintColor={colors.accent}
        />
      </View>
      <ThemedText accessibilityRole="header" variant="headline">
        No ideas yet
      </ThemedText>
    </View>
  );
}

function NoSearchResults({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        padding: spacing.lg,
      }}
    >
      <ThemedText accessibilityRole="header" variant="headline">
        No matches for “{query.trim()}”
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Clear search"
        onPress={onClear}
        style={({ pressed }) => ({
          minHeight: spacing.xxl,
          justifyContent: 'center',
          paddingHorizontal: spacing.md,
          borderRadius: radius.full,
          opacity: pressed ? 0.7 : 1,
        })}
        testID="clear-no-results"
      >
        <ThemedText color="accent">Clear search</ThemedText>
      </Pressable>
    </View>
  );
}

export default function SavedIdeasScreen() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topInset = Math.max(insets.top, StatusBar.currentHeight ?? 0);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const hasLoadedRef = useRef(false);

  const loadIdeas = useCallback(async () => {
    if (hasLoadedRef.current) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const repository = await getIdeasRepository();
      setIdeas(await repository.list());
      setLoadFailed(false);
    } catch (error) {
      console.error('Could not load local ideas.', error);
      setLoadFailed(true);
    } finally {
      hasLoadedRef.current = true;
      setHasLoaded(true);
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadIdeas();
    }, [loadIdeas]),
  );

  const retryButton = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Retry loading ideas"
      accessibilityState={{ busy: isRefreshing, disabled: isRefreshing }}
      disabled={isRefreshing}
      onPress={() => void loadIdeas()}
      style={({ pressed }) => ({
        minHeight: spacing.xxl,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.md,
        opacity: isRefreshing ? 0.6 : pressed ? 0.7 : 1,
      })}
      testID="retry-load-ideas"
    >
      <ThemedText color="accent">
        {isRefreshing ? 'Retrying...' : 'Try again'}
      </ThemedText>
    </Pressable>
  );

  const filteredIdeas = filterIdeas(ideas, searchQuery);
  const clearSearch = () => setSearchQuery('');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {!hasLoaded && isLoading ? (
        <View
          accessibilityLabel="Loading ideas"
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator color={colors.accent} />
        </View>
      ) : loadFailed && ideas.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            gap: spacing.md,
            padding: spacing.lg,
          }}
        >
          <StatusMessage
            message="Your saved text has not been changed."
            title="Couldn't load your ideas"
            tone="error"
          />
          {retryButton}
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          contentInsetAdjustmentBehavior="automatic"
          data={filteredIdeas}
          keyExtractor={(idea) => String(idea.id)}
          ListEmptyComponent={
            ideas.length === 0 ? (
              <EmptyIdeas />
            ) : (
              <NoSearchResults
                onClear={clearSearch}
                query={searchQuery}
              />
            )
          }
          ListHeaderComponent={
            loadFailed ? (
              <View style={{ padding: spacing.md }}>
                <StatusMessage
                  message="Showing the ideas already loaded."
                  title="Couldn't refresh your ideas"
                  tone="error"
                />
                {retryButton}
              </View>
            ) : undefined
          }
          refreshControl={
            <RefreshControl
              onRefresh={() => void loadIdeas()}
              refreshing={isRefreshing}
              tintColor={colors.accent}
            />
          }
          renderItem={({ item, index }) => (
            <View
              style={{
                gap: spacing.xxs,
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.md,
                borderBottomWidth: index === filteredIdeas.length - 1 ? 0 : 1,
                borderBottomColor: colors.separator,
              }}
            >
              {item.title ? (
                <ThemedText variant="headline">{item.title}</ThemedText>
              ) : null}
              <ThemedText selectable>{item.originalText}</ThemedText>
            </View>
          )}
        />
      )}
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={{ alignSelf: 'stretch' }}
        keyboardVerticalOffset={topInset + spacing.xxxl + 1}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.xs,
            paddingHorizontal: spacing.md,
            paddingTop: spacing.sm,
            paddingBottom: Math.max(insets.bottom, spacing.md),
          }}
        >
          <View
            style={{
              flex: 1,
              minHeight: spacing.xxl,
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.xxs,
              paddingLeft: spacing.sm,
              borderRadius: radius.full,
              borderCurve: 'continuous',
              borderWidth: 1,
              borderColor: colors.separator,
              backgroundColor: colors.surface,
            }}
          >
            {process.env.EXPO_OS === 'ios' ? (
              <SymbolView
                accessibilityElementsHidden
                importantForAccessibility="no"
                name="magnifyingglass"
                size={spacing.lg}
                tintColor={colors.textSecondary}
              />
            ) : (
              <MaterialIcons
                accessible={false}
                name="search"
                size={spacing.lg}
                color={colors.textSecondary}
              />
            )}
            <TextInput
              accessibilityLabel="Search saved ideas"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setSearchQuery}
              placeholder="Search ideas"
              placeholderTextColor={colors.textSecondary}
              returnKeyType="search"
              style={{
                ...type.body,
                flex: 1,
                minWidth: 0,
                paddingVertical: spacing.xs,
                color: colors.text,
              }}
              testID="search-ideas"
              underlineColorAndroid="transparent"
              value={searchQuery}
            />
            {searchQuery.length > 0 ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Clear search"
                onPress={clearSearch}
                style={({ pressed }) => ({
                  width: spacing.xxl,
                  height: spacing.xxl,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: radius.full,
                  opacity: pressed ? 0.7 : 1,
                })}
                testID="clear-search"
              >
                {process.env.EXPO_OS === 'ios' ? (
                  <SymbolView
                    accessibilityElementsHidden
                    importantForAccessibility="no"
                    name="xmark.circle.fill"
                    size={spacing.lg}
                    tintColor={colors.textSecondary}
                  />
                ) : (
                  <MaterialIcons
                    accessible={false}
                    name="cancel"
                    size={spacing.lg}
                    color={colors.textSecondary}
                  />
                )}
              </Pressable>
            ) : null}
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Write a new idea"
            accessibilityHint="Opens the text idea editor."
            onPress={() => router.push('/compose')}
            style={({ pressed }) => ({
              width: spacing.xxl,
              height: spacing.xxl,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: radius.full,
              backgroundColor: colors.accent,
              opacity: pressed ? 0.75 : 1,
            })}
            testID="write-new-idea"
          >
            {process.env.EXPO_OS === 'ios' ? (
              <SymbolView
                accessibilityElementsHidden
                importantForAccessibility="no"
                name="square.and.pencil"
                size={spacing.lg}
                tintColor={colors.onAccent}
              />
            ) : (
              <MaterialIcons
                accessible={false}
                name="edit"
                size={spacing.lg}
                color={colors.onAccent}
              />
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
