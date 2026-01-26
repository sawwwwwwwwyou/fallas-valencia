/**
 * 🔥 FALLAS VALENCIA — Category Icons
 * 
 * Custom SVG icons for falla categories
 * Style: Outlined with selective fill, 2px stroke
 * Based on: ICONS-SPEC.md
 */

import React from 'react';
import Svg, { Path, Circle, Text as SvgText, G, Rect, Line } from 'react-native-svg';
import { colors, getCategoryColor } from '../../lib/theme';

interface IconProps {
  size?: number;
  color?: string;
}

const DEFAULT_SIZE = 32;
const STROKE_WIDTH = 2;

/**
 * icon-cat-especial
 * Trophy/cup with flame inside - highest category
 * Color: Gold #FFB800
 */
export function EspecialIcon({ size = DEFAULT_SIZE, color = colors.primary.gold }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Trophy cup */}
      <Path
        d="M10 6H22V14C22 17.3 19.3 20 16 20C12.7 20 10 17.3 10 14V6Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      {/* Handles */}
      <Path
        d="M10 8H7C5.9 8 5 8.9 5 10V11C5 12.7 6.3 14 8 14H10"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Path
        d="M22 8H25C26.1 8 27 8.9 27 10V11C27 12.7 25.7 14 24 14H22"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      {/* Base */}
      <Path
        d="M13 20V23H19V20"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 23H21V26H11V23Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}30`}
      />
      {/* Flame inside */}
      <Path
        d="M16 9C16 9 14 11 14 12.5C14 13.9 15.1 15 16 15C16.9 15 18 13.9 18 12.5C18 11 16 9 16 9Z"
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </Svg>
  );
}

/**
 * icon-cat-primera-a
 * Medal with "1" and laurel wreath
 * Color: Flame Red #E63946
 */
export function PrimeraAIcon({ size = DEFAULT_SIZE, color = colors.primary.flame }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Ribbon */}
      <Path
        d="M12 4L10 10H22L20 4"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Medal circle */}
      <Circle
        cx="16" cy="18"
        r="8"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        fill={`${color}20`}
      />
      {/* Inner circle */}
      <Circle
        cx="16" cy="18"
        r="5"
        stroke={color}
        strokeWidth={1.5}
      />
      {/* Number 1 */}
      <SvgText
        x="16" y="21"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill={color}
      >
        1
      </SvgText>
      {/* A indicator */}
      <SvgText
        x="16" y="29"
        textAnchor="middle"
        fontSize="6"
        fontWeight="bold"
        fill={color}
      >
        A
      </SvgText>
    </Svg>
  );
}

/**
 * icon-cat-primera-b
 * Medal with "1" and "B"
 * Color: Valencia Orange #FF6B35
 */
export function PrimeraBIcon({ size = DEFAULT_SIZE, color = colors.primary.orange }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Ribbon */}
      <Path
        d="M12 4L10 10H22L20 4"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Medal circle */}
      <Circle
        cx="16" cy="18"
        r="8"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        fill={`${color}20`}
      />
      {/* Number 1 */}
      <SvgText
        x="16" y="21"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill={color}
      >
        1
      </SvgText>
      {/* B indicator */}
      <SvgText
        x="16" y="29"
        textAnchor="middle"
        fontSize="6"
        fontWeight="bold"
        fill={color}
      >
        B
      </SvgText>
    </Svg>
  );
}

/**
 * icon-cat-segunda-a
 * Shield with "2A"
 * Color: Ceramic Blue #457B9D
 */
export function SegundaAIcon({ size = DEFAULT_SIZE, color = colors.secondary.ceramic }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Shield shape */}
      <Path
        d="M16 4L6 8V16C6 22 10 26 16 28C22 26 26 22 26 16V8L16 4Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      {/* 2A text */}
      <SvgText
        x="16" y="19"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill={color}
      >
        2A
      </SvgText>
    </Svg>
  );
}

/**
 * icon-cat-segunda-b
 * Shield with "2B"
 * Color: Teal #2A9D8F
 */
export function SegundaBIcon({ size = DEFAULT_SIZE, color = colors.semantic.success }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Shield shape */}
      <Path
        d="M16 4L6 8V16C6 22 10 26 16 28C22 26 26 22 26 16V8L16 4Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      {/* 2B text */}
      <SvgText
        x="16" y="19"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill={color}
      >
        2B
      </SvgText>
    </Svg>
  );
}

/**
 * icon-cat-tercera
 * Simple circle with "3"
 * Color: Slate #8B9AAE
 */
export function TerceraIcon({ size = DEFAULT_SIZE, color = colors.text.tertiary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Circle */}
      <Circle
        cx="16" cy="16"
        r="10"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        fill={`${color}15`}
      />
      {/* Number 3 */}
      <SvgText
        x="16" y="20"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill={color}
      >
        3
      </SvgText>
    </Svg>
  );
}

/**
 * icon-cat-infantil
 * Stylized child figure with festive hat
 * Color: Coral #FF8A5B
 */
export function InfantilIcon({ size = DEFAULT_SIZE, color = colors.secondary.coral }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Party hat */}
      <Path
        d="M16 3L12 11H20L16 3Z"
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
      {/* Hat pom-pom */}
      <Circle cx="16" cy="4" r="1.5" fill={colors.primary.gold} />
      {/* Face */}
      <Circle
        cx="16" cy="15"
        r="5"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        fill={`${color}20`}
      />
      {/* Eyes */}
      <Circle cx="14" cy="14" r="1" fill={color} />
      <Circle cx="18" cy="14" r="1" fill={color} />
      {/* Smile */}
      <Path
        d="M13 17C13.5 18 14.5 18.5 16 18.5C17.5 18.5 18.5 18 19 17"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="transparent"
      />
      {/* Body */}
      <Path
        d="M16 20V24"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      {/* Arms */}
      <Path
        d="M12 22L16 24L20 22"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Legs */}
      <Path
        d="M16 24L13 28"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      <Path
        d="M16 24L19 28"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * icon-cat-ninot
 * Theater mask / stylized ninot figure
 * Color: Navy #1D3557
 */
export function NinotIcon({ size = DEFAULT_SIZE, color = colors.primary.navy }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Mask shape */}
      <Path
        d="M6 10C6 6 10 4 16 4C22 4 26 6 26 10V18C26 24 22 28 16 28C10 28 6 24 6 18V10Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}10`}
      />
      {/* Left eye */}
      <Path
        d="M10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12Z"
        stroke={color}
        strokeWidth={1.5}
        fill={`${color}30`}
      />
      {/* Right eye */}
      <Path
        d="M18 12C18 10.9 18.9 10 20 10C21.1 10 22 10.9 22 12C22 13.1 21.1 14 20 14C18.9 14 18 13.1 18 12Z"
        stroke={color}
        strokeWidth={1.5}
        fill={`${color}30`}
      />
      {/* Nose */}
      <Path
        d="M16 14V18L14 19"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Smile */}
      <Path
        d="M11 22C12.5 24 14 25 16 25C18 25 19.5 24 21 22"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        fill="transparent"
      />
    </Svg>
  );
}

/**
 * Helper component - returns appropriate category icon
 */
export function CategoryIcon({ category, size = 32 }: { category: string; size?: number }) {
  const catColor = getCategoryColor(category);
  
  switch (category) {
    case 'Sección Especial':
      return <EspecialIcon size={size} color={catColor.primary} />;
    case 'Primera A':
      return <PrimeraAIcon size={size} color={catColor.primary} />;
    case 'Primera B':
      return <PrimeraBIcon size={size} color={catColor.primary} />;
    case 'Segunda A':
      return <SegundaAIcon size={size} color={catColor.primary} />;
    case 'Segunda B':
      return <SegundaBIcon size={size} color={catColor.primary} />;
    case 'Tercera A':
    case 'Tercera B':
    case 'Tercera C':
      return <TerceraIcon size={size} color={catColor.primary} />;
    case 'Infantil':
      return <InfantilIcon size={size} color={catColor.primary} />;
    default:
      // Default flame for unknown categories
      return <FlameIcon size={size} color={catColor.primary} />;
  }
}

/**
 * Default flame icon for unknown categories
 */
export function FlameIcon({ size = DEFAULT_SIZE, color = colors.primary.orange }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 4C16 4 10 10 10 16C10 20.4 12.7 24 16 24C19.3 24 22 20.4 22 16C22 10 16 4 16 4Z"
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={`${color}30`}
      />
      {/* Inner flame */}
      <Path
        d="M16 12C16 12 13 15 13 18C13 20.2 14.3 22 16 22C17.7 22 19 20.2 19 18C19 15 16 12 16 12Z"
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </Svg>
  );
}
