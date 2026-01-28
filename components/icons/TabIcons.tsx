/**
 * 🔥 FALLAS VALENCIA — Tab Bar Icons
 * 
 * Custom SVG icons for bottom tab navigation
 * Style: Clean, simple, lucide-react inspired
 * Matching reference design
 */

import React from 'react';
import Svg, { Path, Rect, Circle, Line } from 'react-native-svg';
import { colors } from '../../lib/theme';

interface IconProps {
  size?: number;
  color?: string;
  focused?: boolean;
}

const DEFAULT_SIZE = 24;
const STROKE_WIDTH = 2;

/**
 * ListIcon - Simple list/menu icon
 */
export function ListIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.tertiary,
  focused = false 
}: IconProps) {
  const activeColor = focused ? '#FFFFFF' : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="4" y1="6" x2="20" y2="6" stroke={activeColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="4" y1="12" x2="20" y2="12" stroke={activeColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="4" y1="18" x2="20" y2="18" stroke={activeColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
    </Svg>
  );
}

/**
 * MapIcon - Map icon (matching lucide-react Map icon from design)
 */
export function MapIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.tertiary,
  focused = false 
}: IconProps) {
  const activeColor = focused ? '#FFFFFF' : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Map polygon - left section */}
      <Path
        d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={focused ? 'rgba(255,255,255,0.1)' : 'transparent'}
      />
      {/* Vertical lines */}
      <Line x1="8" y1="2" x2="8" y2="18" stroke={activeColor} strokeWidth={STROKE_WIDTH} />
      <Line x1="16" y1="6" x2="16" y2="22" stroke={activeColor} strokeWidth={STROKE_WIDTH} />
    </Svg>
  );
}

/**
 * FavoritesIcon - Bookmark icon (matching reference design)
 */
export function FavoritesIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.tertiary,
  focused = false 
}: IconProps) {
  const activeColor = focused ? '#FFFFFF' : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={focused ? 'rgba(255,255,255,0.1)' : 'transparent'}
      />
    </Svg>
  );
}

/**
 * GuideIcon - Simple book/square icon (matching reference)
 */
export function GuideIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.tertiary,
  focused = false 
}: IconProps) {
  const activeColor = focused ? '#FFFFFF' : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Book outline */}
      <Path
        d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={focused ? 'rgba(255,255,255,0.1)' : 'transparent'}
      />
    </Svg>
  );
}

/**
 * EventsIcon - Calendar icon (matching reference design)
 */
export function EventsIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.tertiary,
  focused = false 
}: IconProps) {
  const activeColor = focused ? '#FFFFFF' : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Calendar body */}
      <Rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke={activeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={focused ? 'rgba(255,255,255,0.1)' : 'transparent'}
      />
      {/* Top line */}
      <Line x1="3" y1="10" x2="21" y2="10" stroke={activeColor} strokeWidth={STROKE_WIDTH} />
      {/* Calendar pins */}
      <Line x1="8" y1="2" x2="8" y2="6" stroke={activeColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="16" y1="2" x2="16" y2="6" stroke={activeColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      {/* Date dots */}
      <Circle cx="8" cy="14" r="1" fill={activeColor} />
      <Circle cx="12" cy="14" r="1" fill={activeColor} />
      <Circle cx="16" cy="14" r="1" fill={activeColor} />
      <Circle cx="8" cy="18" r="1" fill={activeColor} />
      <Circle cx="12" cy="18" r="1" fill={activeColor} />
    </Svg>
  );
}
