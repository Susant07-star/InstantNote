import { Drawer } from 'expo-router/drawer';
import { useWindowDimensions } from 'react-native';
import { AppDrawerContent } from '@/components/app-drawer-content';
import { AppShellHeader } from '@/components/app-shell-header';
import { useThemeColors } from '@/theme';

export function AppShellNavigation() {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();

  return (
    <Drawer
      drawerContent={(props) => <AppDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'left',
        drawerType: 'front',
        drawerStyle: {
          width: Math.min(width * 0.84, 360),
          backgroundColor: colors.surface,
        },
        overlayColor: 'rgba(0, 0, 0, 0.42)',
        sceneStyle: { backgroundColor: colors.background },
        header: (props) => <AppShellHeader {...props} />,
        headerStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{ title: 'Capture', drawerLabel: 'Capture' }}
      />
      <Drawer.Screen
        name="ideas"
        options={{ title: 'Ideas', drawerLabel: 'Ideas' }}
      />
    </Drawer>
  );
}
