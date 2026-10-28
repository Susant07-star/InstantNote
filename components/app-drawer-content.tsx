import { SymbolView } from 'expo-symbols';
import type { DrawerContentComponentProps } from 'expo-router/drawer';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius, spacing, type, useThemeColors } from '@/theme';

const drawerItems = [
  {
    route: 'index',
    label: 'Capture',
    icon: { ios: 'mic.fill', android: 'mic', web: 'mic' },
  },
  {
    route: 'ideas',
    label: 'Ideas',
    icon: { ios: 'lightbulb', android: 'lightbulb', web: 'lightbulb' },
  },
] as const;

export function AppDrawerContent({
  navigation,
  state,
}: DrawerContentComponentProps) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const topInset = Math.max(insets.top, StatusBar.currentHeight ?? 0);
  const activeRoute = state.routes[state.index]?.name;

  return (
    <View
      style={{
        flex: 1,
        padding: spacing.md,
        paddingTop: Math.max(spacing.xl, topInset + spacing.xxs),
        backgroundColor: colors.surface,
      }}
    >
      <View
        style={{
          minHeight: spacing.xxxl,
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          paddingBottom: spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: colors.separator,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close navigation drawer"
          onPress={() => navigation.closeDrawer()}
          style={({ pressed }) => ({
            width: spacing.xxl,
            height: spacing.xxl,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: radius.full,
            backgroundColor: pressed ? colors.surfaceSecondary : 'transparent',
          })}
          testID="close-navigation-drawer"
        >
          <SymbolView
            name={{ ios: 'sidebar.left', android: 'side_navigation', web: 'side_navigation' }}
            size={spacing.lg}
            tintColor={colors.textSecondary}
          />
        </Pressable>

        <View
          accessibilityElementsHidden
          importantForAccessibility="no"
          style={{
            width: spacing.xl,
            height: spacing.xl,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: radius.full,
            backgroundColor: colors.accentSubtle,
          }}
        >
          <View
            style={{
              width: spacing.sm,
              height: spacing.sm,
              borderRadius: radius.full,
              backgroundColor: colors.accent,
            }}
          />
        </View>
        <Text
          accessibilityRole="header"
          style={[type.headline, { color: colors.text }]}
        >
          InstantNote
        </Text>
      </View>

      <View style={{ gap: spacing.xs, paddingTop: spacing.lg }}>
        {drawerItems.map((item) => {
          const selected = activeRoute === item.route;

          return (
            <Pressable
              key={item.route}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => navigation.navigate(item.route)}
              style={({ pressed }) => ({
                minHeight: spacing.xxxl,
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.md,
                paddingHorizontal: spacing.md,
                borderRadius: radius.lg,
                borderCurve: 'continuous',
                backgroundColor: selected
                  ? colors.accentSubtle
                  : pressed
                    ? colors.surfaceSecondary
                    : 'transparent',
              })}
              testID={`drawer-route-${item.route}`}
            >
              <SymbolView
                name={item.icon}
                size={spacing.lg}
                tintColor={selected ? colors.accent : colors.textSecondary}
              />
              <Text
                style={[
                  type.body,
                  {
                    color: selected ? colors.accent : colors.text,
                    fontWeight: selected ? '600' : '400',
                  },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
