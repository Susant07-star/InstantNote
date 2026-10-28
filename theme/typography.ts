import type { TextStyle } from 'react-native';

export const type = {
  display: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600',
    letterSpacing: -0.25,
  },
  headline: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  subhead: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
} as const satisfies Record<string, TextStyle>;
