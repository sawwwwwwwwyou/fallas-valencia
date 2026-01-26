/**
 * 🔥 FALLAS VALENCIA — Guide Section Icons
 * 
 * Larger icons (48x48) for guide section cards
 * More detailed, with fills
 * Based on: ICONS-SPEC.md
 */

import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polyline, G, Ellipse } from 'react-native-svg';
import { colors } from '../../lib/theme';

interface IconProps {
  size?: number;
  color?: string;
}

const DEFAULT_SIZE = 48;
const STROKE_WIDTH = 2;

/**
 * icon-guide-fireworks (Pirotecnia)
 * Firework burst with sparkles
 */
export function FireworksIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.primary.flame 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Central burst */}
      <Circle cx="24" cy="20" r="6" fill={colors.primary.gold} stroke={color} strokeWidth={STROKE_WIDTH} />
      {/* Rays */}
      <Line x1="24" y1="8" x2="24" y2="2" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="24" y1="32" x2="24" y2="38" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="12" y1="20" x2="6" y2="20" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="36" y1="20" x2="42" y2="20" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      {/* Diagonal rays */}
      <Line x1="32" y1="12" x2="36" y2="8" stroke={colors.primary.orange} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="16" y1="12" x2="12" y2="8" stroke={colors.primary.orange} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="32" y1="28" x2="36" y2="32" stroke={colors.primary.orange} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Line x1="16" y1="28" x2="12" y2="32" stroke={colors.primary.orange} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      {/* Sparkles */}
      <Circle cx="38" cy="14" r="2" fill={colors.primary.gold} />
      <Circle cx="10" cy="14" r="2" fill={colors.primary.gold} />
      <Circle cx="24" cy="44" r="2" fill={colors.primary.gold} />
      {/* Stick below */}
      <Line x1="24" y1="38" x2="24" y2="46" stroke={colors.text.tertiary} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

/**
 * icon-guide-transport (Transporte)
 * Bus/metro icon
 */
export function TransportIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.semantic.success 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Bus body */}
      <Rect
        x="8" y="10" width="32" height="24"
        rx="4"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        fill={`${color}20`}
      />
      {/* Windows */}
      <Rect x="12" y="14" width="8" height="8" rx="1" stroke={color} strokeWidth={1.5} fill="white" />
      <Rect x="24" y="14" width="8" height="8" rx="1" stroke={color} strokeWidth={1.5} fill="white" />
      <Rect x="36" y="14" width="4" height="8" rx="1" stroke={color} strokeWidth={1.5} fill="white" />
      {/* Door */}
      <Rect x="14" y="26" width="6" height="8" rx="1" stroke={color} strokeWidth={1.5} />
      {/* Wheels */}
      <Circle cx="16" cy="36" r="3" fill={colors.text.primary} stroke={color} strokeWidth={1.5} />
      <Circle cx="32" cy="36" r="3" fill={colors.text.primary} stroke={color} strokeWidth={1.5} />
      {/* Light strip */}
      <Rect x="10" y="10" width="28" height="3" rx="1" fill={color} />
      {/* Headlights */}
      <Circle cx="10" cy="30" r="2" fill={colors.primary.gold} />
      <Circle cx="38" cy="30" r="2" fill={colors.primary.flame} />
    </Svg>
  );
}

/**
 * icon-guide-exhibitions (Exposiciones)
 * Art frame / gallery icon
 */
export function ExhibitionsIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.secondary.ceramic 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Frame */}
      <Rect
        x="8" y="8" width="32" height="28"
        rx="2"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        fill={`${color}15`}
      />
      {/* Inner frame */}
      <Rect
        x="12" y="12" width="24" height="20"
        stroke={color}
        strokeWidth={1.5}
      />
      {/* Abstract art - flame shape */}
      <Path
        d="M24 16C24 16 20 20 20 23C20 25.5 22 27 24 27C26 27 28 25.5 28 23C28 20 24 16 24 16Z"
        fill={colors.primary.orange}
        stroke={colors.primary.flame}
        strokeWidth={1}
      />
      {/* Hanging wire */}
      <Path
        d="M20 8V4L24 2L28 4V8"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base/pedestal */}
      <Rect x="18" y="38" width="12" height="4" rx="1" fill={colors.text.tertiary} stroke={color} strokeWidth={1} />
      <Rect x="14" y="42" width="20" height="3" rx="1" fill={colors.text.tertiary} stroke={color} strokeWidth={1} />
    </Svg>
  );
}

/**
 * icon-guide-fairs (Ferias)
 * Carnival tent / ferris wheel
 */
export function FairsIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.primary.orange 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Tent top */}
      <Path
        d="M24 4L6 24H42L24 4Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      {/* Stripes on tent */}
      <Path d="M24 4L15 18" stroke={colors.primary.flame} strokeWidth={1.5} />
      <Path d="M24 4L33 18" stroke={colors.primary.flame} strokeWidth={1.5} />
      {/* Tent body */}
      <Path
        d="M8 24V40H40V24"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
      />
      {/* Entrance */}
      <Path
        d="M18 40V30C18 28 20 26 24 26C28 26 30 28 30 30V40"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
        fill={`${colors.primary.flame}30`}
      />
      {/* Flag on top */}
      <Line x1="24" y1="4" x2="24" y2="1" stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <Path
        d="M24 1L28 3L24 5"
        fill={colors.primary.gold}
        stroke={colors.primary.gold}
        strokeWidth={1}
      />
      {/* Decorative lights */}
      <Circle cx="12" cy="24" r="1.5" fill={colors.primary.gold} />
      <Circle cx="18" cy="24" r="1.5" fill={colors.primary.flame} />
      <Circle cx="24" cy="24" r="1.5" fill={colors.primary.gold} />
      <Circle cx="30" cy="24" r="1.5" fill={colors.primary.flame} />
      <Circle cx="36" cy="24" r="1.5" fill={colors.primary.gold} />
    </Svg>
  );
}

/**
 * icon-guide-nightlife (Vida Nocturna)
 * Moon with stars and music note
 */
export function NightlifeIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.secondary.coral 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Moon */}
      <Path
        d="M20 6C12 8 8 16 8 24C8 34 16 42 26 42C34 42 40 36 42 28C36 32 28 30 24 24C20 18 20 10 20 6Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      {/* Stars */}
      <Path
        d="M36 8L37 11L40 12L37 13L36 16L35 13L32 12L35 11L36 8Z"
        fill={colors.primary.gold}
      />
      <Path
        d="M42 18L42.5 20L44.5 20.5L42.5 21L42 23L41.5 21L39.5 20.5L41.5 20L42 18Z"
        fill={colors.primary.gold}
      />
      {/* Music note */}
      <G>
        <Ellipse cx="14" cy="34" rx="3" ry="2.5" fill={color} />
        <Line x1="17" y1="34" x2="17" y2="24" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <Path d="M17 24C17 24 20 22 22 24" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </G>
      {/* Dancing figure silhouette */}
      <Circle cx="30" cy="28" r="2" fill={color} />
      <Path
        d="M30 30V35M28 33L30 35L32 33M28 38L30 35L32 38"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * icon-guide-bullfighting (Toros)
 * Bull head silhouette
 */
export function BullfightingIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.primary.navy 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Bull head */}
      <Path
        d="M24 12C16 12 10 18 10 26C10 34 16 40 24 40C32 40 38 34 38 26C38 18 32 12 24 12Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        fill={`${color}15`}
      />
      {/* Left horn */}
      <Path
        d="M10 20C10 20 4 14 4 10C4 8 6 6 8 8C10 10 10 16 10 20"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}30`}
      />
      {/* Right horn */}
      <Path
        d="M38 20C38 20 44 14 44 10C44 8 42 6 40 8C38 10 38 16 38 20"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}30`}
      />
      {/* Eyes */}
      <Circle cx="18" cy="24" r="2" fill={color} />
      <Circle cx="30" cy="24" r="2" fill={color} />
      {/* Nose */}
      <Ellipse cx="24" cy="32" rx="6" ry="4" stroke={color} strokeWidth={1.5} fill={`${color}20`} />
      {/* Nostrils */}
      <Circle cx="21" cy="32" r="1.5" fill={color} />
      <Circle cx="27" cy="32" r="1.5" fill={color} />
      {/* Ears */}
      <Ellipse cx="12" cy="16" rx="3" ry="4" stroke={color} strokeWidth={1.5} fill={`${color}20`} />
      <Ellipse cx="36" cy="16" rx="3" ry="4" stroke={color} strokeWidth={1.5} fill={`${color}20`} />
    </Svg>
  );
}

/**
 * icon-guide-glossary (Glosario)
 * Book with A-Z letters
 */
export function GlossaryIcon({ 
  size = DEFAULT_SIZE, 
  color = colors.secondary.ceramic 
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Book closed */}
      <Path
        d="M8 8C8 6 10 4 12 4H36C38 4 40 6 40 8V40C40 42 38 44 36 44H12C10 44 8 42 8 40V8Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        fill={`${color}15`}
      />
      {/* Spine */}
      <Line x1="14" y1="4" x2="14" y2="44" stroke={color} strokeWidth={STROKE_WIDTH} />
      {/* Page lines */}
      <Line x1="18" y1="12" x2="34" y2="12" stroke={color} strokeWidth={1} strokeLinecap="round" />
      <Line x1="18" y1="18" x2="34" y2="18" stroke={color} strokeWidth={1} strokeLinecap="round" />
      <Line x1="18" y1="24" x2="34" y2="24" stroke={color} strokeWidth={1} strokeLinecap="round" />
      <Line x1="18" y1="30" x2="30" y2="30" stroke={color} strokeWidth={1} strokeLinecap="round" />
      {/* A-Z badge */}
      <Circle cx="36" cy="38" r="6" fill={colors.primary.orange} stroke={colors.primary.flame} strokeWidth={1} />
      <G>
        <Path
          d="M33 41L35 35L37 41M33.5 39.5H36.5"
          stroke="white"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M38 35V38L40 41"
          stroke="white"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

/**
 * Helper function to get guide icon by ID
 */
export function getGuideIcon(id: string, size: number = DEFAULT_SIZE) {
  switch (id) {
    case 'fireworks':
      return <FireworksIcon size={size} />;
    case 'transport':
      return <TransportIcon size={size} />;
    case 'exhibitions':
      return <ExhibitionsIcon size={size} />;
    case 'fairs':
      return <FairsIcon size={size} />;
    case 'nightlife':
      return <NightlifeIcon size={size} />;
    case 'bullfighting':
      return <BullfightingIcon size={size} />;
    case 'glossary':
      return <GlossaryIcon size={size} />;
    default:
      return <FireworksIcon size={size} />;
  }
}
