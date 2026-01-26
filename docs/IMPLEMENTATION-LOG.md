# 🔥 FALLAS VALENCIA — Implementation Log

**Started:** 2025-01-21
**Based on:** DESIGN-CONCEPT.md v1.0, ICONS-SPEC.md v1.0

---

## Table of Contents
- [lib/theme.ts](#libthemets) — Theme System
- [components/AnimatedTabBar.tsx](#componentsanimatedtabbartsx) — Tab Bar
- [components/AnimatedCard.tsx](#componentsanimatedcardtsx) — Cards
- [screens/ListScreen.tsx](#screenslistscreentsx) — Lista Screen

---

## lib/theme.ts

**Created:** 2025-01-21
**Purpose:** Centralized design tokens — colors, typography, spacing

### До:
- Не существовало
- Цвета hardcoded везде: `#FF6B35`, `#f5f5f5`, `#333`
- Каждый компонент определял свои стили

### После:
- Полная дизайн-система из DESIGN-CONCEPT.md
- Primary colors: Flame Red, Valencia Orange, Sunset Gold
- Background colors: Warm Cream (#FFF8F0), Smoke White
- Typography scale на 8pt grid
- Spacing system (xs-xxl)
- Category color mapping
- Gradients (fire, sunset, nightFire)
- Shadow presets

### Причина:
- DESIGN-CONCEPT.md: "Code Tokens" section
- Централизация предотвращает divergence
- Единый source of truth для всех компонентов

---

## components/AnimatedTabBar.tsx

**Updated:** 2025-01-21

### До:
- Background: `#fff`
- Border: `#eee`
- Active color: `#FF6B35` (hardcoded)
- Inactive color: `#999`
- No visual distinction, generic look

### После:
- Background: `#FEFEFE` (Smoke White)
- Border: `rgba(29, 53, 87, 0.08)` (subtle navy)
- Shadow: `-4px 24px rgba(0,0,0,0.05)` (frosted glass effect)
- Active: Valencia Orange `#FF6B35`
- Inactive: Tertiary text `#8B9AAE`
- Tab highlight background on active

### Причина:
- DESIGN-CONCEPT.md: "Tab Bar — Custom Navigation" section
- Height: 83px, frosted glass appearance
- Active indicator styling

---

## components/AnimatedCard.tsx

**Updated:** 2025-01-21

### До:
- Generic shadow: `#000` with 0.1 opacity
- No theme integration
- Basic press animation

### После:
- Theme-aware shadows
- Category-specific styling support
- Enhanced shadow on press
- Border radius from theme (16px)

### Причина:
- DESIGN-CONCEPT.md: "Cards — Falla Cards" section
- Shadow: `0 4px 16px rgba(29, 53, 87, 0.08)`

---

## screens/ListScreen.tsx

**Updated:** 2025-01-21

### До:
- Background: `#f5f5f5` (cold gray)
- Cards: `#fff` with `#FFE5D9` emoji background
- Text colors: `#333`, `#888`
- Category text: `#FF6B35` only
- No visual hierarchy between categories

### После:
- Background: Warm Cream `#FFF8F0`
- Cards: Smoke White `#FEFEFE`
- Category badges with proper colors:
  - Sección Especial: Gold `#FFB800`
  - Primera A: Flame Red `#E63946`
  - Primera B: Valencia Orange `#FF6B35`
  - Segunda A: Ceramic Blue `#457B9D`
  - etc.
- Text: Primary `#1D3557`, Secondary `#457B9D`
- Enhanced card shadows

### Причина:
- DESIGN-ANALYSIS.md: "Poor Color Palette" — boring gray backgrounds
- DESIGN-CONCEPT.md: "Category Color Coding" table
- Need warm, festive appearance

---

---

## screens/FallaDetailScreen.tsx

**Updated:** 2025-01-21

### До:
- Background: `#fff` (white)
- Hero: `#FF6B35` (hardcoded orange)
- Text colors: `#333`, `#666`, `#444`
- Event cards: `#f8f8f8`
- Buttons: hardcoded colors

### После:
- Background: Warm Cream `#FFF8F0`
- Hero: Dynamic color based on category (getCategoryColor)
- Text: Theme colors (primary, secondary)
- Event cards: Smoke White with card shadows
- Stats row added (distance, rating, views)
- All spacing from theme

### Причина:
- DESIGN-CONCEPT.md: "Detail Screen (Falla Detail)" section
- Category-specific hero colors for visual distinction
- Consistent spacing and typography

---

## screens/GuideScreen.tsx

**Updated:** 2025-01-21

### До:
- Background: `#f5f5f5` (gray)
- Card colors: hardcoded with +15 opacity
- Typography: hardcoded sizes

### После:
- Background: Warm Cream `#FFF8F0`
- Card colors: Explicit bgColor from theme palette
- Typography: theme.typography system
- Shadows: theme.shadows.card

### Причина:
- DESIGN-CONCEPT.md: "Guía Screen (Guide)" section
- Consistent warm appearance across app

---

## screens/App.tsx

**Updated:** 2025-01-21

### До:
- All colors hardcoded: `#FF6B35`, `#fff`, `#FFF8F5`
- No theme import

### После:
- Import colors from lib/theme
- All headers use colors.primary.orange
- Loading screens use colors.background.cream
- Web container uses colors.background.charcoal

### Причина:
- Centralized theme prevents style divergence
- Easy to update colors app-wide

---

---

## Stage 5: Icons Implementation

**Updated:** 2025-01-21
**Based on:** ICONS-SPEC.md v1.0

### Overview
Replaced all emoji icons with custom SVG icons using react-native-svg.
Style: Outlined, 2px stroke, rounded caps, with selective fills.

### Files Created

#### components/icons/
New folder structure for all custom icons:

```
components/icons/
├── index.tsx          — Exports all icons
├── TabIcons.tsx       — 4 tab bar icons (28x28)
├── CategoryIcons.tsx  — 8 category icons (32x32)
├── ActionIcons.tsx    — 17 action icons (24x24)
└── GuideIcons.tsx     — 7 guide section icons (48x48)
```

### Tab Icons (28x28)

| Before | After | Description |
|--------|-------|-------------|
| 📋 | `ListIcon` | Flame above three list lines |
| 🗺️ | `MapIcon` | Folded map with flame-shaped pin |
| ⭐ | `FavoritesIcon` | Star with heart inside |
| 📖 | `GuideIcon` | Open book with flame bookmark |

**Implementation:**
- Animated bounce on focus (scale 1.1)
- Active color: Valencia Orange #FF6B35
- Inactive color: #8B9AAE
- Flame elements fill when active

### Category Icons (32x32)

| Category | Before | After | Color |
|----------|--------|-------|-------|
| Sección Especial | 🏆 | `EspecialIcon` | Gold #FFB800 |
| Primera A | 🥇 | `PrimeraAIcon` | Flame Red #E63946 |
| Primera B | 🥈 | `PrimeraBIcon` | Orange #FF6B35 |
| Segunda A | 🥉 | `SegundaAIcon` | Blue #457B9D |
| Segunda B | 🎖️ | `SegundaBIcon` | Teal #2A9D8F |
| Tercera A/B/C | 🎗️ | `TerceraIcon` | Slate #8B9AAE |
| Infantil | 👶 | `InfantilIcon` | Coral #FF8A5B |
| Ninot | 🎭 | `NinotIcon` | Navy #1D3557 |

**Implementation:**
- Trophy with flame for Especial
- Medals with numbers for Primera
- Shields for Segunda
- Simple circle for Tercera
- Child figure with party hat for Infantil
- Theater mask for Ninot

### Action Icons (24x24)

Implemented icons:
- `HeartIcon` — Favorite button (outline/filled states)
- `HeartFireIcon` — Super-favorite with flame
- `SearchIcon` — Magnifying glass
- `FilterIcon` — Sliders
- `ShareIcon` — iOS-style share arrow
- `DirectionsIcon` — Navigation arrow
- `LocationIcon` — Map pin with flame
- `BackIcon` — Chevron left
- `CloseIcon` — X button
- `CheckIcon` — Checkmark
- `PlusIcon`, `MinusIcon`
- `MoreIcon` — Vertical dots
- `ChevronRightIcon`
- `CalendarIcon` — Calendar with flame marker
- `ClockIcon`
- `DistanceIcon` — Small flame for distance badge

### Guide Section Icons (48x48)

| Section | Before | After | Color |
|---------|--------|-------|-------|
| Petardos | 🧨 | `FireworksIcon` | Flame Red |
| Transporte | 🚌 | `TransportIcon` | Success Green |
| Exposiciones | 🎨 | `ExhibitionsIcon` | Ceramic Blue |
| Ferias | 🎪 | `FairsIcon` | Orange |
| Vida nocturna | 💃 | `NightlifeIcon` | Coral |
| Toros | 🐂 | `BullfightingIcon` | Navy |
| Glosario | 📚 | `GlossaryIcon` | Ceramic Blue |

**Implementation:**
- More detailed icons (48x48 safe area)
- Custom illustrations with multiple colors
- Flame/fire accents throughout

### Files Modified

#### App.tsx
```typescript
// Before
<AnimatedTabIcon emoji="📋" focused={focused} color={color} />

// After
<AnimatedTabIcon icon="list" focused={focused} color={color} />
```

#### components/AnimatedTabBar.tsx
- Added `icon` prop alongside `emoji` for backwards compatibility
- Imports and renders SVG icons when `icon` prop is used
- Maintains emoji fallback

#### screens/ListScreen.tsx
- Removed `CATEGORY_ICONS` emoji map
- Import `CategoryIcon` component
- Replace emoji with `<CategoryIcon category={item.category} size={40} />`
- Replace 🔥 distance emoji with `<DistanceIcon size={14} />`

#### screens/GuideScreen.tsx
- Remove `emoji` from GuideCategory interface
- Import `getGuideIcon` function
- Replace `{category.emoji}` with `{getGuideIcon(category.id, 40)}`

### Dependencies Added
```bash
npx expo install react-native-svg
```

### Design Notes
- All icons follow ICONS-SPEC.md guidelines
- 2px stroke width, rounded caps
- Color tokens from theme.ts
- Active states have filled flame elements
- Inactive states are outline-only

---

## Stage 6: Events Screen (Replacing ListScreen)

**Updated:** 2025-01-26
**Task:** Replace main "Lista" tab (fallas list) with "Eventos" tab (events feed)

### Problem
ListScreen was showing a list of fallas, but fallas are already visible on the Map tab. The main screen should show **what's happening** — events, schedules, activities.

### Solution
Created EventsScreen to display events from Supabase, grouped by date.

### Files Created

#### screens/EventsScreen.tsx
Complete rewrite of the main tab content:

**Features:**
- Loads events from Supabase via `getEvents()`
- Groups events by date sections: "Hoy" (Today), "Mañana" (Tomorrow), "Esta Semana" (This Week)
- Event cards show: time, event type badge, title, location, linked falla
- Color-coded event type badges (mascletà, castillo, despertà, ofrenda, cremà, pasacalle, concierto)
- Pull-to-refresh with FireRefreshIndicator
- Empty state when no events
- Clicking event navigates to FallaDetail if event has associated falla
- Multi-language support (Spanish/English) via LanguageContext

**Components:**
- `EventCard` — Individual event display with time column and details
- `SectionHeader` — Date grouping headers with active indicator for "Today"
- `EventTypeBadge` — Color-coded badge for event type
- `EmptyState` — When no events are scheduled

### Files Modified

#### components/icons/TabIcons.tsx
Added new `EventsIcon`:
- Calendar shape with flame element on top
- Date dots inside calendar
- Matches design language of other tab icons

#### components/icons/index.tsx
- Export new `EventsIcon` from TabIcons

#### components/AnimatedTabBar.tsx
- Added `EventsIcon` import
- Added `'events'` to icon type union
- Added case for `events` in `renderIcon()` switch

#### App.tsx
```typescript
// Before
import ListScreen from './screens/ListScreen';
<Tab.Screen 
  name="Lista" 
  component={ListScreen}
  options={{
    tabBarIcon: ({ color, focused }) => (
      <AnimatedTabIcon icon="list" focused={focused} color={color} />
    ),
    ...
  }}
/>

// After
import EventsScreen from './screens/EventsScreen';
<Tab.Screen 
  name="Eventos" 
  component={EventsScreen}
  options={{
    tabBarIcon: ({ color, focused }) => (
      <AnimatedTabIcon icon="events" focused={focused} color={color} />
    ),
    ...
  }}
/>
```

#### contexts/LanguageContext.tsx
Added translations for events screen:
- `events.today` — "Hoy" / "Today"
- `events.tomorrow` — "Mañana" / "Tomorrow"
- `events.thisWeek` — "Esta Semana" / "This Week"
- `events.noEvents` — "No hay eventos programados" / "No events scheduled"
- `events.checkLater` — "Vuelve más tarde..." / "Check back later..."
- `events.headerTitle` — "Qué pasa hoy" / "What's happening"
- `tab.events` — "Eventos" / "Events"

### Design Notes
- Event type colors defined in EVENT_TYPE_COLORS constant
- Time displayed prominently in left column (HH:MM format)
- Colored left border indicator per event type
- Section headers have active indicator for "Today"
- Uses existing theme system (colors, spacing, typography, shadows)

### Data Flow
1. EventsScreen loads events from Supabase on mount
2. Events filtered to only show current/future events
3. Grouped by date section (today, tomorrow, this week, or specific date)
4. Displayed in SectionList with sticky headers disabled
5. Pull-to-refresh reloads from Supabase

### ListScreen.tsx
- File kept for reference but no longer used in navigation
- Can be deleted in cleanup phase

---

## Stage 7: NativeWind Migration + Design Refresh

**Updated:** 2026-01-26
**Branch:** `redesign`
**Reference:** Design/ folder (Vite + React + Tailwind)

### Overview
Migrating the app to NativeWind (Tailwind CSS for React Native) and refreshing the design based on the modern web prototype in Design/ folder.

### Packages Installed
```bash
npx expo install nativewind tailwindcss
npx expo install expo-blur expo-linear-gradient
```

### Files Created

#### tailwind.config.js
```javascript
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'valencia-orange': '#FF6B35',
        'flame-red': '#E63946',
        'warm-cream': '#FFF8F0',
        'gold': '#FFB800',
        // ... semantic colors
      },
    },
  },
};
```

#### metro.config.js
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

#### global.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### nativewind-env.d.ts
TypeScript support for className prop.

### Files Modified

#### babel.config.js
Added `nativewind/babel` preset.

#### App.tsx
Added `import './global.css';` at top.

### Components Migrated

#### components/FloatingTabBar.tsx (NEW)
Replaces CustomTabBar with modern floating design:
- **Glassmorphism:** BlurView (native) / semi-transparent bg (web)
- **Floating position:** `position: absolute`, bottom 16px
- **Gradient active state:** LinearGradient from valencia-orange to flame-red
- **Fire particles:** Animated gold particles on active tab (using Moti)
- **Smooth animations:** React Native Reanimated for press/scale effects

**Web vs Native differences:**
- Web: Uses rgba background instead of BlurView (no native blur support)
- Native: Full BlurView with intensity=80

#### components/EventsFeed.tsx (NEW)
Modern events display with Design/ styling:

**HeroEventCard:**
- Full-width image card with gradient overlay
- Glassmorphism bottom content area
- Live countdown timer (updates every second)
- Pulsing "Live" badge with FlameIcon
- Serif font for title (Georgia/serif)

**TimelineEvent:**
- Vertical timeline with orange dots
- Event cards with subtle glassmorphism
- Staggered entry animations (Moti)
- Connected by vertical orange line

### Design Adaptations for React Native

| Web (Design/) | React Native |
|---------------|--------------|
| `motion/react` | `react-native-reanimated` + `moti` |
| `backdrop-blur-xl` | `expo-blur` BlurView |
| `lucide-react` | Custom icons in `components/icons/` |
| CSS gradients | `expo-linear-gradient` |
| CSS `position: absolute; inset: 0` | StyleSheet with all 4 positions |

### Known Issues
- NativeWind className doesn't work for all style properties on web
- Some animations fallback to simpler versions on web
- Fire particles simplified (no physics simulation like web)

### Next Steps
- [ ] Migrate more components to NativeWind
- [ ] Add more glassmorphism cards
- [ ] Implement guide screen with new design
- [ ] Test on actual devices (iOS/Android)

*Log continues with each change...*
