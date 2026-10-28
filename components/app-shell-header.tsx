import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from 'react-native';
import type { DrawerHeaderProps } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius, spacing, type, useThemeColors } from '@/theme';

type ViewMode = 'list' | 'card' | 'grid';

const viewModes = [
  {
    id: 'list',
    label: 'List View',
    icon: { ios: 'list.bullet', android: 'view_list', web: 'view_list' },
  },
  {
    id: 'card',
    label: 'Card View',
    icon: { ios: 'rectangle.grid.1x2', android: 'view_agenda', web: 'view_agenda' },
  },
  {
    id: 'grid',
    label: 'Grid View',
    icon: { ios: 'square.grid.2x2', android: 'grid_view', web: 'grid_view' },
  },
] as const satisfies {
  id: ViewMode;
  label: string;
  icon: { ios: string; android: string; web: string };
}[];

export function AppShellHeader({ navigation, route }: DrawerHeaderProps) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const topInset = Math.max(insets.top, StatusBar.currentHeight ?? 0);
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const activeTab = route.name === 'ideas' ? 'ideas' : 'index';

  return (
    <>
      <View
        style={{
          paddingTop: topInset,
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.separator,
        }}
      >
        <View
          style={{
            height: spacing.xxxl,
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.xs,
            paddingHorizontal: spacing.xs,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open navigation drawer"
            onPress={() => navigation.openDrawer()}
            style={({ pressed }) => ({
              width: spacing.xxl,
              height: spacing.xxl,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: radius.full,
              backgroundColor: pressed ? colors.surfaceSecondary : 'transparent',
            })}
            testID="open-navigation-drawer"
          >
            <SymbolView
              name={{
                ios: 'sidebar.left',
                android: 'side_navigation',
                web: 'side_navigation',
              }}
              size={spacing.lg}
              tintColor={colors.text}
            />
          </Pressable>

          <View
            accessibilityRole="tablist"
            style={{
              flex: 1,
              height: spacing.xxl,
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.xxs,
              padding: spacing.xxs,
              borderRadius: radius.full,
              backgroundColor: colors.surfaceSecondary,
            }}
          >
            {([
              { id: 'index', label: 'Capture', path: '/' },
              { id: 'ideas', label: 'Ideas', path: '/ideas' },
            ] as const).map((tab) => {
              const selected = activeTab === tab.id;

              return (
                <Pressable
                  key={tab.id}
                  accessibilityRole="tab"
                  accessibilityState={{ selected }}
                  onPress={() => router.replace(tab.path)}
                  style={({ pressed }) => ({
                    flex: 1,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: radius.full,
                    backgroundColor: selected ? colors.surface : 'transparent',
                    opacity: pressed ? 0.75 : 1,
                  })}
                  testID={`top-tab-${tab.id}`}
                >
                  <Text
                    style={[
                      type.subhead,
                      {
                        color: selected ? colors.accent : colors.textSecondary,
                        fontWeight: selected ? '600' : '500',
                      },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {activeTab === 'ideas' ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Choose ideas view"
              accessibilityHint="Opens list, card, and grid view options."
              onPress={() => setMenuVisible(true)}
              style={({ pressed }) => ({
                width: spacing.xxl,
                height: spacing.xxl,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: radius.full,
                backgroundColor: pressed
                  ? colors.surfaceSecondary
                  : 'transparent',
              })}
              testID="open-view-menu"
            >
              <SymbolView
                name={{
                  ios: 'ellipsis',
                  android: 'more_horiz',
                  web: 'more_horiz',
                }}
                size={spacing.lg}
                tintColor={colors.text}
              />
            </Pressable>
          ) : (
            <View style={{ width: spacing.xxl }} />
          )}
        </View>
      </View>

      <Modal
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
        statusBarTranslucent
        transparent
        visible={menuVisible}
      >
        <View style={{ flex: 1 }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close view menu"
            onPress={() => setMenuVisible(false)}
            style={StyleSheet.absoluteFill}
          />
          <View
            accessibilityLabel="Idea view options"
            style={{
              position: 'absolute',
              top: topInset + spacing.xxxl + spacing.xs,
              right: spacing.xs,
              width: spacing.xxxl * 3,
              paddingVertical: spacing.xxs,
              paddingHorizontal: spacing.xxs,
              borderRadius: radius.lg,
              borderCurve: 'continuous',
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.separator,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.16)',
            }}
          >
            {viewModes.map((mode) => {
              const selected = viewMode === mode.id;

              return (
                <Pressable
                  key={mode.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => {
                    setViewMode(mode.id);
                    setMenuVisible(false);
                  }}
                  style={({ pressed }) => ({
                    minHeight: spacing.xxl,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.sm,
                    paddingHorizontal: spacing.sm,
                    borderRadius: radius.md,
                    backgroundColor: pressed
                      ? colors.surfaceSecondary
                      : 'transparent',
                  })}
                  testID={`view-mode-${mode.id}`}
                >
                  <SymbolView
                    name={mode.icon}
                    size={spacing.lg}
                    tintColor={selected ? colors.accent : colors.textSecondary}
                  />
                  <Text
                    style={[
                      type.body,
                      {
                        flex: 1,
                        color: selected ? colors.accent : colors.text,
                        fontWeight: selected ? '600' : '400',
                      },
                    ]}
                  >
                    {mode.label}
                  </Text>
                  {selected ? (
                    <SymbolView
                      name={{
                        ios: 'checkmark',
                        android: 'check',
                        web: 'check',
                      }}
                      size={spacing.md}
                      tintColor={colors.accent}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );
}
