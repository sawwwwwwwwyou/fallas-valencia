export const COLORS = {
  primary: '#FF6B35',
  flameRed: '#E63946',
  warmCream: '#FFF8F0',
  gold: '#FFB800',
  warmMap: '#FDF8F0',
  sandRoad: '#F2E8DA',
  backgroundLight: '#f8f6f5',
  backgroundDark: '#23140f',
};

export const TYPOGRAPHY = {
  serif: Platform.select({
    ios: 'Georgia',
    android: 'serif',
  }),
  sansSerif: Platform.select({
    ios: 'System',
    android: 'Roboto',
  }),
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 12,
  md: 20,
  lg: 24,
  xl: 32,
  full: 9999,
};

import { Platform } from 'react-native';
