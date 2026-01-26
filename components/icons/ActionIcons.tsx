/**
 * 🔥 FALLAS VALENCIA — Action Icons
 * 
 * SVG icons for user actions (heart, share, map, search, etc.)
 * Style: Outlined, 2px stroke, rounded caps
 * Based on: ICONS-SPEC.md
 */

import React from 'react';
import Svg, { Path, Circle, Line, Polyline, G, Rect } from 'react-native-svg';
import { colors } from '../../lib/theme';

interface IconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

const DEFAULT_SIZE = 24;
const STROKE_WIDTH = 2;

/**
 * icon-heart
 * Classic heart outline, fills on favorite
 */
export function HeartIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.tertiary,
  filled = false 
}: IconProps) {
  const fillColor = filled ? colors.primary.flame : 'transparent';
  const strokeColor = filled ? colors.primary.flame : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21C12 21 3 15 3 9C3 6.2 5.2 4 8 4C9.9 4 11.6 5.1 12 6.5C12.4 5.1 14.1 4 16 4C18.8 4 21 6.2 21 9C21 15 12 21 12 21Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * icon-heart-fire
 * Flaming heart for super-favorites
 */
export function HeartFireIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.primary.flame 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Heart */}
      <Path
        d="M12 21C12 21 4 15 4 10C4 7.5 6 5.5 8.5 5.5C10.2 5.5 11.7 6.5 12 7.5C12.3 6.5 13.8 5.5 15.5 5.5C18 5.5 20 7.5 20 10C20 15 12 21 12 21Z"
        fill={`${color}90`}
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Flame on top */}
      <Path
        d="M12 2C12 2 10 4 10 5.5C10 6.9 11 8 12 8C13 8 14 6.9 14 5.5C14 4 12 2 12 2Z"
        fill={colors.primary.gold}
        stroke={colors.primary.orange}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * icon-search
 * Magnifying glass
 */
export function SearchIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.tertiary 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="10" cy="10"
        r="6"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
      />
      <Line
        x1="15" y1="15"
        x2="21" y2="21"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * icon-filter
 * Filter funnel with sliders
 */
export function FilterIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.primary,
  filled = false 
}: IconProps) {
  const activeColor = filled ? colors.primary.orange : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="4" y1="6" x2="20" y2="6" stroke={activeColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="4" y1="12" x2="20" y2="12" stroke={activeColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="4" y1="18" x2="20" y2="18" stroke={activeColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Circle cx="8" cy="6" r="2" fill={activeColor} />
      <Circle cx="16" cy="12" r="2" fill={activeColor} />
      <Circle cx="10" cy="18" r="2" fill={activeColor} />
    </Svg>
  );
}

/**
 * icon-share
 * iOS-style share arrow
 */
export function ShareIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.primary 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3V15"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Polyline
        points="8,7 12,3 16,7"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M6 10V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V10"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * icon-directions
 * Navigation arrow
 */
export function DirectionsIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.primary 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 11L22 2L13 21L11 13L3 11Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}15`}
      />
    </Svg>
  );
}

/**
 * icon-location
 * Map pin with flame tip
 */
export function LocationIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.primary.orange 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C12 2 8 6 8 10C8 13 10 15 12 17C14 15 16 13 16 10C16 6 12 2 12 2Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}30`}
      />
      <Circle
        cx="12" cy="10"
        r="2"
        fill={color}
      />
      {/* Bottom point */}
      <Path
        d="M12 17L12 22"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * icon-back
 * Chevron left (iOS-style)
 */
export function BackIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.primary 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="15,4 7,12 15,20"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/**
 * icon-close
 * X close button
 */
export function CloseIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.primary 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
    </Svg>
  );
}

/**
 * icon-check
 * Checkmark
 */
export function CheckIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.semantic.success 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="4,12 10,18 20,6"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/**
 * icon-plus
 */
export function PlusIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.primary 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="12" y1="4" x2="12" y2="20" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
    </Svg>
  );
}

/**
 * icon-minus
 */
export function MinusIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.primary 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
    </Svg>
  );
}

/**
 * icon-more
 * Three vertical dots
 */
export function MoreIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.primary 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="5" r="1.5" fill={color} />
      <Circle cx="12" cy="12" r="1.5" fill={color} />
      <Circle cx="12" cy="19" r="1.5" fill={color} />
    </Svg>
  );
}

/**
 * icon-chevron-right
 */
export function ChevronRightIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.tertiary 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="9,4 17,12 9,20"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/**
 * icon-calendar
 * Calendar with flame marker
 */
export function CalendarIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.primary 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3" y="5" width="18" height="17"
        rx="2"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
      />
      <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth={STROKE_WIDTH} />
      <Line x1="8" y1="3" x2="8" y2="7" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="16" y1="3" x2="16" y2="7" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      {/* Flame marker on date */}
      <Path
        d="M12 13C12 13 10 15 10 16.5C10 17.9 11 18.5 12 18.5C13 18.5 14 17.9 14 16.5C14 15 12 13 12 13Z"
        fill={colors.primary.orange}
        stroke={colors.primary.orange}
        strokeWidth={1}
      />
    </Svg>
  );
}

/**
 * icon-clock
 */
export function ClockIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.text.primary 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12" cy="12"
        r="9"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
      />
      <Polyline
        points="12,6 12,12 16,14"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/**
 * icon-distance (flame walk)
 * Flame icon for distance indicator
 */
export function DistanceIcon({ 
  size = 16, 
  color = colors.primary.orange 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 2C8 2 5 5 5 7.5C5 9.5 6.5 11 8 11C9.5 11 11 9.5 11 7.5C11 5 8 2 8 2Z"
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
      {/* Walk lines below */}
      <Line x1="6" y1="13" x2="10" y2="13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Line x1="7" y1="15" x2="9" y2="15" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}
