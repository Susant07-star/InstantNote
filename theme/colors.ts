import { useColorScheme } from 'react-native';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  separator: string;
  accent: string;
  onAccent: string;
  accentSubtle: string;
  capture: string;
  onCapture: string;
  destructive: string;
  onDestructive: string;
}

const palettes: Record<'light' | 'dark', ThemeColors> = {
  light: {
    background: '#F7F6F2',
    surface: '#FFFDF8',
    surfaceSecondary: '#EFEDE5',
    text: '#242821',
    textSecondary: '#575E55',
    separator: '#D9DBD2',
    accent: '#365C46',
    onAccent: '#FFFFFF',
    accentSubtle: '#E4ECE4',
    capture: '#A84F3A',
    onCapture: '#FFFFFF',
    destructive: '#A12A22',
    onDestructive: '#FFFFFF',
  },
  dark: {
    background: '#181B18',
    surface: '#222722',
    surfaceSecondary: '#2C322C',
    text: '#F2F1E9',
    textSecondary: '#C1C7BE',
    separator: '#454C45',
    accent: '#A7C6A7',
    onAccent: '#17241A',
    accentSubtle: '#2E3B30',
    capture: '#F09581',
    onCapture: '#2C130E',
    destructive: '#FFB4AB',
    onDestructive: '#690005',
  },
};

export function useThemeColors(): ThemeColors {
  const colorScheme = useColorScheme();

  return palettes[colorScheme === 'dark' ? 'dark' : 'light'];
}
