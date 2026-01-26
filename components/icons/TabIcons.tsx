/**
 * 🔥 FALLAS VALENCIA — Tab Bar Icons
 * 
 * Custom SVG icons for bottom tab navigation
 * Style: Outlined, 2px stroke, rounded caps
 * Based on: ICONS-SPEC.md
 */

import React from 'react';
import Svg, { Path, Circle, Line, Polyline, G } from 'react-native-svg';
import { colors } from '../../lib/theme';

interface IconProps {
  size?: number;
  color?: string;
  focused?: boolean;
}

const DEFAULT_SIZE = 28;
const STROKE_WIDTH = 2;

/**
 * icon-tab-list
 * Three horizontal lines (list) with top line styled as flame
 * Used in: Tab Bar — first tab "Lista"
 */
export function ListIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.tertiary,
  focused = false 
}: IconProps) {
  const activeColor = focused ? colors.primary.orange : color;
  const flameColor = focused ? colors.primary.flame : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {/* Flame tip on top */}
      <Path
        d="M14 4C14 4 11 7 11 9.5C11 11.5 12.5 13 14 13C15.5 13 17 11.5 17 9.5C17 7 14 4 14 4Z"
        fill={focused ? flameColor : 'transparent'}
        stroke={flameColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* List lines */}
      <Line
        x1="7" y1="16"
        x2="21" y2="16"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Line
        x1="7" y1="21"
        x2="21" y2="21"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Line
        x1="7" y1="26"
        x2="21" y2="26"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * icon-tab-map
 * Folded map with flame-shaped location pin
 * Used in: Tab Bar — second tab "Mapa"
 */
export function MapIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.tertiary,
  focused = false 
}: IconProps) {
  const activeColor = focused ? colors.primary.orange : color;
  const pinColor = focused ? colors.primary.flame : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {/* Flame-shaped pin */}
      <Path
        d="M14 3C14 3 10 7 10 10.5C10 13.5 12 15 14 15C16 15 18 13.5 18 10.5C18 7 14 3 14 3Z"
        fill={focused ? pinColor : 'transparent'}
        stroke={pinColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="14" cy="10"
        r="2"
        fill={focused ? colors.text.inverse : 'transparent'}
        stroke={focused ? colors.text.inverse : pinColor}
        strokeWidth={1}
      />
      {/* Map folded */}
      <Path
        d="M4 18L10 16L18 18L24 16V26L18 28L10 26L4 28V18Z"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1="10" y1="16"
        x2="10" y2="26"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Line
        x1="18" y1="18"
        x2="18" y2="28"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * icon-tab-favorites
 * Star with heart inside
 * Used in: Tab Bar — third tab "Favoritos"
 */
export function FavoritesIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.tertiary,
  focused = false 
}: IconProps) {
  const activeColor = focused ? colors.primary.orange : color;
  const heartColor = focused ? colors.primary.flame : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {/* Star outline */}
      <Path
        d="M14 2L17.09 8.26L24 9.27L19 14.14L20.18 21.02L14 17.77L7.82 21.02L9 14.14L4 9.27L10.91 8.26L14 2Z"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={focused ? `${colors.primary.orange}20` : 'transparent'}
      />
      {/* Heart inside */}
      <Path
        d="M14 11C14 11 12 9.5 11 10C10 10.5 10 12 11 13C12 14 14 15.5 14 15.5C14 15.5 16 14 17 13C18 12 18 10.5 17 10C16 9.5 14 11 14 11Z"
        fill={focused ? heartColor : 'transparent'}
        stroke={heartColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * icon-tab-guide
 * Open book with flame bookmark
 * Used in: Tab Bar — fourth tab "Guía"
 */
export function GuideIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.tertiary,
  focused = false 
}: IconProps) {
  const activeColor = focused ? colors.primary.orange : color;
  const flameColor = focused ? colors.primary.flame : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      {/* Flame bookmark on top */}
      <Path
        d="M18 3C18 3 16 5 16 6.5C16 8 17 9 18 9C19 9 20 8 20 6.5C20 5 18 3 18 3Z"
        fill={focused ? flameColor : 'transparent'}
        stroke={flameColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Open book */}
      <Path
        d="M4 8H12C13.1 8 14 8.9 14 10V24C14 23.1 13.1 22 12 22H4V8Z"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={focused ? `${colors.primary.orange}10` : 'transparent'}
      />
      <Path
        d="M24 8H16C14.9 8 14 8.9 14 10V24C14 23.1 14.9 22 16 22H24V8Z"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={focused ? `${colors.primary.orange}10` : 'transparent'}
      />
      {/* Page lines */}
      <Line x1="7" y1="12" x2="11" y2="12" stroke={activeColor} strokeWidth={1.5} strokeLinecap="round" />
      <Line x1="7" y1="16" x2="11" y2="16" stroke={activeColor} strokeWidth={1.5} strokeLinecap="round" />
      <Line x1="17" y1="12" x2="21" y2="12" stroke={activeColor} strokeWidth={1.5} strokeLinecap="round" />
      <Line x1="17" y1="16" x2="21" y2="16" stroke={activeColor} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}
