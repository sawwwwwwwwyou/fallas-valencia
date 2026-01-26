/**
 * 🔥 FALLAS VALENCIA — Design System
 * 
 * Based on: DESIGN-CONCEPT.md v1.0
 * Philosophy: "El fuego que une Valencia"
 */

// ============================================
// COLORS
// ============================================

export const colors = {
  // Primary Colors
  primary: {
    flame: '#E63946',      // Акценты, важные кнопки, Live-статусы
    orange: '#FF6B35',     // Primary brand, headers, активные элементы
    gold: '#FFB800',       // Награды, премиум, звёзды
    navy: '#1D3557',       // Контраст, тексты, navy элементы
  },

  // Secondary Colors
  secondary: {
    coral: '#FF8A5B',      // Hover states, secondary buttons
    ceramic: '#457B9D',    // Links, info states, Valencian ceramics
    ember: '#FF4D4D',      // Errors, urgent, hot notifications
  },

  // Background Colors
  background: {
    cream: '#FFF8F0',      // Main background — тёплый, НЕ серый!
    white: '#FEFEFE',      // Cards, modals
    ash: '#F5F0EB',        // Secondary backgrounds
    charcoal: '#2D2D2D',   // Dark mode background
  },

  // Text Colors
  text: {
    primary: '#1D3557',    // Headlines, важный текст
    secondary: '#457B9D',  // Body text, descriptions
    tertiary: '#8B9AAE',   // Hints, placeholders
    inverse: '#FEFEFE',    // На тёмных backgrounds
  },

  // Semantic Colors
  semantic: {
    success: '#2A9D8F',    // Saved, success states
    warning: '#E9C46A',    // Warnings, attention
    error: '#E63946',      // Errors (same as Flame Red)
    info: '#457B9D',       // Information (same as Ceramic Blue)
  },

  // Gradients (arrays for LinearGradient)
  gradients: {
    fire: ['#FF6B35', '#E63946', '#FFB800'],      // Primary Fire Gradient
    sunset: ['#FF6B35', '#FF8A5B'],               // For Sección Especial cards
    nightFire: ['#1D3557', '#E63946'],            // For dark sections
    goldShimmer: ['#FFB800', '#FFF8F0', '#FFB800'], // For awards
    ceramic: ['#457B9D', '#1D3557'],              // Valencian heritage
  },
};

// ============================================
// CATEGORY COLORS
// ============================================

export type CategoryKey = 
  | 'Sección Especial' 
  | 'Primera A' 
  | 'Primera B' 
  | 'Segunda A' 
  | 'Segunda B' 
  | 'Tercera A' 
  | 'Tercera B' 
  | 'Tercera C'
  | 'Infantil'
  | 'Lacas';

export const categoryColors: Record<string, {
  primary: string;
  background: string;
  text: string;
}> = {
  'Sección Especial': {
    primary: '#FFB800',
    background: '#FFF8E7',
    text: '#8B6914',
  },
  'Primera A': {
    primary: '#E63946',
    background: '#FFEBEB',
    text: '#9E1B1B',
  },
  'Primera B': {
    primary: '#FF6B35',
    background: '#FFF0EB',
    text: '#B84315',
  },
  'Segunda A': {
    primary: '#457B9D',
    background: '#E8F4FA',
    text: '#2D5A75',
  },
  'Segunda B': {
    primary: '#2A9D8F',
    background: '#E6F7F5',
    text: '#1D6B62',
  },
  'Tercera A': {
    primary: '#8B9AAE',
    background: '#F0F2F5',
    text: '#5A6677',
  },
  'Tercera B': {
    primary: '#ADB5BD',
    background: '#F5F6F7',
    text: '#6B7280',
  },
  'Tercera C': {
    primary: '#ADB5BD',
    background: '#F5F6F7',
    text: '#6B7280',
  },
  'Infantil': {
    primary: '#FF8A5B',
    background: '#FFF5F0',
    text: '#C45A2A',
  },
  'Lacas': {
    primary: '#ADB5BD',
    background: '#F5F6F7',
    text: '#6B7280',
  },
};

// Helper function to get category color with fallback
export function getCategoryColor(category: string) {
  return categoryColors[category] || {
    primary: colors.primary.orange,
    background: colors.background.ash,
    text: colors.text.secondary,
  };
}

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  // Font families (system fonts for now, can add custom later)
  fonts: {
    display: 'System',  // TODO: Add Playfair Display
    body: 'System',     // SF Pro Text / Roboto
    accent: 'System',   // SF Pro Rounded
  },

  // Type scale (8pt grid)
  sizes: {
    hero: 40,
    h1: 32,
    h2: 24,
    h3: 20,
    h4: 17,
    bodyLarge: 17,
    body: 15,
    caption: 13,
    small: 11,
  },

  // Line heights
  lineHeights: {
    hero: 48,
    h1: 40,
    h2: 32,
    h3: 28,
    h4: 24,
    bodyLarge: 26,
    body: 22,
    caption: 18,
    small: 16,
  },

  // Font weights
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    black: '900' as const,
  },
};

// ============================================
// SPACING
// ============================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 28,    // For pill-shaped buttons (56px height / 2)
  full: 9999,  // For circles
};

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  card: {
    shadowColor: colors.primary.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  cardHero: {
    shadowColor: colors.primary.flame,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 8,
  },
  button: {
    shadowColor: colors.primary.orange,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 6,
  },
  tabBar: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 10,
  },
};

// ============================================
// ANIMATION TIMING
// ============================================

export const timing = {
  quick: {
    duration: 150,
  },
  normal: {
    duration: 250,
  },
  smooth: {
    duration: 350,
  },
  dramatic: {
    duration: 600,
  },
  spring: {
    stiffness: 300,
    damping: 25,
    mass: 1,
  },
};

// ============================================
// ICON SIZES
// ============================================

export const iconSizes = {
  xs: 16,
  sm: 24,
  md: 28,
  lg: 32,
  xl: 48,
  xxl: 64,
};

// ============================================
// COMPONENT SPECS
// ============================================

export const components = {
  card: {
    standard: {
      height: 120,
      borderRadius: borderRadius.lg,
      thumbnailSize: 80,
    },
    hero: {
      minHeight: 280,
      borderRadius: borderRadius.xl,
      photoHeight: 160,
    },
    compact: {
      height: 56,
      borderRadius: borderRadius.md,
    },
  },
  button: {
    height: 56,
    borderRadius: borderRadius.pill,
    iconSize: 24,
  },
  tabBar: {
    height: 83,        // Including safe area
    iconSize: 28,
    labelSize: 11,
  },
  badge: {
    height: 24,
    borderRadius: 12,
    fontSize: 11,
    iconSize: 14,
  },
  filterChip: {
    height: 36,
    borderRadius: 18,
  },
};

// ============================================
// DEFAULT THEME EXPORT
// ============================================

export const theme = {
  colors,
  categoryColors,
  getCategoryColor,
  typography,
  spacing,
  borderRadius,
  shadows,
  timing,
  iconSizes,
  components,
};

export default theme;
